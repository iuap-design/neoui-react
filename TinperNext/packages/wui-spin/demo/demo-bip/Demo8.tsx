/**
 *
 * @title 动态创建dom，适配getPopupContainer
 * @description 通过document对象的方法，指定`getPopupContainer`属性。
 * @type bip
 */

import {Spin} from '@tinper/next-ui';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Demo8 extends Component {
    componentDidMount() {
        const child = <div>child</div>;
        const spin = <Spin getPopupContainer={() => document.querySelector('.divDom')} spinning={true}/>;
        const divDom = React.createElement('div', {
            title: 'hello Tinper',
            className: 'divDom'
        }, 'Hello Tinper！', child, spin)
        ReactDOM.render(divDom, document.getElementById('wrapper_div'))
    }

    render() {
        return (
            <div className="demo4" id={'wrapper_div'}></div>
        )
    }
}


export default Demo8;
