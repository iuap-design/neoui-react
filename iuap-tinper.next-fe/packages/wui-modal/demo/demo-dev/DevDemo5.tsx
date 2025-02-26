/**
 *
 * @title Modal.info
 * @description
 *
 */

import { Modal, Button} from '@tinper/next-ui';
import React, {Component} from 'react';


class Dev5 extends Component <{}, {showModal:boolean}> {
    constructor(props:{}) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    clickModal = () => {
        Modal.info({width: 800})
    }
    render() {
        return (
            <div>
                <Button
	                bordered
	                className="demo-margin"
	                onClick={this.clickModal}>
					打开模态框
	            </Button>
            </div>
        )
    }
}

export default Dev5;
