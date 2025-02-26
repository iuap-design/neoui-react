/**
 *
 * @title label自适应宽度
 * @description 不设置labelWidth，label可自适应本身宽度
 *
 */
import {Timeline, Switch, Radio, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

interface TimeState {
	mode: 'left' | 'alternate' | 'right',
	labelChecked: boolean,
	labelWidth: number | undefined
}

class Demo3 extends Component<{}, TimeState> {
	timeRef?: React.RefObject<Timeline>;
	 constructor(props: {}) {
		 super(props)
		 this.state = {
	        mode: 'left',
	        labelChecked: false,
	        labelWidth: undefined
		 }
	 }

	 onSwitchChange = (e: any) => {
	     this.setState({
	         mode: e.target.value
	     })
	 }

	 onLabelChange = (labelChecked: boolean) => {
		 const labelWidth = labelChecked ? 200 : undefined;
	     this.setState({
	         labelChecked,
			 labelWidth
	     })
	 }

	 render() {
	     const {mode, labelChecked, labelWidth} = this.state;
		 const lableRender = <span>12-01<sup>次日</sup> - 12-05<sup>次日</sup></span>
		 return (
			 <>
			 	labelWidth: <Switch checked={labelChecked} onChange={this.onLabelChange}/><br />
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
				 <Timeline mode={mode} labelWidth={labelWidth}>
					 <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
					 <Timeline.Item color="info" label={lableRender}>Create a services site 2015-09-01</Timeline.Item>
					 <Timeline.Item color="danger">
						 <p style={{marginTop: 0}}>Solve initial network problems 1</p>
						 <p>Solve initial network problems 2</p>
						 <p>Solve initial network problems 3 2015-09-01</p>
					 </Timeline.Item>
					 <Timeline.Item label="2015-09-01">
						 <p style={{marginTop: 0}}>Technical testing 1</p>
						 <p>Technical testing 2</p>
						 <p>Technical testing 3 2015-09-01</p>
					 </Timeline.Item>
					 <Timeline.Item label="2023-12-25 12:30:00" dot={<Icon type="uf-security-2" />}>
						 <p style={{marginTop: 0}}>Create a services site 2015-09-01</p>
					 </Timeline.Item>
				 </Timeline>
			 </>
		 )
	 }
}


export default Demo3;
