
## TabBar 属性
### API

| 属性 | 说明 | 类型 | 默认值     |
| --- | --- | --- |---------|
| activeKey | 当前激活 `item` 的 `key` | `string \| null`   | - |
| defaultActiveKey | 初始化选中 `item` 的 `key`，如果没有设置 `activeKey` | `string \| null`   | 第一个 `TabBar.Item` 的 `key` |
| onChange | 切换面板的回调 | `(key: string) => void` | -       |
| safeArea | 是否开启安全区适配 | `boolean` | `false` |
| itemList | 显示的标签	 | `TabBarItem[]`	 | `[]` |
### CSS 变量

|属性| 说明       | 默认值       | 全局变量                                        |
|----|----------|-----------|---------------------------------------------|
| --tabbar-icon-color | 子项图标颜色   | `#737373` | --ynfm-color-icon-item-tabbar             |
| --tabbar-icon-active-color | 子项图标选中颜色 | `#EE2233` | --ynfm-color-icon-item-tabbar-selected                                          |
| --tabbar-text-color | 子项标题颜色   | `#737373` | --ynfm-color-text-item-tabbar |
| --tabbar-text-active-color | 子项标题选中颜色 | `#EE2233` | --ynfm-color-text-item-tabbar-selected                |
| --tabbar-font-size | 子项图标字号   | `0.2rem`  | -                                           |
| --tabbar-icon-font-size | 子项图标字号   | `0.56rem` | -                                           |

## TabBar.Item 属性
### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| badge | 徽标，同 [Badge](/zh/components/badge) 的 `content` 属性 | `React.ReactNode \| typeof Badge.dot` | - |
| icon | 图标 | `ReactNode \| ((active: boolean) => ReactNode)` | - |
| key | 对应 `activeKey` | `string` | - |
| title | 标题 | `ReactNode \| ((active: boolean) => ReactNode)` | - |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
