/**
 *
 * @title 可编辑表格的日期
 * @parent 编辑 Editor
 * @description 对日期等数据进行编辑
 */
import {Button, DatePicker, Icon, Input, Table, Tooltip} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

const datetimeFmt = 'YYYY-MM-DD'

interface StringEditCellProps {
	onChange: (value: string) => void;
	throwError: (err: boolean) => void;
	editable: boolean;
	required: boolean;
	colName: string;
	isEdited: boolean,
	value: string
}

class StringEditCell extends Component<StringEditCellProps, {value: string}> {
    constructor(props: StringEditCellProps | Readonly<StringEditCellProps>) {
        super(props)
        this.state = {
            value: props.value
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: { editable: boolean; value: string; }) {
        if (!nextProps.editable) {
            this.setState({value: nextProps.value})
        }
    }

	handleChange = (value: string) => {
	    const {onChange, throwError} = this.props
	    if (value === '') {
	        throwError && throwError(true)
	    } else {
	        throwError && throwError(false)
	    }
	    this.setState({value})
	    onChange && onChange(value)
	}

	render() {
	    const {editable, required, colName, isEdited} = this.props
	    const {value} = this.state
	    let cls = 'editable-cell-input-wrapper'
	    if (required) cls += ' required'
	    if (value === '') cls += ' verify-cell'
	    if (isEdited) cls += ' edited'
	    return editable ? (
	        <div className='editable-cell'>
	            <div className={cls}>
	                <Input
	                    className={value ?? (!value && 'error')}
	                    style={{
	                        width: '70%'
	                    }}
	                    value={value}
	                    onChange={this.handleChange}
	                />
	                <span className='error'>
	                    {value === '' ? (
	                        <Tooltip
	                            inverse
	                            className='u-editable-table-tp'
	                            placement='bottom'
	                            overlay={<div className='tp-content'>{'请输入' + colName}</div>}
	                        >
	                            <Icon className='uf-exc-t required-icon'/>
	                        </Tooltip>
	                    ) : null}
	                </span>
	            </div>
	        </div>
	    ) : (
	        value || ' '
	    )
	}
}

interface DatePickerEditCellProps {
	onChange: (value: Moment, str: string) => void;
	throwError?: (err: boolean) => void;
	editable: boolean;
	required?: boolean;
	colName?: string;
	isEdited: boolean;
	value?: Moment;
	open?: boolean;
}

class DatePickerEditCell extends Component<DatePickerEditCellProps, {open: boolean; value?: Moment}> {
    constructor(props: DatePickerEditCellProps) {
        super(props)
        this.state = {
            open: !!props.open,
            value: props.value
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: DatePickerEditCellProps) {
        if ('value' in nextProps && !nextProps.editable) {
            this.setState({value: nextProps.value})
        }
    }

	handleOpenChange = (open: boolean) => {
	    this.setState({open})
	}

	handleChange = (value: Moment, stringValue: string) => {
	    console.log(value, stringValue)
	    this.setState({value})
	    this.props.onChange && this.props.onChange(value, stringValue)
	}

	render() {
	    const {editable, isEdited} = this.props
	    const {value, open} = this.state
	    let cls = 'editable-cell-input-wrapper'
	    if (isEdited) cls += ' edited'
	    return editable ? (
	        <div className='editable-cell'>
	            <div className={cls}>
	                <DatePicker
	                    open={open}
	                    onOpenChange={this.handleOpenChange}
	                    defaultValue={value}
	                    format={datetimeFmt}
	                    onChange={this.handleChange} // 注意：此处为change事件
	                />
	            </div>
	        </div>
	    ) : (
	        (value && value?.format(datetimeFmt)) || ''
	    )
	}
}

type DataType = {
	a: string;
	b: string;
	c: Moment;
	key: string;
	isEdited?: Record<string, any>
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

interface DemoState {
	dataSource: DataType[];
	isEditingAll: boolean;
	errorEditFlag: boolean;
}

class Demo21 extends Component<{}, DemoState> {
	columns: Array<Record<string, any>>
	dataBuffer: DataType[]
	constructor(props: {}) {
	    super(props)
	    this.state = {
	        dataSource,
	        isEditingAll: false,
	        errorEditFlag: false
	    }

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
	            width: 150,
	            render: (text: string, record: any, index: number) => (
	                <StringEditCell
	                    colName={'名字'}
	                    editable={this.state.isEditingAll}
	                    isEdited={record.isEdited.b || false}
	                    required
	                    value={text}
	                    onChange={this.onCellChange(index, 'b')}
	                    throwError={this.throwError}
	                />
	            )
	        },
	        {
	            title: '出生时间',
	            dataIndex: 'c',
	            key: 'c',
	            width: 200,
	            render: (text: Moment, record: any, index: number) => (
	                <DatePickerEditCell
	                    editable={this.state.isEditingAll}
	                    isEdited={record.isEdited.c || false}
	                    value={text}
	                    onChange={this.onCellChange(index, 'c')}
	                />
	            )
	        },
	        // 只是用来占位占宽度的
	        {
	            key: 'placeholder'
	        }
	    ]

	    // 用于记录数据是否被修改
	    dataSource.forEach(item => (item.isEdited = {}))
	    // 用于记录编辑前数据
	    this.dataBuffer = []
	}

	edit = () => {
	    this.dataBuffer = []
	    // 最好使用深复制
	    this.state.dataSource.forEach((item: DataType) => {
	        this.dataBuffer.push({...item})
	    })
	    this.setState({isEditingAll: true})
	}

	abortEdit = () => {
	    let originData = [...this.state.dataSource]
	    originData.forEach(item => (item.isEdited = {}))
	    this.setState({
	        isEditingAll: false,
	        dataSource: originData
	    })
	}

	commitChange = () => {
	    if (this.state.errorEditFlag) return
	    const newData = this.dataBuffer.map((item: any) => {
	        return Object.assign({}, item, {isEdited: {}})
	    })
	    this.setState({isEditingAll: false, dataSource: newData})
	}

	onCellChange = (index: string | number, key: string) => (value: any) => {
	    this.dataBuffer[index][key] = value
	    this.dataBuffer[index].isEdited[key] = true
	}

	throwError = (isError: boolean) => {
	    if (isError !== this.state.errorEditFlag)
	        this.setState({errorEditFlag: isError})
	}

	render() {
	    const {dataSource, isEditingAll} = this.state
	    const columns = this.columns
	    return (
	        <div className='demo20 u-editable-table'>
	            <div className='toolbar-btns'>
	                {isEditingAll ? (
	                    <React.Fragment>
	                        <Button colors='primary' onClick={this.commitChange}>
								确定
	                        </Button>
	                        <Button bordered onClick={this.abortEdit}>
								取消
	                        </Button>
	                    </React.Fragment>
	                ) : (
	                    <Button colors='secondary' onClick={this.edit}>
							编辑全表
	                    </Button>
	                )}
	            </div>
	            <Table data={dataSource} columns={columns}/>
	        </div>
	    )
	}
}

export default Demo21
