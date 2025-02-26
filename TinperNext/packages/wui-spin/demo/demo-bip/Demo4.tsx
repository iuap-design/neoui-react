/**
 *
 * @title 自定义描述文案
 * @description 通过设置 `tip` 属性，来添加Spin的文字描述。
 * @type bip
 */

import {Spin} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo3 extends Component {

    render() {
        return (
            <div className="demo3">
                <p>
					曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。
					如果上天能够给我一个再来一次的机会，我会对那个女孩子说三个字：我爱你。
					如果非要在这份爱上加上一个期限，我希望是……
					一万年
                </p>
                <Spin
                    getPopupContainer={this}
                    spinning={true}
                    tip="Spin..."
                />
            </div>
        )
    }
}


export default Demo3;
