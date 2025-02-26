/**
 * @title 分组用法
 * @description 利用OptGroup组件包裹选项实现分组，label指定小组标题。
 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;
const OptGroup = Select.OptGroup;


class Demo16 extends Component {
    render() {
        return (
            <div>
                <Select defaultValue="cn" style={{ width: 400 }}>
                    <OptGroup label="东半球国家">
                        <Option title="中国" key="cn">中国</Option>
                        <Option title="日本" key="jp">日本</Option>
                        <Option title="新西兰" key="nz">新西兰</Option>
                    </OptGroup>
                    <OptGroup label="西半球国家">
                        <Option title="美国" key="us">美国</Option>
                        <Option title="巴西" key="br">巴西</Option>
                        <Option title="阿根廷" key="ar">阿根廷</Option>
                    </OptGroup>
                </Select>
            </div>
        );
    }
}

export default Demo16;
