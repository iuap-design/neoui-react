/**
 *
 * @title 可删除标签
 * @description 用户可以手动删除的标签。删除按钮支持fieledid 的设置
 * @type bip
 */
import {Divider, Input, Message, Tag} from '@tinper/next-ui';
import React from 'react';

interface DemoState {
	tags: string[];
	value: string;
}

class Demo4 extends React.Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            tags: ['员工编号', '员工姓名', '员工性别', '所属部门'],
            value: ''
        };
    }

	handleClose = (removedTag: string) => {
	    const tags = this.state.tags.filter(tag => tag !== removedTag);
	    this.setState({tags});
	}

	forMap = (tag: string) => {
	    const tagElem = (
	        <Tag visible closable key={tag}
				 onClose={(e) => {
					 e.preventDefault();
					 this.handleClose(tag);
				 }}
	        >
	            {tag}
	        </Tag>
	    );
	    return tagElem;
	}

	addTag = () => {
	    let {value} = this.state;
	    if (!value) return;
	    let tags = this.state.tags;
	    if (tags.indexOf(value) == -1) {
	        tags.push(value);
	        this.setState({
	            tags,
	            value: ''
	        })
	    } else {
	        Message.destroy();
	        Message.create({content: '此tag已经存在!', color: 'warning'});
	    }
	}
	blur = () => {
	    this.addTag()
	}
	keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
	    if (e.keyCode == 13) {
	        this.addTag()
	    }
	}

	render() {
	    const {tags, value} = this.state;
	    const tagChild = tags.map(this.forMap);

	    return (
	        <div className="demoPadding">
	            <div>
	                {tagChild}
	                <Input
	                    maxLength={8}
	                    value={value}
	                    onKeyDown={this.keyDown}
	                    onBlur={this.blur}
	                    onChange={(value: string) => this.setState({value})}
	                    style={{width: 83, height: 20}} placeholder="添加标签"
	                />
	            </div>
	            <Divider/>
	            <Tag fieldid="tag-fieldid" closable>closable</Tag>
	        </div>
	    );
	}
}

export default Demo4;
