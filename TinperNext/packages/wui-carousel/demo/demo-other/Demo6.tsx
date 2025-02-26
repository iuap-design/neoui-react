/**
 *
 * @title 拖拽面板
 * @description 手动拖拽滚动轮播图
 *
 */
import {Carousel} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo5 extends Component {

    render() {
        return (
            <Carousel draggable>
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

export default Demo5;
