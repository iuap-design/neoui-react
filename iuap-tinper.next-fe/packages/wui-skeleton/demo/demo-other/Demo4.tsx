/**
 * @title 包含子组件
 * @description 加载占位图包含子组件
 */

import {Skeleton, Switch} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo extends Component {
	state = {
	    loading: false,
	};

	handleActiveChange = (val: boolean) => {
	    this.setState({
	        loading: val
	    })
	}

	render() {
	    const {loading} = this.state;
	    return (
	        <div className="skeleton-article">
	            <Skeleton loading={loading}>
	                <div>
	                    <h4>Tinper-next，a design language</h4>
	                    <p style={{marginBottom: 0}}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum hic ea consectetur et
							recusandae labore quod dignissimos, laudantium non iste delectus sapiente debitis ab iure
							aut distinctio ad soluta fuga
	                    </p>
	                </div>
	            </Skeleton>
	            <Switch style={{marginTop: '24px'}} checked={loading} onChange={this.handleActiveChange}></Switch>
	        </div>
	    )
	}
}

export default Demo;
