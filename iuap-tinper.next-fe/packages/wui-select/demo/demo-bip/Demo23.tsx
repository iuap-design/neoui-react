/**
 * @title 扩展菜单-标签样式选项
 * @description 使用 dropdownRender 对下拉菜单进行自由扩展，选项以标签形式显示，并且支持手动录入下拉面板中没有的选项
 */

import { Select, Tag, Icon } from "@tinper/next-ui";
import React, { Component } from "react";
interface OptionType {
    key: string;
    value: string;
    label: string;
}
interface DemoProps {
    options: OptionType[]
}
class SingleSelect extends Component<DemoProps, { value?: string }> {
    constructor(props: DemoProps) {
        super(props);
        this.state = {
            value: '部门公用',
        }
    }
    onSelect = (val: any) => {
        const { value } = this.state;
        this.setState({
            value: value === val ? '' : val
        })
    }

    render() {
        const { value } = this.state;
        const { options, ...otherProps } = this.props;
        const getOptionsValues = (options: OptionType[]) => {
            return options.map(item => item.value)
        }
        let mergedOptions = options;
        if (value && !getOptionsValues(mergedOptions).includes(value)) {
            mergedOptions = [...mergedOptions, { key: 'new-search', value: value, label: value }];
        }
        return (
            <Select
                value={value}
                options={options}
                mode={"combobox"}
                style={{ width: 320 }}
                allowClear
                onChange={(value: string) => {
                    this.setState({ value })
                }}
                dropdownRender={() => {
                    return (
                        <div style={{ margin: "0 8px" }}>
                            <div style={{ fontWeight: 400, fontSize: "12px", color: "#bbb", textAlign: "left", lineHeight: "12px" }}>
                                <Icon style={{ fontSize: "12px", lineHeight: "12px" }} type="uf-gantanhao" />可手动输入或选择标签
                            </div>
                            {mergedOptions.map(item => {
                                const selected = value === item.value;
                                const selectedStyle = selected ? { border: "1px solid #99b6ef", background: "#eff3fc" } : {};
                                return <Tag className={selected ? "tag-single-selected" : "tag-option"} key={item.key} onClick={() => this.onSelect(item.value)} style={{ marginTop: 8, ...selectedStyle }} >
                                    {item.value}
                                </Tag>
                            })}
                        </div>
                    );
                }}
                {...otherProps}
            >
            </Select>
        );
    }
}
class MultiSelect extends Component<DemoProps, { value: any; searchValue: string, addedOptions: any[] }> {
    constructor(props: DemoProps) {
        super(props);
        this.state = {
            value: ['部门公用'],
            searchValue: "",
            addedOptions: [],
        }
    }
    onSelect = (val: any) => {
        const { value } = this.state;
        this.setState({
            value: value.includes(val) ? value.filter((item: any) => item !== val) : [...value, val]
        })
    }
    addNewOption = () => {
        const { addedOptions, value, searchValue } = this.state;
        if (searchValue && !addedOptions.includes(searchValue)) {
            this.setState({
                value: [...value, searchValue],
                addedOptions: [...addedOptions, searchValue],
                searchValue: ""
            })
        }
    }

    render() {
        const { value, searchValue, addedOptions } = this.state;
        const { options, ...otherProps } = this.props;
        const getOptionsValues = (options: OptionType[]) => {
            return options.map(item => item.value)
        }
        let mergedOptions = options;
        addedOptions.map((item, index) => {
            if (!getOptionsValues(mergedOptions).includes(item)) {
                mergedOptions = [...mergedOptions, { key: `new-added-${index}`, value: item, label: item }]
            }
        })
        if (searchValue && !getOptionsValues(mergedOptions).includes(searchValue)) {
            mergedOptions = [...mergedOptions, { key: 'new-search', value: searchValue, label: searchValue }];
        }

        return (
            <Select
                value={value}
                options={options}
                mode={"multiple"}
                style={{ width: 320 }}
                allowClear
                onChange={value => {
                    // 多选模式，删除和清除都会触发onChange, 在删除时需要清除对应的新增选项
                    this.setState({
                        value,
                        addedOptions: addedOptions.filter(item => Array.isArray(value) && value.includes(item))
                    })
                }}
                searchValue={searchValue}
                onSearch={val => {
                    // 文本框值变化时的回调
                    this.setState({ searchValue: val })
                }}
                onBlur={this.addNewOption}
                onInputKeyDown={e => {
                    if (e.key === "Enter") {
                        this.addNewOption()
                    }
                }}
                dropdownRender={() => {
                    return (
                        <div style={{ margin: "0 8px" }}>
                            <div style={{ fontWeight: 400, fontSize: "12px", color: "#bbb", textAlign: "left", lineHeight: "12px" }}>
                                <Icon style={{ fontSize: "12px", lineHeight: "12px" }} type="uf-gantanhao" />可手动输入或选择标签
                            </div>
                            {
                                mergedOptions.map(item => {
                                    const selected = value.includes(item.value);
                                    const selectedStyle = selected ? { border: "1px solid #99b6ef", background: "#eff3fc", borderTopRightRadius: 0 } : {};
                                    return <Tag className={selected ? "tag-multi-selected" : "tag-option"} key={item.key} onClick={() => this.onSelect(item.value)} style={{ marginTop: 8, ...selectedStyle }} >
                                        {item.value}
                                    </Tag>
                                })
                            }
                        </div >
                    );
                }}
                {...otherProps}
            >
            </Select >
        );
    }
}
class Demo23 extends Component<{}, {}> {
    render() {
        const options = ['部门公用', '外出使用', '实习生借用', '研发个人双机', '新员工借用', '更新借用'].map((item, index) => ({
            key: `${index + 1}`,
            value: item,
            label: item
        }));
        return (
            <div style={{ display: "flex" }}>
                <div>
                    <span style={{ margin: 10 }}>单选模式</span>
                    <SingleSelect options={options}></SingleSelect>
                </div>
                <div>
                    <span style={{ margin: 10 }}>多选模式</span>
                    <MultiSelect options={options}></MultiSelect>
                </div>
            </div >
        );
    }
}

export default Demo23;

