/**
 *
 * @title pending Timeline
 * @description 当Timeline还未完成或者正在进行,将幽灵节点放到最后。通过设置 pending={true} 或者 pending={a React Element}。
 *
 */
import {Timeline, Switch, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

interface TimelineState {
	seeMore: boolean;
	reverse: boolean;
	dataSource: string[];
	pendingDot: boolean;
}

class Demo3 extends Component<{}, TimelineState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            seeMore: true,
            reverse: false,
            pendingDot: false,
            dataSource: ['Create a services site 2015-09-01', 'Solve initial network problems 2015-09-01', 'Technical testing 2015-09-01']
        }
    }

	handleClick = () => {
	    let newDataSource = this.state.dataSource.concat(['Network problems being solved 2019-03-01', 'Network problems being solved 2019-03-02', 'Network problems being solved 2019-03-03']);
	    this.setState({
	        seeMore: false,
	        dataSource: newDataSource
	    })
	}

	onSwitchChange = (b: boolean) => {
	    this.setState({
	        reverse: b
	    })
	}

	onPendingDotChange = (b: boolean) => {
	    this.setState({
	        pendingDot: b
	    })
	}

	render() {
	    let {seeMore, dataSource, reverse, pendingDot} = this.state;
	    let timelineList = dataSource.map((item) => {
	        return <Timeline.Item key={item}>{item}</Timeline.Item>
	    })
	    return (
	        <>
	            <Timeline pending={seeMore ? <a onClick={this.handleClick}>See more</a> : false} reverse={reverse} pendingDot={pendingDot ? <Icon type="uf-gengduo" /> : undefined}>
	            	{timelineList}
	        	</Timeline>
	            <div style={{
	                marginTop: 20,
	            }}>
                	reverse: <Switch checked={reverse} onChange={this.onSwitchChange}/>
	                <br />
	                <br />
					pendingDot: <Switch checked={pendingDot} onChange={this.onPendingDotChange}/>
	            </div>
	        </>
	    )
	}
}

export default Demo3;


