
## Skeleton 属性

### API

| 属性     | 说明             | 类型      | 默认值  |
| -------- | ---------------- | --------- | ------- |
| animated | 是否启用动画效果 | `boolean` | `false` |
| fieldid  | dom标识        | `string`  | -      |
| className | 样式class | `string` | - |
| style | 样式style | `React.CSSProperties` | - |
| clsPrefix | 样式前缀 | `string` | `mui` |

### CSS 变量

| 属性            | 说明 | 默认值 |  全局变量 |
| --------------- | ---- | ------ |  -------- |
| --border-radius | 圆角 | `0.08rem`    | `--ynfm-border-radius-skeleton` |
| --height        | 高度 | `0`    | `--ynfm-size-height-skeleton` |
| --width         | 宽度 | `100%` | `--ynfm-size-width-skeleton` |

## Skeleton.Title 属性

同 Skeleton。

## Skeleton.Paragraph 属性
### API

| 属性      | 说明 | 类型     | 默认值 |
| --------- | ---- | -------- | ------ |
| lineCount | 行数 | `number` | `3`    |
| animated | 是否启用动画效果 | `boolean` | `false` |
| fieldid  | dom标识        | `string`  | -      |
| className | 样式class | `string` | - |
| style | 样式style | `React.CSSProperties` | - |
| clsPrefix | 样式前缀 | `string` | `mui` |


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 标题           | fieldid + `"_title"`  |
| 段落           | fieldid + `"_paragraph"`          |
| 行           | fieldid + `"_line_${lineCountIndex + 1}"`          |
