# 模态框 Modal

模态框（Modal）是覆盖在父窗体上的子窗体，位于页面最上层。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动，子窗体可提供信息、交互，如查看、创建、编辑、向导等

## API

### Modal

<!--Modal-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|mask|是否弹出遮罩层|boolean|true|
|maskClosable|遮罩层点击是否触发关闭|boolean|true|
|maskStyle|添加到遮罩层背景元素的style|object|-|
|maskClassName|添加到遮罩背景元素的className|string|-|
|onMaskClick|点击背景遮罩的回调函数|object|-|
|renderBackdrop|自定义渲染遮罩背景元素|function|-|
|bodyStyle|Modal body 样式|object|-|
|bodyClassName|Modal body className|string|-|
|contentStyle|Modal 窗体 自定义样式|object|-|
|cancelButtonProps|cancel 按钮 props|object|-|
|cancelText|cancel按钮文字|string|取消|
|centered|水平垂直居中展示, 设置为once表示为初始化居中;设置为true表示强制居中，强制居中不能和draggable同时使用，对导致 某些情况居中失效|boolean/string|false|
|showPosition|可调整的弹窗位置 在弹窗区域的 绝对位置,属性优先级大于centered, 接收参数{x: xxx, y: xxx} / {x: xxxpx, y: xxxpx} 若仅传入{y: xxx} 则x默认按照居中处理|object|{x: null, y: null}|
|closable|是否显示右上角的关闭按钮|boolean|true|
|closeIcon|自定义关闭图标|ReactNode|-|
|destroyOnClose|关闭时销毁组件|boolean|true|
|keyboard|是否开启快捷键模式，支持定制如['esc', 'cancel', 'ok'],默认开启esc，关闭其他快捷键|boolean/array|-|
|wrapClassName|传递给模态框外层的类名| string |-|
|className|传递给模态框的类名| string |-|
|autoFocus|modal打开时自动聚焦的元素，支持元素选择器如'.class#id'详见示例，同时内置了三种焦点设置（传入true、'ok'、'cancel'分别表示获取焦点的元素是modalbody、确定按钮、取消按钮）|boolean/string|true|4.4.4优化
|enforceFocus|防止打开时焦点离开模态框|boolean|-|
|title|标题 当设置为null 会隐藏title dom结构；不设置显示默认'标题' |string|标题|
|header|头部内容，当设置为null则不渲染默认头部区域|ReactNode|-|
|footer|底部内容，当设置为null则不渲染默认头部区域|ReactNode|-|
|footerProps|footer 的props|object|-|
|visible|是否打开模态框|boolean|-|
|width|模态框宽度，如只传数字则会拼接默认单位 `px`。例如 `100px/100/100%/100rem/100em`|string/number|-|
|height|模态框内容高度，如只传数字则会拼接默认单位 `px`。例如 `100px/100/100%/100rem/100em`|string/number|-|
|style|可用于设置浮层的样式，调整浮层位置等|object|-|
|size|模态框尺寸|sm/lg/xlg/md|md|
|okButtonProps|ok 按钮 props|object|-|
|okText|确定按钮文字|string|确定|
|okType|确定按钮类型，取值范围(primary/secondary/success/info/warning/danger/dark/light)|string|primary|
|afterClose|隐藏结束时的钩子函数|function|-|
|getPopupContainer|Modal所在的外层dom容器|DOM元素/React组件/或者返回React组件的函数|-|
|onShow|当模态框显示时的钩子函数|function|-|
|onHide|当模态框隐藏时的钩子函数(隐藏之后即触发)|function|-|
|onEscapeKeyUp|响应ESC键时的钩子函数|function|-|
|onKeyUp|响应按键时的钩子函数|function|-|
|draggable|设置模态框是否可拖拽|bool|false|
|onOk|点击确定回调|function|-|
|onCancel|右上角叉或取消按钮的关闭弹窗回调,返回 promise 时, resolve 结果为true 自动关闭,否则不关闭|function|-|
|resizable|设置模态框是否可resize(左上角、右上角和上边不可拖拽)|bool|false|
|resizeClassName|设置拖拽dom的class名称|string|-|
|onResizeStart|resize开始时的回调|function|-|
|onResize|resize时的回调|function|-|
|onResizeStop|resize结束时的回调|function|-|
|minWidth|模态框的最小宽度|number/string|200|
|minHeight|模态框的最小高度|number/string|150|
|maxWidth|resize=true时生效，模态框的最大宽度|number/string|-|
|maxHeight|resize=true时生效，模态框的最大高度|number/string|-|
|bounds|draggable=true时生效，设置拖拽范围,可输入{top:xxx,bottom:xxx,left:xxx,right:xxx}或者选择器(例如 "#app")|object/string|null|
|zIndex|自定义设置z-index层级索引|number|null|
|maximize|设置为true 支持点击modal右上角全屏按钮开启全屏(浏览器可视窗口大小),设置为dom: dom的可视区域放大展示|boolean/dom/() => HTMLElement|null|
|onMaximize|点击全屏按钮的回调|(flag)=>{...}|-|
|renderMaximizeButton|自定义全屏按钮的钩子函数，maximize有值 时有效|(isMaximze) => React.Node|-|
|fieldid|组件内元素标识, 推荐自动化测试使用|string|-|
|isMaximize|最大化受控属性，isMaximize设置为true时，弹窗打开时处于最大化状态|boolean|false|
|forceRender|强制渲染 Modal，在第一次打开之前，Modal不可见，但是会渲染Modal的dom元素|boolean|false|4.4.4|

### 以后将废除的api，带中划线则为已废除api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|show|是否打开模态框，建议使用visible|boolean||
|backdrop|是否弹出遮罩层，建议使用mask|boolean|true|
|~~onEnter~~|开始显示时的钩子函数|function|-|
|~~onEntering~~|显示时的钩子函数|function|-|
|onEntered|显示完成后的钩子函数，建议使用onShow|function|-|
|~~onExit~~|隐藏开始时的钩子函数|function|-|
|~~onExiting~~|隐藏进行时的钩子函数|function|-|
|onExited|弹窗关闭隐藏结束时的钩子函数，建议使用onHide|function||
|dialogClassName|传递给模态框的类名，建议使用className|string||
|onBackdropClick|点击背景元素的函数，建议使用onMaskClick|function|-|
|backdropStyle|添加到背景元素的style，建议使用maskStyle|object||
|container|Modal所在的外层dom容器|DOM元素/React组件/或者返回React组件的函数，建议使用getPopupContainer||
|getContainer|Modal所在的外层dom容器|DOM元素/React组件/或者返回React组件的函数，建议使用getPopupContainer||
|backdropClosable|遮罩层点击是否触发关闭，建议使用maskClosable|boolean|true|
|~~animation~~|显隐时是否使用动画|boolean|true|
|dialogComponentClass|传递给模态框使用的元素|string/element|-|
|~~needScroll~~|是否需要记录scrollY的位置并在关闭时滚动到指定位置，适用于不设置`container`且出现打开模态框滚动到最顶部的问题时|bool/number|false|
|~~transition~~|动画组件|function|-|
|~~dialogTransitionTimeout~~|设置动画超时时间|function|-|
|~~backdropTransitionTimeout~~|设置背景动画超时时间|function|-|
|~~backdropClassName~~|添加到背景元素的class，建议使用maskClassName|string|-|

### Modal.Header

<!--Modal.Header-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|closeButton|是否显示关闭按钮|boolean|false|
|renderCloseButton|自定义关闭按钮的钩子函数，closeButton设置为 true 时有效|() => React.Node|-|
|closeButtonProps|自定义关闭按钮的 props|object|-|
|maximize|设置为true 支持点击modal右上角全屏按钮开启全屏(浏览器可视窗口大小),设置为dom: dom的可视区域放大展示|boolean/dom/() => HTMLElement|null|
|onMaximize|点击全屏按钮的回调|function|-|
|renderMaximizeButton|自定义全屏按钮的钩子函数，maximize有值 时有效|(flag) => React.Node|-|
|fieldid|组件内元素标识, 推荐自动化测试使用|string|-|
### Modal.Footer

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|onCustomRender|可选择根据modal footer 中的默认组件进行自定义渲染footer内容,具体使用参考示例|(children: ReactNode)=> ReactNode|-|
|fieldid|组件内元素标识, 推荐自动化测试使用|string|-|
|其他|标签上的属性，会渲染到footer根标签上|undefined|-|

### Modal.method()

包括：

- `Modal.info(options)`
- `Modal.success(options)`
- `Modal.error(options)`
- `Modal.warning(options)`
- `Modal.confirm(options)`

以上均为一个函数，参数options为object类型，具体属性如下：

<!--Modal.method(options)-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|cancelText|取消按钮文字|string|取消|
|okText|确定按钮文字|string|确定|
|okType|确定按钮类型，取值范围(primary/secondary/success/info/warning/danger/dark/light)|string|primary|
|title|标题|string/ReactNode|-|
|content|内容|string/ReactNode|-|
|className|容器类名|string|-|
|zIndex|设置 Modal.method() 的 z-index|number|1000|
|getPopupContainer|Modal.method()所在的外层dom容器|DOM元素/React组件/或者返回React组件的函数|-|
|icon|自定义图标|ReactNode|`<Icon type="uf-qm-c"/>`|
|backdrop|是否弹出遮罩层，建议使用mask|boolean|true|
|backdropClosable|遮罩层点击是否触发关闭，建议使用maskClosable|boolean|true|
|width|宽度|string/number|400|
|onCancel|取消回调，参数为关闭函数，返回 promise 时, resolve 结果为true 自动关闭,否则不关闭|function|-|
|onOk|点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭|function|-|
|cancelButtonProps|cancel 按钮 props (详见 Button props)|object|-|
|okButtonProps|ok 按钮 props (详见 Button props)|object|-|
|footer|底部内容，不设置或设置为null都展示默认底部|ReactNode|-|
|afterClose|隐藏结束时的钩子函数|function|-|4.4.4|
|bodyStyle|Modal body 样式|object|-|4.4.4|
|style|可用于设置浮层的样式，调整浮层位置等|object|-|4.4.4|
|centered|水平垂直居中展示, 设置为once表示为初始化居中;设置为true表示强制居中|boolean/string|false|4.4.4|
|keyboard|是否开启快捷键模式，支持定制如['esc', 'cancel', 'ok'],默认开启esc，关闭其他快捷键|boolean/array|-|4.4.4|
|autoFocus|modal打开时自动聚焦的元素，支持元素选择器如'.class#id'详见示例，同时内置了三种焦点设置（传入true、'ok'、'cancel'分别表示获取焦点的元素是modalbody、确定按钮、取消按钮）|boolean/string|true|4.4.4优化|

以上函数调用后，会返回一个引用，可以通过该引用更新和关闭弹窗。

```
const modal = Modal.info();

modal.update({
  title: '修改的标题',
  content: '修改的内容',
  fieldid: 'demo'
});

modal.destroy();
```

- `Modal.destroyAll`

使用 Modal.destroyAll() 可以销毁弹出的确定窗（即上述的
Modal.info、Modal.success、Modal.error、Modal.warning、Modal.confirm）。通常用于路由监听当中，处理路由前进、后退不能销毁确定对话框的问题，而不用各处去使用实例的返回值进行关闭（modal.destroy()
适用于主动关闭，而不是路由这样被动关闭）
全局配置多语时 需配置ConfigProvider.config({locale: 'xxx'})使此modal的方法生效

```
import { browserHistory } from 'react-router';
// router change
browserHistory.listen(() => {
  Modal.destroyAll();
});
```

### 已支持的键盘操作

|按键|功能|
| --- | --- |
|esc |关闭模态框|
|alt + N |触发取消按钮事件|
|alt + Y |触发确定按钮事件|
|enter |触发确定按钮事件|

## 注意事项

- 使用模态框拖拽功能时，如果 Header 内有绑定事件的元素，需要添加一个 className="dnd-cancel"，才能正常触发相应事件。
- 具体实现代码如下：

```
<Modal.Title>
  <Checkbox 
      className="dnd-cancel"
      checked={this.state.checked}  
      onChange={this.changeCheck}
  >
      可勾选的标题
  </Checkbox>
</Modal.Title>
```
