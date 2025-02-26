/**
 *
 * @title 基础示例
 * @description 支持信息详情展开折叠，支持复制功能
 * @type bip
 * demo01
 */

import React from 'react';
import { Button, ErrorMessage, ErrorMessageProps } from "@tinper/next-ui";

const receiveContent = " traceld:c444c71f94e9ef13\n " +
    "timestamp:2022-11-17 21:26:51\n " +
    "userld:4be9794-ec5f-4e4d-b37f-fb89c8e5eff\n " +
    "eMessage:QuerySchemaExecutor error,entity uri \n " +
    "exceptionAtack:com.yonyou.ucf.mdd.ext.da0.meta.crud.Q\n " +
    "          at com.yonyou.ucf.mdd.ext.dao.meta.cru\n " +
    "          at com.yonyou.ucf.mdd.ext.dao.meta.cru\n " +
    "          at com.yonyou.ucf.mdd.ext.dao.meta.cru ";

const Demo1 = ({locale}:{locale?:string}) => {
    const onUploadClick: ErrorMessageProps['onUploadClick'] = () => {
    // 可以进行上报处理
        console.log('进行上报处理');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: true });
            }, 500)
        })
    }
    const onClick = () => {
        ErrorMessage.destroy();
        ErrorMessage.create({
            message: '因参数不合法导致查询失败,请检查参数查询条件是否填写完整',
            detailMsg: <div>{receiveContent} <div style={{ color: 'red' }}>tenantld:0000KPC165PABLPTS60000\n </div>{receiveContent}{receiveContent}{receiveContent}</div>,
            errorInfo: { displayCode: '010-300-001000', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500' },
            onUploadClick,
            level: 0,
            traceId: '1234567890',
            locale: {lang: locale || "zh-CN"}
        });
    }
    return (
        <div className="paddingDemo">
            <Button shape="border" onClick={onClick}>消息</Button>
        </div>
    )
}

export default Demo1;