/**
 *
 * @title 自定义icon图标
 * @description 通过 `icon` 参数更改图标的展示，使用方法和组件Icon的方法保持一致。
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const light = function() {
    Message.destroy();
    Message.create({content: '自定义图标展示。', color: "light", icon: 'uf uf-tinperzc-col'});
};

class Demo8 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    shape="border"
                    onClick={light}>
					自定义图标
                </Button>
            </div>
        )
    }
}


export default Demo8;
