## selector 属性
### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列数（注意 `grid` 布局在 IOS 9 下不支持） | `number` | - |
| defaultValue | 默认项 | `SelectorValue[]` | `[]` |
| disabled | 是否全部禁止选中 | `boolean` | `false` |
| widthAdjustment | 宽度控制 | `equal \| fixed \| auto` | `equal` |
| fieldNames | 自定义 options 中 label value disabled 的字段 | `{ label: string, value: string, disabled: string }` | `{ label: 'label', value: 'value',disabled:'disabled' }` |
| multiple | 是否允许多选 | `boolean` | `false` |
| onChange | 选项改变时触发 | `(value: SelectorValue[], extend: { items: SelectorOption[] }) => void` | - |
| options | 可选项 | `SelectorOption[]` | - |
| showCheckMark | 是否显示对勾角标 | `boolean` | `true` |
| value | 选中项 | `SelectorValue[]` | - |
| fieldid  | dom标识        | `string`  | -      |
| className | 样式class | `string` | - |
| style | 样式style | `React.CSSProperties` | - |
| clsPrefix | 样式前缀 | `string` | `mui` |



### 类型定义

#### SelectorValue

```ts | pure
type SelectorValue = string | number
```

#### SelectorOption

| 属性        | 说明     | 类型            | 默认值  |
| ----------- | -------- | --------------- | ------- |
| description | 描述     | `ReactNode`     | -       |
| disabled    | 是否禁用 | `boolean`       | `false` |
| label       | 文字     | `ReactNode`     | -       |
| value       | 选项的值 | `SelectorValue` | -       |


`Selector` 支持泛型，你可以通过下面的这种方式手动控制 `value` `onChange` 等属性的类型：

```tsx
<Selector<'a' | 'b' | number>
  options={options}
  defaultValue={['a']}
  onChange={arr => console.log(arr)}
/>
```

### css 变量

| 属性                     | 描述                               | 默认值   | 全局变量                            |
|-------------------------|------------------------------------|---------|-------------------------------------|
| --border-radius         | 选项的圆角                         | 0.12rem | --ynfm-border-radius-group-selector |
| --color                 | 选项的背景颜色                     | #F5F5F5 | --ynfm-color-bg-group-selector      |
| --checked-color         | 选项选中时的背景颜色               | #FFE7E8 | --ynfm-color-bg-group-selector-selected |
| --checked-icon-color    | 选项选中时的图标颜色               | #EE2233 | --ynfm-color-icon-group-selector-selected |
| --text-color            | 选项的文字颜色                     | #171717 | --ynfm-color-text-group-selector    |
| --checked-text-color    | 选项选中时的文字颜色               | #EE2233 | --ynfm-color-text-group-selector-selected |
| --font-size             | 选项文字的字号                     | 0.28rem | --ynfm-font-size-group-selector     |
| --item-height           | 选项的高度                         | 0.96rem | --ynfm-size-height-group-selector   |
| --gap                   | 选项之间的间距                     | 0.24rem | --ynfm-spacing-gap-group-selector   |

## fieldid 说明

| 场景  | 生成规则                         |
|-----|------------------------------|
| 根元素 | fieldid                      |
| 选项  | fieldid + `-${option.value}` |
