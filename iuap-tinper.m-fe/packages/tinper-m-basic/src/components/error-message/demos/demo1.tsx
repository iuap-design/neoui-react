/**
 * @title 基础用法
 * @description 异常提示用法示例
 */
import React, { useState } from 'react'
import { ErrorMessage, Button, Toast } from '@tinper/m';

export default () => {

  const [visible, setVisible] = useState(false)

  const handleClick = () => {
    setVisible(true)
  }

  const onCodeClick = () => {
    Toast.show({
      content: '点击了状态码'
    })
  }

  const onUploadClick = () => {
    Toast.show({
      content: '点击了上报'
    })
  }

  const handleClick1 = () => {
    ErrorMessage.destroy();
    ErrorMessage.create({
      message: '查询失败：因参数不合法导致查询失败，请检查参数查询条件是否填写完整',
      errorInfo: '010-300-0010000',
      traceId: 'sd399823232412424',
      onCodeClick: onCodeClick,
      onUploadClick: onUploadClick,
      uploadable: true,
      detailMsg: 'traceld:c444c71f94e9ef13',
      closeOnMaskClick: true,
      fieldid: "demo2"
    })
  }

  return (
    <>
      <h3>错误提示</h3>
      <Button onClick={handleClick}>错误</Button>
      <ErrorMessage
        fieldid="demo1"
        visible={visible}
        onClose={() => setVisible(false)}
        closeOnMaskClick
        message='查询失败：因参数不合法导致查询失败，请检查参数查询条件是否填写完整'
        errorInfo='010-300-0010000'
        traceId='sd399823232412424'
        onCodeClick={onCodeClick}
        onUploadClick={onUploadClick}
        uploadable
        detailMsg='traceld:c444c71f94e9ef13
        timestamp:2022-11-17 21:26:51
        userld:4be9794-ec5f-4e4d-b37f-fb89c8e5eff
        tenantld:0000KPC165PABLPTS60000
        eMessage:QuerySchemaExecutor error,entity uri 
        exceptionAtack:com.yonyou.ucf.mdd.ext.da0.meta.crud.Q
                  at com.yonyou.ucf.mdd.ext.dao.meta.cru
                  at com.yonyou.ucf.mdd.ext.dao.meta.cru
                  at com.yonyou.ucf.mdd.ext.dao.meta.cru'
      />

      <h3>错误提示 create 方法</h3>
      <Button onClick={handleClick1}>错误</Button>
    </>
  )
}