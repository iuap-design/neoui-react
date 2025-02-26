/**
 * @title 基础用法
 * @description 浮框用法示例
 */
import React, { Component } from 'react'
import { Popup, Button, CenterPopup } from '@tinper/m'
import './demo.less'

interface PopupState {
  visible0: boolean,
  visible1: boolean,
  visible2: boolean,
  visible3: boolean,
  visible4: boolean,
  visible5: boolean,
  visible6: boolean,
  visible7: boolean,
  visible8: boolean,
}

const mockContent = (
  <div style={{ padding: '0.4rem' }}>{'这里是示例内容'.repeat(26)}</div>
)

const mockContentWithCloseIcon = (
  <div style={{ padding: '0.8rem 0.4rem 0.4rem' }}>{'这里是示例内容'.repeat(26)}</div>
)

const mockContentWithCloseIconTitle = (
  <div style={{ padding: '0 0.4rem' }}>{'这里是示例内容'.repeat(26)}</div>
)

export default class Demo0 extends Component<any, PopupState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible0: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false
    };
  }

  render() {
    const { visible0, visible1, visible2, visible3, visible4, visible5, visible6, visible7, visible8 } = this.state;
    return (
      <div className='popup-demo'>
        <h3>弹出位置</h3>
        <Button mode='default' size='middle' onClick={() => this.setState({ visible0: true })}>底部弹出</Button>
        <Popup
          visible={visible0}
          onMaskClick={() => this.setState({ visible0: false })}
          bodyStyle={{ minHeight: '55vh' }}
          closeOnSwipe
          afterClose={() => console.log('完全关闭触发 afterClose')}
          afterShow={() => console.log('完全展示触发 afterShow')}
          fieldid='fieldid-popup-0'
          className='popup-demo-color'
        >
          {mockContent}
        </Popup>
        <br />

        <Button mode='default' size='middle' onClick={() => this.setState({ visible1: true })}>顶部弹出</Button>
        <Popup
          visible={visible1}
          onMaskClick={() => this.setState({ visible1: false })}
          bodyStyle={{ minHeight: '55vh' }}
          bodyClassName='popup-test-body-class'
          className='popup-test-class popup-demo-color'
          position='top'
          closeOnSwipe
          fieldid='fieldid-popup-1'
        >
          {mockContent}
        </Popup>
        <br />

        <Button mode='default' size='middle' onClick={() => this.setState({ visible2: true })}>左侧弹出</Button>
        <Popup
          visible={visible2}
          onMaskClick={() => this.setState({ visible2: false })}
          bodyStyle={{ width: '71vw' }}
          position='left'
          maskClassName='popup-mask-class'
          onClick={e => console.log("点击触发onClick: ", e)}
          fieldid='fieldid-popup-2'
          className='popup-demo-color'
        >
          {mockContent}
        </Popup>
        <br />

        <Button mode='default' size='middle' onClick={() => this.setState({ visible3: true })}>右侧弹出</Button>
        <Popup
          visible={visible3}
          onMaskClick={() => this.setState({ visible3: false })}
          bodyStyle={{ width: '71vw' }}
          position='right'
          fieldid='fieldid-popup-3'
          className='popup-demo-color'
        >
          {mockContent}
        </Popup>
        <br />

        <Button mode='default' size='middle' onClick={() => this.setState({ visible8: true })} className='last-button'>中间弹出（CenterPopup）</Button>
        <CenterPopup
          visible={visible8}
          onMaskClick={() => {
            this.setState({ visible8: false })
          }}
          className="center-popup-demo"
        >
          <div style={{ paddingTop: '1.06rem', paddingBottom: '1.06rem', textAlign: 'center' }}>文本内容</div>
        </CenterPopup>

        <h3>自定义样式</h3>
        <Button mode='default' size='middle' onClick={() => this.setState({ visible5: true })}>显示关闭按钮</Button>
        <Popup
          visible={visible5}
          onClose={() => this.setState({ visible5: false })}
          bodyStyle={{
            minHeight: '55vh',
            borderTopLeftRadius: '0.16rem',
            borderTopRightRadius: '0.16rem'
          }}
          popupTitle="标题文本"
          showCloseButton
          mask={false}
          fieldid='fieldid-popup-5'
          className='popup-demo-color'
        >
          {mockContentWithCloseIconTitle}
        </Popup>
        <br />

        <Button mode='default' size='middle' onClick={() => this.setState({ visible6: true })}>显示右侧弹出关闭按钮</Button>
        <Popup
          visible={visible6}
          onClose={() => this.setState({ visible6: false })}
          showCloseButton
          position='right'
          fieldid='fieldid-popup-6'
          className='popup-demo-color'
        >
          {mockContentWithCloseIcon}
        </Popup>
        <br />

        <Button mode='default' size='middle' onClick={() => this.setState({ visible7: true })} className='last-button'>内容超长滚动</Button>
        <Popup
          visible={visible7}
          onMaskClick={() => this.setState({ visible7: false })}
          fieldid='fieldid-popup-7'
          className='popup-demo-color'
        >
          <div
            style={{ height: '40vh', overflowY: 'scroll', marginRight: '0.12rem' }}
          >
            <div style={{ padding: '0.44rem 0.14rem 0.3rem 0.32rem' }}>{'这里是示例内容'.repeat(130)}</div>
          </div>
        </Popup>
      </div>
    )
  }
}