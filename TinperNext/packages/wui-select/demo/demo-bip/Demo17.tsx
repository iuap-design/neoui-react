/**
 * @title 极值处理
 * @description maxTagCount属性传入'auto'，模拟参照录入框效果。点击+n...按钮，展示输入框中未展示的数据，可以进行删除操作。
。 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

const ComponentChildren: React.ReactNode[] = [];
for (let i = 10; i < 36; i++) {
    ComponentChildren.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class Demo17 extends Component {
     handleChange = (value: string) => {
         console.log(`selected ${value}`);
     };

     render() {
         return (
             <Select
                 mode="multiple"
                 style={{width: 300}}
                 placeholder="请选择"
                 onChange={this.handleChange}
                 maxTagCount="auto"
             >
                 {ComponentChildren}
             </Select>
         );
     }
}

export default Demo17;
