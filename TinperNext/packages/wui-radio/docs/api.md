# 单选 Radio

表单中的单选框，代替原生radio

## API

### Radio

<!--Radio-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|color|one of: primary/success/info/danger/warning/dark|string|-|
|disabled|是否可用|bool|false|
|readOnly|是否只读|bool|false|v4.3.1
| style  | 添加style | object| {} |
|className|传入列的classname|String    |-|
|inverse|设置选中为红色填充|bool|false|
|checked|指定当前是否选中|bool|false|
|defaultChecked|初始是否选中|bool|false|
|onChange|单个radio改变回调，建议使用`Radio.Group`的onChange|func|-|
|fieldid|自动化测试专用属性|string||v4.3.0
|value|被选中的radio值|any|-|

### Radio.Button

<!--Radio.Button-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|color|one of: primary/success/info/danger/warning/dark|string|-|
|size|one of: lg/sm|string|-|
|disabled|是否可用|bool|false|

### Radio.Group

<!--Radio.Group-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|antd|是否兼容ant design的onChange用法，如果传true，则onChange方法的参数是一个带有组件一些属性值（包括最常用的value）的event对象，当Radio组件传数字或者布尔值的时候，通过这个event.target.value可以获得正确的值，通过event.target.targetDom可以获得实际的事件DOM结构|boolean|-|
|onChange|暴露在外层的触发radio是否选中的方法|Func (isAntd ? (event)=> void : (value, event)=> void )|-|
|defaultValue|默认选中的radio值|any|-|
|value|被选中的radio值|any|-|
|name|radio组名|string|''|
|size|尺寸大小支持 'lg','sm','small','large' (仅子组件为Radio.Button生效) |string|''|
|Children|必填，Radio子组件|node||
|disabled|所有子单选器禁选|bool|false|
|readOnly|所有子单选器只读|bool|false|v4.3.1
|options|以配置形式设置子元素|(RadioProps & {label: ReactNode} \| string)[]|[]|v4.4.4
|optionType|用于设置 Radio options 类型 button/default|string|default|v4.4.4
|spaceSize|用于设置 radio 之间的间隔 可选范围 sm/md/lg/number|string/number|-|v4.5.4
|maxCount|设置 radio button 同行最大显示数量，超出则显示为下拉，当设置为true时根据父元素的宽度计算|boolean/number|-|v4.5.4

### Radio.Group以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|selectedValue|被选中的radio值，建议使用value|any||

### 已支持的键盘操作

|按键|功能|
| --- | --- |
|→(右箭)、↓(下箭) |将焦点移动到下一个Radio上，依次循环选中|
|←(左箭)、↑(上箭) |将焦点移动到上一个Radio上，依次循环选中|

### fieldid 场景说明

| 场景     | 生成规则说明                | 版本  |
| -------- | --------------------------- | ----- |
| 根元素   | fieldid                    | 4.3.0 |
| 内部input元素   | fieldid + "\_radio" | 4.3.0 |
