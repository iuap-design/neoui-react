/**
 *
 * @title 基本
 * @description 最简单的用法。
 *
 */
import { Carousel } from '@tinper/next-ui';
import React, { Component } from 'react';

class Demo1 extends Component {

	beforeChange = (from: number, to: number) => {
	    console.log(from, to);
	}

	afterChange = (current: number) => {
	    console.log(current);
	}

	render() {
	    return (
	        <Carousel arrows autoplay fieldid="carousel" easing="linear" speed={1000} beforeChange={this.beforeChange} afterChange={this.afterChange}>
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

export default Demo1
