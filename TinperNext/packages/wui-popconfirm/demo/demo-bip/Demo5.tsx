/**
 *
 * @title 传入自定义“确定”和“取消”按钮
 * @type other
 * demo5
 */

import {Button, Popconfirm} from '@tinper/next-ui';
import React, {Component} from 'react';

function CloseBtn() {
    return (
        <Button colors='info' size='sm' fieldid='fieldid-confirm'>
            确定
        </Button>
    );
}

class Demo5 extends Component {
    cancel = () => {
        console.log('cancel');
    };

    close = () => {
        console.log('close');
    };

    render() {
        const content = '您喜欢使用tinper-next组件库吗？';
        return (
            <div className='demoPadding'>
                <Popconfirm
                    trigger='click'
                    placement='top'
                    content={content}
                    cancelButtonProps={{shape: 'round'}}
                    okButtonProps={{colors: 'info'}}
                >
                    <Button colors='primary' style={{margin: 'auto 10px'}}>
                        我头上有圆角,快乐又可爱
                    </Button>
                </Popconfirm>

                <Popconfirm
                    trigger='click'
                    placement='right'
                    content={content}
                    onCancel={this.cancel}
                    onClose={this.close}
                    cancel_btn={
                        <Button shape='border' colors='info' size='sm' fieldid='fieldid-cancel'>
                            取消
                        </Button>
                    }
                    close_btn={CloseBtn()}
                >
                    <Button colors='primary'>Popconfirm</Button>
                </Popconfirm>
            </div>
        );
    }
}

export default Demo5;
