/**
 * @title 基础用法
 * @description: 进度圈
 */
import React from 'react'
import { ProgressCircle, Space } from '@tinper/m'
import './demo1.less'

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <Space style={{ '--gap': '24px' }}>
        <ProgressCircle fieldid='Progresscircle' percent={80} />
        <ProgressCircle fieldid='Progresscircle1' percent={50}>50%</ProgressCircle>
      </Space>
      <h3>指定线条宽度</h3>
      <Space style={{ '--gap': '24px' }}>
        <ProgressCircle fieldid='Progresscircle2' percent={75} style={{ '--track-width': '2px' }} />
        <ProgressCircle fieldid='Progresscircle3' percent={75} style={{ '--track-width': '4px' }} />
        <ProgressCircle fieldid='Progresscircle4' percent={75} style={{ '--track-width': '6px' }} />
      </Space>
      <h3>指定画布宽高</h3>
      <Space style={{ '--gap': '24px' }} align='center'>
        <ProgressCircle fieldid='Progresscircle5' percent={50} style={{ '--size': '40px' }}>
          <span className='small'>50%</span>
        </ProgressCircle>
        <ProgressCircle fieldid='Progresscircle6' percent={75} style={{ '--size': '60px' }}>
          <span className='middle'>75%</span>
        </ProgressCircle>
        <ProgressCircle fieldid='Progresscircle7' percent={100} style={{ '--size': '90px' }}>
          <span className='large'>100%</span>
        </ProgressCircle>
      </Space>
      <h3>自定义内部文字</h3>
      <Space style={{ '--gap': '24px' }}>
        <ProgressCircle fieldid='Progresscircle8'
          percent={60}
          style={{
            '--size': '100px',
            '--track-width': '4px',
          }}
        >
          <div className='secondaryText'>本月剩余流量</div>
          <div className='mainText'>70</div>
          <div className='secondaryText'>GB</div>
        </ProgressCircle>
        <ProgressCircle fieldid='Progresscircle9'
          percent={30}
          style={{
            '--size': '100px',
            '--track-width': '4px',
          }}
        >
          <div className='mainText'>7777</div>
          <div className='secondaryText'>步</div>
        </ProgressCircle>
      </Space>
      <h3>自定义颜色</h3>
      <Space style={{ '--gap': '24px' }}>
        <ProgressCircle fieldid='Progresscircle11'
          percent={60}
          style={{
            '--fill-color': 'var(--mui-color-success)',
          }}
        >
          60%
        </ProgressCircle>
        <ProgressCircle fieldid='Progresscircle12'
          percent={60}
          style={{
            '--fill-color': 'var(--mui-color-warning)',
          }}
        >
          60%
        </ProgressCircle>
        <ProgressCircle fieldid='Progresscircle13'
          percent={60}
          style={{
            '--fill-color': 'var(--mui-color-danger)',
          }}
        >
          60%
        </ProgressCircle>
      </Space>
    </>
  )
}
