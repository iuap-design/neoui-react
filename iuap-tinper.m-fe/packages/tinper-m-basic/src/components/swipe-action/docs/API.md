## SwipeAction 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closeOnAction | 是否在点击操作按钮时自动归位 | `boolean` | `true` |
| closeOnTouchOutside | 是否在点击其他区域时自动归位 | `boolean` | `true` |
| leftActions | 左侧的操作按钮列表 | `Action[]` | `[]` |
| rightActions | 右侧的操作按钮列表 | `Action[]` | `[]` |
| onAction | 点击操作按钮时触发 | `(action: Action, e: React.MouseEvent) => void` | - |
| stopPropagation | 阻止某些事件的冒泡 | `PropagationEven[]` | `[]` |
| onActionsReveal | 按钮完全出现时触发 | `(side: 'left' \| 'right') => void` | - |
| fieldid | `dom`标识 | `string` | - |
| className | 类名 | `string` | - |
| clsPrefix | `class`前缀 | `string` | `mui` |
| disabled | 禁止滑动操作功能 | `boolean` | `false` |

### Action

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 颜色 | `'light' \| 'weak' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| string` | `'light'` |
| key | 唯一标识 | `string \| number` | - |
| onClick | 点击时触发 | `(e: React.MouseEvent) => void` | - |
| text | 文字 | `ReactNode` | - |
| className | 添加类名 | `string` | - |
| style | 添加样式 | `React.CSSProperties` | - |
| icon	| 按钮图标(使用方式可参照`Button`组件示例对应属性) | `string \| React.ReactNode` | - |
| iconPosition | 图标位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `left` |

### Ref

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| close | 让滑动条归位 | `() => void` |
| show | 滑动出操作按钮，`side` 参数默认为 `right` | `(side?: 'left' \| 'right') => void` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_swipe_action"`          |
| action            | fieldid + `"_swipe_action_button_${key}"`  |
