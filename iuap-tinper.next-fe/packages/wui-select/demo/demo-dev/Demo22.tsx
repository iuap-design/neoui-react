/**
 * @title 自定义扩展菜单-全选
 * @description 使用 dropdownRender 对下拉菜单进行自由扩展，增加全选，取消、确定操作（二次确认）
 */

import {Select, Button, Divider, Checkbox, Icon} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

interface DemoState {
    name: string;
    items: any[];
    selectItems:string[];
    lastSelectItems:string[];
    open: boolean;
}
let index = 0;

let initData = ['derrick', 'nichole', 'michie', 'jack', 'lucy'];

class Demo22 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: '',
            items: initData,
            selectItems: [],
            lastSelectItems: [],
            open: false,
        }
    }

    selectAll = (value:boolean) =>{
        this.setState({
            selectItems: value ? [...this.state.items] : []
        })
    }

    addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        const {items: preItems} = this.state;
        this.setState({
            items: [...preItems, this.state.name || `New item ${index++}`]
        });
        this.setState({
            name: ''
        })
    };

    onSelect = (value: string[]) =>{
        this.setState({
            selectItems: value
        })
        if (value.length === 0) {
            this.setState({
                items: initData
            })
        }
    }

    handleSure = (flag:boolean) =>{
        if (flag) {
            this.setState({
                lastSelectItems: this.state.selectItems
            })
        } else {
            this.setState({
                selectItems: this.state.lastSelectItems
            })
        }
    }

    getFilterOptions = (filterOptions: any[], _options: any, searchValue: string) => {
        if (searchValue && this.state.open) {
            this.setState({
                items: [...filterOptions]
            });
        }
        if (!this.state.open) {
            this.setState({
                items: initData
            })
        }
    }


    // 检索数据为空时用于还原下拉数据
    onSearch = (value: string) => {
        if (!value) {
            this.setState({
                items: initData
            })
        }
    }

    onDropdownVisibleChange = (visible: boolean) => {
        this.setState({
            open: visible
        })
    }


    render() {
        const {items, selectItems, open} = this.state;
        return (
            <div>
                <Select
                    defaultValue="derrick"
                    style={{width: 320}}
                    value={selectItems}
                    open={open}
                    onChange={this.onSelect}
                    onDropdownVisibleChange={this.onDropdownVisibleChange}
                    getFilterOptions={this.getFilterOptions}
                    onSearch={this.onSearch}
                    mode='multiple'
                    dropdownRender={(options) => {
                        return (
                            <>
                                {options}
                                <Divider style={{margin: '8px 0'}}/>
                                <div style={{padding: '0px 9px'}}>
                                    <Checkbox checked={selectItems.length === items.length} onChange={this.selectAll} colors="primary">全选</Checkbox>
                                    <Button type="text" icon={<Icon type="uf-plus" />} onClick={this.addItem}>
                                        新增
                                    </Button>
                                    <span style={{marginLeft: 80}}>
                                        <Button onClick={()=>this.handleSure(false)} style={{marginRight: 10}} size="md" colors="secondary" >
                                            取消
                                        </Button>
                                        <Button onClick={()=>this.handleSure(true)} size="md" colors="primary" >
                                            确认
                                        </Button>
                                    </span>
                                </div>
                            </>
                        );
                    }}
                >
                    {
                        items.map(item => (<Option key={item.key ?? item} value={item.value ?? item}>{item.children ?? item}</Option>))
                    }
                </Select>
            </div>
        );
    }
}

export default Demo22;