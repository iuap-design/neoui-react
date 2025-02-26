/**
 * @title 多页数Pagination
 * @description 可根据参数设置功能按钮的显示，部分页数隐藏。
 * @type bip
 */

import {Pagination} from '@tinper/next-ui'
import React from 'react'

interface DemoState {
    activePage: number
}

class Demo2 extends React.Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            activePage: 1
        }
    }

    handleSelect = (activePage: number) => {
        this.setState({
            activePage: activePage
        })
    }

    render() {
        return (
            <Pagination
                showSizeChanger
                pageSizeOptions={['10', '20', '30', '50', '80']}
                total={300}
                defaultPageSize={20}
                current={this.state.activePage}
                onChange={this.handleSelect}
                itemRender={(eventKey, _type, ComponentWrap) => {
                    return <span key={eventKey}>{ComponentWrap}</span>
                }}
                onPageSizeChange={(activePage, dataNumValue) => console.log(activePage, dataNumValue)}
            />
        )
    }
}

export default Demo2
