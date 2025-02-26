/**
 *
 * @title 自定义图标、日期样式
 * @description 自定义面板翻页按钮、日期单元格样式
 */

import {Button, Col, DatePicker, Icon, Row} from '@tinper/next-ui'
import React, {Component} from 'react'
import type {Moment} from 'moment'

function monthMap(month: number) {
    const _MONTH_MAP = {
        1: '正',
        2: '贰',
        3: '叁',
        4: '肆',
        5: '伍',
        6: '陆',
        7: '柒',
        8: '捌',
        9: '玖',
        10: '拾',
        11: '冬',
        12: '腊'
    }
    return _MONTH_MAP[month]
}

class Demo8 extends Component<{}, {open: boolean}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            open: false
        }
    }

	dateRender = (currentDate: Moment, today: Moment) => {
	    // console.log('dateRender---->', currentDate, today)
	    if (currentDate.get('date') - 3 === today.get('date')) {
	        return <Icon type='uf-star'/>
	    } else {
	        return currentDate.get('date')
	    }
	}

	monthCellRender = (currentDate: Moment, locale: any) => {
	    console.log('monthCellRender----->', currentDate, locale)
	    return `${monthMap(currentDate.get('month') + 1)}月`
	}

	togglePanel = () => {
	    this.setState({open: !this.state.open})
	}

	render() {
	    return (
	        <div className='demo9'>
	            <Row gutter={[10, 10]}>
	                <Col md={6}>
	                    <DatePicker
	                        open={this.state.open}
	                        clearIcon={() => <Icon type='uf-bell-o'/>}
	                        suffixIcon={<Icon type='uf-cart'/>}
	                        prevIcon={<Icon type='uf-triangle-left'/>}
	                        nextIcon={<Icon type='uf-triangle-right'/>}
	                        superPrevIcon={<Icon type='uf-arrow-c-o-left'/>}
	                        superNextIcon={<Icon type='uf-arrow-c-o-right'/>}
	                        dateRender={this.dateRender}
	                        monthCellRender={this.monthCellRender}
	                    />
	                </Col>

	                <Col md={4}>
	                    <Button onClick={this.togglePanel}>显示/隐藏面板</Button>
	                </Col>
	            </Row>
	        </div>
	    )
	}
}

export default Demo8
