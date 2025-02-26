## Divider 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| contentPosition | 内容位置，仅在 `direction` 为 `horizontal` 时有效 | `'center' \| 'left' \| 'right'` | `'center'` |
| direction | 水平还是垂直类型 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| style | 样式style | `React.CSSProperties` | - |
| fieldid | dom标识 | `string` | - |
| className | 样式类名 | `string` | - |
| clsPrefix | class前缀 | `string` | `mui` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 内容            | fieldid + `"_contnet"`  |
