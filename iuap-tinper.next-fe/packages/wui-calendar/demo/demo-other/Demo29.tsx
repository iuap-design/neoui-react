/**
 *
 * @title 自定义头部内容
 * @description  自定义头部右肩内容（使用已有api headerRender实现，需自定控制样式显示在右侧）、disabledHoverStyle控制默认hover样式禁用
 *
 */

import {Button, Calendar, Col, Row, Select, Input} from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';

const {Option} = Select;

function onSelect(value: Moment) {
    console.log('onSelect', value);
}
interface DemoState {
    type: string,
    selectType: string,
    isEdit: boolean,
    selectValues: Map<string, string>,
    initAlreadyChanged: Map<string, string>
}
class Demo29 extends Component <{}, DemoState> {

    constructor(props: {}, context: {}) {
        super(props, context);

        this.state = {
            type: 'date',
            selectType: '休',
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
	        isEdit: !this.state.isEdit
	    })
	}

	render() {
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
	                allowLunar
	                fullscreen
	                mutiple
	                fieldid="demo5"
	                sidebar={false}
	                onSelect={onSelect}
	                type={this.state.type}
	                // disabledDate="beforeCurrentDate"
	                onPanelChange={this.onTypeChange}
	                onChange={this.onChange}
	                value={[...this.state.selectValues.keys()].map(key => moment(key))}
	                locale='zh-cn'
	                headerRender={() => <div style={{float: 'right', marginRight: '10px'}}>
	                    <span style={{marginRight: '8px'}}><Button>创建</Button></span>
	                    <span style={{display: 'inline-block'}}><Input /></span>
	                </div>}
	                dateFullCellRender={this.dateCellContentRender}
	                dateCellHeaderReader={this.dateCellHeaderReader}
	                disabledHoverStyle={true}
	            />
	        </div>
	    )
	}
}

export default Demo29
