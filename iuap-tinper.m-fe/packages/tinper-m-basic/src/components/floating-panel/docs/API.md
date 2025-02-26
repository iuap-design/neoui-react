

## FloatingPanel 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchors | 可拖拽至哪些高度，单位为 `px` | `number[]` | - |
| handleDraggingOfContent | 是否会处理面板内容区域的拖拽事件，禁用后则只能拖拽头部区域 | `boolean` | `true` |
| onHeightChange | 当高度变化时触发，`animating` 参数表示是否处于动画过程中 | `(height: number, animating: boolean) => void` | - |
| style | 样式 | `React.CSSProperties` | - |
| className | 样式类名 | `string` | - |
| fieldid | dom标识 | `string` | - |
| clsPrefix | class前缀 | `string` | `mui` |

### Ref

FloatingPanel 的 ref 上提供了 `setHeight` 方法，你可以通过它来指令式地控制 `FloatingPanel` 的高度：

```tsx
type FloatingPanelRef = {
  setHeight: (
    height: number,
    options?: {
      immediate?: boolean // 是否跳过动画
    }
  ) => void
}
```

```jsx
<FloatingPanel ref={ref}>...</FloatingPanel>

ref.current.setHeight(100)
```

### CSS 变量

| 变量名          | 描述           | 默认值 | 全局变量                       |
| --------------- | -------------- | ------ | ------------------------------ |
| --border-radius | 面板头部的圆角 | `0.24rem`  | `--ynfm-border-radius-header-floatingpanel` |
| --header-height | 面板头部的高度 | `0.32rem` | `--ynfm-size-height-header-floatingpanel` |
| --z-index       | 面板的 z-index | `900`  | `-` |


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_floating_panel"`          |
| 头部            | fieldid + `"_floating_panel_header"`  |
| 内容         | fieldid + `"_floating_panel_content"`  |
