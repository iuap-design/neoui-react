/**
 *
 * @title 嵌套模态框
 * @description footerProps
 *
 */

import {Button, Input, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

 interface DemoState {
    showModal: boolean;
    showModal2: boolean;
    showModal3: boolean;
}
class Dev4 extends Component <{}, DemoState> {
    constructor(props:{}) {
        super(props);
        this.state = {
            showModal: false,
            showModal3: false,
            showModal2: false
        };
    }

     close = () => {
         this.setState({
             showModal: false
         });
     }

     open = () => {
         this.setState({
             showModal: true
         });
     }

     close2 = () => {
         this.setState({
             showModal2: false
         });
     }

     open2 = () => {
         this.setState({
             showModal2: true
         });
     }
     close3 = () => {
         this.setState({
             showModal3: false
         });
     }
     open3 = () => {
         this.setState({
             showModal3: true
         });
     }

     render() {

         return (
             <div className="demo-margin">
                 <Button
                     bordered
                     onClick={this.open}>
                     打开模态框
                 </Button>
                 <Modal
                     title='第二个模态框'
                     visible={this.state.showModal2}
                     onCancel={this.close2}
                     size='sm'
                     destroyOnClose={false}
                     maskClosable={false}
                     footerProps={{aaa: '111', bbb: "222", className: 'rrr'}}
                 >
                     <div> 这是第二个模态框~</div>
                     <Input/>
                 </Modal>
                 <Modal
                     title='第三个模态框'
                     visible={this.state.showModal3}
                     onCancel={this.close3}
                     size='sm'
                     destroyOnClose={false}
                     maskClosable={false}

                 >
                         这是第三个模态框~
                 </Modal>
                 <Modal
                     title='第一个模态框'
                     visible={this.state.showModal}
                     onCancel={this.close}
                     size="sm"
                     draggable
                     bodyStyle={{color: '#f00'}}
                     bodyClassName='hhhhh'
                     destroyOnClose={false}
                     maskClosable={true}
                     footerProps={{
                         className: 'footer-class'
                     }}
                 >
                     <Modal.Body className="jjj" style={{color: '#00f', display: 'block'}}>
                        这是第一个模态框
                         <Button
                             bordered
                             size="sm"
                             style={{marginLeft: 8}}
                             onClick={this.open2}
                         >
                            打开第二个模态框~
                         </Button>
                         <Button
                             bordered
                             size="sm"
                             style={{marginLeft: 8}}
                             onClick={this.open3}
                         >
                            打开第三个模态框~
                         </Button>
                     </Modal.Body>
                 </Modal>

             </div>
         )
     }
}

export default Dev4;
