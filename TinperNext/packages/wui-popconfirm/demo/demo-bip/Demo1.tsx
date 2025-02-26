/**
 *
 * @title 不同方向的气泡确认框
 *
 */

import {Button, Popconfirm} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo1 extends Component<{}, {container: HTMLElement | null}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            container: null
        }
    }

    componentDidMount() {
        if (document.getElementById('demoPadding')) {
            this.setState({container: document.getElementById('demoPadding')})
        }
    }

    render() {
        const content = '您喜欢使用tinper-next组件库吗？'
        return (
            <div className='demoPadding' id='demoPadding'>
                <Popconfirm
                    trigger='click'
                    placement='right'
                    title={<div>标题</div>}
                    description={content}
                    container={this.state.container}
                >
                    <Button colors='primary' style={{margin: 'auto 10px'}}>
                        向右
                    </Button>
                </Popconfirm>
                <Popconfirm
                    trigger='click'
                    placement='top'
                    content={content}
                    getPopupContainer={() => document.getElementById('demoPadding')}
                >
                    <Button colors='primary' style={{margin: 'auto 10px'}}>
                        向上
                    </Button>
                </Popconfirm>
                <Popconfirm trigger='click' placement='bottom' content={content}>
                    <Button colors='primary' style={{margin: 'auto 10px'}}>
                        向下
                    </Button>
                </Popconfirm>
                <Popconfirm trigger='click' placement='left' content={content}>
                    <Button colors='primary' style={{margin: 'auto 10px'}}>
                        向左
                    </Button>
                </Popconfirm>
            </div>
        )
    }
}

export default Demo1
