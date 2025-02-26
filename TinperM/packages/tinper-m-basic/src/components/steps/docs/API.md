
## Steps 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | `number` | `0` |
| direction | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| className | 样式`class` | `string` | - |
| style | 样式`style` | `React.CSSProperties` | - |
| fieldid | `dom`标识 | `string ` | - |
| clsPrefix | `class`前缀 | `string` | `mui` |

### CSS 变量

|属性| 说明                    | 默认值       | 全局变量                            |
|----|-----------------------|-----------|---------------------------------|
| --description-font-size | 描述的字号                 | `0.24rem` | `--ynfm-font-size-describe-steps` |
| --indicator-margin-right | 左边的指示器和右边的文字内容之间的额外间距 | `0.16rem` | `--ynfm-spacing-margin-right-indicator-steps` |
| --title-font-size | 标题的字号                 | `0.28rem` | `--ynfm-font-size-title-steps` |
| --horizontal-indicator-width | 横向默认图标的宽高             | `0.4rem`  | `--ynfm-font-size-icon-steps` |
| --vertical-indicator-width | 纵向默认图标的宽高             | `0.24rem` | `--ynfm-font-size-icon-steps-vertical` |

## Steps.Step 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 步骤的详情描述，可选 | `ReactNode` | - |
| icon | 步骤图标的类型 | `ReactNode` | - |
| status | 指定状态。当不配置该属性时，会使用 `Steps` 的 `current` 来自动指定状态；如果该属性与 `current` 指定的状态不匹配会覆盖自动匹配的状态。 | `'wait' \| 'process' \| 'finish' \| 'error'` | `'wait'` |
| title | 标题 | `ReactNode` | - |
| className | 样式`class` | `string` | - |
| style | 样式`style` | `React.CSSProperties` | - |
| onClick | 点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | - |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_steps"`          |
| 子元素    | fieldid + `"_steps_icon_${index}"`  |
