/**
 *
 * @title 位置
 * @description placement 参数控制显示位置。位置有 12 个方向。
 */
import {Button, Tooltip} from '@tinper/next-ui'
import React, {Component} from 'react'

const btnStyle = {
    marginRight: '120px',
    marginBottom: '40px'
}

class Demo6 extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        const tip = <div>这是一个很强的提醒</div>
        const buttonWidth = 72
        return (
            <div className='demo6' style={{marginLeft: buttonWidth}}>
                <div style={{marginLeft: buttonWidth, whiteSpace: 'nowrap'}}>
                    <Tooltip arrowPointAtCenter placement='topLeft' overlay={tip} visible {...this.props}>
                        <Button colors='primary' style={btnStyle}>
                            上左
                        </Button>
                    </Tooltip>
                    <Tooltip arrowPointAtCenter placement='top' overlay={tip} visible {...this.props}>
                        <Button colors='primary' style={btnStyle}>
                            上
                        </Button>
                    </Tooltip>
                    <Tooltip arrowPointAtCenter placement='topRight' overlay={tip} visible {...this.props}>
                        <Button colors='primary' style={btnStyle}>
                            上右
                        </Button>
                    </Tooltip>
                </div>
                <div style={{width: buttonWidth, float: 'left'}}>
                    <Tooltip arrowPointAtCenter placement='leftTop' overlay={tip} visible  {...this.props}>
                        <Button colors='primary' style={btnStyle}>
                            左上
                        </Button>
                    </Tooltip>
                    <Tooltip arrowPointAtCenter placement='left' overlay={tip} visible>
                        <Button colors='primary' style={btnStyle}>
                            左
                        </Button>
                    </Tooltip>
                    <Tooltip arrowPointAtCenter placement='leftBottom' overlay={tip} visible>
                        <Button colors='primary' style={btnStyle}>
                            左下
                        </Button>
                    </Tooltip>
                </div>
                <div style={{width: buttonWidth, marginLeft: 500}}>
                    <Tooltip arrowPointAtCenter placement='rightTop' overlay={tip} visible>
                        <Button colors='primary' style={btnStyle}>
                            右上
                        </Button>
                    </Tooltip>
                    <Tooltip arrowPointAtCenter placement='right' overlay={tip} visible>
                        <Button colors='primary' style={btnStyle}>
                            右
                        </Button>
                    </Tooltip>
                    <Tooltip arrowPointAtCenter placement='rightBottom' overlay={tip} visible>
                        <Button colors='primary' style={btnStyle}>
                            右下
                        </Button>
                    </Tooltip>
                </div>
                <div style={{marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap'}}>
                    <Tooltip arrowPointAtCenter placement='bottomLeft' overlay={tip} visible>
                        <Button colors='primary' style={btnStyle}>
                            下左
                        </Button>
                    </Tooltip>
                    <Tooltip arrowPointAtCenter placement='bottom' overlay={tip} visible>
                        <Button colors='primary' style={btnStyle}>
                            下
                        </Button>
                    </Tooltip>
                    <Tooltip placement='bottomRight' overlay={tip} visible>
                        <Button colors='primary' style={btnStyle}>
                            下右
                        </Button>
                    </Tooltip>
                </div>
            </div>
        )
    }
}

export default Demo6
