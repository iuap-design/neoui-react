/**
 * @title 样式修改
 * @description: 进度条-样式
 * @compact true
 */
import React, { useState } from 'react'
import { ProgressBar, Button } from '@tinper/m';
import './demo.less'


export default function Demo (){
  return (
    <>
      <h3>直角进度条</h3>
      <div className='progress-demo-block'>
        <ProgressBar percent={50} rounded={false} />
      </div>

      <h3>进度条颜色</h3>
      <div className='progress-demo-block'>
        <ProgressBar
          percent={(522 / 686) * 100}
          style={{
            '--fill-color': '#18B681',
          }}
        />
        <br/>
        <ProgressBar
          percent={(152 / 686) * 100}
          style={{
            '--fill-color': '#FFA600',
          }}
        />
        <br/>
        <ProgressBar
          percent={(342 / 686) * 100}
          style={{
            '--fill-color': '#FF5735',
          }}
        />
        <br/>
        <ProgressBar
          percent={(454 / 686) * 100}
          style={{
            '--fill-color': 'linear-gradient( 270deg, #18B681 0%, #588CE9 100%)',
          }}
        />
      </div>

      <h3>指定轨道颜色</h3>
      <div className='progress-demo-block'>
        <ProgressBar
          percent={(152 / 686) * 100}
          style={{
            '--track-color': 'rgba(88, 140, 233, 0.10)',
          }}
        />
      </div>
    </>
  )
}
