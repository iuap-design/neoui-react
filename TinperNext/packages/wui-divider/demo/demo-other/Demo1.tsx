/**
 *
 * @title 水平分割线
 * @description 默认水平分割，实线虚线两种类型，可在中间加入文字
 */

import {Divider} from '@tinper/next-ui';
import React, {Component} from "react";


const style: React.CSSProperties = {borderColor: '#E9EBEC'}

class Demo1 extends Component {

    render() {
        return (
            <>
                <p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
					probare, quae sunt a te dicta? Refert tamen, quo modo.
                </p>
                <Divider fieldid ="divider" />
                <p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
					probare, quae sunt a te dicta? Refert tamen, quo modo.
                </p>
                <Divider lineType="dashed" />
                <p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
					probare, quae sunt a te dicta? Refert tamen, quo modo.
                </p>
                <Divider orientation="left">Left Text</Divider>
                <p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
					probare, quae sunt a te dicta? Refert tamen, quo modo.
                </p>
                <Divider className="divider-class" style={style}/>
                <p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
					probare, quae sunt a te dicta? Refert tamen, quo modo.
                </p>
            </>
        );
    }
}

export default Demo1;
