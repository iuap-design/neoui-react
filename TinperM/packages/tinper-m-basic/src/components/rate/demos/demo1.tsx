/**
 * @title 基础用法
 * @description  基础用法
 */

import React from 'react'
import {Rate, Toast} from '@tinper/m'
import { HeartFill } from '@tinper/m-icons';
import './demo.less'

function BasicUsage() {
  return (
    <div className="demo-block after:">
      <Rate onChange={value => {
        Toast.show(value.toString())
      }}/>
    </div>

  )
}

function MutiLine() {
  return (
    <div className="demo-block after:">
      <Rate count={25} onChange={value => {
        Toast.show(value.toString())
      }}/>
    </div>

  )
}

function HalfStar() {
  return (
    <div className="demo-block">
      <Rate  defaultValue={3.5} onChange={value => {
        Toast.show(value.toString())
      }} allowHalf={true}/>
    </div>

  )
}

function Readonly() {
  return (
    <div className="demo-block">
    <Rate defaultValue={4} onChange={value => {
      Toast.show(value.toString())
    }} readOnly/>
    </div>
  )
}

function Disabled() {
  return (
    <div className="demo-block">
    <Rate defaultValue={4} onChange={value => {
      Toast.show(value.toString())
    }} disabled/>
    </div>
  )
}


function Clear() {
  return (
    <>
      <div className="demo-block">
        <div className="demo-space">可清除</div>
          <Rate defaultValue={3} allowClear/>
      </div>
      <div className="demo-block">
      <div className="demo-space">不可清除</div>
          <Rate defaultValue={3} allowClear={false} />
        </div>
      </>
  )
}

function CustomCharacter() {
  return (
    <>
      <div className="demo-block">
        <div className="demo-space">图标</div>
        <Rate allowHalf defaultValue={2.5} onChange={value => {
          Toast.show(value.toString())
        }} character={<HeartFill style={{width: '0.48rem', height: '0.48rem'}} />}/>
      </div>
      <div className="demo-block">
        <div className="demo-space">字母</div>
        <Rate allowHalf defaultValue={2.5} onChange={value => {
          Toast.show(value.toString())
        }} character="Y"/>
      </div>
      <div className="demo-block">
        <div className="demo-space">汉字</div>
        <Rate allowHalf defaultValue={2.5} onChange={value => {
          Toast.show(value.toString())
        }} character="友"/>
      </div>

    </>

  )
}


export default () => {
  return (
    <div className="rate-demo">
      <>
        <h3>基本用法</h3>
        <BasicUsage/>
      </>
      <>
        <h3>自动换行</h3>
        <MutiLine/>
      </>
      <>
        <h3>半星</h3>
        <HalfStar/>
      </>
      <>
        <h3>只读</h3>
        <Readonly/>
      </>
      <>
        <h3>禁用</h3>
        <Disabled/>
      </>
      <>
        <h3>清除</h3>
        <Clear/>
      </>
      <>
        <h3>自定义字符和样式</h3>
        <CustomCharacter/>
      </>
    </div>
  )
}
