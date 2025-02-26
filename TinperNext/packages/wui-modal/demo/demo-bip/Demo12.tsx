/**
 *
 * @title 信息提示
 * @description 提供`info`、`success`、`error`、`warning`、`confirm` API
 *
 */

import { Button, Icon, Modal } from '@tinper/next-ui';
import React, { Component } from 'react';


const info = function() {
    Modal.info({
        title: '提示',
        content: (
            <div>
                <p>单据状态已更新，请在审批中心内查看。</p>
            </div>
        ),
        onOk(_e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) {
            console.log('ok')
        },
        afterClose: ()=>{
            console.log('afterclose')
        },
        centered: true,
        keyboard: true,
        autoFocus: 'ok',
        // style: {color: '#fff'},
        // maskStyle: {color: '#fff'},
        // bodyStyle: {color: '#fff'}
    });
};
const success = function() {
    Modal.success({
        title: '提交成功',
        content: '单据提交成功，你可以在审批中心关注审批状态。',
        getPopupContainer: () => document.getElementById('tinperDemo') as HTMLElement,
        cancelButtonProps: {
            style: {
                display: 'none'
            }
        },
    });
};
const error = function() {
    Modal.error({
        title: '提交失败',
        content: '单据状态更新失败，请重新尝试。',
    });
};
const warning = function() {
    Modal.warning({
        title: '警告',
        content: '全部重新生成事项分录范围为查询条件下所有数据，非选中数据。\n重新生成事项分录后将删除原有事项分录，并生成新事项分录，原有事项分录手工修改部分将被覆盖。\n若原有事项分录已传凭证成功，重新生成事项分录也会将生成的凭证对应取消。\n已选查询条件为：abc',
    });
};
const confirm = function() {
    Modal.confirm({
        title: '确定要删除这条单据吗？',
        onOk(_e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) {
            var p = new Promise<boolean>(function(resolve, _reject) {
                // 做一些异步操作
                setTimeout(function() {
                    console.log('异步任务执行完成');
                    resolve(true);
                }, 1000);
            });
            return p;
        },
        onCancel() {
            console.log('Cancel');
        },
    })
};
const successLocale = function() {
    Modal.success({
        className: 'success-confirm',
        title: '提交成功',
        content: '单据提交成功，你可以在审批中心关注审批状态。',
    });
};
const confirmLocale = function() {
    Modal.confirm({
        title: '确定要删除这条单据吗？',
        content: '单据删除后将不能恢复。',
        onOk(_e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        }
    })
};
const customFooter = function() {
    const modal = Modal.info({
        footer: <>
            <Button onClick={()=>modal.destroy()}>自定义底部按钮</Button>
            <Button onClick={()=>modal.destroy()}>自定义底部按钮2</Button>
            <Button onClick={()=>modal.destroy()}>自定义底部按钮3</Button>
            <Button onClick={()=>modal.destroy()}>自定义底部按钮4</Button>
            <Button onClick={()=>modal.destroy()}>自定义底部按钮5</Button>
        </>,
        title: '提示',
        content: (
            <div>
                <p>这是一个自定义footer的modal提示</p>
            </div>
        )
    });
};
const customIcon = function() {
    Modal.confirm({
        icon: <Icon type="uf-yuandian"></Icon>,
        // icon: null,
        title: '提示',
        content: (
            <div>
                <p>这是一个自定义Icon的modal</p>
                <p>只有Modal.confirm支持自定义图标</p>
                <p>并且支持无图标 (icon:null)</p>
                <p>其他如Modal.success等，图标固定不变</p>
            </div>
        )
    });
};

class Demo12 extends Component {
    render() {
        const marginStyle = {margin: 5}
        return (
            <div className="demo12">
                <Button style={{...marginStyle}} colors="info" onClick={info}>Info</Button>
                <Button style={{...marginStyle}} colors="success" onClick={success}>Success</Button>
                <Button style={{...marginStyle}} colors="danger" onClick={error}>Error</Button>
                <Button style={{...marginStyle}} colors="warning" onClick={warning}>Warning</Button>
                <Button style={{...marginStyle}} bordered onClick={confirm}>异步执行</Button>
                <Button style={{...marginStyle}} colors="success" onClick={successLocale}>Success自定义文字</Button>
                <Button style={{...marginStyle}} bordered onClick={confirmLocale}>Confirm自定义文字</Button>
                <Button style={{...marginStyle}} bordered onClick={customFooter}>自定义Footer</Button>
                <Button style={{...marginStyle}} bordered onClick={customIcon}>自定义Icon</Button>
            </div>
        )
    }
}
export default Demo12;
