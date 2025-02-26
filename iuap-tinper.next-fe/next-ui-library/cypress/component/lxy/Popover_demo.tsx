import React, {Component} from 'react'
import {Button, Popover} from '@tinper/next-ui'

class Demo1 extends Component {
  constructor(props: {}) {
      super(props)
  }

  render() {
      let content = (
          <div>
              <h3 style={{marginTop: 0, marginBottom: 4}}>消息</h3>
              <ul>
                  <li>您的服务器已宕机，请处理。</li>
                  <li>您的手机已停机，请续费。</li>
                  <li>你的工资已到账，请查收。</li>
              </ul>
          </div>
      )

      const btnStyle = {
          marginRight: '8px',
          marginBottom: '8px'
      }
      return (
          <div className='demo1'>
              <div style={{marginLeft: 100, whiteSpace: 'nowrap'}}>
                  <Popover placement='topLeft' content={content} visible>
                      <Button colors='primary' style={btnStyle}>
                          上左
                      </Button>
                  </Popover>
              </div>
          </div>
      )
  }
}

export default Demo1
