## Accordion 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accordion | 是否开启手风琴模式 | `boolean` | `false` |
| activeKey | 当前展开面板的 `key` | 手风琴模式：`string \| null` <br/>非手风琴模式：`string[]` | - |
| arrow | 自定义箭头，如果是 ReactNode，那么 TinperM 会自动为你增加旋转动画效果 | `ReactNode \| ((active: boolean) => React.ReactNode)` | - |
| defaultActiveKey | 默认展开面板的 `key` | 手风琴模式：`string \| null` <br/>非手风琴模式：`string[]` | - |
| onChange | 切换面板时触发 | 手风琴模式：`(activeKey: string \| null) => void` <br /> 非手风琴模式：`(activeKey: string[]) => void` | - |
| className | 样式类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| fieldid | dom标识 | `string` | - |
| clsPrefix | class前缀 | `string` | `'mui'` |

### CSS 变量

| 属性            | 说明             | 默认值 | 全局变量                     |
| --------------- | ---------------- | ------ | ---------------------------- |
| --title-padding-left | 标题左边距             | `0.32rem`  | `--ynfm-spacing-padding-left-title-accordion`    |
| --content-padding-left | 内容左边距   | `0.32rem`  | `--ynfm-spacing-padding-left-content-accordion`  |
| --title-padding-right | 标题右边距             | `0.32rem`  | `--ynfm-spacing-padding-right-title-accordion`   |
| --content-padding-right | 内容右边距   | `0.32rem`  | `--ynfm-spacing-padding-right-content-accordion` |

## Accordion.Panel 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| arrow | 自定义箭头 | `ReactNode \| ((active: boolean) => React.ReactNode)` | - |
| destroyOnClose | 不可见时是否销毁 `DOM` 结构 | `boolean` | `false` |
| disabled | 是否为禁用状态 | `boolean` | `false` |
| forceRender | 被隐藏时是否渲染 `DOM` 结构 | `boolean` | `false` |
| key | 唯一标识符 | `string` | - |
| onClick | 标题栏的点击事件 | `(event: React.MouseEvent<Element, MouseEvent>) => void` | - |
| title | 标题栏左侧内容 | `ReactNode` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| contentStyle | 自定义内容样式 | `React.CSSProperties` | - |


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 头部            | fieldid + `"-panel_${key}"`  |
| 头部箭头         | fieldid + `"-panel-arrow_${key}"`  |
| 内容            | fieldid + `"-panel-content_${key}"`  |
