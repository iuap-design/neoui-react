
## Radio 属性

### API

| 属性             | 说明            | 类型                                                               | 默认值                                                     |
|----------------|---------------|------------------------------------------------------------------|---------------------------------------------------------|
| className      | 样式`class`      | `string`                                           | -                                                       |
| style          | 样式`style`       | `React.CSSProperties `                             | -                                                       |
| fieldid        | `dom`标识         | `string `                                          | -                                                       |
| clsPrefix      | `class`前缀       | `string`                                           | `mui`                                                       |
| block          | 是否渲染为块级元素 | `boolean` | `false`                                                 |
| checked        | 指定当前是否选中 | `boolean` | `false`                                                 |
| defaultChecked | 初始是否选中 | `boolean` | `false`                                                 |
| disabled       | 禁用状态 | `boolean` | `false`                                                 |
| icon           | 自定义 `icon` 图标 | `(checked: boolean) => React.ReactNode` | -                                                       |
| id             | `input` 元素的 `id`，常用来配合 `label` 使用 | `string` | -                                                       |
| onChange       | 变化时回调函数 | `(val: boolean) => void` | -                                                       |
| onClick        | `Radio` 的点击事件 | `(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void` | -                                                       |
| value          | 携带的标识值，用于 `Group` 模式 | `RadioValue` | -                                                       |

### CSS 变量

 属性                              | 说明    | 默认值       |全局变量
---------------------------------|-------|-----------|----
| --font-size                     | 右侧文字描述的大小 | `0.3rem`  | `--ynfm-font-size-text-selector`
| --gap                           | 图标和文字描述之间的间距 | `0.16rem` |`--ynfm-spacing-gap-x-selector`
| --icon-size                     | 勾选图标的大小 | `0.36rem` |`--ynfm-size-width-selector`
| --color-bg-selector-selected | 选中背景颜色 | `#EE2233` | `--ynfm-color-bg-selector-selected`
| --color-bg-selector-selected-disabled | 禁用选中背景颜色 | `#F5F5F5` | `--ynfm-color-bg-selector-selected-disabled`
| --color-border-selector     | 边线颜色  | `#E5E5E5` | `--ynfm-color-border-selector`
| --color-border-selector-disabled           | 禁用边线颜色 | `#E5E5E5` | `--ynfm-color-border-selector-disabled`
| --color-text-selector                           | 文字颜色  | `#171717` | `--ynfm-color-text-selector`
| --color-text-selector-disabled        | 禁用文字颜色 | `#737373` | `--ynfm-color-text-selector-disabled`
| --border-radius-radio        | 边线圆角  | `100%`    | `--ynfm-border-radius-radio`

## Radio.Group 属性

### API

| 参数         | 说明           | 类型                          | 默认值  |
| ------------ | -------------- | ----------------------------- | ------- |
| defaultValue | 默认选中的选项 | `RadioValue \| null`          | `null`  |
| disabled     | 整组失效       | `boolean`                     | `false` |
| onChange     | 变化时回调函数 | `(value: RadioValue) => void` | -       |
| value        | 指定选中的选项 | `RadioValue \| null`          | -       |

## Radio.Control 属性

### API

| 参数              | 说明           | 类型                       | 默认值 |
|------------------| -------------- |--------------------------|---|
| mode             | 模式 tag: tag类型 list: 列表类型 | `tag \| list` | `list` |
| dataSource       | 数据源       | `dataType[]`             | - |
| onSelect         | 点击后回调 | `(data: dataType) => void` | - |
| multiple         | 是否多选 | `boolean`                | -     |
| readOnly        | 是否只读 | `boolean`                | -     |
| itemsStyle       | 选项样式 | `React.CSSProperties`    | -     |
| title            | 标题内容 | `string`    | -     |
| showCloseButton  | 是否显示关闭按钮 | `boolean`    | `false`    |
| mandatorySelection | 单选是否必须选中一个 | `boolean`    | `false`    |
| safeAreaBottom | 弹出框底部是否需要安全区域 | `boolean`    | `false`    |

### CSS 变量

 属性                              | 说明    | 默认值       |全局变量
---------------------------------|-------|-----------|----
| --color-background | 未选中背景颜色 | `#F5F5F5` | `--ynfm-color-bg-tag-selector`
| --color-bg-tag-selector-selected | 选中背景颜色 | `#FFE7E8` | `--ynfm-color-bg-tag-selector-selected`
| --color-border-tag-selector-selected     | 选中边线颜色  | `#EE2233` | `--ynfm-color-border-tag-selector-selected`
| --color-text-tag-selector | 未选中文字颜色 | `#171717` | `--ynfm-color-text-tag-selector`
| --color-text-tag-selector-selected    | 选中文字颜色  | `#EE2233` | `--ynfm-color-text-tag-selector-selected`
| --border-radius-tag-selector-selected        | 圆角  | `0.08rem`    | `--ynfm-border-radius-tag-selector`


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_radio"`         |
| 输入框           | fieldid + `"_radio_input"`         |
| 图标           | fieldid + `"_radio_icon"`         |
