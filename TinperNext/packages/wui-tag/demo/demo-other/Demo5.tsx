/**
 *
 * @title 可选标签
 * @description 设置select=true 可以表示选中和未选中两种状态的标签。
 * @type other
 * demo5
 */
import {Tag} from '@tinper/next-ui';
import React, {Component} from 'react';

interface DemoState {
	tagList: { name: string, selected: boolean }[]
}

class Demo5 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tagList: [
                {name: '部门', selected: true},
                {name: '职级', selected: true},
                {name: '年份', selected: false},
                {name: '月份', selected: false}
            ]
        }
    }

	handleTagClick = (e: React.InvalidEvent<HTMLElement> & React.MouseEvent<HTMLElement>) => {
	    const {tagList} = this.state;
	    const name = e.target?.innerText;
	    const newTagList = tagList.reduce((arr, item) => {
	        if (item.name === name) {
	            return [...arr, {...item, selected: !item.selected}]
	        }
	        return [...arr, item]
	    }, [])
	    this.setState({
	        tagList: [...newTagList]
	    })
	    console.log('tagList', newTagList);
	}

	render() {
	    const {tagList} = this.state;
	    return (
	        <div className="demoPadding">
	            {
	                tagList.map(item => <Tag onClick={this.handleTagClick} key={item.name} select={true}
											 selected={item.selected}>{item.name}</Tag>)
	            }
	        </div>
	    )
	}
}

export default Demo5;
