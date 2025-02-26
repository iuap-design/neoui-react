## PickerView 属性
### API

| 属性         | 说明           | 类型                                                           | 默认值 |
| ------------ | -------------- | -------------------------------------------------------------- |--|
| columns      | 配置每一列的选项 | `PickerColumn[] \| ((value: PickerValue[]) => PickerColumn[])` | - |
| value        | 选中项         | `PickerValue[]`                                                | - |
| defaultValue | 默认选中项     | `PickerValue[]`                                                | `[]` |
| onChange     | 选项改变时触发 | `(value: PickerValue[], extend: PickerValueExtend) => void`    | - |
| mouseWheel     | 是否允许通过鼠标滚轮进行选择 | `boolean`    | false |
| renderLabel     | 自定义渲染每列展示的内容 | `(item: PickerColumnItem) => ReactNode`    | (item) => item.label |
| loading     | 是否处于加载状态  | `boolean`    | false |
| loadingContent     | 加载状态下展示的内容  | `ReactNode`    | 默认提供了转圈加载中的加载效果 |

关于 `PickerColumnItem` `PickerColumn` `PickerValue` `PickerValueExtend` 的类型定义，请参考 [Picker](./picker) 的文档。

### css 变量
| 属性                           | 说明             | 默认值      | 全局变量                              |
| ------------------------------| ----------------|-------------| -------------------------------------|
| --cell-border-style           | 单元格边线样式   | `solid`     | --ynfm-border-style-cell-pickerview  |
| --cell-border-width           | 单元格边线粗细   | `1px`       | --ynfm-border-width-cell-pickerview  |
| --cell-bg-color-selected      | 选中单元格背景颜色 | `#FFFFFF`   | --ynfm-color-bg-cell-pickerview-selected |
| --cell-border-color           | 单元格边线颜色   | `#F5F5F5`   | --ynfm-color-border-cell-pickerview |
| --cell-text-color    | 单元格文本颜色 | `#171717`   | --ynfm-color-text-cell-pickerview |
| --cell-text-color-selected    | 选中单元格文本颜色 | `#171717`   | --ynfm-color-text-cell-pickerview-selected |
| --cell-font-size              | 单元格字号       | `0.3rem`    | --ynfm-font-size-cell-pickerview    |
| --cell-font-size-selected     | 选中单元格字号   | `0.32rem`   | --ynfm-font-size-cell-pickerview-selected |
| --cell-font-weight            | 单元格字重       | `400`       | --ynfm-font-weight-cell-pickerview  |
| --cell-font-weight-selected   | 选中单元格字重   | `400`       | --ynfm-font-weight-cell-pickerview-selected |
| --cell-height                 | 单元格高度       | `1rem`      | --ynfm-size-height-cell-pickerview  |
| --height                      | 视图高度         | `4.8rem`    | --ynfm-size-height-pickerview       |
| --bg-color | 背景颜色  | `#ffffff` | --ynfm-color-bg-pickerview |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
