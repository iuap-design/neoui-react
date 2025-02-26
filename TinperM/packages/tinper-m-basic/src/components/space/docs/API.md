## Space 属性
### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 交叉轴对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline'` | -- |
| block | 是否渲染为块级元素 | `boolean` | `false` |
| direction | 间距方向 | `'vertical' \| 'horizontal'` | `'horizontal'` |
| justify | 主轴对齐方式 | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly' \| 'stretch'` | -- |
| onClick | 点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | -- |
| wrap | 是否自动换行，仅在 `horizontal` 时有效 | `boolean` | `false` |
| style | 自定义样式   | `React.CSSProperties` | -- |   
|className | 样式类名 | `string` | -- |
|fieldid | dom标识 | `string` | -- |
|clsPrefix | class前缀 | `string` | `'mui'`|

### CSS 变量

| 属性             | 说明               | 默认值       | 全局变量
| ---------------- | ------------------ | ------------ | ------------
| --gap-horizontal | 水平方向的间距大小 | `0.16rem` | `--ynfm-spacing-gap-horizontal-space`
| --gap-vertical   | 垂直方向的间距大小 | `0.16rem` | `--ynfm-spacing-gap-vertical-space`

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |
