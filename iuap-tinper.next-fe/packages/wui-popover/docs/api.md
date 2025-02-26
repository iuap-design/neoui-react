# 气泡卡片 Popover

点击元素弹出气泡弹出框。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## API

<!--Popover-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| content | 卡片内容 | ReactNode \| () => ReactNode | - |  |
| title | 卡片标题 | ReactNode \| () => ReactNode | - |  |
| resizable | 支持拖拽面板尺寸 | boolean | false |  |
| resizeStyle | resizable为true时生效，设置拖拽面板的最大最小尺寸样式，注：设置minWidth、minHeight、maxWidth、maxHeight四个属性，值为数字类型 | Object | - |  |

更多属性请参考 [Tooltip](https://yondesign.yonyou.com/website/#/detail/component/wui-tooltip/other?tab=api)。

以下属性暂时不支持:

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|~~positionTop~~|弹出框向上偏移量|string/number|-|v4.0.0
|~~positionLeft~~|弹出框向左偏移量|string/number|-|-|v4.0.0

## 注意事项

- trigger 为 "click" 时，点击除弹出层外的任意地方，默认会隐藏弹出层。
- 若设置了参数 show ，来控制显示和隐藏的话，需要结合 onHide 事件一起使用，避免出现：在点击除弹出层外的任意地方时，组件状态未及时更新的问题。具体代码如下：

```
<Popover
    id="demo2"
    placement="right"
    title={<h3>请确认您的包裹已签收！</h3>}
    content={content}
    show={this.state.show}
    onHide={this.onHide}
>
    <Button colors="primary" onClick={ this.show }>确认按钮</Button>
</Popover>

```
