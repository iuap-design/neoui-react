/**
 * @title 扩展菜单
 * @description 使用 dropdownRender 对下拉菜单进行自由扩展
 */

import {Select, Button, Divider, Input, Icon} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

interface DemoState {
    name: string;
    items: string[]
}
let index = 0;

class Demo19 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: '',
            items: ['derrick', 'nichole', 'michie', 'jack', 'lucy']
        }
        this.inputRef = null;
    }
    inputRef: HTMLInputElement | null;


    onNameChange = (value: string) => {
        this.setState({
            name: value
        })
    };

    addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        const {items: preItems} = this.state;
        this.setState({
            items: [...preItems, this.state.name || `New item ${index++}`]
        });
        this.setState({
            name: ''
        })
        setTimeout(() => {
            this.inputRef?.focus();
        }, 0);
    };
    render() {
        const {name, items} = this.state;
        return (
            <div>
                <Select
                    defaultValue="derrick"
                    style={{width: 240}}
                    dropdownRender={(options) => {
                        return (
                            <>
                                {options}
                                <Divider style={{margin: '8px 0'}}/>
                                <div style={{padding: '0 8px 4px'}}>
                                    <Input
                                        placeholder="Please enter item"
                                        ref={(ref: HTMLInputElement | null) => this.inputRef = ref}
                                        value={name}
                                        style={{width: 120}}
                                        onChange={this.onNameChange}
                                    />
                                    <Button type="text" icon={<Icon type="uf-add-c" />} onClick={this.addItem}>
                                        Add item
                                    </Button>
                                </div>
                            </>
                        );
                    }}
                >
                    {
                        items.map(value => (<Option key={value} value={value}>{value}</Option>))
                    }
                </Select>
            </div>
        );
    }
}

export default Demo19;
