/**
 * @title 可搜索单选
 * @description showSearch属性为true的时候下拉框可搜索
 */
import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

const dataList = [
    {key: "1", value: "colombia", label: "Colombia"},
    {key: "2", value: "venezuela", label: "Venezuela"},
    {key: "3", value: "dominican", label: "Dominican Republic"}
]

class Demo7 extends Component {

    render() {
        return (
            <Select
                showSearch
                style={{width: 200}}
                placeholder="请选择"
                optionFilterProp="children"
            >
                {
                    dataList.map(da => <Option key={da.key} value={da.value} item={da}>{da.label}</Option>)
                }
            </Select>
        );
    }
}

export default Demo7;
