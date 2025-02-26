/**
 *
 * @title 加载中
 * @description 加载中状态。
 *
 */

import {Button} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo1 extends Component {

    render() {
        return (
            <div className="demoPadding">
                <Button loading colors="primary">加载中</Button>
            </div>
        )
    }
}

export default Demo1;
