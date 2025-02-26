/**
 *
 * @title 位置
 * @description 位置有 4 个方向。
 *
 */
import {Carousel, Radio, CarouselProps} from '@tinper/next-ui';
import React, {Component} from 'react';

interface Demo2State {
	dotPosition: CarouselProps['dotPosition']
}

class Demo2 extends Component {
	state: Demo2State = {
	    dotPosition: 'left',
	};
	handlePositionChange = (dotPosition: string) => {
	    this.setState({dotPosition});
	}

	render() {
	    const {dotPosition} = this.state;
	    return (
	        <div>
	            <Radio.Group
	                onChange={this.handlePositionChange}
	                value={dotPosition}
	                style={{marginBottom: 8}}
	            >
	                <Radio.Button value="top">Top</Radio.Button>
	                <Radio.Button value="bottom">Bottom</Radio.Button>
	                <Radio.Button value="left">Left</Radio.Button>
	                <Radio.Button value="right">Right</Radio.Button>
	            </Radio.Group>
	            <Carousel dotPosition={dotPosition}>
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
	        </div>
	    )
	}
}

export default Demo2
