/**
 *
 * @title promise 接口
 * @description 可以通过 then 接口在关闭后运行 callback 。
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';

const onClick = () => {
    Message.destroy();
    Message.create({
        content: 'is loading',
        duration: 2,
        icon: 'uf uf-loadingstate'
    })
        .then(() => Message.destroy())
        .then(() => Message.success({content: 'Loading finished', duration: 2}))
        .then(() => Message.destroy())
        .then(() => Message.info({content: 'Loading finished is finished'}));
};

class Demo15 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    shape="border"
                    onClick={onClick}>
					promise
                </Button>
            </div>
        )
    }
}


export default Demo15;
