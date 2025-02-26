/**
 *
 * @title 步骤较多时的处理方式
 * @description more 属性可以灵活显示步骤条
 *
 */

import {Steps, Button, Space} from "@tinper/next-ui";
import React, {Component} from 'react';

interface StepState {
	arrowCrt: number;
	item: Array<any>;
	more: boolean
}
const list = [{title: '1已完成'}, {title: '2已完成'}, {title: '3已完成'}]
const moreList = [{title: '1已完成'}, {title: '2已完成'}, {title: '3已完成'}, {title: '4已完成'}, {title: '5已完成'}, {title: '6已完成'}, {title: '7已完成'}, {title: '8已完成'}, {title: '9已完成'}, {title: '10已完成'}, {title: '11已完成'}, {title: '12已完成'}]
class Demo10 extends Component<{}, StepState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            arrowCrt: 10,
            item: list,
            more: false
        }
    }

    arrowChange = (val: number, position: string) => {
	    if (position === 'center') {
            this.setState({
                arrowCrt: val
            })
        }
    }

	click = () => {
	    this.setState({
	        item: this.state.item === list ? moreList : list
	    })
	}

	moreClick = () => {
	    this.setState({
	        more: !this.state.more
	    })
	}

	render() {
	    const {arrowCrt, item, more} = this.state;
	    return (
	        <div style={{position: 'relative'}} tinper-next-role='container'>
	            <Space>
	                <Button type="primary" onClick={this.click}>按钮</Button>
	                <Button type="primary" onClick={this.moreClick}>more: {`${more}`}</Button>
	            </Space>
	            <Steps onChange={this.arrowChange} current={arrowCrt} items={item} more={more} type="arrow" >
	                {item.map((v, i) => (<Steps.Step key={i}>{v.title}</Steps.Step>))}
	            </Steps>
	        </div>
	    )
	}
}

export default Demo10;
