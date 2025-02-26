
## Checkbox 属性

### API

| 属性                                                              | 说明            | 类型                                                                | 默认值                                                   |
|-----------------------------------------------------------------|---------------|-------------------------------------------------------------------|-------------------------------------------------------|
| className | 样式class       | `string`                                                          | - |
| style                                                           | 样式style       | `React.CSSProperties `                                            | -                                                     |
| fieldid                                                         | dom标识         | `string `                                                         | -                                                     |
| clsPrefix                                                       | class前缀       | `string`                                                          | -                                                     |
| block                                                           | 是否渲染为块级元素 | `boolean`                                                         | `false` |
| checked                                                         | 指定当前是否选中 | `boolean`                                                         | `false` |
| defaultChecked                                                  | 初始是否选中 | `boolean`                                                         | `false` |
| disabled                                                        | 禁用状态 | `boolean`                                                         | `false` |
| icon                                                            | 自定义 `icon` 图标 | `(checked: boolean, indeterminate: boolean) => React.ReactNode`   | - |
| id                                                              | `input` 元素的 `id`，常用来配合 `label` 使用 | `string`                                                          | - |
| indeterminate                                                   | 设置 `indeterminate` 状态，只负责样式控制 | `boolean`                                                         | `false` |
| onChange                                                        | 变化时回调函数 | `(val: boolean) => void`                                          | - |
| onClick                                                         | Checkbox 的点击事件 | `(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void` | - |
| value                                                           | 携带的标识值，用于 `Group` 模式 | `CheckboxValue`                                                   | - |
| type                                                            | 类型       | `square \| circle`                                           |`circle`                                                      |
| content                                                         | 内容       | `string`                                                          | -                                                     |

### Ref

| 属性    | 说明                         | 类型         |
| ------- | ---------------------------- | ------------ |
| check   | 触发 Checkbox 的选中         | `() => void` |
| uncheck | 触发 Checkbox 的取消选中     | `() => void` |
| toggle  | 触发 Checkbox 的选中状态切换 | `() => void` |

### CSS 变量

|属性| 说明           | 默认值       |全局变量|
|----|--------------|-----------|----|
| --font-size | 右侧文字描述的大小    | `0.3rem`  | `--ynfm-font-size-text-selector`|
| --gap       | 图标和文字描述之间的间距 | `0.16rem` | `--ynfm-spacing-gap-x-selector`|
| --icon-size | 勾选图标的大小      | `0.36rem` | `--ynfm-size-width-selector`|
|--border-radius-circle-checkbox | 圆形复选框边线圆角    | `100%`    | `--ynfm-border-radius-circle-checkbox`|
|--border-radius-square-checkbox | 方形复选框边线圆角    | `0.06rem` | `--ynfm-border-radius-square-checkbox`|
|--color-bg-selector-selected | 选中背景颜色       | `#EE2233` | `--ynfm-color-bg-selector-selected`|
|--color-bg-selector-selected-disabled | 选中背景颜色禁用     | `#F5F5F5` | `--ynfm-color-bg-selector-selected-disabled`|
|--color-border-selector | 边线颜色         | `#E5E5E5` | `--ynfm-color-border-selector`|
|--color-border-selector-disabled | 边线颜色禁用       | `#E5E5E5` | `--ynfm-color-border-selector-disabled`|
|--color-text-selector | 文字颜色         | `#171717` | `--ynfm-color-text-selector`|
|--color-text-selector-disabled | 文字颜色禁用       | `#737373` | `--ynfm-color-text-selector-disabled`|

## Checkbox.Group 属性

### API

| 参数         | 说明           | 类型                               | 默认值  |
| ------------ | -------------- | ---------------------------------- | ------- |
| defaultValue | 默认选中的选项 | `CheckboxValue[]`                  | `[]`    |
| disabled     | 整组失效       | `boolean`                          | `false` |
| onChange     | 变化时回调函数 | `(value: CheckboxValue[]) => void` | -       |
| value        | 指定选中的选项 | `CheckboxValue[]`                  | `[]`    |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
