/**
 * @title 使用items组织menu菜单
 * @description 简洁方便
 */

import {Menu, MenuProps} from "@tinper/next-ui";
import React, {Component} from 'react';

interface DemoState {
	current: string;
}

const items : MenuProps['items'] = [
    {
        key: 'sub1',
        label: <span><span>组织 1</span></span>,
        children: [
            {
                type: 'group',
                label: '组 1',
                children: [
                    {
                        key: '1',
                        label: '选项 1'
                    },
                    {
                        key: '2',
                        label: '选项 2'
                    }
                ]
            },
            {
                type: 'group',
                label: '组 2',
                children: [
                    {
                        key: '3',
                        label: '选项 3'
                    },
                    {
                        key: '4',
                        label: '选项 4'
                    }
                ]
            },
            {
                key: 'sub11',
                label: <span><span>组织 11</span></span>,
                children: [
                    {
                        key: '15',
                        label: '选项 15'
                    },
                    {
                        key: '16',
                        label: '选项 16'
                    },
                    {
                        key: 'sub111',
                        label: <span><span>子项</span></span>,
                        children: [
                            {
                                key: '17',
                                label: '选项 17'
                            },
                            {
                                key: '18',
                                label: '选项 18'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        key: 'sub2',
        label: <span><span>组织 2</span></span>,
        children: [
            {
                key: '5',
                label: '选项 5'
            },
            {
                key: '6',
                label: '选项 6'
            },
            {
                key: 'demo3sub3',
                label: <span><span>子项</span></span>,
                children: [
                    {
                        key: '7',
                        label: '选项 7'
                    },
                    {
                        key: '8',
                        label: '选项 8'
                    }
                ]
            }
        ]
    },
    {
        key: 'sub3',
        label: <span><span>组织 3</span></span>,
        children: [
            {
                key: '9',
                label: '选项 9'
            },
            {
                key: '10',
                label: '选项 10'
            },
            {
                type: 'divider',
                dashed: true
            },
            {
                key: '11',
                label: '选项 11'
            },
            {
                key: '12',
                label: '选项 12'
            },
        ]
    },
]

class Demo11 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            current: '1'
        }
    }

	handleClick: MenuProps['onClick'] = (e) => {
	    console.log(e);
	    this.setState({
	        current: e.key,
	    });
	}

	render() {
	    return (
	        <Menu items={items} onClick={this.handleClick} style={{width: 240}} defaultOpenKeys={['sub2']}
				  selectedKeys={[this.state.current]} mode="inline"/>
	    )
	}
}

export default Demo11;
