/**
 *
 * @title Drawer表单示例
 * @description 弹出表单信息
 *
 */
import { Button, Drawer, Space } from '@tinper/next-ui';
import React, { Component } from 'react';

interface IState {
    placement: string;
    showDrawer: boolean;
    title: string;
    overflow: string;
}
class Demo3 extends Component<{}, IState> {
    constructor(props:any) {
        super(props);
        this.state = {
            placement: 'right',
            showDrawer: false,
            title: '表单',
            overflow: 'auto'
        };
        this.fPopDrawer = this.fPopDrawer.bind(this);
        this.fCloseDrawer = this.fCloseDrawer.bind(this);
    }
    fPopDrawer() {
        this.setState({
            placement: 'right',
            showDrawer: true,
            overflow: 'auto'
        });
    }
    fCloseDrawer() {
        this.setState({
            showDrawer: false,
            overflow: 'hidden',

        });
    }
    fPopDrawerRight = () => {
        this.setState({
            showDrawer: true,
            overflow: 'auto',
            placement: 'left',
        });
    }
    render() {
        let { placement, showDrawer, title } = this.state;
        let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.container'); // 为了示例中drawer覆盖区域在导航栏下面
        return (<div className="demoPadding">
	           <Space>
                <Button colors="primary" onClick={this.fPopDrawer}>open right</Button>
                <Button colors="primary" onClick={this.fPopDrawerRight}>open left</Button>

            </Space>
	            <Drawer style={{ position: 'fixed' }} getPopupContainer={container} zIndex={1000} mask={false} className='demo3' title={title} visible={showDrawer} placement={placement} onClose={this.fCloseDrawer} closable={true} width={400}>
                    demo
	            </Drawer>
	        </div>);
    }
}
export default Demo3;