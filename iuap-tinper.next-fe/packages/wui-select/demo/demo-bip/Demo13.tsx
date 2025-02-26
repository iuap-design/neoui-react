/**
 * @title 定制回填内容
 * @description 使用optionLabelProp指定回填到选择框的Option属性
 */
import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const {Option} = Select;

function handleChange(value: string) {
    console.log(`selected ${value}`);
}

class Demo13 extends Component {
    render() {
        return (
            <Select
                mode='multiple'
                style={{width: 320}}
                placeholder="select one country"
                defaultValue={['china']}
                maxTagCount={3}
                fieldid="qanx"
                onChange={handleChange}
                optionLabelProp="label"
            >
                <Option value="china" label="China">
					China (中国)
                </Option>
                <Option value="russia" label="Russia">
					Russia (俄罗斯)
                </Option>
                <Option value="australia" label="Australia">
					Australia (澳大利亚)
                </Option>
                <Option value="korea" label="Korea">
					Korea (韩国)
                </Option>
            </Select>
        )
    }
}

export default Demo13;
