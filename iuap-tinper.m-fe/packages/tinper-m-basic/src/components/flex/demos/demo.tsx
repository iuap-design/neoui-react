/**
 * @title 基础用法
 * @description: 流式布局-基础用法
 * @compact true
 */
import React, { useState } from 'react'
import { Flex, Button } from '@tinper/m';
import './demo.less';
export default function Demo (){

  return (
    <>
      <h3>基础用法</h3>
      <Flex >
        <Button size='middle'>按钮1</Button>
        <Button size='middle'>按钮2</Button>
        <Button size='middle'>按钮3</Button>
      </Flex>

      <h3>主轴间隔排列</h3>
      <Flex justify='between' >
        <Button size='middle'>按钮1</Button>
        <Button size='middle'>按钮2</Button>
        <Button size='middle'>按钮3</Button>
      </Flex>

      <h3>副轴末尾排列</h3>
      <Flex align='end' style={{ height: '3rem'}}>
        <Button size='middle'>按钮1</Button>
        <Button size='middle'>按钮2</Button>
        <Button size='middle'>按钮3</Button>
      </Flex>

      <h3>主轴竖向</h3>
      <Flex direction='column' style={{ height: '3rem'}}>
        <Button size='middle'>按钮1</Button>
        <Button size='middle'>按钮2</Button>
        <Button size='middle'>按钮3</Button>
      </Flex>

      <h3>换行</h3>
      <Flex wrap='wrap' style={{ height: '3rem'}}>
        <Button size='middle'>按钮1</Button>
        <Button size='middle'>按钮2</Button>
        <Button size='middle'>按钮3</Button>
        <Button size='middle'>按钮4</Button>
        <Button size='middle'>按钮5</Button>
        <Button size='middle'>按钮6</Button>
      </Flex>

      <h3>自定义样式</h3>
      <Flex style={{ height: '3rem', backgroundColor: '#E9ECEE', color: '#000000', padding: '0.24rem' }}>自定义样式</Flex>
    </>
  )
}
