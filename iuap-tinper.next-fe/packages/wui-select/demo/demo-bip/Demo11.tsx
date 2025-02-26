/**
 * @title 自定义输入
 * @description mode设置为combobox的下拉框，可以输入字符串获得Select的值。例如：输入"莫斯科"，没有匹配到选项，失去焦点，下拉框的值为"莫斯科"。
 */
import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

class Demo11 extends Component {

    render() {
        return (
            <Select
                style={{width: 200}}
                placeholder="请选择城市"
                // showSearch
                allowClear
                mode="combobox"
                // optionFilterProp="children"
                // filterOption={(input, option: any) =>
                //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
            >
                <Option value="北京">北京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="guangzhou">广州</Option>
                <Option value="北京2">北京2</Option>
                <Option value="北京33">北京33</Option>
            </Select>
        );
    }
}

export default Demo11;
