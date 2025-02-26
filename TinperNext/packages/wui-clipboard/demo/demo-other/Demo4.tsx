/**
 *
 * @title 切换复制组件显示的语言
 * @description 通过设置locale属性来修改文字和语言
 *
 */

import {Clipboard, Select} from '@tinper/next-ui';
import React, {Component} from 'react';
// import EnUS from "../../../wui-locale/src/en_US.js";
// import zh_CN from '../../../wui-locale/src/zh_CN.js';
// import ZhCn from "../../../wui-locale/src/zh_CN.js";
// import ZhTw from "../../../wui-locale/src/zh_TW.js";
let { Option } = Select
interface ClipboardDemo4State {
	tabType: string;
	allType: string[];
	localFlag: string;
}

class Demo4 extends Component<{}, ClipboardDemo4State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            tabType: "简体",
            allType: ['简体', '繁体', '英文', '越南语'],
            localFlag: 'zh-cn'
        }
    }

	changeTabPosition = (val: string) => {
	    if (val === '简体') {
	        this.setState({
	            tabType: val,
	            localFlag: 'zh-cn'
	        })
	    } else if (val === '繁体') {
	        this.setState({
	            tabType: val,
	            localFlag: 'zh-tw'
	        })
	    } else if (val === '英文') {
	        this.setState({
	            tabType: val,
	            localFlag: 'en-us'
	        })
	    } else if (val === '越南语') {
	        this.setState({
	            tabType: val,
	            localFlag: 'vi-vn'
	        })
	    }
	}

	render() {
	    function success() {
	        console.log('success');
	    }

	    function error() {
	        console.log('error');
	    }

	    return (
	        <div>
	            <div style={{marginBottom: 16}}>
					语言类型：
	                <Select
	                    value={this.state.tabType}
	                    onChange={this.changeTabPosition}
	                    style={{width: '100px'}}
	                >
	                    {
	                        this.state.allType.map(item => {
	                            return (
	                                <Option value={item} key={item}>{item}</Option>
	                            )
	                        })
	                    }
	                </Select>
	            </div>
	            <Clipboard locale={this.state.localFlag} action="copy" text="默认复制-我将被复制到剪切板" success={success}
						   error={error}>

	            </Clipboard>
	        </div>

	    )
	}
}

export default Demo4;
