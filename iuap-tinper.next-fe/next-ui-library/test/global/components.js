import moment from 'moment'
import React from 'react'
import {prefix} from './../../../packages/wui-core/src/updatePrefix'
import {
    Alert,
    Anchor,
    AutoComplete,
    Avatar,
    Badge,
    Button,
    ButtonGroup,
    Breadcrumb,
    Calendar,
    Card,
    Cascader,
    Checkbox,
    Clipboard,
    Collapse,
    ColorPicker,
    DatePicker,
    Drawer,
    Empty,
    Form,
    Input,
    InputNumber,
    List,
    Menu,
    Modal,
    Popconfirm,
    Popover,
    Progress,
    Radio,
    Rate,
    Select,
    Slider,
    Spin,
    Steps,
    Table,
    Tabs,
    Timeline,
    TimePicker,
    Transfer,
    Tree,
    TreeSelect,
    Upload
} from './../../../packages/index.tsx'

let langTestComps = [
    {
        compName: 'Alert',
        Component: Alert,
        props: [
            {propKey: 'closeLabel', selector: `.${prefix}-alert-close`},
            {propKey: 'message', selector: `.${prefix}-alert-message`},
            {propKey: 'description', selector: `.${prefix}-alert-description`}
        ]
    },
    {
        compName: 'Anchor.antd',
        Component: Anchor,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-anchor-link-title`,
                propType: 'item',
                itemsKey: 'items',
                otherProps: {
                    antd: true,
                    items: [
                        {
                            key: 'one',
                            href: 'one',
                            title: '国内要闻'
                        }
                    ]
                }
            }
        ]
    },
    {
        compName: 'Anchor.Link',
        Component: Anchor.Link,
        ParentComp: Anchor,
        parentProps: {
            antd: true
        },
        props: [{propKey: 'title', selector: `.${prefix}-anchor-link-title`}]
    },
    {
        compName: 'AutoComplete',
        Component: AutoComplete,
        props: [
            {
                propKey: 'notFoundContent',
                selector: `.${prefix}-select-item-empty`,
                otherProps: {
                    open: true,
                    value: '333',
                    options: ['10000', '10001', '10002', '11000', '12010']
                }
            },
            {
                propKey: 'placeholder',
                selector: `.${prefix}-select-selection-placeholder`
            }
        ]
    },
    // 组件object
    {
        compName: 'Avatar',
        Component: Avatar,
        props: [
            {
                propKey: 'alt',
                selector: `.${prefix}-avatar-circle`,
                propType: 'attr',
                elementType: 'img',
                otherProps: {
                    src: 'https://baidu.com/abc.jpg'
                }
            }
        ]
    },
    {
        compName: 'Badge',
        Component: Badge,
        props: [
            {
                propKey: 'text',
                selector: `.${prefix}-badge-status-text`,
                otherProps: {
                    status: 'error'
                }
            },
            // 组件object
            {
                propKey: 'title',
                selector: `.${prefix}-badge .data-icon`,
                propType: 'attr',
                otherProps: {
                    count: 99
                }
            }
        ]
    },
    {
        compName: 'Badge.Ribbon',
        Component: Badge.Ribbon,
        props: [
            {
                propKey: 'text',
                selector: `.${prefix}-ribbon-text`
            }
        ]
    },
    {
        compName: 'Breadcrumb.Item',
        Component: Breadcrumb.Item,
        ParentComp: Breadcrumb,
        props: [
            {
                propKey: 'title',
                propType: 'attr',
                selector: `.${prefix}-breadcrumb`,
                elementType: 'span'
            }
        ]
    },
    {
        compName: 'ButtonGroup',
        Component: ButtonGroup,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-button-text-wrap`,
                propType: 'item',
                itemsKey: 'list',
                otherProps: {
                    list: [
                        {
                            title: '未读信息',
                            colors: 'primary',
                            key: 'notRead'
                        },
                        {
                            title: '已读信息',
                            colors: 'primary',
                            key: 'readed'
                        }
                    ]
                }
            }
        ]
    },
    // 组件object
    {
        compName: 'Calendar',
        Component: Calendar,
        props: [
            {
                propKey: 'content',
                selector: `.${prefix}-calendar-allDay-container-right li`,
                hasSelectorSpan: false,
                propType: 'item',
                itemsKey: 'timeEvents',
                otherProps: {
                    fullscreen: true,
                    mutiple: true,
                    type: 'hour',
                    locale: 'zh-cn',
                    defaultScrollIntoValue: moment('2022-11-01'),
                    timeEvents: [
                        {
                            start: '2022-10-09 04:00',
                            end: '2022-11-09 04:00',
                            content: '重型机械维修a',
                        }
                    ]
                }
            }
        ]
    },
    {
        compName: 'Card',
        Component: Card,
        props: [{propKey: 'title', selector: `.${prefix}-card-head-title`}]
    },
    {
        compName: 'Cascader',
        Component: Cascader,
        props: [
            // 组件object
            {
                propKey: 'placeholder',
                selector: `.${prefix}-cascader-input`,
                propType: 'attr',
                elementType: 'input'
            },
            {
                propKey: 'label',
                selector: `.${prefix}-cascader-menu-item`,
                propType: 'item',
                itemsKey: 'options',
                otherProps: {
                    popupVisible: true,
                    options: [
                        {
                            label: '山东',
                            value: 'sd'
                        }
                    ]
                }
            }
        ]
    },
    {
        compName: 'Checkbox.Group',
        Component: Checkbox.Group,
        props: [
            {
                propKey: 'label',
                selector: `.${prefix}-checkbox-label`,
                propType: 'item',
                itemsKey: 'options',
                otherProps: {
                    defaultValue: ['Apple'],
                    options: [{label: 'Apple', value: 'Apple'}]
                }
            }
        ]
    },
    {
        compName: 'Collapse',
        Component: Collapse.Panel,
        props: [
            {
                propKey: 'header',
                selector: `.collapsible-header`,
                hasSelectorSpan: false,
                otherProps: {
                    children: '任意文本'
                }
            },
            {
                propKey: 'extra',
                selector: `.${prefix}-collapse-extra`,
                otherProps: {
                    children: '任意文本',
                    header: '我是header'
                }
            }
        ]
    },
    {
        compName: 'ColorPicker',
        Component: ColorPicker,
        props: [
            {
                propKey: 'placeholder',
                selector: `.${prefix}-input`,
                propType: 'attr'
            },
            {
                propKey: 'title',
                selector: `.${prefix}-modal-title`,
                beforeCb: wrapper => {
                    wrapper.find(`.${prefix}-colorpicker-form-color-demo`).simulate('click')
                }
            },
            {
                propKey: 'cacelBtn',
                selector: `.${prefix}-button-text-wrap`,
                beforeCb: wrapper => {
                    wrapper.find(`.${prefix}-colorpicker-form-color-demo`).simulate('click')
                }
            },
            {
                propKey: 'confirmBtn',
                selector: `.${prefix}-button-text-wrap`,
                beforeCb: wrapper => {
                    wrapper.find(`.${prefix}-colorpicker-form-color-demo`).simulate('click')
                }
            }
        ]
    },
    // 组件object
    {
        compName: 'DatePicker',
        Component: DatePicker,
        props: [
            {
                propKey: 'placeholder',
                selector: `.${prefix}-picker-input`,
                propType: 'attr',
                elementType: 'input'
            }
        ]
    },
    {
        compName: 'DatePicker.RangePicker',
        Component: DatePicker.RangePicker,
        props: [
            // Expected substring: "我是组件文本"
            // Received string:    ""
            {
                propKey: 'placeholder',
                selector: `.${prefix}-picker-input`,
                propType: 'attr',
                elementType: 'input'
            },
            // 组件object
            {
                propKey: 'label',
                selector: `.${prefix}-picker-preset`,
                propType: 'item',
                itemsKey: 'ranges',
                otherProps: {
                    open: true,
                    ranges: [{label: '至过去', key: 'toPast', value: [null, moment().startOf('day')]}]
                }
            }
        ]
    },
    {
        compName: 'Drawer',
        Component: Drawer,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-drawer-header-title`,
                otherProps: {
                    show: true
                }
            }
        ]
    },
    {
        compName: 'Empty',
        Component: Empty,
        props: [
            {
                propKey: 'description',
                selector: `.${prefix}-empty-description`
            }
        ]
    },
    {
        compName: 'Form.Item',
        Component: Form.Item,
        props: [
            {
                propKey: 'label',
                selector: `.${prefix}-form-item-label label`,
                otherProps: {
                    children: <Input />
                }
            },
            {
                propKey: 'extra',
                selector: `.${prefix}-form-item-extra`,
                otherProps: {
                    children: <Input />
                }
            }
            // TODO：单测报错，实际demo运行成功
            /* {
                propKey: 'help',
                selector: `.${prefix}-form-item-explain div`,
                otherProps: {
                    children: <Input />
                },
                beforeCb: (wrapper) => {
                    wrapper.find(`.${prefix}-input`).simulate('hover')
                }
            } */
        ]
    },
    {
        compName: 'Input',
        Component: Input,
        props: [
            {
                propKey: 'placeholder',
                selector: `.${prefix}-input`,
                propType: 'attr'
            },
            {
                propKey: 'prefix',
                selector: `.${prefix}-input-simple-prefix`
            },
            {
                propKey: 'suffix',
                selector: `.${prefix}-input-simple-suffix`
            }
        ]
    },
    {
        compName: 'InputNumber',
        Component: InputNumber,
        props: [
            {
                propKey: 'addonBefore',
                selector: `.${prefix}-input-number-addonBefore`
            },
            {
                propKey: 'addonAfter',
                selector: `.${prefix}-input-number-addonAfter`
            }
        ]
    },
    {
        compName: 'List.Item.Meta',
        Component: List.Item.Meta,
        props: [
            {
                propKey: 'description',
                selector: `.${prefix}-list-item-meta-description`
            },
            {
                propKey: 'title',
                selector: `.${prefix}-list-item-meta-title`
            }
        ]
    },
    // Expected substring: "我是组件文本"
    // Received string:    ""
    {
        compName: 'Menu.Item',
        Component: Menu.Item,
        ParentComp: Menu,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-menu-item`,
                propType: 'attr'
            }
        ]
    },
    {
        compName: 'Menu.SubMenu',
        Component: Menu.SubMenu,
        ParentComp: Menu,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-menu-submenu-title`
            }
        ]
    },
    {
        compName: 'Menu.ItemGroup',
        Component: Menu.ItemGroup,
        ParentComp: Menu,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-menu-item-group-title`
            }
        ]
    },
    {
        compName: 'Modal',
        Component: Modal,
        props: [
            {
                propKey: 'cancelText',
                selector: `.${prefix}-button-text-wrap`,
                otherProps: {
                    show: true
                }
            },
            {
                propKey: 'okText',
                selector: `.${prefix}-button-text-wrap`,
                otherProps: {
                    show: true
                }
            },
            {
                propKey: 'title',
                selector: `.${prefix}-modal-title`,
                otherProps: {
                    show: true
                }
            }
        ]
    },
    {
        compName: 'Popconfirm',
        Component: Popconfirm,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-popover-message-title`,
                otherProps: {
                    visible: true
                }
            },
            {
                propKey: 'content',
                selector: `.${prefix}-popover-message-content`,
                otherProps: {
                    visible: true
                }
            },
            {
                propKey: 'cancel_btn',
                selector: `.${prefix}-popover-buttons`,
                hasSelectorSpan: false,
                otherProps: {
                    visible: true
                }
            },
            {
                propKey: 'close_btn',
                selector: `.${prefix}-popover-buttons`,
                hasSelectorSpan: false,
                otherProps: {
                    visible: true
                }
            }
        ]
    },
    {
        compName: 'Popover',
        Component: Popover,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-popover-title`,
                otherProps: {
                    show: true
                }
            },
            {
                propKey: 'content',
                selector: `.${prefix}-popover-inner-content`,
                otherProps: {
                    show: true
                }
            }
        ]
    },
    {
        compName: 'Radio.Group',
        Component: Radio.Group,
        props: [
            {
                propKey: 'label',
                selector: `.${prefix}-radio-label`,
                propType: 'item',
                itemsKey: 'options',
                otherProps: {
                    defaultValue: ['Apple'],
                    options: [{label: 'Apple', value: 'Apple'}]
                }
            }
        ]
    },
    {
        compName: 'Rate',
        Component: Rate,
        props: [
            {
                propKey: 'tooltips',
                selector: `.${prefix}-tooltip-inner`,
                propType: 'arr',
                itemsKey: 'options',
                otherProps: {
                    value: 3,
                    options: ['极差']
                },
                beforeCb: wrapper => {
                    wrapper.find(`.${prefix}-rate-star-first`).at(0).simulate('hover')
                }
            }
        ]
    },
    {
        compName: 'Select',
        Component: Select,
        props: [
            {
                propKey: 'notFoundContent',
                selector: `.${prefix}-select-item-empty`,
                otherProps: {
                    open: true,
                    showSearch: true,
                    options: [
                        {
                            key: 'vision',
                            label: '幻视'
                        }
                    ]
                },
                beforeCb: wrapper => {
                    wrapper
                        .find(`.${prefix}-select-selection-search-input`)
                        .simulate('change', {target: {value: '222'}})
                }
            },
            {
                propKey: 'placeholder',
                selector: `.${prefix}-select-selection-placeholder`
            },
            {
                propKey: 'label',
                selector: `.${prefix}-select-item-option-content`,
                propType: 'item',
                itemsKey: 'options',
                otherProps: {
                    open: true,
                    options: [
                        {
                            label: '山东',
                            key: 'sd'
                        }
                    ]
                }
            },
            {
                propKey: 'maxTagPlaceholder',
                selector: `.${prefix}-select-selection-overflow-item-rest .${prefix}-select-selection-item-content`,
                otherProps: {
                    children: (
                        <>
                            <Option value='spring'>春天</Option>
                            <Option value='summer'>夏天</Option>
                            <Option value='autumn'>秋天</Option>
                            <Option value='winter'>冬天</Option>
                        </>
                    ),
                    defaultValue: ['spring', 'summer'],
                    maxTagCount: 1,
                    mode: 'tags'
                }
            }
        ]
    },
    // 组件object
    {
        compName: 'Select.Option',
        Component: Select.Option,
        ParentComp: Select,
        parentProps: {
            open: true
        },
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-select-item-option`,
                propType: 'attr',
                hasSelectorSpan: false
            }
        ]
    },
    {
        compName: 'Spin',
        Component: Spin,
        props: [
            {
                propKey: 'tip',
                selector: `.${prefix}-spin-desc`,
                otherProps: {
                    spinning: true
                }
            }
        ]
    },
    {
        compName: 'Steps',
        Component: Steps,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-steps-item-title`,
                propType: 'item',
                itemsKey: 'items',
                otherProps: {
                    items: [
                        {
                            title: '123',
                            description: '456'
                        }
                    ]
                }
            }
        ]
    },
    {
        compName: 'Steps.Step',
        Component: Steps.Step,
        ParentComp: Steps,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-steps-item-title`
            },
            {
                propKey: 'description',
                selector: `.${prefix}-steps-item-description`
            },
            {
                propKey: 'subTitle',
                selector: `.${prefix}-steps-item-subtitle`
            }
        ]
    },
    {
        compName: 'Table',
        Component: Table,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-table-title`,
                isFunctionNode: true
            },
            {
                propKey: 'footer',
                selector: `.${prefix}-table-footer`,
                isFunctionNode: true
            },
            {
                propKey: 'emptyText',
                selector: `.${prefix}-table-placeholder`,
                isFunctionNode: true
            }
        ]
    },
    {
        compName: 'Tabs',
        Component: Tabs,
        props: [
            {
                propKey: 'placeholder',
                selector: `.${prefix}-tabs-tabpane-inactive`,
                hasSelectorSpan: false,
                propType: 'item',
                itemsKey: 'items',
                otherProps: {
                    activeKey: '2',
                    items: [
                        {
                            key: '1',
                            tab: `Tab 1`,
                            children: `Content of Tab Pane 1`,
                            placeholder: '懒加载内容'
                        },
                        {
                            key: '2',
                            tab: `Tab 2`,
                            children: `Content of Tab Pane 2`
                        },
                    ]
                }
            }
        ]
    },
    {
        compName: 'Tabs.TabPane',
        Component: Tabs.TabPane,
        ParentComp: Tabs,
        props: [
            {
                propKey: 'tab',
                selector: `.${prefix}-tabs-tab`
            }
        ]
    },
    {
        compName: 'Timeline.Item',
        Component: Timeline.Item,
        ParentComp: Timeline,
        props: [
            {
                propKey: 'label',
                selector: `.${prefix}-timeline-item-label`
            }
        ]
    },
    // 组件object
    {
        compName: 'TimePicker',
        Component: TimePicker,
        props: [
            {
                propKey: 'clearText',
                selector: `.${prefix}-time-picker .uf-close-c`,
                hasSelectorSpan: false,
                propType: 'attr',
                attrName: 'title',
                otherProps: {
                    value: '10:10:11'
                }
            },
            {
                propKey: 'placeholder',
                selector: `.${prefix}-time-picker-input `,
                hasSelectorSpan: false,
                propType: 'attr'
            }
        ]
    },
    {
        compName: 'Transfer',
        Component: Transfer,
        props: [
            {
                propKey: 'titles',
                selector: `.${prefix}-transfer-list-header-title`,
                propType: 'arr',
                itemsKey: 'titles',
                otherProps: {
                    titles: ['Source', 'Target']
                }
            },
            {
                propKey: 'title',
                selector: `.${prefix}-transfer-list-content-item>span`,
                propType: 'item',
                itemsKey: 'dataSource',
                otherProps: {
                    lazy: {container: 'modal'},
                    dataSource: [
                        {
                            key: '1',
                            title: `content1`
                        }
                    ]
                }
            }
        ]
    },
    {
        compName: 'Tree',
        Component: Tree,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-tree-title`,
                propType: 'item',
                itemsKey: 'treeData',
                otherProps: {
                    treeData: [
                        {
                            title: '0-332',
                            key: '0-2',
                            ext: '自定义属性'
                        }
                    ]
                }
            },
            {
                propKey: 'renderTitle',
                selector: `.${prefix}-tree-title`,
                isFunctionNode: true,
                otherProps: {
                    treeData: [
                        {
                            title: '0-332',
                            key: '0-2',
                            ext: '自定义属性'
                        }
                    ]
                }
            }
        ]
    },
    {
        compName: 'Tree.TreeNode',
        Component: Tree.TreeNode,
        ParentComp: Tree,
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-tree-title`
            }
        ]
    },
    {
        compName: 'TreeSelect',
        Component: TreeSelect,
        props: [
            {
                propKey: 'notFoundContent',
                selector: `.${prefix}-select-empty`,
                otherProps: {
                    open: true,
                    showSearch: true
                }
            },
            {
                propKey: 'placeholder',
                selector: `.${prefix}-select-selection-placeholder`
            },
            {
                propKey: 'title',
                selector: `.${prefix}-select-tree-title`,
                propType: 'item',
                itemsKey: 'treeData',
                otherProps: {
                    open: true,
                    treeData: [
                        {
                            title: '0-332',
                            key: '0-2',
                            value: '自定义属性'
                        }
                    ]
                }
            }
        ]
    },
    {
        compName: 'TreeSelect.TreeNode',
        Component: TreeSelect.TreeNode,
        ParentComp: TreeSelect,
        parentProps: {
            open: true
        },
        props: [
            {
                propKey: 'title',
                selector: `.${prefix}-select-tree-title`
            }
        ]
    },
    // 组件object
    {
        compName: 'Upload',
        Component: Upload,
        props: [
            {
                propKey: 'downloadText',
                selector: `.${prefix}-upload-list-item-actions i`,
                hasSelectorSpan: false,
                propType: 'attr',
                attrName: 'title',
                otherProps: {
                    defaultFileList: [
                        {
                            uid: -2,
                            name: 'zzz.png',
                            status: 'done',
                            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                        }
                    ],
                    showUploadList: {
                        showDownloadIcon: true
                    }
                }
            },
            {
                propKey: 'removeText',
                selector: `.${prefix}-upload-list-item-actions i`,
                hasSelectorSpan: false,
                propType: 'attr',
                attrName: 'title',
                otherProps: {
                    defaultFileList: [
                        {
                            uid: -2,
                            name: 'zzz.png',
                            status: 'done',
                            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                        }
                    ],
                    showUploadList: {
                        showRemoveIcon: true
                    }
                }
            }
        ]
    }
]

export { langTestComps }
