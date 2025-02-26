/**
 *
 * @title 高度自适应
 * @description  单元格高度根据父级高度自适应
 *
 */

import { Calendar, Button, Row, Col, DatePicker, Input, Icon } from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';

function onSelect(value: Moment) {
    console.log('onSelect', value);
}
interface DemoState {
    type: string,
    selectType: string,
    selectValues: string[],
    operations: string[],
    strideValue: any,
    startValue: string,
    endValue: string,
    inputVal: string,
    demoFlag: string,
    moreRender: any,
    moreDate: string
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

class Demo33 extends Component <{}, DemoState> {

    constructor(props: {}, context: {}) {
        super(props, context);

        this.state = {
            type: 'date',
            selectType: '休',
            selectValues: [],
            operations: ['lastMonth', 'nextMonth', 'today'],
            strideValue: [
                {startTitleValue: '2024-05-07', titleValue: '2024-05-10', dataFlag: 'calendar5', tex: '日程自定义'},
                {startTitleValue: '2024-05-05', titleValue: '2024-05-08', dataFlag: 'calendar3', tex: '日程自定义'},
                {startTitleValue: '2024-05-09', titleValue: '2024-05-11', dataFlag: 'calendar4', tex: '日程自定义'}
                // {startTitleValue: '2024-05', titleValue: '2024-10', dataFlag: 'calendar5', tex: '日程自定义'},
                // {startTitleValue: '2024-05', titleValue: '2024-06', dataFlag: 'calendar3', tex: '日程自定义'},
                // {startTitleValue: '2024-03', titleValue: '2024-06', dataFlag: 'calendar4', tex: '日程自定义'}
            ],
            startValue: '',
            endValue: '',
            inputVal: '',
            demoFlag: '',
            moreRender: null,
            moreDate: ''
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
        this.setState({
            type: 'month'
        })
    }

    handleDate = () => {
        this.setState({
            type: 'date'
        })
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

    onMouseHandle = (obj: {start: string, end: string, dataFlag: string}) => {
        // callBack(Object.assign(obj, {tex: '日历自定义1'}))
        // Object.assign(obj, {tex: '日历自定义1'})
        // let {strideValue} = this.state
        // let newStrideValue = [...strideValue]
        // newStrideValue.push(obj)
        this.setState({
            startValue: obj.start,
            endValue: obj.end,
            demoFlag: obj.dataFlag,
            inputVal: ''
            // strideValue: newStrideValue
        })
    }

    // 可改变时间的开始时间
    startTimeHandle = (_val: any, v2: string) => {
        this.setState({
            startValue: v2
        })
    }
    endTimeHandle = (_val: any, v2: string) => {
        this.setState({
            endValue: v2
        })
    }

    inputChange = (val: string) => {
        this.setState({
            inputVal: val
        })
    }

    // 自定义modal的body内容
    modalBody = () => {
        let {type} = this.state
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <div style={{textAlign: 'right', paddingRight: '10px'}}><span style={{color: '#e23'}}>*</span>添加主题</div>
                    </Col>
                    <Col span={18}>
                        <Input allowClear onChange={this.inputChange} style={{background: '#fffcea'}} />
                    </Col>
                </Row>
                <Row style={{marginTop: '10px'}}>
                    <Col span={4}>
                        <div style={{textAlign: 'right', paddingRight: '10px'}}><span style={{color: '#e23'}}>*</span>选择时间</div>
                    </Col>
                    <Col span={18}>
                        <div style={{display: 'inline-block', width: '48%'}}>
                            {
                                type === 'month' ? (<DatePicker
                                    picker='month'
                                    format={'YYYY-MM'}
                                    onChange={this.startTimeHandle}
                                    value={this.state.startValue}
                                />) : (<DatePicker
                                    picker='date'
                                    format={'YYYY-MM-DD'}
                                    onChange={this.startTimeHandle}
                                    value={this.state.startValue}
                                />)
                            }
                        </div>
                        {/* <TimePicker onChange={this.startTimeHandle} showSecond={false} value={this.state.startTimeValue} /> */}
                        <span> - </span>
                        {/* <TimePicker onChange={this.endTimeHandle} showSecond={false} value={this.state.endTimeValue} /> */}
                        <div style={{display: 'inline-block', width: '48%'}}>
                            {
                                type === 'month' ? (<DatePicker
                                    picker='month'
                                    format={'YYYY-MM'}
                                    onChange={this.endTimeHandle}
                                    value={this.state.endValue}
                                />) : (<DatePicker
                                    picker='date'
                                    format={'YYYY-MM-DD'}
                                    onChange={this.endTimeHandle}
                                    value={this.state.endValue}
                                />)
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
    modalHeader = () => {
        return '标题'
    }
    // 点击modal 确认按钮的回调，会返回一个callBack，在校验成功后要执行下，以关闭拖拽区（这逻辑没法写到组件内部，只能和业务交互）
    onModalOk = (callback: () => void) => {
        // let newObj: any = {
        //     start: this.state.startValue,
        //     end: this.state.endValue,
        //     content: this.state.inputVal
        // }
        // let newtimeEvents = [...this.state.timeEvents]
        // newtimeEvents.push({...newObj})
        // this.setState({
        //     timeEvents: newtimeEvents
        // })
        let {startValue, endValue, strideValue, inputVal, demoFlag} = this.state
        let newStrideValue = [...strideValue]
        let obj = {startTitleValue: startValue, titleValue: endValue, dataFlag: demoFlag}
        Object.assign(obj, {tex: inputVal})
        newStrideValue.push(obj)
        this.setState({
            strideValue: newStrideValue
        })
        callback() // 校验成功后执行callback，组件内部关闭弹窗及关闭创建的事件
    }

    onMoreEvent = (_e: any, val: {startTitleValue: string, titleValue: string, tex: string}[], date: string) => {
        // console.log('点击更多回调', e, val, date)
        let domNode = (<div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>全部事件</span>
                <span onClick={this.onClose}><Icon type="uf-close" /></span>
            </div>
            <div>
                {
                    val && val.map((item, index) => {
                        return <div key={index}>{index + 1}、{item.tex}</div>
                    })
                }
            </div>
        </div>)
        this.setState({
            moreRender: domNode,
            moreDate: date
        })
    }
    // 点击更多或者每条事件时弹窗的回调
    moreRender = (current: any) => {
        let {moreRender, moreDate, type} = this.state
        // console.log('点击回调弹窗', current.format('YYYY-MM'), moreDate)
        if (type === 'date') {
            if (current.format('YYYY-MM-DD') === moreDate) {
                return moreRender
            } else {
                return false
            }
        } else if (type === 'month') {
            if (current.format('YYYY-MM') === moreDate) {
                return moreRender
            } else {
                return false
            }
        }
    }

    // 点击每条任务的回调
    onCellClick = (_e: any, val: {startTitleValue: string, titleValue: string, tex: string}, date: string) => {
        // console.log('点击每条事件的回调', e, val, date)
        let domNode = (<div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                {/* <span><Icon type="uf-shanchu" /></span> */}
                <span onClick={this.onClose}><Icon type="uf-close" /></span>
            </div>
            <div>
                <span style={{fontWeight: 'bold', paddingLeft: '5px', paddingBottom: '10px'}}>{val.tex}</span>
            </div>
            <div>
                <Row>
                    <Col span={4}><Icon type="uf-time-c-o" /></Col>
                    <Col span={18}><span>{val.startTitleValue}</span> <span>{val.titleValue}</span></Col>
                </Row>
                <Row>
                    <Col span={4}><Icon type="uf-qq" /></Col>
                    <Col span={18}><span>用户名</span></Col>
                </Row>
            </div>
        </div>)
        this.setState({
            moreRender: domNode,
            moreDate: date
        })
    }

    onClose = () => {
        // 关闭的时候将moreDate设置为空就可以，意思是没有任何一天匹配的事件
        this.setState({
            moreDate: ''
        })
    }

    render() {
	    return (
	        <div className="demo14" style={{height: '800px'}}>
                <Button style={{marginLeft: '10px'}} onClick={this.handleNewValue}>月面板</Button>
                <Button style={{marginLeft: '10px'}} onClick={this.handleDate}>日面板</Button>
	            <Calendar
	                operations={this.state.operations}
	                // style={{margin: 10}}
	                fullscreen
	                mutiple
	                fieldid="demo14"
	                onSelect={onSelect}
	                type={this.state.type}
	                onPanelChange={this.onTypeChange}
	                value={[...this.state.selectValues.keys()].map(key => moment(key))}
	                locale='zh-cn'
	                // dateFullCellRender={this.dateCellContentRender}
	                dateCellHeaderReader={this.dateCellHeaderReader}
	                layout='left'
                    getDateCellAttr={this.getDateCellAttr}
                    onCreateEvent = {this.onMouseHandle}
                    // strideValue = {[...this.state.strideValue]}
                    onCellClick = {this.onCellClick}
                    onMoreEvent={this.onMoreEvent}
                    moreRender={this.moreRender}
                    silderModalBody = {this.modalBody()}
                    onModalOk={this.onModalOk}
                    silderModalHeader = {this.modalHeader()}
                    isDragEvent={false}
                    fillSpace={true}
                    cellAdaptHeight={true}
	            />
	        </div>
	    )
    }
}

export default Demo33