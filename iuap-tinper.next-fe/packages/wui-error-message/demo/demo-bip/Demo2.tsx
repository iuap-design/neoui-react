/**
 *
 * @title 自定义footer
 * @description 支持自定义footer, 参数为默认的footer, 返回一个ReactNode
 * demo02
 */

import React from 'react';
import { Button, ErrorMessage } from '@tinper/next-ui';

const receiveContent = " traceld:c444c71f94e9ef13\n " +
    "timestamp:2022-11-17 21:26:51\n " +
    "userld:4be9794-ec5f-4e4d-b37f-fb89c8e5eff\n " +
    "tenantld:0000KPC165PABLPTS60000\n " +
    "eMessage:QuerySchemaExecutor error,entity uri \n " +
    "exceptionAtack:com.yonyou.ucf.mdd.ext.da0.meta.crud.Q\n " +
    "          at com.yonyou.ucf.mdd.ext.dao.meta.cru\n " +
    "          at com.yonyou.ucf.mdd.ext.dao.meta.cru\n " +
    "          at com.yonyou.ucf.mdd.ext.dao.meta.cru ";

const Demo2 = () => {
    const onClick = () => {
        ErrorMessage.destroy();
        ErrorMessage.create({
            message: '抱歉，系统出了点小问题，请联系支持人员',
            detailMsg: receiveContent,
            footer: (defaultFooter: React.ReactNode) => {
                return (
                    <div>
                        {defaultFooter}
                        <Button ghost type="text" onClick={() => {
                            ErrorMessage.destroy();
                        }}>关闭</Button>
                    </div>
                )
            }
        });
    }
    return (
        <div className="paddingDemo">
            <Button shape="border" onClick={onClick}>消息</Button>
        </div>
    )
}

export default Demo2;