/**
 *
 * @title labelWidth
 * @description 设置label宽度
 *
 */
import {Timeline, Switch} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo2 extends Component<{}, {checked: boolean}> {
	 constructor(props: {}) {
		 super(props)
		 this.state = {
            checked: false
		 }
	 }

	 onSwitchChange = (checked: boolean) => {
	     this.setState({
	         checked
	     })
	 }

	 render() {
	     const {checked} = this.state;
		 return (
			 <>
			 	mode right: <Switch checked={checked} onChange={this.onSwitchChange}/><br />
				 <Timeline labelWidth={200} mode={checked ? 'right' : undefined}>
					 <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
					 <Timeline.Item color="info" label="2023 12:30 --- 2026 12: 30">Create a services site 2015-09-01</Timeline.Item>
					 <Timeline.Item color="danger">
						 <p style={{marginTop: 0}}>Solve initial network problems 1</p>
						 <p>Solve initial network problems 2</p>
						 <p>Solve initial network problems 3 2015-09-01</p>
					 </Timeline.Item>
					 <Timeline.Item>
						 <p style={{marginTop: 0}}>Technical testing 1</p>
						 <p>Technical testing 2</p>
						 <p>Technical testing 3 2015-09-01</p>
					 </Timeline.Item>
				 </Timeline>
			 </>
		 )
	 }
}


export default Demo2;
