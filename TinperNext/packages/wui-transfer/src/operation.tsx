// import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../wui-icon/src';
import { OperationProps, OperationState } from './iTransfer'

function noop() {
}

// const propTypes = {
//     className: PropTypes.string,
//     leftArrowText: PropTypes.string,
//     rightArrowText: PropTypes.string,
//     moveToLeft: PropTypes.func,
//     moveToRight: PropTypes.func,
//     allMoveToLeft: PropTypes.func,
//     allMoveToRight: PropTypes.func,
//     renderOperation: PropTypes.func,
//     leftActive: PropTypes.boolean,
//     rightActive: PropTypes.boolean,
//     fieldid: PropTypes.string
// }

const defaultProps = {
    leftArrowText: '',
    rightArrowText: '',
    moveToLeft: noop,
    moveToRight: noop,
};

class TransferOperation extends React.Component<OperationProps, OperationState> {
    static defaultProps = {...defaultProps}

    // 获取Operations 配置，兼容string[] & object 类型
    getOperations = () => {
        const {operations} = this.props;
        let newOperations: OperationProps['operations'] = {};
        let buttonType = [];
        if (Array.isArray(operations)) {
            operations.forEach(op => {
                newOperations[op] = {text: ''}
            });
            buttonType = operations;
            return {newOperations, buttonType};
        }
        newOperations = operations!;
        buttonType = Object.keys(operations!);
        return {newOperations, buttonType};
    }

    getSortOperations = () => {
        const {
            moveToLeft,
            moveToRight,
            allMoveToLeft,
            allMoveToRight,
            operations,
            leftActive,
            rightActive,
            allLeftActive,
            allRightActive,
            fieldid
        } = this.props;

        const leftButtonfieldidProp = fieldid ? { fieldid: `${fieldid}_transfer-operation_left` } : {}
        const rightButtonfieldidProp = fieldid ? { fieldid: `${fieldid}_transfer-operation_right` } : {}

        // 兼容之前左右移动按钮文本 例如operations = ['向左', '向右'];
        const rightArrowText = operations && Array.isArray(operations) && operations.length === 2 && !['rightAll', 'rightOne', 'leftAll', 'leftOne'].includes(operations[0]) ? operations[0] : '';
        const leftArrowText = operations && Array.isArray(operations) && operations.length === 2 && !['rightAll', 'rightOne', 'leftAll', 'leftOne'].includes(operations[1]) ? operations[1] : '';

        // 如果不是之前的operations 类型（operations = ['向左', '向右']），采用的最新的OperationsType类型
        let newOperations: OperationProps['operations'] | null = null;
        let buttonType = ['rightAll', 'rightOne', 'leftAll', 'leftOne'];
        if (!rightArrowText && !leftArrowText && typeof operations === 'object') {
            let obj = this.getOperations();
            newOperations = obj.newOperations;
            buttonType = obj.buttonType;
        }

        const allMoveToRightButton = buttonType.includes('rightAll') && (
            <button disabled={!allRightActive} onClick={allMoveToRight} fieldid={fieldid ? `${fieldid}_transfer-operation_all_right` : undefined}>
                {<span>{newOperations?.rightAll?.text}<Icon type={"uf-2arrow-right"}/></span>}
            </button>
        );
        const moveToLeftButton = buttonType.includes('leftOne') && (
            <button disabled={!leftActive} onClick={moveToLeft} {...leftButtonfieldidProp}>
                {<span><Icon type={ "uf-arrow-left"}/>{leftArrowText || newOperations?.leftOne?.text}</span>}
            </button>
        );
        const moveToRightButton = buttonType.includes('rightOne') && (
            <button disabled={!rightActive} onClick={moveToRight} {...rightButtonfieldidProp}>
                {<span>{rightArrowText || newOperations?.rightOne?.text}<Icon type={ "uf-arrow-right"}/></span>}
            </button>
        );
        const allMoveToLeftButton = buttonType.includes('leftAll') && (
            <button disabled={!allLeftActive} onClick={allMoveToLeft} fieldid={fieldid ? `${fieldid}_transfer-operation_all_left` : undefined}>
                {<span><Icon type={ "uf-2arrow-left"}/>{newOperations?.leftAll?.text}</span>}
            </button>
        );

        let filtrationArr = [
            {type: 'rightAll', content: allMoveToRightButton, index: newOperations?.rightAll?.index},
            {type: 'leftOne', content: moveToLeftButton, index: newOperations?.leftOne?.index},
            {type: 'rightOne', content: moveToRightButton, index: newOperations?.rightOne?.index},
            {type: 'leftAll', content: allMoveToLeftButton, index: newOperations?.leftAll?.index},
        ]
        let filtrationArr1 = filtrationArr.filter(item => item.index === undefined)
        let filtrationArr2 = filtrationArr.filter(item => item.index !== undefined)
        filtrationArr2 && filtrationArr2?.length > 0 && filtrationArr2.sort((a, b) => {
            return (a?.index as number) - (b?.index as number)
        })
        let zhArr = [...filtrationArr2, ...filtrationArr1]
        let domArr: any[] = []
        zhArr.forEach(item => {
            domArr.push(item.content)
        })
        return Array.isArray(operations) ? [allMoveToRightButton, moveToLeftButton, moveToRightButton, allMoveToLeftButton] : typeof operations === 'object' ? domArr : []
    }

    render() {
        const {
            className,
            renderOperation
        } = this.props;

        // const leftButtonfieldidProp = fieldid ? { fieldid: `${fieldid}_transfer-operation_left` } : {}
        // const rightButtonfieldidProp = fieldid ? { fieldid: `${fieldid}_transfer-operation_right` } : {}

        // // 兼容之前左右移动按钮文本 例如operations = ['向左', '向右'];
        // const rightArrowText = operations && Array.isArray(operations) && operations.length === 2 && !['rightAll', 'rightOne', 'leftAll', 'leftOne'].includes(operations[0]) ? operations[0] : '';
        // const leftArrowText = operations && Array.isArray(operations) && operations.length === 2 && !['rightAll', 'rightOne', 'leftAll', 'leftOne'].includes(operations[1]) ? operations[1] : '';

        // // 如果不是之前的operations 类型（operations = ['向左', '向右']），采用的最新的OperationsType类型
        // let newOperations: OperationProps['operations'] | null = null;
        // let buttonType = ['rightAll', 'rightOne', 'leftAll', 'leftOne'];
        // if (!rightArrowText && !leftArrowText && typeof operations === 'object') {
        //     let obj = this.getOperations();
        //     newOperations = obj.newOperations;
        //     buttonType = obj.buttonType;
        // }

        // const allMoveToRightButton = buttonType.includes('rightAll') && (
        //     <button disabled={!allRightActive} onClick={allMoveToRight} fieldid={fieldid ? `${fieldid}_transfer-operation_all_right` : undefined}>
        //         {<span>{newOperations?.rightAll?.text}<Icon type="uf-2arrow-right"/></span>}
        //     </button>
        // );
        // const moveToLeftButton = buttonType.includes('leftOne') && (
        //     <button disabled={!leftActive} onClick={moveToLeft} {...leftButtonfieldidProp}>
        //         {<span><Icon type="uf-arrow-left"/>{leftArrowText || newOperations?.leftOne?.text}</span>}
        //     </button>
        // );
        // const moveToRightButton = buttonType.includes('rightOne') && (
        //     <button disabled={!rightActive} onClick={moveToRight} {...rightButtonfieldidProp}>
        //         {<span>{rightArrowText || newOperations?.rightOne?.text}<Icon type="uf-arrow-right"/></span>}
        //     </button>
        // );
        // const allMoveToLeftButton = buttonType.includes('leftAll') && (
        //     <button disabled={!allLeftActive} onClick={allMoveToLeft} fieldid={fieldid ? `${fieldid}_transfer-operation_all_left` : undefined}>
        //         {<span><Icon type="uf-2arrow-left"/>{newOperations?.leftAll?.text}</span>}
        //     </button>
        // );

        return (
            <div className={className}>
                <>
                    {this.getSortOperations()}
                    {/* {allMoveToRightButton}
                    {moveToLeftButton}
                    {moveToRightButton}
                    {allMoveToLeftButton} */}
                    {renderOperation && renderOperation()}
                </>
            </div>
        );
    }
}

// TransferOperation.propTypes = propTypes;
// TransferOperation.defaultProps = defaultProps;
export default TransferOperation;
