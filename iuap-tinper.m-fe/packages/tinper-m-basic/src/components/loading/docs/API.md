## Loading 属性
### API

属性 | 说明 | 类型 | 默认值
----|-----|------|------
content | 加载文案 | `string` | -
show | 是否显示 | `boolean` | `true`
type | 类型（toast: 弹窗 progress: 进度条 spinloading: 转圈 dotloading: 点状） | `toast' / 'progress' / 'spinloading' / 'dotloading'` | `'toast'`
duration | toast 模式下提示持续时间，0 代表一直持续，除非手动将 show 改成 false | `number` | `0`
percent | progress 模式下进度 | `number` | `50`
size | 加载图标大小（仅spinloading或dotloading模式下生效,等效于手动设置--size CSS变量） | `string` | `0.48rem`
color | 加载图标线条颜色 | `string` | `'#FFFFFF'`
className | 样式类名 | `string` | -
style | 自定义样式（用来修改content文案样式） | `React.CSSProperties` | -
loadingStyle | 加载图标样式（用来传入CSS变量） | `React.CSSProperties` | -
fieldid | dom标识 | `string` | -
clsPrefix | class前缀 | `string` | `mui`

### CSS 变量

属性|说明|默认值|全局变量
----|----|----|----
--color | 线条颜色 | `#EE2233` | `--ynfm-color-icon-loading`
--size | 加载图标大小 | `0.48rem` | `--ynfm-font-size-icon-loading`

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 点状            | fieldid + `"_dotLoading"`  |
| 加载            | fieldid + `"_spinLoading"`  |
| 进度条           | fieldid + `"_progressBar"`  |
