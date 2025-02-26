/**
 *
 * @title 日期可编辑的单元格
 * @parent 编辑 Editor
 * @description 可对单元格进行编辑的表格，示例日期的编辑模式
 */
import {DatePicker, Icon, Input, Table, Tooltip} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

const datetimeFmt = 'YYYY-MM-DD HH:mm:ss'

interface StringEditCellProps {
	value: string;
	onChange: (value: string) => void;
	colName: string;
}

interface StringEditCellState {
	editable: boolean;
	value: string
}

class StringEditCell extends Component<StringEditCellProps, StringEditCellState> {
	editWarp: any
	constructor(props: StringEditCellProps) {
	    super(props)
	    this.state = {
	        value: this.props.value,
	        editable: false
	    }
	    this.editWarp = React.createRef()
	}

	commitChange = () => {
	    if (this.state.value === '') return
	    this.setState({editable: false})
	    if (this.props.onChange) {
	        this.props.onChange(this.state.value)
	    }
	}

	edit = () => {
	    this.setState({editable: true})
	}

	handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = event => {
	    if (event.keyCode == 13) {
	        this.commitChange()
	    }
	}

	handleChange = (val: string) => {
	    if (val === '') this.editWarp.className += ' verify-cell'
	    this.setState({value: val})
	}

	render() {
	    const {value, editable} = this.state
	    return (
	        <div className='editable-cell'>
	            {editable ? (
	                <div
	                    ref={el => (this.editWarp = el)}
	                    className='editable-cell-input-wrapper'
	                >
	                    <Input
	                        className={value ? 'u-form-control' : 'u-form-control error'}
	                        autoFocus
	                        defaultValue={this.props.value}
	                        value={value}
	                        onKeyDown={this.handleKeydown}
	                        onChange={this.handleChange}
	                        onBlur={this.commitChange}
	                    />
	                    {value === '' ? (
	                        <Tooltip
	                            inverse
	                            className='u-editable-table-tp'
	                            placement='bottom'
	                            overlay={
	                                <div className='tp-content'>
	                                    {'请输入' + this.props.colName}
	                                </div>
	                            }
	                        >
	                            <Icon className='uf-exc-t require'/>
	                        </Tooltip>
	                    ) : null}
	                </div>
	            ) : (
	                <div className='editable-cell-text-wrapper' onClick={this.edit}>
	                    {value || ' '}
	                </div>
	            )}
	        </div>
	    )
	}
}


interface DatePickerEditCellProps {
	value: Moment;
	onChange: (value: Moment, dateString: string) => void;
}

interface DatePickerEditCellState {
	editable: boolean;
	value: Moment;
	open?: boolean
}

class DatePickerEditCell extends Component<DatePickerEditCellProps, DatePickerEditCellState> {
	refWarp: any;
	constructor(props: DatePickerEditCellProps) {
	    super(props)
	    this.state = {
	        value: this.props.value,
	        editable: false
	    }
	    this.refWarp = React.createRef();
	}

	handleChange = (value: Moment, dateString: string) => {
	    this.setState({value, editable: false})
	    const {onChange} = this.props
	    onChange && onChange(value, dateString)
	}

	handleOpenChange = (open: boolean) => {
	    if (!open) {
	        this.setState({editable: false, open})
	    }
	}

	edit = () => {
	    this.setState({editable: true})
	}

	render() {
	    const {value, editable, open} = this.state
	    return editable ? (
	        <div className='editable-cell'>
	            <DatePicker
	                ref={el => (this.refWarp = el)}
	                open={open}
	                value={value}
	                showTime
	                autoFocus
	                format={datetimeFmt}
	                onChange={this.handleChange}
	                onOpenChange={this.handleOpenChange}
	                onBlur={() => this.setState({editable: false})}
	            />
	        </div>
	    ) : (
	        <div
	            className='editable-cell-text-wrapper'
	            style={{
	                minHeight: '28px' /* 确保日期被清空后仍可点击 */,
	                lineHeight: '28px'
	            }}
	            onClick={this.edit}
	        >
	            {value?.format?.(datetimeFmt) || ''}
	        </div>
	    )
	}
}


type DataType = {
	a: string;
	b: string;
	c: Moment;
	key: string;
}

let dataSource: DataType[] = [
    {
        a: 'ASVAL_201903280005',
        b: '小张',
        c: moment().add(22, 'days'),
        key: '1'
    },
    {
        a: 'ASVAL_201903200004',
        b: '小明',
        c: moment().subtract(33, 'months'),
        key: '2'
    },
    {
        a: 'ASVAL_201903120002',
        b: '小红',
        c: moment(),
        key: '3'
    }
]

class Demo22 extends Component<{}, {dataSource: DataType[]}> {
	columns: Array<Record<string, any>>
	constructor(props: {}) {
	    super(props)
	    this.columns = [
	        {
	            title: '员工编号',
	            dataIndex: 'a',
	            key: 'a'
	        },
	        {
	            title: '名字',
	            dataIndex: 'b',
	            key: 'b',
	            render: (text: string, _record: any, index: number) => (
	                <StringEditCell
	                    colName='名字'
	                    value={text}
	                    onChange={this.onCellChange(index, 'b')}
	                />
	            )
	        },
	        {
	            title: '时间',
	            dataIndex: 'c',
	            key: 'c',
	            // width: 100,
	            render: (text: Moment, _record: any, index: number) => (
	                <DatePickerEditCell
	                    value={text}
	                    onChange={this.onCellChange(index, 'c')}
	                />
	            )
	        }
	    ]

	    this.state = {
	        dataSource: dataSource
	    }
	}

	onCellChange = (index: number, key: string) => {
	    return (value: any) => {
	        const {dataSource} = this.state
	        dataSource[index][key] = value
	        this.setState({dataSource}, () => console.dir(this.state.dataSource))
	    }
	}

	render() {
	    return (
	        <div className='demo21 u-editable-table'>
	            <Table data={this.state.dataSource} columns={this.columns} syncHover={false}/>
	        </div>
	    )
	}
}

export default Demo22
