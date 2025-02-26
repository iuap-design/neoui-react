# 步骤条 Steps

当任务复杂或具有子任务的系列一定的序列，我们可以将它分解成几个步骤，让事情变得更容易

## API

### Steps

<!--Steps-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|className|步骤条类名|string|-|
|current|设置当前步骤，从0开始计数。可以使用步骤状态重写此状态。|number|0|
|status|指定当前步骤的状态(wait,process,finish,error)|string|process|
|size|设置step bar的大小(default,small)|string|default|
|direction|设置step bar的方向(horizontal,vertical)|string|horizontal|
|initial|起始序号，从 0 开始记数|number|0|
|progressDot|点状步骤条，可以设置为一个 function，labelPlacement 将强制为 vertical|Boolean|false|
|more|设置step 是否为多步骤条(支持默认的节点和arrow样式)|Boolean|false|v4.0.0
|icons|各状态的图标形态,当为true时，所有状态都显示为图标，当为false时，则默认显示，当为object{wait,process,finish,error}则为自定义图标|boolean｜object{ReatNode}|-|v4.0.0
|onChange|点击切换步骤时触发,参数current为当前索引，position该参数主要用于more模式下步骤条改变时的位置(left,center,right)|(current, position) => void|-|v4.4.2
|type|节点样式类型        |default,arrow,dot,number|default|v4.0.0
|fieldid|自动化测试专用属性|string|-|4.3.0
|items|配置选项卡内容|Array\<object\>|-|4.4.4
|percent| 当前 process 步骤显示的进度条进度（只对默认类型的 Steps 生效）|number|-|4.4.5
|labelPlacement| 设置step content的方向(horizontal,vertical)只支持默认模式|string|horizontal|4.4.6

### Steps.Step

<!--Steps.Step-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|status|自动设置当前step的状态（wait,process,finish,error）|string|-|
|title|step的标题|ReactNode|-|
|description|step的细节描述，可选的属性|ReactNode|-|
|icon|设置当前step为icon,优先级高于Steps.icons,可选的属性|string,ReactNode|-|
|disabled|禁用点击    |Boolean|false|v4.0.0
|subTitle|step的副标题|ReactNode|-|4.4.4


### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieildid                      | 4.3.0 |
| 子元素 | fieldid + "\_steps_icon_index" (index为当前元素索引),如果子元素自己有定义fieldid那么以自身的为准 | 4.3.0 |
