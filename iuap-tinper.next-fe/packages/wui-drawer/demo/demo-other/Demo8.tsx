/**
 *
 * @title maskClosable、hasHeader 属性
 * @description maskClosable点击遮罩是否关闭、hasHeader是否显示头部
 * @type other
 */

import {Button, Drawer, Icon, DrawerProps} from '@tinper/next-ui';
import React, {Component} from 'react';

interface DrawerState8 {
    placement: string;
    showDrawer: boolean;
    title: string;
    destroyOnClose: boolean;
}

class Demo8 extends Component<{}, DrawerState8> {
    constructor(props: {}) {
        super(props);
        this.state = {
            placement: 'right',
            showDrawer: false,
            title: 'Basic Drawer',
            destroyOnClose: true
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

    //  handleDestroy(val){
    //     this.setState({
    //         destroyOnClose: val
    //     })
    //  }
    render() {
        let {placement, showDrawer, title} = this.state;
        let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.demoPadding') // 为了示例中drawer覆盖区域在导航栏下面
        return (
            <div className="demoPadding">
                <div className="btnc">
                    <Button onClick={this.fPopDrawer} colors="primary">打开</Button>
                    {/* <Button onClick={this.handleDestroy.bind(this, false)}>destroyOnClose值为false</Button>
                     <Button onClick={this.handleDestroy.bind(this, true)}>destroyOnClose值为true</Button> */}
                </div>
                <Drawer style={{position: 'fixed'}} zIndex={1000} mask={true} hasHeader={false} maskClosable={true}
                    closeIcon={<Icon type="uf-close"/>} closable={true} className={'demo8'} title={title}
                    visible={showDrawer} placement={placement} onClose={this.fCloseDrawer}
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

export default Demo8;
