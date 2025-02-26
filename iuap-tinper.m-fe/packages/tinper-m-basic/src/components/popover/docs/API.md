## Popover 属性
### API

| 属性              | 说明 | 类型 | 默认值                   |
|-----------------| --- | --- |-----------------------|
| children        | 触发 `Popover` 的元素 | `React.ReactElement` | -                     |
| content         | 弹出内容 | `React.ReactNode` | -                     |
| defaultVisible  | 默认是否显隐 | `boolean` | `false`               |
| destroyOnHide   | 隐藏时，是否销毁 `tooltip` 内容 | `boolean` | `false`               |
| getContainer    | 浮层渲染父节点，默认渲染到 `body` 上 | `() => HTMLElement` | `() => document.body` |
| mode            | 设置亮色模式或者黑色模式 | `'light' \| 'dark'` | `'light'`             |
| onVisibleChange | 显示隐藏的回调 | `(visible: boolean) => void` | -                     |
| placement       | 气泡框位置 | `'top' \| 'top-start' \| 'top-end' \| 'right' \| 'right-start' \| 'right-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end'` | `'top'`               |
| stopPropagation | 阻止某些事件的冒泡 | `PropagationEvent[]` | `['click']`           |
| trigger         | 触发方式 | `'click'` | 'click'                |
| visible         | 受控模式下，是否展示弹出内容 | `boolean` | - |
| clsPrefix       | class前缀 | `string`                 | mui 
| className       | 样式类名 | `string` | -
| fieldid         | dom标识   | `string`                 | -



### CSS 变量

| 属性              | 说明       | 默认值                                      | 全局变量                         |
|-----------------|----------|------------------------------------------|------------------------------|
| --z-index       | 元素的Z 轴顺序 | `1030`                                   | `-`       |
| --arrow-size    | 箭头尺寸     | `0.16rem`                                | `--ynfm-size-arrow-panel-popover`    |
| --background    | 背景颜色     | `#ffffff`                                | `--ynfm-color-bg-panel-popover`    |
| --font-weight   | 字重     | `400`                                    | `--ynfm-font-weight-text-menu-popover`   |
| --border-radius | 圆角       | `0.08rem`                                | `--ynfm-border-radius-panel-popover` |
| --font-size     | 字体大小     | `0.26rem`                                | `--ynfm-font-size-text-menu-popover` |
| --text-color     | 字体颜色     | `#171717`                                | `--ynfm-color-text-menu-popover` |
| --box-shadow    | 阴影       | `0px 0px 10px 0px rgba(51, 51, 51, 0.2)` | `--ynfm-box-shadow-popover` |
| --vertical-padding | 水平内边距    | `0.12rem`                                | `--ynfm-space-padding-vertical-popover` |
| --horizontal-padding | 垂直内边距    | `0.24rem`                                | `--ynfm-space-padding-horizontal-popover` |


### Ref

| 属性    | 说明                       | 类型         |
| ------- | -------------------------- | ------------ |
| hide    | 隐藏气泡弹出框             | `() => void` |
| show    | 展示气泡弹出框             | `() => void` |
| visible | 气泡弹出框当前是否正在展示 | `boolean`    |

## Popover.Menu 属性

### API

除 `content` 外，其余全部属性继承自 `Popover`，特有属性如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actions | 菜单列表，当弹出内容为标准菜单时使用 | `Action[]` | - |
| maxCount | 菜单列表最大个数，超出则隐藏进行滚动 | `number` | - |
| onAction | 当使用菜单列表时，选中菜单的回调 | `(item: Action) => void` | - |

### Action

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | `boolean` | `false` |
| icon | 菜单项的图标 | `ReactNode` | `null` |
| key | 菜单的唯一标识, 缺省时即为 `index` | `string \| number` | `actions` 数组的 `index` |
| onClick | 点击时触发 | `() => void` | - |
| text | 菜单列表，当弹出内容为标准菜单时使用 | `ReactNode` | - |
| className | 类名 | `string` | - |
| style | 样式 | `CSSProperties` | - |


### CSS 变量

同 Popover。

### Ref

同 Popover。

## fieldid 说明

| 场景  | 生成规则                  |
|-----|-----------------------|
| 根元素 | fieldid               |
| 内容  | fieldid + '-floating' |




