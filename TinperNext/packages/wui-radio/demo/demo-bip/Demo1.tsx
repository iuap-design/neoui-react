/**
 * @title Radio 基本用法
 * @description `defaultValue`设置默认被选中的radio值，`disabled`参数设置是否可用，`onChange`是值改变的回调
 */

import {Radio, RadioProps} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo1 extends Component <{}, {val: RadioProps['value'] | undefined}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            val: '1'
        }
    }

	handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
	    console.log('had change', value.target)
	    this.setState({
	        val: value.target.value
	    })
	}

	render() {
	    return (
	        <Radio.Group
	            antd
	            value={this.state.val}
	            onChange={this.handleChange}
	        >
	            <Radio value="1" disabled>苹果</Radio>
	            <Radio value="2" disabled>香蕉</Radio>
	            <Radio value={true}>菠萝</Radio>
	            <Radio value={false}>
	                <a
	                    href="https://baike.baidu.com/item/%E6%A2%A8/11871?fr=aladdin"
	                    target="_blank"
	                    rel="noreferrer"
	                >
						梨
	                </a>
	            </Radio>
	            {
	                [{
	                    val: 3,
	                    text: '葡萄'
	                }, {
	                    val: 4,
	                    text: '石榴'
	                }].map((item) => {
	                    return <Radio key={item.val} value={item.val}>{item.text}</Radio>
	                })
	            }
	        </Radio.Group>
	    )
	}
}

export default Demo1;
