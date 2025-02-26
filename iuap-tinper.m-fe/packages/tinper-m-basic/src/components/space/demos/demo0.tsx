/**
 * @title 基础用法
 * @description: 间距-基础用法
 */
import React from 'react'
import { Space, Button } from '@tinper/m'

export default () => {
  return (
    <>
      <h3>水平方向的间距</h3>
      <div>
        <Space>
          <Button size='middle' mode='default'>按钮1</Button>
          <Button size='middle' mode='default'>按钮2</Button>
          <Button size='middle' mode='default'>按钮3</Button>
        </Space>
      </div>

      <h3>换行</h3>
      <div>
        <Space wrap>
          <Button size='middle' mode='default'>按钮1</Button>
          <Button size='middle' mode='default'>按钮2</Button>
          <Button size='middle' mode='default'>按钮3</Button>
          <Button size='middle' mode='default'>按钮4</Button>
          <Button size='middle' mode='default'>按钮5</Button>
          <Button size='middle' mode='default'>按钮6</Button>
          <Button size='middle' mode='default'>按钮7</Button>
          <Button size='middle' mode='default'>按钮8</Button>
          <Button size='middle' mode='default'>按钮9</Button>
          <Button size='middle' mode='default'>按钮10</Button>
          <Button size='middle' mode='default'>按钮11</Button>
        </Space>
      </div>

      <h3>垂直方向的间距</h3>
      <div>
        <Space direction='vertical'>
          <Button size='middle' mode='default'>按钮1</Button>
          <Button size='middle' mode='default'>按钮2</Button>
          <Button size='middle' mode='default'>按钮3</Button>
        </Space>
      </div>

      <h3>自定义间距大小</h3>
      <div>
        <Space style={{ '--gap': '24px' }}>
          <Button size='middle' mode='default'>按钮1</Button>
          <Button size='middle' mode='default'>按钮2</Button>
          <Button size='middle' mode='default'>按钮3</Button>
        </Space>
      </div>

      <h3>渲染为块级元素</h3>
      <div>
        <Space direction='vertical' block>
          <Button size='middle' mode='default'>按钮1</Button>
          <Button size='middle' mode='default'>按钮2</Button>
          <Button size='middle' mode='default'>按钮3</Button>
        </Space>
      </div>

      <h3>主轴对齐方式</h3>
      <div>
        <Space justify='center' block>
          <Button size='middle' mode='default'>1</Button>
          <Button size='middle' mode='default'>
            2<br />2
          </Button>
          <Button size='middle' mode='default'>
            3<br />3<br />3
          </Button>
        </Space>
      </div>

      <h3>交叉轴对齐方式</h3>
      <div>
        <Space align='end'>
          <Button size='middle' mode='default'>1</Button>
          <Button size='middle' mode='default'>
            2<br />2
          </Button>
          <Button size='middle' mode='default'>
            3<br />3<br />3
          </Button>
        </Space>
      </div>
    </>
  )
}
