/**
 *
 * @title 分割线线型
 * @description 默认实线,可以选择虚线、点线、双实线。
 */

import { Divider } from '@tinper/next-ui';
import React, { Component } from "react";

class Demo3 extends Component {

    render() {
        return (
            <>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.
                    </p>
                    <Divider />

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.
                    </p>
                    <Divider lineType='dashed' />


                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.
                    </p>
                    <Divider lineType='dotted' />

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.
                    </p>
                    <Divider lineType='double' />
                </div>

                <div>
                    <Divider orientation="left" >Center Text</Divider>
                    <Divider orientation="left" lineType='dashed' >Center Text</Divider>
                    <Divider orientation="left" lineType='dotted' >Center Text</Divider>
                    <Divider orientation="left" lineType='double' >Center Text</Divider>
                </div>

                <div>
                    Text
                    <Divider type="vertical" />
                    Text
                    <Divider type="vertical" lineType='dashed' />
                    Text
                    <Divider type="vertical" lineType='dotted' />
                    Text
                    <Divider type="vertical" lineType='double' />
                    Text
                </div>
            </>
        );
    }
}

export default Demo3;
