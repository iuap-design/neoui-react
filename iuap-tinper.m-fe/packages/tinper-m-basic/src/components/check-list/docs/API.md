## CheckList 属性
### API

| 属性 | 说明      | 类型 | 默认值                                           |
| --- |---------| --- |-----------------------------------------------|
| activeIcon | 单选选中图标  | `ReactNode` | `<Checkmark />` |
| extra | 列表右侧区域  | `(active: boolean) => ReactNode` | -                                             |
| extraAlign | extra对齐方式 | `'left' \| 'right'` | `right`                                       |
| defaultValue | 默认项     | `string[]` | `[]`                                          |
| disabled | 是否禁用    | `boolean` | `false`                                       |
| multiple | 是否允许多选  | `boolean` | `false`                                       |
| deselectable | 是否取消选中  | `boolean` | `true`                                        |
| onChange | 选项改变时触发 | `(value: string[]) => void` | -                                             |
| readOnly | 是否只读    | `boolean` | `false`                                       |
| value | 选中项     | `string[]` | `[]`                                          |
|className | 样式类名    | `string` | -                                             |
|style | 自定义样式   | `React.CSSProperties` | -                                             |
|fieldid | dom标识   | `string` | -                                             |
|clsPrefix | class前缀 | `string` | `'mui'`                                       |



此外，还支持 [List](/basic-components/list) 的 `mode` 属性

### CSS 变量


| 属性 | 说明 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --checkicon-color | 选择图标颜色 | `#EE2233` | --ynfm-color-icon-checkicon-checklist |

还支持 [List css 变量](/basic-components/list#css-变量)

## CheckList.Item 属性

### API

| 属性     | 说明     | 类型      | 默认值  |
| -------- | -------- | --------- | ------- |
| disabled | 是否禁用 | `boolean` | `false` |
| readOnly | 是否只读 | `boolean` | `false` |
| value    | 选项值   | `string`  | -       |

此外，还支持 [List.Item](/basic-components/list#listitem) 的以下属性：`title` `children` `description` `prefix` `onClick`

### CSS 变量

同 [List.Item](/basic-components/list#css-变量)


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
