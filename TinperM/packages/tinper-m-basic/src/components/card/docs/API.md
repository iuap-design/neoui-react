

## Card 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bodyClassName | body 自定义类名 | `string` | - |
| bodyStyle | body 自定义样式 | `React.CSSProperties` | - |
| extra | header 右边区域 | `ReactNode` | - |
| headerClassName | header 自定义类名 | `string` | - |
| headerStyle | header 自定义样式 | `React.CSSProperties` | - |
| onBodyClick | body 区域点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | - |
| onClick | 卡片点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | - |
| onHeaderClick | header 区域点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | - |
| title | header 左边区域 | `ReactNode` | - |
| className | 样式类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| fieldid | dom标识 | `string` | - |
| clsPrefix | class前缀 | `string` | `'mui'` |


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 头部             | fieldid + `"_header"` |
| 头部标题         | fieldid + `"_header_title"` |
| 内容             | fieldid + `"_body"` |
