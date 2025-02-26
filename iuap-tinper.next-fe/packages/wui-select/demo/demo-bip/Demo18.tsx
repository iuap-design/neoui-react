/**
 * @title option包含副标题
 * @description option 内容可以自定义，输入框的值可使用optionLabelProp指定回填
 */

import {Select, SelectValue} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

const data = [
    { title: '按方法结算', describe: '通过专项成本方法计算转出成本金额' },
    { title: '按内容结算', describe: '通过维护成本转出要素范围及比例等根据实际投入成本计算转出成本金额，通过维护成本转出要素范围及比例等根据实际投入成本计算转出成本金额成本金，通过维护成本转出要素范围及比例等根据实际投入成本计算转出成本金额，通过维护成本转出要素范围及比例等根据实际投入成本计算转出成本金额成本金' },
    { title: '按明细结算', describe: '根据实际投入成本明细维护转出成本金额' },
]

class Demo extends Component {
    handleChange = (value: SelectValue) => {
	    console.log(value);
    };

    render() {
        return (
            <div>
                <Select onChange={this.handleChange} dropdownClassName="custom-options" optionLabelProp="key" defaultValue="按方法结算" style={{ width: 400 }}>
                    {
                        data.map(item => (
                            <Option key={item.title} title={item.describe}>
                                <h3>{item.title}</h3>
                                <span>{item.describe}</span>
                            </Option>
                        ))
                    }
                </Select>
            </div>
        );
    }
}

export default Demo;
