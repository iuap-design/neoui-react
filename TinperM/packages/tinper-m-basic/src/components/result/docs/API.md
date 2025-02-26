
## Result 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 描述 | `ReactNode \| string` | - |
| icon | 自定义 `icon` | `ReactNode` | - |
| status | 状态类型 | `'success' \| 'error' \| 'info' \| 'waiting' \| 'warning'` | `'info'` |
| title | 标题 | `ReactNode \| string` | - |
| fieldid  | dom标识        | `string`  | -      |
| className | 样式class | `string` | - |
| style | 样式style | `React.CSSProperties` | - |
| clsPrefix | 样式前缀 | `string` | `mui` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 图标            | fieldid + `"_icon"`  |
| 标题            | fieldid + `"_title"`  |
| 描述            | fieldid + `"_description"`  |
