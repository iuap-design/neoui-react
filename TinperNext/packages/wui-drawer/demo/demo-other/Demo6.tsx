/**
 *
 * @title Drawer示例
 * @description footer及各层级style
 * @type other
 */

import {Button, Drawer, Icon, DrawerProps} from '@tinper/next-ui';
import React, {Component} from 'react';

interface DrawerState6 {
    placement: string;
    showDrawer: boolean;
    title: string;
}

class Demo6 extends Component<{}, DrawerState6> {
    constructor(props: {}) {
        super(props);
        this.state = {
            placement: 'right',
            showDrawer: false,
            title: 'Basic Drawer'
        };
        this.fPopDrawer = this.fPopDrawer.bind(this);
        this.fCloseDrawer = this.fCloseDrawer.bind(this);
    }

    fPopDrawer() {
        this.setState({
            showDrawer: true
        })
    }

    fCloseDrawer() {
        this.setState({
            showDrawer: false
        })
    }

    render() {
        let {placement, showDrawer, title} = this.state;
        let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.container') // 为了示例中drawer覆盖区域在导航栏下面
        return (
            <div className="demoPadding">
                <div className="btnc">
                    <Button onClick={this.fPopDrawer} colors="primary">打开</Button>
                </div>
                <Drawer style={{position: 'fixed'}} zIndex={1000} mask={false} getPopupContainer={container as DrawerProps['container']}
                    closeIcon={<Icon type="uf-close"/>} closable={true} className={'demo6'} title={title}
                    visible={showDrawer} placement={placement} onClose={this.fCloseDrawer}
                    footer={<div>这是footer的尾部</div>}>
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

export default Demo6;
