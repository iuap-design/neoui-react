## FloatingBubble 属性

### API

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| axis | 可以进行拖动的方向，`'xy'` 表示自由移动，`'lock'` 表示只允许在拖拽开始时的方向上移动 | `'x' \| 'y' \| 'xy' \| 'lock'` | `'y'` |
| children | 气泡的内容 | ReactNode | - |
| magnetic | 自动磁吸到边界 | `'x' \| 'y'` | - |
| defaultOffset | 默认偏移位置 | `{ x: number; y: number }` | `{ x: 0, y: 0 }` |
| offset | 偏移位置 | `{ x: number; y: number }` |  |
| onOffsetChange | 偏移位置变化时的回调函数 | `(offset:{ x: number; y: number }) => void` | - |
| className | 样式类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| fieldid | dom标识 | `string` | - |
| clsPrefix | class前缀 | `string` | `'mui'` |

### CSS 变量

| 变量名 | 描述 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --background | 气泡的背景色 | `#EE2233` | `--ynfm-color-bg-floatingbubble` |
| --border-radius | 气泡的 border-radius | `50%` | `--ynfm-border-radius-floatingbubble` |
| --edge-distance | 和屏幕四周的最小间距 | `0` | `--ynfm-spacing-margin-floatingbubble` |
| --initial-position-bottom | 初始状态组件距离屏幕下边的距离 | - | - |
| --initial-position-left | 初始状态组件距离屏幕左边的距离 | - | - |
| --initial-position-right | 初始状态组件距离屏幕右边的距离 | - | - |
| --initial-position-top | 初始状态组件距离屏幕上边的距离 | - | - |
| --size-width | 气泡宽度 | `0.96rem` | `--ynfm-size-width-floatingbubble` |
| --size-height | 气泡高度 | `0.96rem` | `--ynfm-size-height-floatingbubble` |
| --z-index | 气泡的 z-index | `1` | - |

**在使用时，你必须设置 `--initial-position-top` 和 `--initial-position-bottom` 其中的一项，同时，也必须设置 `--initial-position-left` 和 `--initial-position-right` 其中的一项。**

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 按钮            | fieldid + `_button`|
