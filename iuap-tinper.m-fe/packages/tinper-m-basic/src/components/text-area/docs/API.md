## TextArea 属性

### API

| 属性         | 说明                                            | 类型                                                             | 默认值  |
| ------------ | ----------------------------------------------- | ---------------------------------------------------------------- | ------- |
| value        | 输入值                                          | `string`                                                         | -       |
| defaultValue | 默认值                                          | `string`                                                         | -       |
| onChange     | 文本域内容变化时触发                            | `(value: string) => void`                                        | -       |
| placeholder  | 提示文本                                        | `string`                                                         | -       |
| autoSize     | 自适应内容高度                                  | `boolean \| { minRows?: number, maxRows?: number }`              | `false` |
| rows         | 行数                                            | `number`                                                         | `3`     |
| maxLength    | 最大字符数                                      | `number`                                                         | -       |
| showClose    | 是否打开清空按钮                                  | `boolean`                                                         | `false`      |
| showCount    | 显示字数，支持自定义渲染                        | `boolean \| ((length: number, maxLength?: number) => ReactNode)` | `false` |
| id           | `textarea` 元素的 `id`，常用来配合 `label` 使用 | `string`                                                         | -       |
| fieldid      | `dom`标识                                       | `string`                                                         | -       |
| isHTML       | 是否当富文本解析                                | `boolean`                                                        | `false` |
| className    | 类名                                            | `string`                                                         | -        |
| clsPrefix    | `class`前缀                                     | `string`                                                         | `mui`     |

此外还支持以下原生属性：`autoComplete` `disabled` `readOnly` `onFocus` `onBlur` `onCompositionStart` `onCompositionEnd`

### CSS 变量
| 属性                | 说明                   | 默认值    | 全局变量                                 |
| ------------------- | ---------------------- | --------- | ---------------------------------------- |
| --color             | 文字颜色               | `#171717` | `--ynfm-color-text-textarea`             |
| --count-text-align  | 统计文字对齐方式       | `right`    | `-`       |
| --disabled-color    | 禁用状态下的文字颜色   | `#737373`  | `--ynfm-color-text-textarea-disabled`    |
| --font-size         | 字号                   | `0.3rem`   | `--ynfm-font-size-textarea`              |
| --placeholder-color | `placeholder` 文字颜色 | `#BFBFBF`  | `--ynfm-color-text-placeholder-textarea` |
| --text-align        | 文字对齐方式           | `left`     | `-`             |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_textarea"`         |
| 输入框           | fieldid + `"_textarea_element"`         |
| 清空icon           | fieldid + `"_textarea_clear"`         |
