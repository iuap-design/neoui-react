## Slider 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 样式`class` | `string` | - |
| style | 样式`style` | `React.CSSProperties` | - |
| fieldid | `dom`标识 | `string ` | - |
| clsPrefix | `class`前缀 | `string` | `mui` |
| disabled | 是否禁用 | `boolean` | `false` |
| marks | 刻度标记 | `{ [key: number]: React.ReactNode }` | - |
| max | 最大值 | `number` | `100` |
| min | 最小值 | `number` | `0` |
| range | 是否为双滑块 | `boolean` | `false` |
| step | 步距，取值必须大于 `0`，并且 `(max - min)` 可被 `step` 整除。当 `marks` 不为空对象时，`step` 的配置失效 | `number` | `1` |
| ticks | 是否显示刻度 | `boolean` | `false` |
| value | 当前值 | `number \| [number, number]` | - |
| defaultValue | 默认值 | `number \| [number, number]` | `range ? [0, 0] : 0` |
| popover | 是否在拖动时显示悬浮提示，支持传入函数自定义渲染内容 | `boolean \| ((value: number) => ReactNode)` | `false` |
| residentPopover | `popover` 是否常驻显示，`popover` 存在时生效 | `boolean ` | `false` |
| icon | 滑块的图标 | `ReactNode` | - |
| handleStyle | 滑块的样式 | `React.CSSProperties` | - |
| trackStyle | 选中部分滑动条的样式 | `React.CSSProperties` | - |
| railStyle | 未选中部分 | `React.CSSProperties` | - |
| onChange | 拖拽滑块时触发，并把当前拖拽的值作为参数传入 | `(value: number \| [number, number]) => void` | - |
| onAfterChange | 与 `touchend` 触发时机一致，把当前值作为参数传入 | `(value: number \| [number, number]) => void` | - |

### CSS 变量

属性| 说明        | 默认值   |全局变量
----|-----------|-------|----
--fill-color | 已选滑动条填充颜色 | `#EE2233`   | `--ynfm-color-bg-line-slider-finished`
--fill-dot | 已选刻度边线颜色    | `#EE2233` | `--ynfm-color-icon-handle-slider`
--fill-icon | 手柄图标颜色    | `#EE2233` | `--ynfm-color-border-dot-slider-finished`

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_slider"`          |
| 轨道            | fieldid + `"_slider_track"`  |
| 填充部分         | fieldid + `"_slider_fill"`  |
| 滑块            | fieldid + `"_slider_thumb"`  |
| ticks            | fieldid + `"_slider_ticks"`  |
| ticks子元素    | fieldid + `"_slider_ticks_${index}"`  |
| marks            | fieldid + `"_slider_marks"`  |
| marks子元素    | fieldid + `"_slider_marks_${index}"`  |
