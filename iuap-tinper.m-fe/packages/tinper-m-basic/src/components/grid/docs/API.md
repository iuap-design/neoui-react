## Grid 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列数 | `number` | - |
| gap | 格子之间的间距 | `number \| string \| [number \| string, number \| string]` | `0` |
| style | 样式 | `React.CSSProperties` | - |
| className | 样式类名 | `string` | - |
| fieldid | dom标识 | `string` | - |
| clsPrefix | class前缀 | `string` | `mui` |

### CSS 变量

| 属性             | 说明               | 默认值       | 全局变量 |
| ---------------- | ------------------ | ------------ | -------- |
| --gap            | 间距大小           | `0`          | -        |
| --gap-horizontal | 水平方向的间距大小 | `var(--gap)` | `--ynfm-spacing-gap-horizontal-grid` |
| --gap-vertical   | 垂直方向的间距大小 | `var(--gap)` | `--ynfm-spacing-gap-vertical-grid` |

## Grid.Item 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onClick | 点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | - |
| span | 跨度 | `number` | `1` |
| style | 样式 | `React.CSSProperties` | - |
| className | 样式类名 | `string` | - |
| fieldid | dom标识 | `string` | - |
| clsPrefix | class前缀 | `string` | `mui` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_grid"`          |
| 子元素            | fieldid + `"_grid_item"`  |

## FAQ

### Grid 组件的兼容性说明

Grid 组件依赖了 CSS Grid 特性，所以兼容性标准是 iOS Safari >= 10.3 和 Chrome >= 57。
