/**
 * @title 基础用法
 * @description: 基础用法
 */
import { Hyperlinks } from '@tinper/m';
import { useState } from 'react';
import './demo.less'

function BasicUsage() {
  const [value, setValue] = useState()
  return (
    <Hyperlinks
      className="px-2"
      value={value}
      onChange={v => {
        setValue(JSON.parse(v))
      }}
      onBlur={value1 => {
        console.log('onBlur', value1)
      }}
      onFocus={value1 => {
        console.log('onFocus', value1)
      }}
      linkAddressPlaceholder="请输入网址链接"
      linkTextPlaceholder="请输入网址名称"
    />
  );
}

function DataDisplay() {
  return (
    <Hyperlinks
      className="px-2"
      onChange={console.log}
      defaultValue={{
        linkAddress: "https://yonbip.yonyou.com/web/#/item/project/",
        linkText: "yonyou web",
      }}
      linkAddressPlaceholder="请输入网址链接"
      linkTextPlaceholder="请输入网址名称"
    />
  );
}

function Disabled() {
  return (
    <Hyperlinks
      className="px-2"
      defaultValue={{
        linkAddress: "https://yonbip.yonyou.com/web/#/item/project/",
        protocol: "https:",
        linkText: "yonyou web",
      }}
      disabled
      linkAddressPlaceholder="请输入网址链接"
      linkTextPlaceholder="请输入网址名称"
    />
  );
}

function Readonly() {
  return (
    <div className="demo-block">
      <Hyperlinks
        defaultValue={{
          linkAddress: "https://yondesign.yonyou.com/homepage/#/",
          protocol: "https:",
          linkText: "yonyou web ",
        }}
        readOnly
        linkAddressPlaceholder="请输入网址链接"
        linkTextPlaceholder="请输入网址名称"
      />
    </div>
  );
}

function ReadonlyMultLine() {
  return (
    <div className="demo-block">
      <Hyperlinks
        defaultValue={{
          linkAddress: "https://yondesign.yonyou.com/homepage/#/",
          protocol: "https:",
          linkText:
            "为了全面提升用户体验，设计赋能业务，我们提供了更多维的设计规范，帮助用户打造更好的产品。",
        }}
        readOnly
        linkAddressPlaceholder="请输入网址链接"
        linkTextPlaceholder="请输入网址名称"
      />
    </div>
  );
}

export default function Demo() {
  return (
    <div className="hyperlinks-demo">
      <>
        <h3>基础用法</h3>
        <BasicUsage />
      </>
      <>
        <h3>数据显示</h3>
        <DataDisplay />
      </>
      <>
        <h3>禁用</h3>
        <Disabled />
      </>
      <>
        <h3>浏览态</h3>
        <Readonly />
      </>
      <>
        <h3>浏览态多行</h3>
        <ReadonlyMultLine />
      </>
    </div>
  );
}
