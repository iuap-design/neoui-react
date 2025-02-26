
## CascaderView 属性
### API

| 属性 | 说明 | 类型 | 默认值                                                                            |
| --- | --- | --- |--------------------------------------------------------------------------------|
| activeIcon | 选中图标 | `ReactNode` | -                                                                              |
| defaultValue | 默认选中项 | `CascaderValue[]` | `[]`                                                                           |
| fieldNames | 自定义 options 中 label value disabled children 的字段 | `{ label: string, value: string, disabled: string, children: string }` | `{ label: 'label', value: 'value',disabled:'disabled', children: 'children' }` |
| onChange | 选项改变时触发 | `(value: CascaderValue[], extend: CascaderValueExtend) => void` | -                                                                              |
| onTabsChange | 切换面板的回调 | `(index: number) => void` | -                                                                              |
| options | 配置每一列的选项 | `CascaderOption[]` | -                                                                              |
| placeholder | 未选中时的提示文案 | `string` \| `(index: number) => string` | `'请选择'`                                                                        |
| value | 选中项 | `CascaderValue[]` | -                                                                              |
| loading | 开启骨架屏 | `boolean` | `false`                                                                        |
| fieldid          | dom标识 | `string `                                                        | -                                                                              | false
| className         | 样式类名 | `string` | -
| clsPrefix                                                       | class前缀       | `string`                                                          | -                                                     |

###   类型定义

```ts
type CascaderValue = string | null

type CascaderOption = {
label: string
value: string
disabled?: boolean
children?: CascaderOption[]
}

type CascaderValueExtend = {
items: (CascaderOption | null)[]
isLeaf: boolean
}
```

加载中 

你可以把 `CascaderView.optionSkeleton` 作为 `CascaderOption[]` 传入到 CascaderView 的 `options` 属性或者是 `CascaderOption` 的 `children` 中。CascaderView 会将其识别并显示出骨架屏效果。

### CSS 变量

属性                              | 说明                                    | 默认值    | 全局变量
--------------------------------|-----------------------------------------|----------|--------------------------
--color-border-tab               | 页签边框颜色                            | `#F5F5F5`  | --ynfm-color-border-tab-cascaderview
--color-icon-list               | 列表图标颜色                            | `#EE2233`  | --ynfm-color-icon-list-cascaderview
--color-text-list               | 列表文本颜色                            | `#171717`  | --ynfm-color-text-list-cascaderview
--color-text-list-disabled      | 列表禁用文本颜色                        | `#737373`  | --ynfm-color-text-list-cascaderview-disabled
--color-text-list-selected      | 列表选中文本颜色                        | `#EE2233`  | --ynfm-color-text-list-cascaderview-selected
--color-text-tab                | 页签文本颜色                            | `#171717`  | --ynfm-color-text-tab-cascaderview
--color-text-tab-selected       | 页签选中文本颜色                        | `#171717`  | --ynfm-color-text-tab-cascaderview-selected
--font-size-list                | 列表文字大小                            | `0.28rem` | --ynfm-font-size-list-cascaderview
--font-size-list-selected       | 列表选中文字大小                        | `0.28rem` | --ynfm-font-size-list-cascaderview-selected
--font-size-tab                 | 页签文字大小                            | `0.28rem` | --ynfm-font-size-tab-cascaderview
--font-size-tab-selected        | 页签选中文字大小                        | `0.28rem` | --ynfm-font-size-tab-cascaderview-selected
--font-weight-list              | 列表文字粗细                            | `400`      | --ynfm-font-weight-list-cascaderview
--font-weight-list-selected     | 列表选中文字粗细                        | `400`      | --ynfm-font-weight-list-cascaderview-selected
--font-weight-tab               | 页签文字粗细                            | `400`      | --ynfm-font-weight-tab-cascaderview
--font-weight-tab-selected      | 页签选中文字粗细                        | `500`      | --ynfm-font-weight-tab-cascaderview-selected

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
