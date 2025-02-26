/**
 *
 * @title 渐显
 * @description 切换效果为渐显。
 *
 */
import {Carousel} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo4 extends Component {
    render() {
        return (
            <Carousel effect="fade">
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
            </Carousel>
        )
    }
}

export default Demo4
