## ProgressBar 属性
### API
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 进度条百分比 | `number` | `0` |
| rounded | 是否圆角 | `boolean` | `true` |
| text | 是否显示进度文字，支持自定义渲染内容 | `boolean \| ReactNode \| ((percent: number) => ReactNode)` | `false` |
|className | 样式类名 | `string` | - |
|style | 自定义样式 | `React.CSSProperties` | -|
|fieldid | dom标识 | `string` | -|
|clsPrefix | class前缀 | `string` | `'mui'`|

### CSS 变量
属性|说明|默认值|全局变量
----|----|----|----
--track-width | 进度条宽度 | `0.16rem` | `--ynfm-size-height-track-progressbar`
--track-color | 轨道颜色 | `#E5E5E5` | `--ynfm-color-bg-track-progressbar`
--fill-color | 进度颜色 | `#006fe6` | `--ynfm-color-bg-track-progressbar-finished`
--text-width | 文字宽度 | `0.8rem` | `--ynfm-size-width-text-progressbar`

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |
