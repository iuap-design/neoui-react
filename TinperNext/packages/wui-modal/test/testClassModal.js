/**
 *
 * @title 默认的模态框
 * @description
 *
 */

import React, {Component} from 'react';
import Button from '../../wui-button/src'
import Modal from '../src/index';

const propTypes = {
    // onExit: PropTypes.func,
    // onEnter: PropTypes.func,
    // onEntering: PropTypes.func,
    // onEntered: PropTypes.func,
    // onExiting: PropTypes.func
}
const defaultProps = {
    // onExit: (...arg) => {},
    // onEnter: (...arg) => {},
    // onEntering: (...arg) => {},
    // onEntered: (...arg) => {},
    // onExiting: (...arg) => {},
    // getPopupContainer:null
}

class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    render() {
        const {
            // onExit,
            // onEnter,
            // onExiting,
            // onEntered,
            // onEntering,
            ...others
        } = this.props
        return (
            <div id="rootD">
                <Button
                    bordered
                    className="demo-margin"
                    onClick={this.open}>
					打开模态框
                </Button>
                <Modal
                    show={this.state.showModal}
                    getPopupContainer={() => document.getElementById('rootD')}
                    containerClassName='edg'
                    //  style={{color: 'red'}}
                    // centered={true}
                    // onExit={onExit}
                    // onExiting={onExiting}
                    // onEnter={onEnter}
                    // onEntered={onEntered}
                    // onEntering={onEntering}
                    closable={true}
                    {...others}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>标表弟水电费几十块的发生了对方 水电费开始放假阿里斯顿发斯蒂芬斯柯达福建省地方师傅师傅题</Modal.Title>
                    </Modal.Header>
                    <Modal.Body tabIndex='-1'>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close} colors="secondary" style={{marginRight: 8}}>取消</Button>
                        <Button onClick={this.close} colors='primary'>确认</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

Demo1.defaultProps = defaultProps;
Demo1.propTypes = propTypes;
export default Demo1;
