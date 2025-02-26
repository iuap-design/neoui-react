## Tag 属性
### API
| 属性               | 说明            | 类型                                                               | 默认值         |
|------------------|---------------|------------------------------------------------------------------|-------------|
|className | 样式class       | `string`                                           | -           |
|style | 样式style       | `React.CSSProperties `                             | -           |
|fieldid | dom标识         | `string `                                          | -           |
|clsPrefix | class前缀       | `string`                                           | -           |
|label | 标签文字          | `string `                                          | -           |
|textAlign | 文字对齐方向        | `'left'\|'right'\|'center'`                          | `'left'`    |
|leftIcon | 左侧按钮          | `React.ReactNode  `                                | -           | 
|rightIcon | 右侧按钮          | `React.ReactNode`                                  | -           |
|lineNum | 文字指定行数，超出加... | `number`                                           | -           | 
|textLength | 标签最长字数,超出加... | `number`                                           | -           |
|readOnly | 是否仅展示          | `boolean`                                          | `true`      |
|visible | 是否可见          | `boolean`                                          | `true`      |
|prefix | 标签前缀          | `string`                                           | -           |
|suffix | 标签后缀          | `string`                                           | -           |
|closable | 是否可关闭         | `boolean `                                         | -           |
|closeIcon | 关闭图标          | `string / React.ReactNode`                         | -           |
|disabled | 是否禁用          | `boolean`                                          | `false`     |
|selected | 是否选中        | `boolean `                                         | `false`     |
|small | 小号标签          | `boolean`                                          | `false`     |
|color | 标签色           | `'default'\|'primary'\|'success'\|'warning'\|'danger'\|'info'\|'invalid'\|'start'\|string（6位16进制颜色值）` | `'default'` |
|fill | 填充模式          | `'solid'\|'outline'\|'none'\|'signature'`                         | ` 'solid' ` |
|round | 是否圆角          | `boolean`                                          | `false`     |
|onClick | 点击事件          | `(event: React.MouseEvent<HTMLElement, MouseEvent>) => void`                                          | -           |
|onChange | 切换选中回调        | `(selected: bool): void  `                                        | -           |
|onClose | 关闭事件          | `(event: React.MouseEvent<HTMLElement, MouseEvent>) => void`                                          | -           |
|afterClose | 关闭后回调         | `(): void `                                         | -           |
|signatureText | `fill`为`signature`时自定义文字         | `string`                                         | -           |

### CSS 变量
|属性|说明|默认值|全局变量|
|----|----|----|----|
|--background-color | 背景颜色 | `#1717171A` | `--ynfm-color-bg-fill-tag`|
|--border-radius | 圆角大小 | `0.04rem` | `--ynfm-border-radius-fill-tag`|
|--border-color | 边框颜色 | `#171717` | `--ynfm-color-border-stroke-tag`|
|--text-color | 文字颜色 | `#171717` | `--ynfm-color-text-fill-tag`|

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |
| 标签内容         | fieldid + "_tag"        |
| 关闭按钮      | fieldid + "_delete"        |
