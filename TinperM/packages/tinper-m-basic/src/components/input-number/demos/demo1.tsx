/**
 * @title 基础用法
 * @description InputNumber 基础用法相关示例
 */
import React, { Component } from 'react'
import { InputNumber } from '@tinper/m';
import './demo.less'

const integerMarks = [
  {
    len: 3,
    mark: '@',
    key: 'hundred'
  },
  {
    len: 4,
    mark: '#',
    key: 'thousand'
  },
  {
    len: 5,
    mark: '$',
    key: 'tenThousand'
  },
  {
    len: 6,
    mark: '%',
    key: 'hundredThousand'
  },
  {
    len: 7,
    mark: '^',
    key: 'million'
  },
  {
    len: 8,
    mark: '&',
    key: 'tenMillion'
  },
  {
    len: 9,
    mark: '*',
    key: 'hundredMillion'
  },
  {
    len: 10,
    mark: '(',
    key: 'billion'
  },
  {
    len: 11,
    mark: ')',
    key: 'tenBillion'
  },
  {
    len: 12,
    mark: '-',
    key: 'hundredBillion'
  },
  {
    len: 13,
    mark: '+',
    key: 'trillion'
  },
  {
    len: 14,
    mark: '=',
    key: 'tenTrillion'
  },
  {
    len: 15,
    mark: '~',
    key: 'hundredTrillion'
  },
  {
    len: 16,
    mark: '!',
    key: 'quadrillion'
  },
]
export default class Demo1 extends Component<any, { success: boolean, max: number, min: number, tips: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      success: false,
      max: 236,
      min: 10,
      tips: '',
    }
  }
  getTips1 = () => {
    const { success } = this.state;
    if (!success) {
      return (
        <div className='demo1-mode'>
          {this.state.tips}
        </div>
      )
    }
  }
  onError = () => {
    this.setState({ success: false })
  }
  onSuccess = () => {
    this.setState({ success: true })
  }

  handleCheck = (val) => {
    if (Number(val) > this.state.max) {
      this.setState({ tips: '值不能大于最大值' })
      return false
    } else if (Number(val) < this.state.min) {
      this.setState({ tips: '值不能小于最小值' })
      return false
    } else {
      return true
    }
  }

  handleFormat = (value: string) => {
    const formattedValue = value.toString();
    let integerPart = formattedValue.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    const decimalPart = formattedValue.split('.')[1];
    const decimalSeparator = decimalPart ? ',' : '';
    const result = decimalPart ? `${integerPart}${decimalSeparator}${decimalPart}` : integerPart;
    return result;
  }

  handleFormat1 = (value: string) => {
    console.log(value)

    const formattedValue = value.toString();
    const decimalPart = formattedValue.split('.')[1];
    let integerPart = formattedValue.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalSeparator = decimalPart ? ',' : '';
    const result = decimalPart ? `${integerPart}${decimalSeparator}${decimalPart}` : integerPart;
    return result;
  }

  handleFormat2 = (value: string) => {
    let stringValue = value.toString();
    if (stringValue.charAt(0) === '-') {
      return `${stringValue.slice(1)}-`
    } else {
      return value
    }
  }

  handleFormat3 = (value: string) => {
    let stringValue = value.toString();
    if (stringValue.charAt(0) === '-') {
      return `(${stringValue.slice(1)})`
    } else {
      return value
    }
  }

  render() {
    return (
      <div className='input-number-demo'>
        <h3>基础用法</h3>
        <InputNumber placeholder="请输入数字" showClose />

        <h3>设置默认值</h3>
        <InputNumber defaultValue={10} showClose />

        <h3>数字精度</h3>
        <InputNumber defaultValue={0.1} precision={2} showClose />

        <h3>自定义格式</h3>
        <InputNumber defaultValue={80} format={(value) => `${value}%`} showClose />

        <h3>聚焦后自动选中</h3>
        <InputNumber defaultValue={80} format={(value) => `${value}%`} showClose autoSelect/>

        <h3>千分位展示格式</h3>
        <InputNumber defaultValue={1234567.89} toThousands />
        <br />
        <InputNumber defaultValue={1234567.89} toThousands toThousandsFormat='+#.###.###.###[,]###' />
        <br />
        <InputNumber defaultValue={1234567.89} toThousands toThousandsFormat='+# ### ### ###[.]###' />

        <h3>负数格式</h3>
        <InputNumber defaultValue={-11} />
        <br />
        <InputNumber defaultValue={-11} format={this.handleFormat2} />
        <br />
        <InputNumber defaultValue={-11} format={this.handleFormat3} />

        <h3>前缀文字</h3>
        <InputNumber placeholder="请输入数字" addonBefore='¥' showClose className="addon-before-demo" />

        <h3>后缀文字</h3>
        <InputNumber placeholder="请输入数字" addonAfter='元' showClose className="addon-after-demo" />

        <h3>最大值和最小值</h3>
        <InputNumber max={236} min={10} />

        <h3>结合提示的最大值和最小值</h3>
        <InputNumber
          max={this.state.max}
          min={this.state.min}
          tips={this.getTips1()}
          customCheck={this.handleCheck}
          check
          onError={this.onError}
          onSuccess={this.onSuccess}
          defaultValue={20}
        />

        <h3>显示数量级</h3>
        <InputNumber showUnit defaultValue={888} format={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />

        <h3>自定义数量级</h3>
        <InputNumber showUnit defaultValue={888} format={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} integerMarks={integerMarks}/>

        <h3>遮掩码占位码</h3>
        <InputNumber formatReg='###****####' defaultValue='11122223333'/>
      </div>
    )
  }
}
