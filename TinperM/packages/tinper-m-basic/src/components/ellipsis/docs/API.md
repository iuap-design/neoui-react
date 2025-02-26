## Ellipsis 属性
### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| collapseText | 收起操作的文案 | `React.ReactNode` | `''` |
| content | 文本内容 | `string` | - |
| direction | 省略位置 | `'start' \| 'end' \| 'middle'` | `'end'` |
| expandText | 展开操作的文案 | `React.ReactNode` | `''` |
| onContentClick | 点击文本内容时触发 | `(e: React.MouseEvent) => void` | - |
| rows | 展示几行 | `number` | `1` |
| stopPropagationForActionButtons | 阻止展开操作，收起操作引发的事件冒泡 | `PropagationEvent[]` | `[]` |
| defaultExpanded | 是否默认展开 | `boolean` | `false` |
| style | 自定义样式   | `React.CSSProperties` | -- |   
|className | 样式类名 | `string` | -- |
|fieldid | dom标识 | `string` | -- |
|clsPrefix | class前缀 | `string` | `'mui'`|

### CSS 变量
属性|说明|默认值|全局变量
----|----|----|----
--text-color-undold | 折叠展开文字颜色 | `#006FE6` | `--ynfm-color-text-unfold-ellipsis`

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |
