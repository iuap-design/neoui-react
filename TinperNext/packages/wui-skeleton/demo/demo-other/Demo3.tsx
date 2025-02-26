/**
 * @title 占位子组件
 * @description 骨架按钮、头像、输入框和图像。
 */

import {Form, Radio, Skeleton, Space, Switch, SkeletonButtonProps, SkeletonAvatarProps} from "@tinper/next-ui";
import React, {Component} from "react";

interface DemoState {
	active: boolean;
	size: SkeletonButtonProps['size'];
	buttonShape: SkeletonButtonProps['shape'];
	avatarShape: SkeletonAvatarProps['shape'];
	skeletonRound: boolean;
	block: boolean;
	[name: string]: any;
}

class Demo extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            active: false,
            size: "default",
            buttonShape: "default",
            avatarShape: "circle",
            skeletonRound: false,
            block: false,
        };
    }

	handleActiveChange = (checked: boolean) => {
	    this.setState({active: checked});
	};

	handleSkeletonRoundChange = (checked: boolean) => {
	    this.setState({skeletonRound: checked});
	}

	handleBlockChange = (checked: boolean) => {
	    this.setState({block: checked});
	};

	handleSizeChange = (val: string & SkeletonButtonProps['size']) => {
	    this.setState({size: val});
	};

	handleShapeChange = (val: string, prop: string) => {
	    this.setState({[prop]: val});
	};

	render() {
	    const {active, size, buttonShape, block, avatarShape, skeletonRound} = this.state;
	    return (
	        <>
	            <Skeleton active={active} round={skeletonRound} paragraph={{rows: 1}}/>
	            <br/>
	            <br/>
	            <Space>
	                <Skeleton.Button
	                    active={active}
	                    size={size}
	                    shape={buttonShape}
	                    block={block}
	                />
	                <Skeleton.Avatar active={active} size={size} shape={avatarShape}/>
	                <Skeleton.Input style={{width: 200}} active={active} size={size}/>
	            </Space>
	            <br/>
	            <br/>
	            <Skeleton.Button
	                active={active}
	                size={size}
	                shape={buttonShape}
	                block={block}
	            />
	            <br/>
	            <br/>
	            <Skeleton.Image/>
	            <br/>
	            <br/>
	            <Form layout="inline" style={{margin: '16px 0'}}>
	                <Form.Item label="Active">
	                    <Switch checked={active} onChange={this.handleActiveChange}/>
	                </Form.Item>
	                <Form.Item label="Skeleton Round">
	                    <Switch checked={skeletonRound} onChange={this.handleSkeletonRoundChange}/>
	                </Form.Item>
	                <Form.Item label="Button Block">
	                    <Switch checked={block} onChange={this.handleBlockChange}/>
	                </Form.Item>
	                <Form.Item label="Size">
	                    <Radio.Group value={size} onChange={this.handleSizeChange}>
	                        <Radio.Button value="default">Default</Radio.Button>
	                        <Radio.Button value="large">Large</Radio.Button>
	                        <Radio.Button value="small">Small</Radio.Button>
	                    </Radio.Group>
	                </Form.Item>
	                <Form.Item label="Button Shape">
	                    <Radio.Group value={buttonShape} onChange={(val: string) => this.handleShapeChange(val, 'buttonShape')}>
	                        <Radio.Button value="default">Default</Radio.Button>
	                        <Radio.Button value="round">Round</Radio.Button>
	                        <Radio.Button value="circle">Circle</Radio.Button>
	                    </Radio.Group>
	                </Form.Item>
	                <Form.Item label="Avatar Shape">
	                    <Radio.Group value={avatarShape} onChange={(val: string) => this.handleShapeChange(val, 'avatarShape')}>
	                        <Radio.Button value="square">Square</Radio.Button>
	                        <Radio.Button value="circle">Circle</Radio.Button>
	                    </Radio.Group>
	                </Form.Item>
	            </Form>
	        </>
	    );
	}
}

export default Demo;
