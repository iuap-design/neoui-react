/**
 *
 * @title 基本的Affix,带有getPopupContainer
 * @description 基本的Affix,带有getPopupContainer
 *
 */

import {Affix, Button, AffixProps} from '@tinper/next-ui';
import React, {Component} from 'react';

interface AffixState {
	container: HTMLElement | null;
}

class Demo1 extends Component<{}, AffixState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            container: null,
        }
    }

	getTarget = () => {
	    return document.getElementById('out-wrapper')
	}

	targetChange: AffixProps['onTargetChange'] = (val) => {
	    console.log(val)
	}

	change: AffixProps['onChange'] = ({affixed, event}) => {
	    console.log('affixed', affixed)
	    console.log('event', event)
	}

	componentDidMount() {
	    if (document.getElementById('outer-box')) {
	        this.setState({container: document.getElementById('outer-box')})
	    }
	}

	render() {
	    return (
	        <div className="demo1">
	            <div>某个div内的affix，getPopupContainer canHidden=true zIndex=2001</div>
	            <div className="out-wrapper" id="out-wrapper">
	                <div className="outer-box checkered stripes" id="outer-box">
	                    <Affix getPopupContainer={this.state.container} target={this.getTarget} canHidden={true}
							   zIndex={2001} onTargetChange={this.targetChange} onChange={this.change}>
	                        <Button colors="primary">affix in container</Button>
	                    </Affix>
	                </div>
	            </div>
	        </div>
	    )
	}
}


export default Demo1;
