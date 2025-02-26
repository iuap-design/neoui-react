import React, { Component } from 'react';
import { mount } from '../common/mount';
import { render, screen, fireEvent } from "@testing-library/react";
import moment from "moment";
import generateReport from './report';
import { prefix } from './../../../packages/wui-core/src/updatePrefix'
import {
    Affix,
    Alert,
    Anchor,
    AutoComplete,
    Avatar,
    BackTop,
    Badge,
    Button,
    ButtonGroup,
    Breadcrumb,
    Calendar,
    Card,
    Cascader,
    Checkbox,
    Clipboard,
    Collapse,
    ColorPicker,
    DatePicker,
    Divider,
    Drawer,
    Dropdown,
    Empty,
    Form,
    Icon,
    Image,
    Input,
    InputNumber,
    List,
    Menu,
    Modal,
    Popconfirm,
    Popover,
    Progress,
    Radio,
    Rate,
    Select,
    Skeleton,
    Slider,
    Space,
    Spin,
    Steps,
    SvgIcon,
    Switch,
    Table,
    Tabs,
    Tag,
    Timeline,
    TimePicker,
    Tooltip,
    Transfer,
    Tree,
    TreeSelect,
    Upload
} from './../../../packages/index.tsx';
import RealTree from '../../../packages/wui-tree/src/Tree'
const { Item } = Menu;
const callback = (atrts) => { }
const dataSource = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    }
];
const treeData = [
    {
        title: 'Node 1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node 1',
                value: '0-0-0',
                key: '0-0-0'
            },
            {
                title: 'Child Node 2',
                value: '0-0-1',
                key: '0-0-1'
            }
        ]
    },
    {
        title: 'Node 2',
        value: '0-1',
        key: '0-1'
    }
];

const bigTreeData = [...new Array(1000)].map((_e, i) => {
    const rs = { key: i + 'a', title: i + 'a' };
    return rs;
})
const targetKeys = ['3', '4', '5'];
const items = [
    {
        key: 'one',
        href: 'one',
        title: '国内要闻',
    },
    {
        key: 'two',
        href: 'two',
        title: '国际新闻',
    },
    {
        key: 'three',
        href: 'three',
        title: '财经',
    },
    {
        key: 'four',
        href: 'four',
        title: '互联网',
    },
    {
        key: 'five',
        href: 'five',
        title: '房产',
    },
    {
        key: 'six',
        href: 'six',
        title: '汽车',
    },
]
const menu = (
    <Menu>
        <Item key="1">借款合同</Item>
        <Item key="2">抵/质押合同</Item>
        <Item key="3">担保合同</Item>
        <Item key="4">联保合同</Item>
        <Item key="5">合同审批</Item>
        <Item key="6">抵/质押合同跟踪</Item>
    </Menu>
);
const options = [
    {
        key: "vision",
        label: "幻视"
    },
    {
        key: "shang-chi",
        label: "尚气"
    },
    {
        key: "peter",
        label: "彼得"
    }
];
const CopmArray = [
    {
        compName: 'Affix',
        Component: Affix,
        props: {
            container: document.body,
            target: () => { return document.body },
            onChange: () => console.log('cahnge'),
            children: <Button colors="primary"></Button>
        }
    },
    {
        compName: 'Alert',
        Component: Alert,
        props: {
            type: 'info',
            message: '这是一条提示信息',
            description: '这是一条更详细的描述',
            closable: true,
            onClose: () => console.log('警告框已关闭')
        }
    },
    {
        compName: 'Anchor',
        Component: Anchor,
        props: {
            offsetTop: 150,
            affix: true,
            antd: true,
            style: { width: '10%', marginLeft: '90%' },
            items,
        }
    },
    {
        compName: 'AutoComplete',
        Component: AutoComplete,
        props: {
            dataSource: dataSource,
            defaultValue: '张三',
            onSelect: (value) => console.log(`选中了${value}`)
        }
    },
    {
        compName: 'Avatar',
        Component: Avatar,
        props: {
            src: 'https://cdn.pixabay.com/photo/2021/03/25/17/22/nature-6126340_960_720.jpg',
            size: 'large',
            shape: 'square'
        }
    },
    {
        compName: 'BackTop',
        Component: BackTop,
        props: {
            visibilityHeight: -1,
            character: "UP"
        }
    },
    {
        compName: 'Badge',
        Component: Badge,
        props: {
            count: 5,
            dot: true,
            status: 'processing',
            text: '新消息'
        }
    },
    {
        compName: 'Button',
        Component: Button,
        props: {
            type: 'primary',
            size: 'large',
            icon: <Icon type="search" />,
            disabled: false,
            loading: false,
            onClick: () => console.log('按钮被点击了')
        }
    },
    {
        compName: 'ButtonGroup',
        Component: ButtonGroup,
        props: {}
    },
    {
        compName: 'Breadcrumb',
        Component: Breadcrumb,
        props: {
            separator: '/',
            routes: [
                {
                    path: '/',
                    breadcrumbName: '首页'
                },
                {
                    path: '/products',
                    breadcrumbName: '产品列表'
                },
                {
                    path: '/products/shoes',
                    breadcrumbName: '鞋子'
                }
            ]
        }
    },
    {
        compName: 'Calendar',
        Component: Calendar,
        props: {
            fullscreen: false,
        }
    },
    {
        compName: 'Card',
        Component: Card,
        props: {
            title: '这是卡片的标题',
            extra: <a href="#">更多</a>,
            style: { width: 300 },
            cover: (
                <img
                    alt="example"
                    src="https://cdn.pixabay.com/photo/2021/03/25/17/22/nature-6126340_960_720.jpg"
                    style={{ height: 200 }}
                />
            ),
            actions: [
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
            ]
        }
    },
    {
        compName: 'Cascader',
        Component: Cascader,
        props: {
            options: [
                {
                    value: 'zhejiang',
                    label: '浙江',
                    children: [
                        {
                            value: 'hangzhou',
                            label: '杭州',
                            children: [
                                {
                                    value: 'xihu',
                                    label: '西湖'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'zhonghuamen',
                                    label: '中华门'
                                }
                            ]
                        }
                    ]
                }
            ],
            onChange: (value) => console.log(value)
        }
    },
    {
        compName: 'Checkbox',
        Component: Checkbox,
        props: {
            indeterminate: true,
            checked: true,
            disabled: false,
            onChange: (e) => console.log(e.target.checked)
        }
    },
    {
        compName: 'Clipboard',
        Component: Clipboard,
        props: {
            text: '这是一段要复制的文本',
            onSuccess: () => console.log('复制成功'),
            onError: () => console.log('复制失败')
        }
    },
    {
        compName: 'Collapse',
        Component: Collapse,
        props: {
            activeKey: ['1'],
            accordion: true,
            onChange: (key) => console.log(key)
        }
    },
    {
        compName: 'ColorPicker',
        Component: ColorPicker,
        props: {
            color: '#f50',
            onChange: (color) => console.log(color.hex)
        }
    },
    {
        compName: 'DatePicker',
        Component: DatePicker,
        props: {
            onChange: (date, dateString) => console.log(dateString),
            disabled: false,
            allowClear: true,
            showTime: true,
            placeholder: '请选择日期'
        }
    },
    {
        compName: 'Divider',
        Component: Divider,
        props: {
            orientation: "left"
        }
    },
    {
        compName: 'Drawer',
        Component: Drawer,
        props: {
            placement: 'right',
            closable: true,
            onClose: () => console.log('抽屉已关闭')
        }
    },
    {
        compName: 'Dropdown',
        Component: Dropdown,
        props: {
            overlay: menu
        }
    },
    {
        compName: 'Empty',
        Component: Empty,
        props: {
            description: '暂无数据',
            image: <Icon type="inbox" />,
            imageStyle: { height: 60 }
        }
    },
    {
        compName: 'Form',
        Component: Form,
        props: {
            onFinish: (values) => console.log(values),
            onFinishFailed: (errorInfo) => console.log(errorInfo)
        }
    },
    {
        compName: 'Image',
        Component: Image,
        props: {
            title: false,
            navbar: true,
            navbar: true,
            toolbar: true,
            navbar: true,
            tooltip: true,
            children: <img src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg' alt="Picture" />
        }
    },
    {
        compName: 'Input',
        Component: Input,
        props: {
            addonBefore: 'http://',
            addonAfter: '.com',
            defaultValue: 'Ant Design',
            disabled: false,
            onPressEnter: (e) => console.log(e.target.value),
            prefix: <Icon type="user" />,
            suffix: <Icon type="close-circle" />,
            allowClear: true
        }
    },
    {
        compName: 'InputNumber',
        Component: InputNumber,
        props: {
            min: 1,
            max: 10,
            defaultValue: 3,
            disabled: false,
            onChange: (value) => console.log(value)
        }
    },
    {
        compName: 'List',
        Component: List,
        props: {
            bordered: true,
            dataSource: [
                {
                    title: 'Ant Design Title 1'
                },
                {
                    title: 'Ant Design Title 2'
                },
                {
                    title: 'Ant Design Title 3'
                },
                {
                    title: 'Ant Design Title 4'
                }
            ],
            renderItem: item => (
                <List.Item>
                    {item.title}
                </List.Item>
            ),
            loading: false,
            locale: {
                emptyText: '暂无数据'
            }
        }
    },
    {
        compName: 'Menu',
        Component: Menu,
        props: {
            mode: 'inline',
            defaultSelectedKeys: ['1'],
            onSelect: (item) => console.log(item),
            theme: 'light'
        }
    },
    {
        compName: 'Modal',
        Component: Modal,
        props: {
            title: '这是弹窗的标题',
            show: true,
            backdrop: true,
            backdropClosable: true,
            renderBackdrop: true,
            onEscapeKeyUp: callback,
            style: { bgckground: 'white' },
            size: 'lg',
            width: 800,
            height: 400,
            onShow: callback,
            onHide: callback,
            afterClose: callback,
            draggable: true,
            bounds: 'html',
            onStart: callback,
            onStop: callback,
            destroyOnClose: true,
            resizable: true,
            maximize: true,
            keyboard: true,
            title: 'title',
            okText: 'ok',
            cancelText: 'cancle',
            onOk: () => console.log('点击了确定按钮'),
            onCancel: () => console.log('点击了取消按钮')
        }
    },
    {
        compName: 'Popconfirm',
        Component: Popconfirm,
        props: {
            title: '你确定要删除吗？',
            onConfirm: () => console.log('删除成功'),
            onCancel: () => console.log('取消删除')
        }
    },
    {
        compName: 'Popover',
        Component: Popover,
        props: {
            content: '这是气泡卡片的内容',
            title: '这是气泡卡片的标题',
            trigger: 'click',
            placement: 'bottomRight'
        }
    },
    {
        compName: 'Progress',
        Component: Progress,
        props: {
            percent: 50,
            status: 'active',
            showInfo: true,
            strokeLinecap: 'round'
        }
    },
    {
        compName: 'Radio',
        Component: Radio,
        props: {
            value: 1,
            checked: false,
            disabled: false,
            onChange: (e) => console.log(e.target.value)
        }
    },
    {
        compName: 'Rate',
        Component: Rate,
        props: {
            count: 5,
            defaultValue: 3,
            allowHalf: true,
            onChange: (value) => console.log(value)
        }
    },
    {
        compName: 'Select',
        Component: Select,
        props: {
            defaultValue: "vision",
            options: options
        }
    },
    {
        compName: 'Skeleton',
        Component: Skeleton,
        props: {
            defaultValue: 'jack',
            style: { width: 200 },
            onChange: (value) => console.log(value),
            placeholder: '请选择'
        }
    },
    {
        compName: 'Slider',
        Component: Slider,
        props: {
            defaultValue: 30,
            step: 10,
            min: 0,
            max: 100,
            tooltipVisible: true,
            onChange: (value) => console.log(value)
        }
    },
    {
        compName: 'Space',
        Component: Space,
        props: {
            direction: "vertical"
        }
    },
    {
        compName: 'Spin',
        Component: Spin,
        props: {
            size: 'large',
            tip: 'Loading...',
            delay: 500
        }
    },
    {
        compName: 'Steps',
        Component: Steps,
        props: {
            current: 0,
            status: 'process',
            onChange: current => console.log(current)
        }
    },
    {
        compName: 'SvgIcon',
        Component: SvgIcon,
        props: {
            type: "audio"
        }
    },
    {
        compName: 'Switch',
        Component: Switch,
        props: {
            disabled: true,
            checked: true,
        }
    },
    {
        compName: 'Table',
        Component: Table,
        props: {
            dataSource: dataSource,
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address'
                }
            ],
            pagination: false,
            loading: false
        }
    },
    {
        compName: 'Tabs',
        Component: Tabs,
        props: {
            defaultActiveKey: '1',
            onChange: activeKey => console.log(activeKey)
        }
    },
    {
        compName: 'Tag',
        Component: Tag,
        props: {
            color: "success"
        }
    },
    {
        compName: 'Timeline',
        Component: Timeline,
        props: {
            pending: true,
            reverse: true,
            mode: 'left'
        }
    },
    {
        compName: 'TimePicker',
        Component: TimePicker,
        props: {
            defaultValue: moment('12:00', 'HH:mm'),
            format: 'HH:mm',
            onChange: (time, timeString) => console.log(timeString)
        }
    },
    {
        compName: 'Tooltip',
        Component: Tooltip,
        props: {
            arrowPointAtCenter: true,
            placement: 'topLeft',
            overlay: 'this is a tooltip',
            visible: true,
            children: <Button colors='primary'> 上左 </Button>
        }
    },
    {
        compName: 'Transfer',
        Component: Transfer,
        props: {
            dataSource: dataSource,
            targetKeys: targetKeys,
            render: item => item.title,
            onChange: targetKeys => console.log(targetKeys)
        }
    },
    {
        compName: 'Tree(index.tsx)',
        Component: Tree,
        props: {
            treeData: treeData,
            checkable: true,
            draggable: true,
            onSelect: (selectedKeys, info) => console.log(selectedKeys)
        }
    },
    {
        compName: 'Tree(Tree.tsx, 1000条数据)',
        Component: RealTree,
        props: {
            treeData: bigTreeData,
            checkable: true,
            draggable: true,
            clsPrefix: `${prefix}-tree`,
            defaultExpandedKeys: [],
            expandedKeys: ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-3-5'],
            onSelect: (selectedKeys, info) => console.log(selectedKeys)
        },
        methodNameList: ['render', 'componentDidMount', 'componentDidUpdate', 'filterTreeNode', 'getFilterExpandedKeys', 'getDefaultExpandedKeys'],
        afterTest(wrapper) {
            wrapper.container.querySelector(`.${prefix}-tree-checkbox`).click()
            wrapper.container.scrollTop = 10000;
        }
    },
    {
        compName: 'TreeSelect',
        Component: TreeSelect,
        props: {
            treeData: treeData,
            dropdownStyle: { maxHeight: 400, overflow: 'auto' },
            placeholder: 'Please select',
            onChange: value => console.log(value)
        }
    },
    {
        compName: 'Upload',
        Component: Upload,
        props: {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text'
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }
        }
    }

]

/**
@desc 用于测试 React 组件中的特定方法，并生成用于测试组件内部方法的执行记录（执行次数和时间）。
@param {string} title - 测试用例的标题
@param {ReactNode} Component - 要测试的组件
@param {string} methodName - 要测试的方法名
@param {Object} props - 作为 props 传递给组件的属性对象
@param {number} [times] - 期望执行次数，可选参数
@param {number} [time] - 期望执行时间，可选参数
@param {Function} [afterTest] - 执行过程中需要进行的其他操作，如模拟用户操作等，可选参数
*/
const testComponentMethod = (title, compName, Component, methodNameList, props, times, time, afterTest) => {
    const Record = {
        compName,
        execution: [],
        totalTime: 0,
    };
    describe(`${title}`, () => {
        it(`it should be rendered in time`, () => {
            try {
                const componentInstance = new Component({ ...Component.defaultProps, ...props })
                for (let item in componentInstance) {
                    if (typeof componentInstance[item] === 'function' && item !== 'render' && item !== 'componentDidMount') {
                        methodNameList.push(item);
                        if (!Component.prototype[item]) Component.prototype[item] = componentInstance[item]
                    }
                }
            } catch (error) { };

            // 将要测试的方法拷贝一份备份
            let methodCopy = {};
            methodNameList.forEach(methodName => {
                methodCopy[methodName] = Component[methodName] ?? (Component.prototype ? Component.prototype[methodName] : undefined);
                if (Component[methodName]) {
                    // 重写要测试的方法，记录执行时间和参数，并保存到数组中
                    Component[methodName] = function (...methodArgs) {
                        const startTime = window.performance.now();
                        const result = methodCopy[methodName].bind(this)(...methodArgs);
                        const endTime = window.performance.now();
                        // 将执行时间添加到执行记录中
                        Record.execution.push({ methodName, time: (endTime - startTime).toFixed(4) + 'ms' });
                        return result;
                    };
                } else if (Component.prototype && Component.prototype[methodName]) {
                    // 重写要测试的方法，记录执行时间和参数，并保存到数组中
                    Component.prototype[methodName] = function (...methodArgs) {
                        const startTime = window.performance.now();
                        const result = methodCopy[methodName].bind(this)(...methodArgs);
                        const endTime = window.performance.now();
                        // 将执行时间添加到执行记录中
                        Record.execution.push({ methodName, time: (endTime - startTime).toFixed(4) + 'ms' });
                        return result;
                    };
                }
            })

            // 创建组件实例，并将 props 传递给组件
            const container = document.createElement('div');
            container.style.height = '300px';
            container.style.overflow = 'auto';
            const mountStart = Date.now();
            const wrapper = render(<Component {...props} />, {
                container: document.body.appendChild(container),
            });
            const mountEnd = Date.now();
            Record.totalTime = mountEnd - mountStart;
            // 其他操作
            if (afterTest) {
                afterTest(wrapper)
            }
            // 预期执行次数少于 times，执行时间少于 time
            if (times) {
                expect(spy.mock.calls.length).toBeLessThan(times);
            }
            if (time) {
                spy.mock.calls.forEach(item => {
                    expect(item[0]).toBeLessThan(time);
                })
            }
            // 恢复方法原本的实现
            methodNameList.forEach(methodName => {
                if (Component[methodName]) {
                    Component[methodName] = methodCopy[methodName];
                } else if (Component.prototype && Component.prototype[methodName]) {
                    Component.prototype[methodName] = methodCopy[methodName];
                }
            })
            wrapper.unmount();
            document.getElementById('testcontainer')?.remove();
        })
    })
    // 返回所有执行记录
    return Record;
};

describe('after test', () => {
    let resultArr = CopmArray.map(({ compName, Component, props, methodNameList, times, time, afterTest }) => testComponentMethod(
        `${compName} Performance Test`,
        compName,
        Component,
        methodNameList || ['render', 'componentDidMount'],
        props,
        times,
        time,
        afterTest
    ))
    afterAll(() => {
        generateReport(resultArr);
    });
})
