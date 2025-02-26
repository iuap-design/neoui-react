# 下拉按钮 Dropdown

以条形菜单栏和菜单栏中每个菜单项的弹出菜单窗口两部分组成，一般作为应用系统的主菜单使用。

## API

<!--Dropdown-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|disabled|菜单是否禁用|boolean|false|
|getPopupContainer|菜单渲染父节点，默认会挂载到body。（如果父容器有modal的`.wui-modal-content`  或者  draw的`.wui-drawer-body`  或者  带`[tinper-next-role=container]`属性的容器，则会挂载到上面对应容器下面，如果都没有则挂载到body）|
|overlay|要显示的菜单|Menu &#124; () => Menu|-|
|overlayClassName|传递给弹出菜单的className|string|-|
|overlayStyle|传递给弹出菜单的style。注：设置`top`,`left`无效|object|{}|
|overlayMaxHeight|当下拉项超过屏幕可使用高度时，可以设为true，限制最大高度为屏幕可使用高度；number 按照指定高度值限制高度；（设为true ｜ number 下拉方向不再自适应）false(默认)按实际高度显示|boolean &#124; number|false|
|placement|触发的位置|支持string(bottomLeft bottomCenter bottomRight topLeft topCenter topRight) &#124; object(align对象)|'bottomLeft'|
|trigger|触发的事件数组|array: hover &#124; click|['hover']|
|visible|菜单是否显示|boolean|-|
|onVisibleChange|菜单显示状态改变时调用，点击菜单按钮导致的消失不会触发，参数为 visible|(visible: boolean) => void|
|transitionName|下拉显示动画|-|-|
|showAction|显示时触发的事件数组|array: mouseEnter &#124; click|[]|
|hideAction|隐藏时触发的事件数组|array: mouseLeave &#124; click|[]|
|getDocument|点击隐藏的document，适用于出现iframe的情况|function|document|
|delay|延迟显示隐藏时间，单位毫秒（hover情况下有用）|number|-|
|mouseEnterDelay|延迟显示时间，单位毫秒|number|-|
|mouseLeaveDelay|延迟隐藏时间，单位毫秒|number|-|
|minOverlayWidthMatchTrigger|是否设置下拉的最小宽度|bool|true|
|destroyPopupOnHide|关闭后是否销毁下拉内容|bool|false|4.4.5|
|dropdownStyle|添加到wui-dropdown层的样式回调|（styleObj）=> {return {width: styleObj.minWidth}}|-|

### Dropdown.Button --- 4.0版本以上支持

<!--Dropdown.Button-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|buttonsRender|自定义左右两个按钮|(buttons: ReactNode[]) => ReactNode[]【triggerType值为button时只能定义左侧按钮】|-|
|disabled|菜单是否禁用，当triggerType='icon'时，可通过disabled=[true,false]分别控制禁用行为|boolean、array|false|
|icon|右侧的 icon|ReactNode|-|
|overlay|要显示的菜单|Menu &#124; () => Menu|-|
|overlayClassName|传递给弹出菜单的className|string|-|
|overlayStyle|传递给弹出菜单的style。注：设置`top`,`left`无效|object|{}|
|placement|触发的位置|支持bottomLeft bottomCenter bottomRight topLeft topCenter topRight|'bottomLeft'|
|size|按钮大小，和 Button 一致|string|-|
|type|按钮类型，和 Button 一致|string|default|
|visible|菜单是否显示|boolean|-|
|trigger|触发的事件数组|array|['hover']|
|triggerType|触发下拉的类型button/icon|string|button|
|onClick|点击左侧按钮的回调|(event) => void|
|onVisibleChange|菜单显示状态改变时调用，参数为 visible|(visible: boolean) => void|
|fieldid|自动化测试专用属性,左右button自动生成系列fieldid|string||

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|delayShow|延迟显示时间，单位毫秒，建议使用mouseEnterDelay|number|-|
|delayHide|延迟隐藏时间，单位毫秒，建议使用mouseLeaveDelay|number|-|

## 注意事项

- `overlayStyle` 设置`top`,`left`无效。 如需要自定义，可使用`placement`属性设置align对象，参考[这里](https://github.com/yiminghe/dom-align#usage)


## 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| Dropdown.Button 左按钮 | fieldid_btn  | - |
| Dropdown.Button 右按钮 | fieldid_sub_btn  | - |
| Dropdown 下拉箭头 | 固定值 arrow_icon  | - |