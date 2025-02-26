/**
 *
 * @title icon 角度旋转
 * @description 可以将图标自定义旋转
 *
 */

import {Icon} from "@tinper/next-ui";
import React, {Component} from 'react';


class Demo1 extends Component {
    render() {
        return (
            <div>
                <Icon type="uf-xiayitiao-copy" style={{fontSize: '36px'}} fieldid="test" />
                <Icon type="uf-xiayitiao-copy" style={{fontSize: '36px'}} rotate={90}/>
            </div>
        )
    }
}


export default Demo1;
