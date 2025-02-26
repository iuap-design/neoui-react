/**
 *
 * @title 目标剪切
 * @description 剪切只适用于 textarea 元素
 *
 */

import {Clipboard, Input} from "@tinper/next-ui";
import React, {Component} from 'react';

const {TextArea} = Input;
interface ClipboardDemo3State {
    value: string
}

class Demo3 extends Component<{}, ClipboardDemo3State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: '我将被剪切到剪切板'
        }
    }
    success = () => {
        this.setState({
            value: ''
        })
    }
    render() {

        function error() {
            console.log('error');
        }

        return (
            <div>
                <TextArea id="cutContent" autoSize={{minRows: 3, maxRows: 5}} value={this.state.value}></TextArea>
                <Clipboard action="cut" target='#cutContent' success={this.success} error={error}>
                </Clipboard>
            </div>
        )
    }
}

export default Demo3;
