# 滑块 Slider

滑动型输入器，展示当前值和可选范围

## API

<!--Slider-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|min|最小值，默认0|number|0|
|max|最大值，默认100|number|100|
|step|步长，取值必须大于0，并且可被(max-min)整除。当marks不为空对象时，可以设置step为null，此时Slider的可选值仅有marks标出来的部分，默认1|（number OR null）|1|
|dots|是否只能拖拽到刻度上，默认是false|boolean|false|
|marks|刻度标记，key的类型必须为number且取值在闭区间min,max内，每个标签可以单独设置样式|object|{number:string} OR {number:{style:object,label:string}}|
|value|设置当前取值。当range为false时，使用number，否则用[number,number]|number OR [number,number]|0 OR [0,0]|
|defaultValue|设置初始取值。当range为false时，使用number，否则用[number,number]|number OR [number,bumber]|0 OR [0,0]|
|className|增加额外的class|string|''|
|included|marks不为空对象时有效，值为true时表示值为包含关系，false表示并列|boolean|true|
|disabled|值为true时，滑块为禁用状态|boolean|false|
|vertical|值为true时，Slider为垂直方向|Boolean|false|
|railStyle|自定义u-slider-rail的样式|Object|-|
|trackStyle|自定义u-slider-track的样式|Object|-|
|handleStyle|自定义u-slider-handle的样式|Object|-|
|dotStyle|自定义u-slider-dot样式|Object|-|
|activeDotStyle|自定义u-slider-dot-active样式|Object|-|
|onChange|当Slider的值发生改变时，会触发onChange事件，并把改变后的值作为参数传入。|Function(value)|NOOP|
|onAfterChange|与onmouseup触发时机一致，把当前值作为参数传入。|Function(value)|NOOP|
|tipFormatter|会把当前值传给tipFormatter，并在Tooltip中显示tipFormatter的返回值，若为null，则隐藏Tooltip。|Function|-|
|tooltipPlacement|设置 Tooltip 展示位置。参考 Tooltip|string|-|v4.0.0
|tooltipVisible|值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时|boolean|-|v4.0.0
|getTooltipPopupContainer|Tooltip 渲染父节点，默认渲染到 body 上|(triggerNode) => HTMLElement|() => document.body|v4.0.0
|tooltip|设置 Tooltip 相关属性,可以配置四项属性{ open: true, placement:'top', getPopupContainer:() => HTMLElement, formatter:value => ReactNode}|Object|-|4.4.4
|allowClear|支持清除, 单选模式有效|boolean|-|v4.0.0
|reverse|反向坐标轴|boolean|-|v4.0.0
|fieldid|自动化测试专用属性|string|-|4.3.0


| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieildid                      | 4.3.0 |
| 滑道 | fieldid + "\_slider_rail" | 4.3.0 |
| 轨迹 | fieldid + "\_slider_track" | 4.3.0 |
| step | fieldid + "\_slider_step" | 4.3.0 |
| step子元素 | fieldid + "\_slider_step_index" (index为当前元素索引) | 4.3.0 |
| 滑块 | fieldid + "\_slider_handle" | 4.3.0 |
| marks | fieldid + "\_slider_mark" | 4.3.0 |
| marks子元素 | fieldid + "\_slider_mark_index" (index为当前元素索引) | 4.3.0 |
