/**
 * @title 基础用法
 * @description: stepper
 */
import React from 'react'
import { Stepper } from '@tinper/m'

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <div  className="item ">
        <Stepper
          defaultValue={1}
          onChange={value => {
            console.log(value)
          }}
        />
      </div>


      <h3>步长设置</h3>
      <div  className="item ">

      <Stepper step={10} defaultValue={10} />
      </div>

      <h3>限制输入范围</h3>
      <div  className="item ">

      <Stepper min={-5} max={5} />
      </div>

      <h3>格式化到整数</h3>
      <div  className="item ">

      <Stepper digits={0} />
      </div>

      <h3>格式化到一位小数</h3>
      <div  className="item ">

      <Stepper digits={1} />
      </div>

      <h3>自定义格式</h3>
      <div  className="item ">

      <Stepper
          defaultValue={93}
          formatter={value => `¥ ${value}`}
          parser={text => parseFloat(text.replace('¥', ''))}
          onChange={value => {
            console.log(value, typeof value)
          }}
        />
      </div>
    </>
  )
}
