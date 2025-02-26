/**
 * @title 深色dark样式展示
 * @description 以下两种`Alert`颜色深度由props`dark`控制。`colors`控制背景颜色种类。Alert本身不支持关闭功能,需要你控制显示隐藏。
 * @type other
 */

import {Alert} from "@tinper/next-ui";
import React, {Component} from "react";

class Demo1 extends Component {
    render() {
        return (
            <div>
                <Alert type="info" dark showIcon>
					这是一条深色的信息提示
                </Alert>
            </div>
        );
    }
}

export default Demo1;
