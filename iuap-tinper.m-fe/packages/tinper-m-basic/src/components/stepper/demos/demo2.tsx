/**
 * @title 组件状态
 * @description: stepper
 */
import React from 'react'
import { Stepper, Toast } from '@tinper/m'

export default () => {
  const [value, setValue] = React.useState('9999999999999999')

  return (
    <>
      <h3>禁用状态</h3>
      <div  className="item ">

      <Stepper disabled/>
      </div>
      <h3>输入框只读状态</h3>
      <div  className="item ">

      <Stepper inputReadOnly/>
      </div>
      <h3>自定义宽度</h3>
      <div  className="item ">

      <Stepper style={{width: '120px'}} defaultValue={10000} step={10000}/>
      </div>
      <h3>获得/失去焦点</h3>
      <div  className="item ">

      <Stepper
        onFocus={() => {
          Toast.show('获得焦点')
        }}
        onBlur={() => {
          Toast.show('失去焦点')
        }}
      />
      </div>

      <h3>允许清空</h3>
      <div  className="item ">

      <Stepper
        allowEmpty={true}
        min={10}
        max={20}
        onChange={value => {
          console.log(value)
        }}
      />
      </div>

      {/*<h3>自定义css变量</h3>*/}
      {/*  <Stepper*/}
      {/*    style={{*/}
      {/*    }}*/}
      {/*    defaultValue={10000}*/}
      {/*    step={10000}*/}
      {/*  />*/}

      <h3>stringMode</h3>
      <div  className="item ">

      <Stepper
        style={{width: '80%'}}
        stringMode
        defaultValue='0.000000000000002'
        step='0.000000000000001'
        onChange={console.log}
      />
      </div>

      <h3>stringMode control</h3>
      <div  className="item ">

      <Stepper
        style={{width: '80%'}}

        stringMode
        value={value}
        step='13579'
        onChange={setValue}
      />
      </div>
    </>
  )
}
