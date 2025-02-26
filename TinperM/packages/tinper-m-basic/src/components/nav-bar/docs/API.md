## NavBar 属性
### API
| 属性名称       | 说明                     | 类型                            | 默认值   |
| -------------- | ------------------------ | ------------------------------- | -------- |
|back	|返回区域的文字，如果为 null 的话，backArrow 也不会渲染 |	`ReactNode \| null` |	`''` |
|backArrow	|是否显示返回区域的箭头，也可以传入 ReactNode 进行自定义 |	`boolean \| ReactNode` |	`true`|
|children	|标题	| `ReactNode` |	- |
|titleAlign	|标题对齐方式 |	`'left' \| 'center' \| 'right' \| 'stretch'` |	`'center'` |
|left	|左侧内容，渲染在返回区域的右侧 |	`ReactNode` |	- |
|onBack	|点击返回区域后的回调 |	`() => void` |	- |
|right	|右侧内容	| `ReactNode` |	- |
| style          | 样式 style               | `React.CSSProperties`           | -        |
| fieldid        | DOM 标识                 | `string`                        | -         |
| className      | 样式类名                 | `string`                        |   -       |
| clsPrefix     | 样式类名前缀                 | `string`                        |    `'mui'`      |

### CSS 变量
| 属性            | 说明         | 默认值    | 全局变量                       |
| --------------- | ------------ | --------- | ------------------------------ |
| --border-bottom | 导航栏下边框 | `none`    | `--ynfm-border-width-bottom-navbar --ynfm-border-style-bottom-navbar --ynfm-color-border-bottom-navbar` |
| --height        | 导航栏高度   | `0.88rem` | `--ynfm-size-height-navbar`   |

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |
