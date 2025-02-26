/**
 * @title 基本样式Badge
 * @description `colors`控制背景颜色种类。
 */

import {Badge, Icon} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo1 extends Component {
    render() {
        return (
            <>
                <Badge offset={[5, 0]} count={18} overflowCount={9} style={{marginRight: 20}} title="这是一段文字">
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Badge count={0} showZero style={{marginRight: 20}}>
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Badge count={0} style={{marginRight: 20}}>
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Badge count={8} style={{marginRight: 20}} dataBadgePlacement="bottom">
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <br/>
                <br/>
                <Badge count={8} style={{marginRight: 20}}>
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Badge count={8} style={{marginRight: 20}} size="small">
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Badge style={{marginRight: 20}} dot>
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Badge count={8} style={{marginRight: 20}} dot>
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <br/>
                <br/>
                <Badge count={<Icon type="uf-bell"/>} style={{marginRight: 20}}>
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Badge dot={true} style={{marginRight: 20}}>
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Badge dot={true} style={{marginRight: 20}} dataBadgePlacement="bottom">
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <Badge color="#18b681" dot={true} style={{marginRight: 20}} dataBadgePlacement="bottom">
                    <a href="javascript:void(0)" className="badge-example"/>
                </Badge>
                <br/>
                <Badge count={18} style={{marginRight: 20}}/>
                <Badge count={<Icon type="uf-bell"/>} style={{marginRight: 20}}/>
                <Badge dot style={{marginRight: 20}}/>
            </>
        )
    }
}

export default Demo1;
