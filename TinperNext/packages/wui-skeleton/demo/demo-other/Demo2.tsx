/**
 * @title Skeleton复杂的组合
 * @description 多种属性的使用
 */

import {Skeleton} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo extends Component {
    render() {
        return (
            <Skeleton active avatar title paragraph={{rows: 4, width: ['50%', '60%']}}/>
        )
    }
}

export default Demo;
