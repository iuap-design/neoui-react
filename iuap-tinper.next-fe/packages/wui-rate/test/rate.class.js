import React, {Component} from 'react';
import Rate from "../src/index";

class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3
        };
    }

	handChange = value => {
	    this.setState({
	        value
	    })
	}

	render() {
	    return (
	        <Rate value={this.state.value} {...this.props} onChange={this.handChange}/>
	    )
	}
}

export default Demo1;
