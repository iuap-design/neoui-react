/**
 *
 * @title 月面板事件及样式
 * @description  月面板多事件、单事件点击提醒，及样式。
 *
 */

import {Button, Calendar, Col, Row, Popover } from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';

interface DemoState {
    type: string,
    selectType: string,
    isEdit: boolean,
    selectValues: Map<string, string>,
    initAlreadyChanged: Map<string, string>,
	weekStart: number,
    messageArr: Record<string, any>
}
const colorArr = ['#616AE5', '#E14C46', '#FF8800', '#05D5B9', '#D135D1', '#16C0FE']
class Demo23 extends Component <{}, DemoState> {

    constructor(props: {}, context: {}) {
        super(props, context);

        this.state = {
            type: 'date',
            selectType: '休',
            isEdit: false,
            selectValues: new Map(),
            initAlreadyChanged: new Map([['2022-03-30', '休']]),
            weekStart: 0,
            messageArr: [
                {date: moment(new Date()).format('YYYY-MM-DD'), content: '今天第一件事'},
                {date: moment(new Date()).add(2, 'days').format('YYYY-MM-DD'), content: '另一天事件'},
                {date: moment(new Date()).add(2, 'days').format('YYYY-MM-DD'), content: '超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容'},
                {date: moment(new Date()).add(2, 'days').format('YYYY-MM-DD'), content: '另一天第三件事'},
            ]
        }
    }

    onTypeChange = (type: string) => {
        this.setState({
            type,
        });
    }
	onChange = (value: Moment, flag: boolean, _values: string[]) => {
	    const {selectValues, selectType} = this.state;
	    if (flag === undefined || flag === null) return;
	    if (flag || selectValues.get(value.format('YYYY-MM-DD')) !== selectType) {
	        selectValues.set(value.format('YYYY-MM-DD'), selectType);
	    } else {
	        selectValues.delete(value.format('YYYY-MM-DD'));
	    }
	    return this.setState({selectValues: selectValues})
	}

    onInput: any = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }
    popClick: any = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }
    intoMessage = (val: string, val2: string) => {
        let mesArr = this.state.messageArr
        if (val2) {
            mesArr.push({date: val, content: val2})
            this.setState({
                messageArr: mesArr
            })
        }
    }
    getNum = () => {
        let num = Math.round(Math.random() * 5)
        return num
    }
	dateCellContentRender = (current: Moment, _values: Moment[]) => {
	    // const {selectValues} = this.state;
	    // const isChecked = selectValues.has(current.format('YYYY-MM-DD'));
	    // let checkDate1 = _values?.length > 0 ? _values[_values?.length - 1] : new Date()
	    // let checkDate = moment(checkDate1).year() + '-' + ((moment(checkDate1).month() + 1 < 10) ? '0' + (moment(checkDate1).month() + 1) : moment(checkDate1).month() + 1) + '-' + (moment(checkDate1).date() < 10 ? '0' + moment(checkDate1).date() : moment(checkDate1).date())
	    // 编辑态，并且选择了某个单元格的时候显示input框，以输入事件，并把输入的值放到状态里从新渲染单元格内的内容
	    // if (isChecked && checkDate === current.format('YYYY-MM-DD')) {
	    //     return (
	    //         <div className="show-words" style={{paddingRight: '8px'}}>
	    //             <Input onClick={this.onInput} onBlur={this.intoMessage.bind(this, checkDate)} />
	    //         </div>)
	    // }
	    let mesArr = this.state.messageArr
	    let xinDom: any[] = []
	    let allDom: any[] = []
	    let changArr: any[] = [] // 当切换日期录入事件是新的记录数组
	    mesArr.forEach((item: {date: string, content: string}) => {
	        if (item.date == current.format('YYYY-MM-DD')) {
	            changArr.push({date: item.date, content: item.content})
	            let content = (<>
	                <div><span>时间：</span><span>{item.date}</span></div>
	                <div><span>内容：</span><span title={item.content}>{item.content}</span></div>
	            </>)
	            xinDom.push(<div onClick={this.popClick}><Popover overlayStyle={{maxWidth: '400px'}} placement="bottomLeft" trigger={'click'} title={<div>{item.date}</div>} content={content}><span style={{display: 'inline-block', width: '6px', height: '6px', borderRadius: '3px', background: colorArr[this.getNum()], margin: '0 4px'}}></span></Popover><span title={item.content} style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'inline-block', width: 'calc(100% - 25px)', verticalAlign: 'bottom'}}>{item.content}</span></div>)
	            let newmoreDom = []
	            if (xinDom?.length > 0) { // 单元格放不下事件是显示“还有多少项”
	                let content1 = (<>
	                    <div><span>时间：</span><span>{item.date}</span></div>
	                    <div><span>内容：</span><span title={item.content}>{item.content}</span></div>
	                </>)
	                allDom.push(<div onClick={this.popClick}><Popover overlayStyle={{maxWidth: '400px'}} placement="bottomLeft" trigger={'click'} title={<div>{item.date}</div>} content={content1}><span style={{display: 'inline-block', width: '6px', height: '6px', borderRadius: '3px', background: colorArr[this.getNum()], margin: '0 4px'}}></span></Popover><span title={item.content} style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'inline-block', width: 'calc(100% - 25px)', verticalAlign: 'bottom'}}>{item.content}</span></div>)
	                let allContent = allDom
	                // xinDom.push(<div onClick={this.popClick}><Popover trigger={'click'} title={<div>{item.date}</div>} content={allContent}><span style={{marginLeft: '8px'}} onClick={this.onClickCell}>还有{allContent?.length - 1}项</span></Popover></div>)
	                let content = (<>
	                    <div><span>时间：</span><span>{changArr[0].date}</span></div>
	                    <div><span>内容：</span><span title={changArr[0].content}>{changArr[0].content}</span></div>
	                </>)
	                newmoreDom.push(<div onClick={this.popClick}><Popover overlayStyle={{maxWidth: '400px'}} placement="bottomLeft" trigger={'click'} title={<div>{changArr[0].date}</div>} content={content}><span style={{display: 'inline-block', width: '6px', height: '6px', borderRadius: '3px', background: colorArr[this.getNum()], margin: '0 4px'}}></span></Popover><span title={changArr[0].content} style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'inline-block', width: 'calc(100% - 25px)', verticalAlign: 'bottom'}}>{changArr[0].content}</span></div>)
	                if (xinDom?.length != 1) {
	                    newmoreDom.push(<div onClick={this.popClick}><Popover overlayStyle={{maxWidth: '400px'}} placement="bottomLeft" trigger={'click'} title={<div>{item.date}</div>} content={allContent}><span style={{marginLeft: '14px', color: '#999'}}>全部展示</span></Popover></div>)
	                }
	                xinDom = newmoreDom
	            }
	        }
	    })
	    return xinDom
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
	                <Col span={4}>
	                    <div className='gray'><Button onClick={this.saveCal}> 编辑 / 保存 </Button></div>
	                </Col>
	            </Row>
	            <Calendar
	                style={{margin: 10}}
	                fullscreen
	                mutiple
	                type={this.state.type}
	                onPanelChange={this.onTypeChange}
	                onChange={this.onChange}
	                value={[...this.state.selectValues.keys()].map(key => moment(key))}
	                locale='zh-cn'
	                dateFullCellRender={this.dateCellContentRender as any}
	                dateCellHeaderReader={this.dateCellHeaderReader}
	                weekStartsOn={this.state.weekStart}
	            />
	        </div>
	    )
	}
}

export default Demo23
