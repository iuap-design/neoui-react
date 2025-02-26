/**
 * @title CeneterPopup
 * @description CeneterPopup 用法示例
 */
import React, { Component } from 'react'
import { CenterPopup, Button } from '@tinper/m'

interface PopupState {
  visible: boolean
}

export default class Demo0 extends Component<any, PopupState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    const { visible } = this.state;
    return (
      <div className='popup-demo'>
        <Button mode='default' size='middle' onClick={() => this.setState({ visible: true })}>中间弹出</Button>
        <CenterPopup
          visible={visible}
          onMaskClick={() => {
            this.setState({ visible: false })
          }}
        >
          文本内容
        </CenterPopup>
      </div>
    )
  }
}