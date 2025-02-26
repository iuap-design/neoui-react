/**
 * @title 自定义错误提示
 * @description: 表单标题
 * @compact true
 */
import React, { useState } from 'react'
import { FormItemWrapper, Input } from '@tinper/m';
import ExclamationMark from '@tinper/m-icons/lib/cjs/ExclamationMark'

const ErrorIcon = () => <div style={{width: '0.32rem', height: '0.32rem', background: 'var(--ynfm-color-bg-verification-formitemwrapper, #F50C001A)', borderRadius: '50%', overflow: 'hidden', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
  <ExclamationMark style={{width: '0.16rem', height: '0.16rem', color: 'var(--mui-color-danger)'}}  />
</div>

const phoneReg = /^1[3456789]\d{9}$/
export default function Demo (){
  const [ requiredFocus, setRequiredFocus ] = useState(false)
  const [ requiredError, setRequiredError ] = useState(true)
  const [ phoneError, setPhoneError ] = useState(true)


  const checkRequired = (value) => {
    (!value)
    ? setRequiredError(true)
    : setRequiredError(false)
  }

  const checkPhonePattern = (value) => {
    if (phoneReg.test(value)) {
      setPhoneError(false)
    } else {
      setPhoneError(true)
    }
  }

  return (
    <>
      <h3>错误提示</h3>
      <FormItemWrapper
        label='姓名'
        required
        showIcon={requiredError && !requiredFocus}
        rightIcon={<ErrorIcon />}
        error={requiredError && requiredFocus}
      >
        <Input
          onFocus={() => setRequiredFocus(true)}
          onChange={checkRequired}
          onBlur={(v) => {
            checkRequired(v)
            setRequiredFocus(false)
          }}
          placeholder='请输入'
        />
      </FormItemWrapper>
      <FormItemWrapper label='手机号' error={phoneError} errorText='格式不正确' >
        <Input onChange={checkPhonePattern} onBlur={checkPhonePattern} placeholder='请输入' defaultValue='yonyou@mail.com' />
      </FormItemWrapper>
    </>
  )
}
