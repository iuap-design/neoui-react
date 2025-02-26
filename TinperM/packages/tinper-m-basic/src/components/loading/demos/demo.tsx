/**
 * @title 基础用法
 * @description: Loading
 */
import React, { Component } from 'react'
import { Loading, Button } from '@tinper/m'
export default class Demo extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      progressLoading: false,
      toastLoading: false,
      spinLoading: false,
      dotLoading: false,
      percent: 0
    }
  }

  showLoading = (key, value) => {
    if (key === 'spinLoading') {
      this.setState({ spinLoading: value });
    } else if (key === 'dotLoading') {
      this.setState({ dotLoading: value });
    } else if (key === 'progressLoading') {
      this.setState({ progressLoading: value });

      this.loadingPercent();
    } else if (key === 'toastLoading') {
      this.setState({ toastLoading: value });
      setTimeout(() => {
        this.setState({ toastLoading: false })
      }, 3000);
    }
  }

  loadingPercent = () => {
    const time = setInterval(() => {
      const { percent } = this.state
      if (percent >= 100) {
        clearInterval(time);
        this.setState({
          percent: 0,
          progressLoading: false
        })
      } else {
        this.setState({ percent: percent + 5 })
      }
    }, 100);
  }

  render() {
    const { progressLoading, spinLoading, dotLoading, toastLoading, percent } = this.state
    return (
      <div>
        <h3>基础用法</h3>
        <div style={{ background: 'var(--mui-color-background)' }}>
          <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center' }}>
            <Button fieldid='btn_border1' size='middle' mode="default" onClick={() => this.showLoading('spinLoading', !spinLoading)}>普通模式</Button>
            <div style={{ width: '60%' }}>
              <Loading fieldid='loading1' type='spinloading' show={spinLoading} content='加载中' />
            </div>
          </div>
        </div>
        <h3>点状模式</h3>
        <div style={{ background: 'var(--mui-color-background)', marginTop: '16px' }}>
          <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center' }}>
            <Button fieldid='btn_border2' size='middle' mode="default" onClick={() => this.showLoading('dotLoading', !dotLoading)}>点状模式</Button>
            <div style={{ width: '60%' }}>
              <Loading fieldid='loading2' type='dotloading' show={dotLoading} content='加载中' />
            </div>
          </div>
        </div>
        <h3>进度条模式</h3>
        <div style={{ background: 'var(--mui-color-background)', marginTop: '16px' }}>
          <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center' }}>
            <Button fieldid='btn_border3' size='middle' mode="default" onClick={() => this.showLoading('progressLoading', !progressLoading)}>进度条</Button>
            <div style={{ width: '70%' }}>
              <Loading fieldid='loading3' type='progress' show={progressLoading} percent={percent} />
            </div>
          </div>
        </div>
        <h3>弹窗模式</h3>
        <div style={{ background: 'var(--mui-color-background)', marginTop: '16px' }}>
          <div style={{ padding: '16px 12px', display: 'flex' }}>
            <Button fieldid='btn_border4' size='middle' mode="default" onClick={() => this.showLoading('toastLoading', !toastLoading)}>弹窗模式</Button>
            <div style={{ width: '60%' }}>
              <Loading fieldid='loading4' show={toastLoading} content='加载中' />
            </div>
          </div>
        </div>
        <h3>加载样式</h3>
        <div style={{ background: 'var(--mui-color-background)', marginTop: '16px' }}>
          <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50%' }}>
            <Loading fieldid='loading5' type='dotloading' loadingStyle={{ '--color': 'var(--mui-color-text)' }}/>
            <Loading fieldid='loading6' type='spinloading' loadingStyle={{ '--color': 'var(--mui-color-text)' }}/>
            <Loading fieldid='loading7' type='spinloading' loadingStyle={{ '--color': 'var(--mui-color-primary)' }}/>
          </div>
        </div>
      </div>
    )
  }
}
