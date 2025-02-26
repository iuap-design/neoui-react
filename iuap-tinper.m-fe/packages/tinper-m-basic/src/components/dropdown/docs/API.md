## Dropdown 属性

### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 激活的 `Item` `key` | `string \| null` | - |
| arrow | 自定义 arrow | `React.ReactNode` | - |
| position | 弹出位置 | `top \| bottom` | `top` | 
| label | 是否显示为标签样式 | `boolean` | `false` |
| closeOnClickAway | 是否在点击外部区域后自动隐藏 | `boolean` | `false` |
| closeOnMaskClick | 是否在点击遮罩后自动隐藏 | `boolean` | `true` |
| defaultActiveKey | 默认激活的 `Item` `key` | `string \| null` | `null` |
| onChange | `activeKey` 变化时触发 | `(activeKey: string \| null)=> void` | - |
| getContainer | 自定义弹窗的父容器 | `HTMLElement \| (() => HTMLElement) \| null` | `document.body` |
| fieldid | dom标识 | `string` | - |
| clsPrefix | class前缀 | `string` | `'mui'` |
### Ref

| 属性  | 说明         | 类型         |
| ----- | ------------ | ------------ |
| close | 关闭下拉菜单 | `() => void` |

### css 变量

| 属性           | 描述   | 默认值            | 全局变量                         |
| ------------------ |------| ----------------- |------------------------------|
| --icon-color       | 图标颜色 | `#475569`           | `--ynfm-color-icon-dropdown` |
| --text-color       | 文字颜色 | `#171717`           | `--ynfm-color-text-dropdown` |
| --font-size       | 文字大小 | ` 0.26rem`           | `--ynfm-font-size-dropdown`  |

## Dropdown.Item 属性
### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| arrow | 自定义 arrow | `React.ReactNode` | - |
| destroyOnClose | 不可见时是否销毁 `DOM` 结构 | `boolean` | `false` |
| forceRender | 被隐藏时是否渲染 `DOM` 结构 | `boolean` | `false` |
| highlight | 高亮 | `boolean` | `false` |
| key | 唯一值 | `string` | - |
| title | 标题 | `ReactNode` | - |
| label | 是否显示为标签样式 | `boolean` | `false` |
| onClick | 点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | - |


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
