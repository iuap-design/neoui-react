/**
 *
 * @title style 属性
 * @description style 可用于设置 Drawer 最外层容器的样式、drawerStyle弹出层的样式、maskStyle遮罩样式、headerStyle头部样式、footerStyle尾部样式、bodyStyle内部部分样式、footer
 * @type other
 */

import {Button, Drawer, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

interface DrawerState10 {
    placement: string;
    showDrawer: boolean;
    title: string;
    closable: boolean;
    mask: boolean;
}

class Demo10 extends Component<{}, DrawerState10> {
    constructor(props: {}) {
        super(props);
        this.state = {
            placement: 'right',
            showDrawer: false,
            title: 'Basic Drawer',
            closable: true,
            mask: true
        };
        this.fPopDrawer = this.fPopDrawer.bind(this);
        this.fCloseDrawer = this.fCloseDrawer.bind(this);
    }

    fPopDrawer() {
        this.setState({
            showDrawer: true
        })
        document.body.style.overflow = 'hidden'
    }

    fCloseDrawer() {
        this.setState({
            showDrawer: false
        })
        document.body.style.overflow = 'auto'
    }

    render() {
        let {placement, showDrawer, title} = this.state;
        // let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.container') // 为了示例中drawer覆盖区域在导航栏下面
        return (
            <div className="demoPadding">
                <div className="btnc">
                    <Button onClick={this.fPopDrawer} colors="primary">打开</Button><br/>
                </div>
                <Drawer
                    style={{position: 'fixed'}}
                    drawerStyle={{background: 'red'}}
                    maskStyle={{background: 'yellow', opacity: '0.2'}}
                    headerStyle={{background: 'blue'}}
                    footerStyle={{background: 'gold'}}
                    bodyStyle={{background: 'cyan'}}
                    footer="这是尾部"
                    zIndex={1000}
                    mask={true}
                    maskClosable={true}
                    closeIcon={<Icon type="uf-close"/>}
                    closable={this.state.closable}
                    className={'demo10'}
                    title={title}
                    visible={showDrawer}
                    placement={placement}
                    onClose={this.fCloseDrawer}
                >
                    <div className="con">
                        <p>这是第一行文字</p>
                        <p>这是第二行文字</p>
                        <p>这是第三行文字，啦啦啦~</p>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Demo10;
