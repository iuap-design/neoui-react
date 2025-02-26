/**
 *
 * @title next/prev方法
 * @description 走马灯的方法使用
 *
 */
import {Button, Carousel} from '@tinper/next-ui';
import React, {Component} from 'react';

const ButtonGroup = Button.Group;

class Demo5 extends Component {

	carousel: Carousel | null = null;

	prev = () => {
	    this.carousel && this.carousel.prev();
	}

	next = () => {
	    this.carousel && this.carousel.next();
	}

	render() {
	    return (
	        <div>
	            <ButtonGroup style={{marginBottom: '10px'}}>
	                <Button onClick={this.prev}>前一个</Button>
	                <Button onClick={this.next}>后一个</Button>
	            </ButtonGroup>
	            <Carousel ref={carousel => this.carousel = carousel}>
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

export default Demo5;
