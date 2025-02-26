## List 属性
### API
|属性	|说明	|类型	|默认值 |
|---	|---	|---	|--- |
|header	|标题内容	| `ReactNode` |	-|
|mode	|支持默认和卡片两种模式	| `'default' \| 'card'` |	`'default'` |
|className | 样式类名 | `string` | - |
|style | 自定义样式 | `React.CSSProperties` | -|
|fieldid | dom标识 | `string` | -|
|clsPrefix | class前缀 | `string` | `'mui'`|
### CSS 变量
属性|说明|默认值|全局变量
----|----|----|----
--font-size-header | 标题字号 | `0.3rem` | `--ynfm-font-size-header-list`
--font-size | 内容字号 | `0.3rem` | `--ynfm-font-size-content-list`
--font-color | 内容文字颜色 | `#171717` | `--ynfm-color-text-content-list`
--font-color | 描述文字颜色 | `#737373` | `--ynfm-color-text-describe-list`
--prefix-width | 前缀宽度 | `auto` | `--ynfm-size-width-prefix-list`
--prefix-padding-right | 前缀右侧内边距 | `0.24rem` | `--ynfm-spacing-padding-right-prefix-list`
--align-items | 垂直方向对齐方式 | `center` | `无`
--active-background-color | 按下时背景色 | `#F5F5F5` | `--ynfm-color-bg-list-pressed`
--border-inner | 列表项底边框 | `0.05rem solid #F5F5F5` | `--ynfm-border-style-items-list --ynfm-border-width-items-list --ynfm-color-border-items-list `
--border-top | 列表顶部边框 | `0.05rem solid #F5F5F5` | `--ynfm-border-style-top-list --ynfm-border-width-top-list --ynfm-color-border-top-list `
--border-bottom | 列表底部边框 | `0.05rem solid #F5F5F5` | `--ynfm-border-style-bottom-list --ynfm-border-width-bottom-list --ynfm-color-border-bottom-list `
--padding-left | 列表左侧内边距 | `0.16rem` | `--ynfm-spacing-padding-left-items-list`
--padding-right | 列表右侧内边距 | `0.16rem` | `--ynfm-spacing-padding-right-items-list`

## List.Item 属性
### API
|属性	|说明	|类型	|默认值 |
|---	|---	|---	|--- |
|arrow	|右侧是否显示箭头图标，也支持传入 ReactNode 来自定义图标|	`boolean \| ReactNode` |	默认和 clickable 的值保持一致 |
|children	|列表项中间的主内容区域	|`ReactNode` |	- |
|clickable|	是否显示点击效果|	`boolean` |	当 onClick 属性存在时，默认为 true，否则默认为 false|
|description|	列表项中间下部的描述区域|	`ReactNode` |	-|
|disabled|	是否禁用	|`boolean` |`false`|
|extra	|列表项右侧区域	| `ReactNode` |	-|
|onClick|	列表项的点击事件，当设置了 onClick 属性时，列表项会有点击效果	|`(e: React.MouseEvent) => void`|	-|
|prefix|	列表项左侧区域|	`ReactNode`|	-|
|title| 列表项中间上部的标题区域|	`ReactNode`	|-|
|className | 样式类名 | `string` | - |
|style | 自定义样式 | `React.CSSProperties` | -|
|fieldid | dom标识 | `string` | -|
|clsPrefix | class前缀 | `string` | `'mui'`|

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |

