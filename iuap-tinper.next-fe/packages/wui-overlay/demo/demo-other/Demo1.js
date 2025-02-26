import React, {Component} from 'react'
import Overlay from '../../src';

class Demo extends Component {
    render() {
        return (<Overlay.Overlay show={true} children={<div>Demo</div>}/>)
    }
}

export default Demo;
