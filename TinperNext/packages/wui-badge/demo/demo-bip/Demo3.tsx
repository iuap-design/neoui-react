/**
 * @title 基本样式Badge
 * @description `dot`控制圆点是否显示。
 * @type bip
 */

import {Badge, Switch} from "@tinper/next-ui";
import React, {Component} from 'react';

interface BadgeState {
    show: boolean
}
class Demo1 extends Component<{}, BadgeState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            show: true
        }
    }

    onChange = () => {
        this.setState({
	        show: !this.state.show
	    });
    }

    render() {
        const {show} = this.state
        return (
            <>
                <Badge style={{marginRight: 20}} dot={show}>
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Switch checked={show} onChange={this.onChange} />
            </>
        )
    }
}

export default Demo1;
