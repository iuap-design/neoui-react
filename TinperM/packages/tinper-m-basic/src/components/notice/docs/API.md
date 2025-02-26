## Notice 属性
### API

属性 | 说明 | 类型 | 默认值
----|-----|------|------
mode | 模式 default: 默认 modal: 弹窗 | `'default' / 'modal'` | `'default'`
noticeModalShow | 弹框是否显示 | `boolean` | `false`
title | 弹框标题 | `string` | `'Title'`
content | 内容 | `React.ReactNode` | -
onClose | 点击关闭回调 | `() => void` | -
icon | 左侧图标 | `React.ReactNode` | -
closeable | 是否可关闭 | `boolean` | `false`
color | 通告栏的类型 | `'default' / 'success' / 'alert' / 'error' / 'info'` | `'default'`
delay | 开始滚动的延迟，单位 ms | `number` | `2000`
speed | 滚动速度，单位 px/s | `number` | `50`
wrap | 是否多行展示 | `boolean` | `false`
extra | 额外操作区域，显示在关闭按钮左侧 | `React.ReactNode` | -
onClick | 点击事件 | `() => void` | -
className | 样式类名 | `string` | -
fieldid | dom标识 | `string` | -
clsPrefix | class前缀 | `string` | `mui`

### CSS 变量

属性|说明|默认值|全局变量
----|----|----|----
--background-color | 背景色 | `#FFFFFF` | `--ynfm-color-bg-notice`
--border-color | 边框颜色 | `#FFFFFF` | `--ynfm-color-border-notice`
--text-color | 文字颜色 | `#475569` | `--ynfm-color-text-notice`
--font-size | 文字字号 | `0.28rem` | `--ynfm-font-size-text-notice`
--icon-font-size | 图标大小 | `0.4rem` | `--ynfm-font-size-icon-notice`
--height | 整体高度 | `0.8rem` | `--ynfm-size-height-notice`

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 左侧图标            | fieldid + `"_notice${color}"`  |
| 内容             | fieldid + `"_content"`  |
| 右侧图标           | fieldid + `"_notice${color}_close"`  |
