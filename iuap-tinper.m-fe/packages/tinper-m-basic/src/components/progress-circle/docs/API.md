## ProgressCircle 属性
### API

| 参数     | 说明         | 类型              | 默认值 |
| -------- | ------------ | ----------------- | ------ |
| children | 自定义信息   | `React.ReactNode` | -      |
| percent  | 进度圈百分比 | `number`          | `0`    |
|className | 样式类名 | `string` | - |
|style | 自定义样式 | `React.CSSProperties` | -|
|fieldid | dom标识 | `string` | -|
|clsPrefix | class前缀 | `string` | `'mui'`|


### CSS 变量

| 属性 | 说明 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --fill-color | 填充部分的颜色 | `#006FE6` | `--ynfm-color-bg-track-progresscircle-finished` |
| --size | 画布的宽高，仅支持 px 单位 | `44px` | `--ynfm-size-progresscircle` |
| --track-color | 轨道的颜色 | `#e5e5e5` | `--ynfm-color-bg-track-progresscircle` |
| --track-width | 线条宽度，仅支持 px 单位 | `4px` | `--ynfm-size-width-track-progresscircle` |

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |

<!-- ## 常见问题

### 关于使用 rem 的重要提醒

ProgressCircle 仅支持 `px` 单位，因为在 Safari 下非 `px` 单位会出现样式 bug。

所以如果你的项目中使用了 rem 布局，那么编译时对样式的预处理会导致默认的 `--size` 和 `--track-width` 的单位变为 `rem`，从而很可能在 iOS 设备中会出现 bug。解决方法是在项目中手动将 `--size` 和 `--track-width` 设置回 `px` 单位。 -->
