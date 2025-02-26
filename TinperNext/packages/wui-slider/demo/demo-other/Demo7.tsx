/**
 *
 * @title 带输入框的slider
 * @description 和 数字输入框 组件保持同步。
 *
 */

import {InputNumber, Slider} from "@tinper/next-ui";
import React, {Component} from 'react';

interface SliderState {
	value: number;
}
class CustomizedSlider extends React.Component<{}, SliderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: 45
        };
    }

	onInputChange = (e: string) => {
	    let value = parseInt(e);
	    if (value >= 100) {
	        value = 100;
	    } else if (value <= 0 || e == '') {
	        value = 0;
	    }
	    this.changeValue(value)
	}

	onSliderChange = (value: number) => {
	    this.changeValue(value)
	}

	changeValue = (value: number) => {
	    this.setState({
	        value: value ? value : 0
	    })
	}

	render() {
	    return (
	        <div>
	            <InputNumber iconStyle="one" onChange={this.onInputChange} min={0} max={100} autoFix
							 value={this.state.value} style={{width: 200}}/>

	            <br/><br/>
	            <Slider value={this.state.value} onChange={this.onSliderChange}/>
	        </div>
	    );
	}
}

interface CustomState {
	value: number[];
	lowerBound: number;
	upperBound: number;
}

class CustomizedRange extends React.Component<{}, CustomState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            lowerBound: 20,
            upperBound: 40,
            value: [20, 40],
        };
    }

	onLowerBoundChange = (e: string) => {
	    let upperBound = this.state.upperBound;
	    let value = parseInt(e);

	    if (value > upperBound) {
	        value = upperBound
	    } else if (value < 0 || value == 0) {
	        value = 0;
	    }
	    this.setValue(value, upperBound);
	}

	onUpperBoundChange = (e: string) => {
	    let lowerBound = this.state.lowerBound;
	    let value = parseInt(e);

	    if (value < lowerBound) {
	        value = lowerBound
	    } else if (value > 100) {
	        value = 100;
	    }
	    this.setValue(lowerBound, value);
	}

	onSliderChange = (value: number[]) => {
	    let upperBound = value[1];
	    let lowerBound = value[0];
	    this.setValue(lowerBound, upperBound);
	}

	setValue = (lowerBound: number, upperBound: number) => {
	    let min = lowerBound ? lowerBound : 0;
	    let max = upperBound ? upperBound : 0;
	    this.setState({
	        lowerBound: min,
	        upperBound: max,
	        value: [min, max]
	    })
	}

	render() {
	    return (
	        <div>
	            <div style={{display: 'flex', alignItems: 'center'}}>
	                <label style={{width: 120}}>LowerBound: </label>
	                <InputNumber iconStyle="one" onChange={this.onLowerBoundChange} value={this.state.lowerBound}
								 style={{width: 200}} min={0} max={this.state.upperBound} autoFix/>
	            </div>
	            <br/>
	            <div style={{display: 'flex', alignItems: 'center'}}>
	                <label style={{width: 120}}>UpperBound: </label>
	                <InputNumber iconStyle="one" onChange={this.onUpperBoundChange} value={this.state.upperBound}
								 style={{width: 200}} min={this.state.lowerBound} max={100} autoFix/>
	            </div>
	            <br/><br/>
	            <Slider.Range value={this.state.value} onChange={this.onSliderChange}/>
	        </div>
	    );
	}
}

class Demo7 extends Component {
	log = (value: number) => {
		console.log(value); //eslint-disable-line
	}

	render() {
	    let style = {width: 600, marginLeft: 50, marginBottom: 60}
	    return (
	        <div>
	            <div style={style}>
	                <p>Customized Range</p>
	                <CustomizedSlider/>
	            </div>
	            <div style={style}>
	                <p>Customized Range</p>
	                <CustomizedRange/>
	            </div>
	        </div>
	    )
	}
}

export default Demo7;
