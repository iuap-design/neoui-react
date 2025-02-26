/**
 *
 * @title fieldid示例
 * @description 添加fieldid
 *
 */

import {Clipboard} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo5 extends Component {
    render() {
        function success() {
            console.log('success');
        }

        function error() {
            console.log('error');
        }

        return (
            <Clipboard action="copy" text="默认复制-我将被复制到剪切板" success={success} error={error} fieldid={'clipboard'}>

            </Clipboard>
        )
    }
}

export default Demo5;
