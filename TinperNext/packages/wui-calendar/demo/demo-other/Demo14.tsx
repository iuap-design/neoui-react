/**
 *
 * @title 多选模式 预置快捷选项
 * @description  快捷选项设置及备注事项
 *
 */

import { Calendar, Button } from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';

function onSelect(value: Moment) {
    console.log('onSelect', value);
}
interface DemoState {
    type: string,
    selectType: string,
    selectValues: string[],
    operations: string[]
}

const listDataArr = [
    {
        '2022-09-20': [
            {code: 'xx01', content: '重型机械维修组织'},
            {code: 'xx02', content: '轻型机械维修组织'},
            {code: 'xx03', content: '高危机械维修组织'},
            {code: 'xx04', content: '机械维修组织'}
        ]
    },
    {
        '2022-09-25': [
            {code: 'xx01', content: '重型机械维修组织'},
            {code: 'xx02', content: '轻型机械维修组织'}
        ]
    },
    {
        '2022-09-26': [
            {code: 'xx01', content: '重型机械维修组织'}
        ]
    }
]

class Demo14 extends Component <{}, DemoState> {

    constructor(props: {}, context: {}) {
        super(props, context);

        this.state = {
            type: 'date',
            selectType: '休',
            selectValues: [],
            operations: ['lastMonth', 'nextMonth', 'today']
        }
    }

    componentDidMount = () => {
        this.getNewValue();
    }

    onTypeChange = (type: string) => {
        this.setState({
            type,
        });
    }

    getNewValue = () => {
        let listDataObj;
        let selectVal = [];
        for (let j = 0; j < listDataArr.length; j++) {
            listDataObj = listDataArr[j];
            selectVal.push(Object.keys(listDataObj)[0])
        }
        this.setState({ selectValues: selectVal})
    }

    handleNewValue = () => {
        this.getNewValue()

        listDataArr[0]["2022-09-20"]?.push({code: 'xx', content: '新增机械维修组织'})
        listDataArr[1]["2022-09-25"]?.push({code: 'xx', content: '新增机械维修组织'})
        listDataArr[2]["2022-09-26"]?.push({code: 'xx', content: '新增机械维修组织'})
    }

    dateCellContentRender = (current: Moment, _values: Moment[]) => {
	    const {selectValues} = this.state;
        if (selectValues.length !== 0) {
            return (
                <ul className="show-remarks">
                    {listDataArr.map((item, index) => {
                        let contentArr = item[selectValues[index]]
                        if (current.format('YYYY-MM-DD') == selectValues[index]) {
                            return (
                                <div key={index}>
                                    {contentArr.length >= 1 && <li>{contentArr[0].content}</li>}
                                    {contentArr.length >= 2 && <li>{contentArr[1].content}</li>}
                                    {contentArr.length > 2 && <li onClick={this.getMore}>还有{contentArr.length - 2}项</li>}
                                </div>
                            )
                        }
                    })}
                </ul>
            )
        }
        return null
    }
    dateCellHeaderReader = (current: Moment, _values: Moment[], headerChilds: (React.ReactElement)[]) => {
        let text = '';
        if (current.weekday() === 5 || current.weekday() === 6) {
            text = '休'
        }
        headerChilds.shift();
        text && headerChilds.push(<span key={current.format('YYYY-MM-DD') + '_' + text} style={{marginLeft: '5px'}}>{text}</span>)
        return headerChilds
    }

    onClick = (current: Moment) => {
        console.log('onClick', current)
    }

    getMore = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        console.log('getMore')
    }

    getDateCellAttr = (current: Moment, _value: Moment) => {
        const {selectValues} = this.state
        for (let i = 0; i < selectValues.length; i++) {
            if (current.format('YYYY-MM-DD') == this.state.selectValues[i]) {
                return {
                    className: 'remarks',
                    onClick: this.onClick.bind(null, current)
                }
            }
        }
        return {
            onClick: this.onClick.bind(null, current)
        }
    }

    render() {
	    return (
	        <div className="demo14">
                <Button style={{marginLeft: '10px'}} onClick={this.handleNewValue}>数据刷新</Button>
	            <Calendar
	                operations={this.state.operations}
	                style={{margin: 10}}
	                fullscreen
	                mutiple
	                fieldid="demo14"
	                onSelect={onSelect}
	                type={this.state.type}
	                onPanelChange={this.onTypeChange}
	                value={[...this.state.selectValues.keys()].map(key => moment(key))}
	                locale='zh-cn'
	                dateFullCellRender={this.dateCellContentRender}
	                dateCellHeaderReader={this.dateCellHeaderReader}
	                layout='left'
                    getDateCellAttr={this.getDateCellAttr}
	            />
	        </div>
	    )
    }
}

export default Demo14