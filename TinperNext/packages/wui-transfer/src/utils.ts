import { ReOrder, Move, TransferItem, TransferKeyType, DragSource } from "./iTransfer";

/**
 * a little function to help us with reordering the result
 * @param {*} list
 * @param {*} targetKeys
 * @param {*} startIndex
 * @param {*} endIndex
 */
const reorder = (list: TransferItem[], targetKeys: TransferKeyType[], startIndex: number, endIndex: number) => {
    const result1:TransferItem[] = Array.from(list);
    const [removed1] = result1.splice(startIndex, 1);
    result1.splice(endIndex, 0, removed1);

    const result2:TransferKeyType[] = Array.from(targetKeys);
    const [removed2] = result2.splice(startIndex, 1);
    result2.splice(endIndex, 0, removed2);

    const result: ReOrder = {};
    result.dataArr = result1;
    result.targetKeyArr = result2;

    return result;
};

/**
 * Moves an item from one list to another list.
 * @param {*} source
 * @param {*} destination
 * @param {*} droppableSource
 * @param {*} droppableDestination
 * @param {*} targetKeys
 */
const move = (source: TransferItem[], destination: TransferItem[], droppableSource: DragSource, droppableDestination: DragSource, targetKeys: TransferKeyType[]) => {
    const sourceClone: TransferItem[] = Array.from(source);
    const destClone: TransferItem[] = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);
    targetKeys.splice(droppableDestination.index, 0, removed.key);

    const result: Move = {};
    result[droppableSource.droppableId as 'droppable1'] = sourceClone;
    result[droppableDestination.droppableId as 'droppable2'] = destClone;
    result.newTargetKeys = targetKeys;
    return result;
};

export {reorder, move}
