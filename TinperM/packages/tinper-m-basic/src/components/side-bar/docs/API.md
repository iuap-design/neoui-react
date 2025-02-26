## SideBar 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前激活 `item` 的 `key` | `string \| null` | - |
| defaultActiveKey | 初始化选中 `item` 的 `key`，如果没有设置 `activeKey` | `string \| null` | 第一个 `item` 的 `key` |
| onChange | 切换面板的回调 | `(key: string) => void` | - |
| fieldid | `dom`标识 | `string` | - |
| className | 类名 | `string` | - |
| clsPrefix | `class`前缀 | `string` | `mui` |
| style | 样式 | `React.CSSProperties` | - |

### CSS 变量

| 属性                 | 说明                 | 默认值    | 全局变量 |
| -------------------- | -------------------- | --------- |  --------- |
| --background-color   | 背景颜色             | `#f5f5f5` | `--ynfm-color-bg-sidetabbar` |
| --height             | 侧边导航高度         | `100%`    | `--ynfm-size-height-sidetabbar` |
| --item-border-radius | 当前激活`item`的圆角 | `0.16rem`     | `--ynfm-border-radius-item-sidetabbar-selected` |
| --width              | 侧边导航宽度         | `2.1rem`   | `--ynfm-size-width-sidetabbar` |

## SideBar.Item 属性

### API

| 属性     | 说明             | 类型                    | 默认值  |
| -------- | ---------------- | ----------------------- | ------- |
| badge    | 徽标             | `BadgeProps['content']` | -       |
| disabled | 是否禁用         | `boolean`               | `false` |
| key      | 对应 `activeKey` | `string`                | -       |
| title    | 显示内容         | `ReactNode`             | -       |
| className | 类名 | `string` | - |
| style | 样式 | `React.CSSProperties` | - |

## fieldid 说明

| 场景         | 生成规则                   |
| ------------ | ------------------------ |
| 根元素       | fieldid + "_side_bar"      |
| 徽标       | fieldid + "_side_bar_badge"  |