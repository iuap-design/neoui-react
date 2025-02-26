## Toast 属性
### 指令式API
Toast 组件只支持指令式调用。

### Toast.show
show 方法支持传入一个 props 对象，它包含了以下这些属性：

属性 | 说明 | 类型 | 默认值
----|-----|------|------
afterClose | Toast 完全关闭后的回调 |	`() => void` | -
maskStyle	| Toast 遮罩样式 |	`React.CSSProperties` |	-
maskClassName |	Toast 遮罩类名 |	`string` |	-
maskClickable |	是否允许背景点击 |	`boolean` |	`true`
content |	Toast 文本内容 |	`React.ReactNode`	 | -
icon |	Toast 图标 |	`'success' / 'fail' / 'loading' / React.ReactNode` |	-
duration |	提示持续时间，若为 0 则不会自动关闭 |	`number` |	`2`
position |	垂直方向显示位置 |	`'top' / 'bottom' / 'center'`	| `center`
getContainer |	自定义轻提示的父容器 |	`HTMLElement / (() => HTMLElement) / null` |	`document.body`
stopPropagation |	阻止某些事件的冒泡 |	`PropagationEvent[]` |	`['click']`
className | 样式类名 | `string` | -
fieldid | dom标识 | `string` | -
clsPrefix | class前缀 | `string` | `mui`

### Toast.clear

关闭所有显示中的 Toast。

### Toast.config

全局配置，支持配置 duration、position 和 maskClickable。配置方法如下：
```
Toast.config({ duration: 1, position: 'top' })
```

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
