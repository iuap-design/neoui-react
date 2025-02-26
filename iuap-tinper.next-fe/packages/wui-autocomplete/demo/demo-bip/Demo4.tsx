/**
 *
 * @title fieldid的使用
 * @description fieldid生成在组件最外层，选项，输入框中
 *
 */
import {AutoComplete, Button} from '@tinper/next-ui';
import React, {Component} from "react";

interface DemoState{
    value: string;
    options: string[];
    placeholder: string;
    open: boolean;
    disabled: boolean;
}

class Demo4 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: "",
            options: ["10000", "10001", "10002", "11000", "12010"],
            placeholder: "查找关键字,请输入1",
            open: false,
            disabled: false
        };
    }

     handleChange = (value: string) => {
         this.setState({
             value: value,
         });
     };

     changeOpen = () => {
         this.setState({
             open: !this.state.open,
         });
     }

     changeDisabled = () => {
         this.setState({
             disabled: !this.state.disabled,
         });
     }

     render() {
         let {value, options, placeholder, open, disabled} = this.state;
         return (
             <div className="demo" style={{marginBottom: "200px"}}>
                 <div style={{marginBottom: 16 + 'px'}}>
                     <Button onClick={this.changeOpen} style={{marginRight: 16 + 'px'}}>{open ? '隐藏面板' : '显示面板'}</Button>
                     <Button onClick={this.changeDisabled}>{disabled ? '启用' : '禁用'}</Button>
                 </div>
                 <AutoComplete
                     style={{width: "200px"}}
                     open={open}
                     disabled={disabled}
                     value={value}
                     fieldid="zuma"
                     options={options}
                     placeholder={placeholder}
                     onChange={value => this.handleChange(value as string)}
                 />
             </div>
         );
     }
}

export default Demo4;
