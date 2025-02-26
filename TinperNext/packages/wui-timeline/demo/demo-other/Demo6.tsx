/**
 *
 * @title label自适应宽度
 * @description 不设置labelWidth，label可自适应本身宽度
 *
 */
import {Timeline, Input, Radio} from '@tinper/next-ui';
import React, {Component} from 'react';

interface TimeState {
	mode: 'left' | 'alternate' | 'right',
	lableRender: string
}

class Demo6 extends Component<{}, TimeState> {
	 constructor(props: {}) {
		 super(props)
		 this.state = {
	        mode: 'left',
	        lableRender: '2025-01-01'
		 }
	 }

	 onSwitchChange = (e: any) => {
	     this.setState({
	         mode: e.target.value
	     })
	 }

	 onLabelChange = (lableRender: string) => {
	     this.setState({
	         lableRender
	     })
	 }

	 render() {
	     const {mode, lableRender} = this.state;
		 return (
			 <>
			 	<div style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
				 	<span>label content:   </span><Input defaultValue={lableRender} style={{width: 300, marginLeft: 20}} onChange={this.onLabelChange} maxLength={25} showClose/>
	             </div>
				 <Radio.Group
	                 onChange={this.onSwitchChange}
	                 value={mode}
	                 antd
	                 style={{
	                     marginBottom: 10,
	                 }}
	             >
	                 <Radio value="left">Left</Radio>
	                 <Radio value="right">Right</Radio>
	                 <Radio value="alternate">Alternate</Radio>
	             </Radio.Group>
				 <Timeline mode={mode}>
					 <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
					 <Timeline.Item color="info" label={lableRender}>Create a services site 2015-09-01</Timeline.Item>
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
					 <Timeline.Item>
						 <p style={{marginTop: 0}}>Create a services site 2015-09-01</p>
					 </Timeline.Item>
				 </Timeline>
			 </>
		 )
	 }
}


export default Demo6;
