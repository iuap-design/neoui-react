/**
 *
 * @title closable 属性
 * @description closable 是否显示右上角的关闭按钮
 * @type other
 */

import {Button, Drawer, Icon, DrawerProps} from '@tinper/next-ui';
import React, {Component} from 'react';

interface DrawerState9 {
    placement: string;
    showDrawer: boolean;
    title: string;
    closable: boolean;
    mask: boolean;
}

class Demo9 extends Component<{}, DrawerState9> {
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

    handleclosable(val: boolean) {
        this.setState({
            closable: val
        })
    }

    render() {
        let {placement, showDrawer, title} = this.state;
        let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.demoPadding') // 为了示例中drawer覆盖区域在导航栏下面
        return (
            <div className="demoPadding">
                <div className="btnc">
                    <Button onClick={this.fPopDrawer} colors="primary">打开</Button><br/>
                    {/* <Button onClick={this.handlemask.bind(this, false)}>mask值为false</Button>
                     <Button onClick={this.handlemask.bind(this, true)}>mask值为true</Button><br /> */}
                    <Button onClick={this.handleclosable.bind(this, false)}>closable值为false</Button>
                    <Button onClick={this.handleclosable.bind(this, true)}>closable值为true</Button>
                </div>
                <Drawer style={{position: 'fixed'}} zIndex={1000} mask={true} hasHeader={false} maskClosable={true}
                    closeIcon={<Icon type="uf-close"/>} closable={this.state.closable} className={'demo9'}
                    title={title} visible={showDrawer} placement={placement} onClose={this.fCloseDrawer}
                    getPopupContainer={container as DrawerProps['container']}>
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

export default Demo9;
