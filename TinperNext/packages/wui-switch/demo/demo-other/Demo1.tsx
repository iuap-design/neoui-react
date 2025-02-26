/**
 *
 * @title Switch模拟点击事件
 * @description
 * @type other
 */
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Switch, Button } from '@tinper/next-ui';

interface SwitchState {
	checked: boolean;
	switch: string;
}
class Demo1 extends Component<{}, SwitchState> {

    switch: HTMLElement | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            switch: "",
            checked: true
        };
    }
    onChange = (e: boolean) => {
        this.setState({
            switch: `${e}`,
            checked: !this.state.checked
        });
    };
    handleClick = () => {
        this.switch?.click?.()
    }
    render() {
        return (
            <>
                <Button onClick={this.handleClick} type='primary' style={{marginRight: 20}}>click</Button>
                <Switch
                    ref={dom => {
                        this.switch = ReactDOM.findDOMNode(dom) as HTMLElement;
                    }}
                    checked={this.state.checked}
                    onChange={this.onChange}
                    onClick={(checked) => {
                        console.log(checked)
                    }}
                    autoFocus={true}
                    enterKeyDown={false}
                />
            </>
        );
    }
}


export default Demo1;
