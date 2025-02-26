# wui-overlay

## API

- Portal 入口，将子组件放入指定的容器

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |container|目标容器|DOM元素\react组件\或是返回组件的函数|''|

- Position 定位组件

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |target|要定位元素|DOM元素\react组件\或是返回组件的函数|''|
|container|目标容器|DOM元素\react组件\或是返回组件的函数|''| |containerPadding|设置目标容器的内边距|number|0|
|placement|显示位置设置|top\left\bottom\right|right| |shouldUpdatePosition|是否需要更新位置|boolean|false|

- BaseOverlay 基础悬浮组件，依赖于Portal，Position组件，继承Portal，Position组件接口。

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |show|是否显示|boolean|false| |rootClose|是否点击除弹出层任意地方隐藏|boolean|true|
|onHide|当rootClose设置为false时，可设置为隐藏方法|function|-| |transition|过度动画组件|component|-| |onEnter|开始显示时的钩子函数|function|-|
|onEntering|显示时的钩子函数|function|-| |onEntered|显示完成后的钩子函数|function|-| |onExit|隐藏开始时的钩子函数|function|-|
|onExiting|隐藏进行时的钩子函数|function|-| |onExited|隐藏结束时的钩子函数|function|-|

- Overlay 悬浮组件，依赖于BaseOverlay，继承BaseOverlay的组件接口

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |show|是否显示|boolean|false| |rootClose|是否点击除弹出层任意地方隐藏|boolean|true|
|onHide|当rootClose设置为false时，可设置为隐藏方法|function|-| |transition|过度动画组件|component|-| |onEnter|开始显示时的钩子函数|function|-|
|onEntering|显示时的钩子函数|function|-| |onEntered|显示完成后的钩子函数|function|-| |onExit|隐藏开始时的钩子函数|function|-|
|onExiting|隐藏进行时的钩子函数|function|-| |onExited|隐藏结束时的钩子函数|function|-| |placement|显示位置设置|top\left\bottom\right|right|
|placement|第二优先级显示位置设置|top\left\bottom\right|right|

- OverlayTrigger 挂载组件，依赖Overlay组件，继承Overlay组件的接口

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |trigger|触发叠加层的事件|click/hover/focus|hover/focus| |delay|叠加层显示和隐藏的延迟时间|number|-|
|delayShow|叠加层显示的延迟时间|number|-| |delayHide|叠加层隐藏的延迟时间|number|-| |defaultOverlayShown|覆盖Overlay设置的默认显隐状态|boolean|false|
|overlay|叠加层|element/string/function|-| |onBlur|失去焦点触发的时间|function|-| |onClick|点击事件|function|-|
|onFocus|焦点事件|function|-| |onMouseOut|鼠标离开事件|function|-| |onMouseOver|鼠标滑过事件|function|-|
|popData|trigger的自定义属性，例如 `{"data-name":"lucian","data-sex":"man"}`，属性名不能和其它属性名重复，否则会被覆盖|Object|-|

- RootCloseWrapper 代理外部组件事件

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |onRootClose|关闭时触发的方法|function|-| |children|内部包含元素|DOM元素|-|
|disabled|是否禁用|boolean|-| |event|触发事件|click/mousedown|click|

- Affix 固定定位组件

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |offsetTop|到屏幕顶部像素|number|-| |viewportOffsetTop|到窗口的偏移像素|number|-|
|offsetBottom|到屏幕的底部的偏移像素|number|-| |topClassName|在顶部时添加的class|class|-| |topStyle|在顶部添加的style|style|-|
|affixClassName|当固定定位时，添加的class|class|-| |affixStyle|当固定定位时，添加的style|style|-| |bottomClassName|在底部时添加的class|class|-|
|bottomStyle|在底部时添加的style|style|-| |onAffix|在affixstyle和affixClassName添加之前的钩子函数|function|-|
|onAffixed|在affixstyle和affixClassName添加之后的钩子函数|function|-| |onAffixTop|在topStyle和topClassName添加之前的钩子函数|function|-|
|onAffixedTop|在topStyle和topClassName添加之后的钩子函数|function|-|
|onAffixBottom|在bottomStyle和bottomClassName添加之前的钩子函数|function|-|
|onAffixedBottom|在bottomStyle和bottomClassName添加之后的钩子函数|function|-|

- AutoAffix 对Affix进行包装，提供自动计算偏移量，因为包装Affix，包含所有Affix组件的接口

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |container|容器元素|DOM元素\React组件\或者返回React组件的函数|---:| |autoWidth|是否自适应宽度|boolean|---:|

- BaseModal 模态框，建立在Protal之上，包含所有Protal组件接口

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |show|是否显示|boolean|false| |container|容器|DOM元素\React组件\或者返回React组件的函数|-|
|onShow|当模态框显示时的钩子函数|function|-| |onHide|当模态框关闭时的钩子函数|function|-| |backdrop|显示时，是否包含背景|boolean|true|
|renderBackdrop|返回背景元素的函数|function|-| |onEscapeKeyUp|响应ESC键时的钩子函数|function|-| |onBackdropClick|点击背景元素的函数|function|-|
|backdropStyle|添加到背景元素的style|function|-| |backdropClassName|添加到背景元素的class|function|-|
|containerClassName|添加到外部容器的class|function|-| |keyboard|ESC键是否关闭模态框|boolean|true| |transition|动画组件|function|-|
|dialogTransitionTimeout|设置动画超时时间|function|-| |backdropTransitionTimeout|设置背景动画超时时间|function|-|
|autoFocus|显示时是否自动设置焦点|function|-| |enforceFocus|不让焦点离开模态框|function|-| |onEnter|模态框显示时的钩子函数|function|-|
|onEntering|模态框进入中的钩子函数|function|-| |onEntered|模态框显示后的钩子函数|function|-| |onExit|模态框关闭时的钩子函数|function|-:|
|onExiting|模态框关闭中的钩子函数|function|-| |onExited|模态框关闭后的钩子函数|function|-| |manager|管理模态框状态的组件|required|-|

- Transtion

|参数|说明|类型|默认值| |:--|:---:|:--:|---:| |in|是否触发动画|boolean|false| |unmountOnExit|不显示的时候是否销毁组件|boolean:|false|
|transitionAppear|默认显示是否加载动画|boolean|false| |timeout|超时时间|number|5000| |exitedClassName|退出动画时添加的class|class|-|
|exitingClassName|退出组件中添加的class|class|-| |enteredClassName|进入动画时添加的class|class|-|
|enteringClassName|进入动画中添加的class|class|-| |onEnter|动画显示时的钩子函数|function|空函数| |onEntering|动画进入中的钩子函数|function|空函数|
|onEntered|动画显示后的钩子函数|function|空函数| |onExit|动画关闭时的钩子函数|function|空函数| |onExiting|动画关闭中的钩子函数|function|空函数|
|onExited|动画关闭后的钩子函数|function|空函数|
