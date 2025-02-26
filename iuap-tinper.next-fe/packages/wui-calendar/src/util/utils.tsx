import type {CalendarNode} from '../iCalendar';

// 构造树节点的函数 calendarScheduleItemNode
export const calendarScheduleItemNode = (nodeItem: CalendarNode['data']) => {
    let itemNode = {
        data: nodeItem,
        arguments: {
            width: 100,
            left: 0,
            content: nodeItem[3]
        },
        timeInfo: {
            begin: nodeItem[0].hour * 60 + nodeItem[0].minute, // 开始的top
            end: nodeItem[1].hour * 60 + nodeItem[1].minute, // 结束的top
        },
        maxEnd: nodeItem[1].hour * 60 + nodeItem[1].minute,
        children: [],
        level: 1,
        parent: null,
        // node是其他节点
        contains: (node: CalendarNode, useMaxEndTime: boolean) => {
            let tempEndTime = useMaxEndTime ? itemNode.maxEnd : itemNode.timeInfo.end;
            let value = node.data[0].hour * 60 + node.data[0].minute >= itemNode.timeInfo.begin && node.data[0].hour * 60 + node.data[0].minute < tempEndTime;
            return value
        }
    }
    return itemNode;
}

// string1 <= string2   1:00 1:00 => 0  1:00 2:00 => -1   2:00 1:00 => 1
export const compare = (v1: string, v2: string) => {
    let string1 = v1.replace(/\s*/g, "").split(":");
    let string2 = v2.replace(/\s*/g, "").split(":");
    if (string1[0] < string2[0]) {
        return -1
    } else if (string1[0] > string2[0]) {
        return 1
    } else {
        if (string1[1] > string2[1]) {
            return 1
        } else {
            return string1[1] < string2[1] ? -1 : 0
        }
    }
}

// 以第一个空格分隔字符串
export const splitFirst = (str: string) => {
    let i = str.indexOf(' ');
    return [str.substring(0, i), str.substring(i + 1)]
}

// 把某个时间段的时分 分别转为number类型
export const separaTime = (beginTime: string, endTime: string) => {
    let begin = { hour: 1, minute: 1, beginTime: '1'};
    begin.hour = Number(beginTime.replace(/\s*/g, "").split(':')[0])
    begin.minute = Number(beginTime.replace(/\s*/g, "").split(':')[1])
    begin.beginTime = beginTime;

    let end = { hour: 1, minute: 1, endTime: '1'};
    end.hour = Number(endTime.replace(/\s*/g, "").split(':')[0])
    end.minute = Number(endTime.replace(/\s*/g, "").split(':')[1])
    end.endTime = endTime;

    if (begin.hour == end.hour && end.minute - begin.minute < 8) {
        if (begin.minute % 15 > 7 || begin.minute % 15 == 0) {
            end.minute = end.minute + 15 - end.minute % 15
        } else if (end.minute % 15 < 8 && end.minute % 15 !== 0) {
            begin.minute = begin.minute - end.minute % 15
        }
    } else {
        begin.minute = (begin.minute % 15 < 8) ? (begin.minute - begin.minute % 15) : (begin.minute + 15 - begin.minute % 15);
        end.minute = (end.minute % 15 < 8) ? (end.minute - end.minute % 15) : (end.minute + 15 - end.minute % 15);
    }
    return {begin, end}
}

// 递归查找目标节点的合适父节点insertNodeFrom
export const insertNodeFrom = (header: CalendarNode, targetNode: CalendarNode) => {
    // 最初父节点没有子节点
    if (header.children.length == 0) {
        // 这个父节点是否包含目标节点
        // 如果包含
        if (header.contains(targetNode, false)) {
            header.children.push(targetNode);
            targetNode.parent = header;
            header.level += 1;
            header.maxEnd = Math.max(header.maxEnd, targetNode.timeInfo.end)

            let parent = header.parent;
            while (parent !== null) {
                parent.level += 1;
                parent.maxEnd = Math.max(parent.maxEnd, targetNode.timeInfo.end)
                parent = parent.parent
            }
            return true
        }
        return false
    } else {
        // 最初父节点有子节点
        // 由后往前判断子节点是否包含目标节点
        let success = false;
        let arrTemp: CalendarNode[] = [];
        header.children.forEach((item: CalendarNode) => {
            arrTemp.unshift(item)
        })
        for (let i = 0; i < arrTemp.length; i++) {
            let child = arrTemp[i];
            let successChild: any = insertNodeFrom(child, targetNode);
            if (successChild) {
                success = successChild;
                header.maxEnd = Math.max(child.maxEnd, header.maxEnd)
                break
            }
        }
        // 如果子节点都不成功，试试本身
        if (!success) {
            if (header.contains(targetNode, false)) {
                header.children.push(targetNode);
                targetNode.parent = header;
                header.maxEnd = Math.max(header.maxEnd, targetNode.timeInfo.end)

                let parent = header.parent;
                if (parent !== null) {
                    parent.maxEnd = Math.max(parent.maxEnd, targetNode.timeInfo.end)
                    parent = parent.parent
                }
                return true
            }
        }
        return success
    }
}

// 获得scheduleViews，开始循环遍历获得多颗多叉树
export const upDateItemsFrame = (scheduleViews: CalendarNode['data'][], domWidth: number) => {
    let rootNode: CalendarNode;
    let itemNodeArray: CalendarNode[] = [];
    scheduleViews.map((item: CalendarNode['data']) => {
        if (rootNode == null) {
            // 1.若rootNode为空,初始化一个节点并赋值给rootNode,继续下一轮循环
            rootNode = calendarScheduleItemNode(item);
            itemNodeArray.push(rootNode); // itemNode = [1]
        } else {
            // 2.初始化一个节点node,
            let node = calendarScheduleItemNode(item);
            // 2.1 若rootNode能包含node
            if (rootNode.contains(node, true)) {
                // 2.2递归查找node的合适父节点
                insertNodeFrom(rootNode, node)
            } else {
                // 3.若node不被rootNode节点包含
                rootNode = calendarScheduleItemNode(item);
                itemNodeArray.push(rootNode)
            }
        }
    })
    for (let i = 0; i < itemNodeArray.length; i++) {
        // 若没有子节点，长度按正常算
        // 若有子节点, 调用下面的函数
        if (itemNodeArray[i].children.length !== 0) {
            setNodeWidthFrom(itemNodeArray[i], 0, domWidth, itemNodeArray[i].level, domWidth)
        }
    }
    return itemNodeArray
}

// 设置节点包含数据的宽度和横坐标,如果节点有子节点,需要递归设置
const setNodeWidthFrom = (node: CalendarNode, left: number, maxWidth: number, level: number, firstWidth: number) => {
    // 只有一层
    if (level == 1) {
        let temp = node.arguments;
        temp.width = 0.02;
        temp.left = left;
        node.arguments = temp;
    }
    // 事件之间的空隙间隔所占百分比
    let space = 0.15;
    let count = level;
    // 最小宽度
    let minWidth = (maxWidth - (count - 1) * space * firstWidth / 100) / count;

    // 设置根节点的arguments
    let temp = node.arguments;
    temp.left = left;
    temp.width = (minWidth / firstWidth) * 100;
    node.arguments = temp;

    let childLeft = temp.left + (minWidth / firstWidth) * 100 + space;
    let childMaxWidth = maxWidth - minWidth - space * firstWidth / 100;
    for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        // 若此节点有子节点,则递归设置孩子节点的横坐标和宽度,这里要减去本身父节点和横坐标偏差
        setNodeWidthFrom(child, childLeft, childMaxWidth, child.level, firstWidth)
    }
}

export const greaterThan = (A: string, B: string) => {
    const arrA = A.split(':');
    const arrB = B.split(':');
    if (arrA[0] === arrB[0]) {
        return +arrA[1] > +arrB[1]
    }
    return +arrA[0] > +arrB[0]
}
export const formatMonth = (index: number, localeMap: {[key: string]: string}) => {
    const monthMap = ['janFirst', 'febFirst', 'marFirst', 'aprFirst', 'mayFirst', 'junFirst', 'julFirst', 'augFirst', 'sepFirst', 'octFirst', 'novFirst', 'decFirst']
    return localeMap[monthMap[index]]
}
