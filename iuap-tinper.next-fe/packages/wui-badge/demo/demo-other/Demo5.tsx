/**
 * @title fieldid
 * @description 给生成的角标添加fieldid
 */

import React, { Component } from 'react';
import { Badge } from "@tinper/next-ui";

class Demo5 extends Component {
    render() {
        return (
            <>
                <Badge offset={[5, 0]} count={18} overflowCount={9} style={{marginRight: 20}} title="这是一段文字" fieldid={'field-badge'} id={'badge'}>
                    <a href="javascript:void(0)" className="badge-example" />
                </Badge>
                <Badge dot={true} style={{marginRight: 20}} dataBadgePlacement="bottom" fieldid={'field-badge-1'} id={'badge-1'}>
                    <a href="javascript:void(0)" className="badge-example" />
                </Badge>
            </>
        )
    }
}
export default Demo5;
