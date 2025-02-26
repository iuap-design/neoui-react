/**
 * @title 基础用法
 * @description: 进度条
 * @compact true
 */
import React, { useState } from 'react'
import { ProgressBar, Button } from '@tinper/m';
import './demo.less'

export default function Demo (){
  const [percent, setPercent] = useState(0)
  return (
    <>
      <h3>基础用法</h3>
      <div className='progress-demo-block'>
        <div style={{ display: 'flex', paddingBottom: '0.24rem' }} >
          <Button
            mode='default'
            size='middle'
            onClick={() => setPercent(percent + 10 <= 100 ? percent + 10 : 100)}
          >
            进度 + 10
          </Button>
          <Button
            mode='default'
            size='middle'
            style={{ marginLeft: '0.24rem' }}
            onClick={() => setPercent(0)}
          >
            重置
          </Button>
        </div>
        <ProgressBar percent={percent} />
      </div>

      <h3>显示进度文字</h3>
      <div className='progress-demo-block'>
        <ProgressBar percent={50} text />
        <ProgressBar
          percent={50}
          text='已完成3/6步'
          style={{
            '--text-width': '1.72rem',
          }}
        />
      </div>


      <h3>进度条宽度</h3>
      <div className='progress-demo-block'>
        <ProgressBar
          percent={(152 / 686) * 100}
          style={{
            '--track-width': '0.08rem',
          }}
        />
        <br/>
        <ProgressBar
          percent={(152 / 686) * 100}
          style={{
            '--track-width': '0.24rem',
          }}
        />
      </div>
    </>
  )
}
