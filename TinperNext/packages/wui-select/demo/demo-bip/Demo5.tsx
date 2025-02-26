/**
 * @title 简易级联单选
 * @description 常用城市级联的选择
 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

interface DemoState {
	cities: string[];
	secondCity: string;
}

const Option = Select.Option;

const provinceData = ["Henan", "Hebei"];
const cityData = {
    Henan: ["Zhengzhou", "Luoyang", "Kaifeng"],
    Hebei: ["Shijiazhuang", "Tangshan", "Baoding"]
};

class Demo5 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0]
        };
    }

	handleProvinceChange = (value: string) => {
	    this.setState({
	        cities: cityData[value],
	        secondCity: cityData[value][0]
	    });
	};
	onSecondCityChange = (value: string) => {
	    this.setState({
	        secondCity: value
	    });
	};

	render() {
	    const provinceOptions = provinceData.map(province => (
	        <Option key={province}>{province}</Option>
	    ));
	    const cityOptions = this.state.cities.map(city => (
	        <Option key={city}>{city}</Option>
	    ));
	    return (
	        <div>
	            <Select
	                defaultValue={provinceData[0]}
	                style={{width: 110, marginRight: 6}}
	                onChange={this.handleProvinceChange}
	            >
	                {provinceOptions}
	            </Select>
	            <Select
	                value={this.state.secondCity}
	                style={{width: 110}}
	                onChange={this.onSecondCityChange}
	            >
	                {cityOptions}
	            </Select>
	        </div>
	    );
	}
}

export default Demo5;
