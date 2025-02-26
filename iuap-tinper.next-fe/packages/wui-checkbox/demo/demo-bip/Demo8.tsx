/**
 * @title fieldid用法
 * @description 传递fieldid属性，生成fieldid dom属性
 */


import {Checkbox} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo8 extends Component {
    render() {
        return (
            <div className="demo-checkbox">
                <Checkbox
                    style={{lineHeight: '60px'}}
                    className="test"
                    fieldid="wanda"
                >
                     Checkbox
                </Checkbox>
            </div>
        )
    }
}

export default Demo8;
