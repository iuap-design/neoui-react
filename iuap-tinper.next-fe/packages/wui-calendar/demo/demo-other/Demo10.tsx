/**
 *
 * @title 快选模式
 * @description  同时在竖选onQuickSelect中可以自定义 选取规则。
 *
 */

import {Button, Calendar, Col, Row, Select} from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';

const {Option} = Select;

function onSelect(value: Moment) {
    console.log('onSelect', value);
}
interface DemoState {
    type: string;
    selectType: string;
    isEdit: boolean;
    quickSelect: boolean;
    selectValues: Map<string, string>;
    initAlreadyChanged: Map<string, string>;
}
class Demo10 extends Component <{}, DemoState> {

    constructor(props: {}, context: {}) {
        super(props, context);

        this.state = {
            type: 'date',
            selectType: '休',
            quickSelect: false,
            isEdit: false,
            selectValues: new Map(),
            initAlreadyChanged: new Map([['2022-03-30', '休']])
        }
    }

    onTypeChange = (type: string) => {
        this.setState({
            type,
        });
    }

	onChange = (value: Moment, flag: boolean, values: string[]) => {
	    console.log('onChange', values)
	    const {selectValues, selectType} = this.state;
	    if (flag === undefined || flag === null) return;
	    if (flag || selectValues.get(value.format('YYYY-MM-DD')) !== selectType) {
	        selectValues.set(value.format('YYYY-MM-DD'), selectType);
	    } else {
	        selectValues.delete(value.format('YYYY-MM-DD'));
	    }
	    return this.setState({selectValues: selectValues})
	}
	onQuickSelect = ({changeValues, isChecked}: {
	// onQuickSelect = ({changeValues, isChecked, value, direction}: {
        changeValues: string[];
        isChecked: boolean;
        value: Map<string, boolean>;
        direction: "horizontal" | "vertical";
    }) => {
	    const {selectValues, selectType} = this.state;
	    if (!changeValues?.length) return;
	    if (isChecked === undefined || isChecked === null) return;
	    let changeValues1 = changeValues;
	    // 此处可控制 竖选择的规则
	    // if (direction === 'vertical') {
	    //     changeValues1 = changeValues.filter(v => moment(v).isBefore('2022-09-16'));
	    //     if (changeValues1.every(date => value.get(date) === true)) {
	    //         isChecked = false;
	    //     }
	    // }
	    changeValues1.forEach(date => {
	        if (selectValues.get(date) === selectType) {

	        }
	        if (isChecked || selectValues.get(date) !== selectType) {
	            selectValues.set(date, selectType);
	        } else {
	            selectValues.delete(date);
	        }
	    })
	    return this.setState({selectValues: selectValues})
	}
	dateCellContentRender = (current: Moment, _values: Moment[]) => {
	    let content = '';
	    const {isEdit, selectValues, initAlreadyChanged} = this.state;
	    const isChecked = selectValues.has(current.format('YYYY-MM-DD'));

	    if (this.state.isEdit) {
	        if (current.weekday() === 5 || current.weekday() === 6) {
	            content = '休'
	        }
	        if (current.isSame(moment('2022-03-13'), 'day')) {
	            content = '班'
	        }
	        content = selectValues.get(current.format('YYYY-MM-DD')) || content;

	    } else {
	        content = selectValues.get(current.format('YYYY-MM-DD')) || content;

	    }
	    if (isChecked) {
	        return (
	            <div className="show-words"
	                style={{backgroundColor: content === '班' ? '#e5edfc' : '#FDE8E9'}}>
	                {isEdit && content && <span>调整为</span>}
	                {isEdit && (content === '休' ? '休息日' : content === '班' ? '工作日' : '')}
	            </div>)
	    }
	    content = initAlreadyChanged.get(current.format('YYYY-MM-DD')) || content;
	    if (initAlreadyChanged.get(current.format('YYYY-MM-DD')) && !isEdit) {
	        return <div className="show-words"
	            style={{backgroundColor: content === '班' ? '#e5edfc' : '#FDE8E9'}}>
	            {content === '休' ? '休息日' : content === '班' ? '工作日' : ''}
	        </div>
	    }
	    return null
	}
    dateCellHeaderReader = (current: Moment, _values: Moment[], headerChilds: (React.ReactElement)[]) => {
        const {initAlreadyChanged, isEdit, selectValues} = this.state;
        let text = '';
        if (current.weekday() === 5 || current.weekday() === 6) {
            text = '休'
        }

        text = initAlreadyChanged.get(current.format('YYYY-MM-DD')) || text;

        if (!isEdit) {
            // 浏览态 不显示CheckBox
            headerChilds.shift();
            text = selectValues.get(current.format('YYYY-MM-DD')) || text;
        }
        text && headerChilds.push(<span key={current.format('YYYY-MM-DD') + "_" + text} style={{marginLeft: '5px'}}>{text}</span>)
        return headerChilds
    }

	handleSelectChange = (value: string) => {
	    this.setState({
	        selectType: value
	    })
	}

	saveCal = () => {
	    this.setState({
	        isEdit: !this.state.isEdit,
	        quickSelect: !this.state.quickSelect
	    })
	}

	render() {
	    const {quickSelect} = this.state;
	    return (
	        <div>
	            <Row style={{paddingLeft: '34px'}}>
	                <Col span={3}>
	                    <div className='text-type'>调节类型</div>
	                </Col>
	                <Col span={4}>
	                    <div className='gray'>
	                        <Select value={this.state.selectType} onChange={this.handleSelectChange}>
	                            <Option value="休">休息日</Option>
	                            <Option value="班">工作日</Option>
	                        </Select>
	                    </div>
	                </Col>
	                <Col style={{paddingLeft: '28px'}} span={4}>
	                    <div className='gray'><Button onClick={this.saveCal}> 编辑 / 保存 </Button></div>
	                </Col>
	            </Row>
	            <Calendar
	                style={{margin: 10}}
	                fullscreen
	                mutiple
	                fieldid="demo10"
	                onSelect={onSelect}
	                type={this.state.type}
	                // disabledDate="beforeCurrentDate"
	                onPanelChange={this.onTypeChange}
	                onChange={this.onChange}
	                quickSelect={quickSelect}
	                value={[...this.state.selectValues.keys()].map(key => moment(key))}
	                locale='zh-cn'
	                onQuickSelect={this.onQuickSelect}
	                dateFullCellRender={this.dateCellContentRender}
	                dateCellHeaderReader={this.dateCellHeaderReader}

	            />
	        </div>
	    )
	}
}

export default Demo10
