/**
 *
 * @title 基础列表
 * @description 结合使用Item.Meta对文章内容进行描述
 *
 */

import {Avatar, Button, List} from '@tinper/next-ui';
import React, {Component} from 'react';

interface DemeState {
	loading: boolean;
	data: {title: string}[]
}

const dataSource = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];

class Demo extends Component {
	state: DemeState = {
	    loading: false,
	    data: [...dataSource],
	};

	// componentDidMount() {
	//   this.getData((res) => {
	//     this.setState({
	//       initLoading: false,
	//       data: res.results,
	//       list: res.results,
	//     });
	//   });
	// }

	getData = (count: number) => {
	    const {data} = this.state;

	    const requestData = [...new Array(count)].map((_c, i) => ({title: `Title ${data.length + i + 1}`}))
	    return [...this.state.data, ...requestData]
	};

	onLoadMore = () => {
	    this.setState({
	        loading: true
	    }, () => {
	        setTimeout(() => {
	            this.setState({
	                data: this.getData(3),
	                loading: false
	            })
	        }, 1000)
	    });
	};

	render() {
	    const {loading, data} = this.state;
	    const loadMore =
			!loading ? (
			    <div
			        style={{
			            textAlign: "center",
			            marginTop: 12,
			            height: 32,
			            lineHeight: "32px",
			        }}
			    >
			        <Button onClick={this.onLoadMore}>loading more</Button>
			    </div>
			) : null;

	    return (
	        <List
	            className="demo-loadmore-list"
	            loading={loading}
	            itemLayout="vertical"
	            loadMore={loadMore}
	            dataSource={data}
	            renderItem={(item) => (
	                <List.Item
	                    actions={[
	                        <a key="list-loadmore-edit">edit</a>,
	                        <a key="list-loadmore-more">more</a>,
	                    ]}
	                    extra={
	                        <img
	                            width={272}
	                            alt="logo"
	                            src="https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF"
	                        />
	                    }
	                >
	                    <List.Item.Meta
	                        avatar={
	                            <Avatar
	                                src="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg"/>
	                        }
	                        title={<a href="https://yondesign.yonyou.com/">{item.title}</a>}
	                        description="A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size."
	                    />
	                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum hic ea consectetur et
							recusandae labore quod dignissimos, laudantium non iste delectus sapiente debitis ab iure
							aut distinctio ad soluta fuga
	                    </div>
	                </List.Item>
	            )}
	        />
	    );
	}
}

export default Demo;
