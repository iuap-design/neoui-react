/**
 * @title 自定义用法
 * @description: 自定义用法
 */
import React from 'react'
import { Button, ErrorBlock } from '@tinper/m'

export default () => {
  return (
    <>
      <h3>自定义</h3>
      <div>
        <ErrorBlock
          status='disconnected'
          style={{
            '--image-height': '150px',
          }}
          title='网络开小差了，刷新试试吧～'
          description={
            <span>
              Customize <a style={{ color: '#0033CC' }}>Description</a>
            </span>
          }
          fieldid='errorblock6'
        >
          <Button color='primary'>刷新</Button>
        </ErrorBlock>
      </div>
    </>
  )
}
