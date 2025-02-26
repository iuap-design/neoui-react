# 加载提示 Spin

加载数据时显示动效。

## API

<!--Spin-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|loadingType|Loading类型，可选值为 `default` `rotate` `line` `custom` `antd`(`antd`模式用于组件中有children,启用`default`样式)|string|`default`|
|indicator|自定义加载图标，**注意：必须设置 loadingType='custom'**|ReactElement|-|
|size|加载大小，可选值为 `lg` `md` `sm`(支持antd`large`  `middle` `small`属性)|string|md|
|color|加载颜色 `primary` `success` `warning`|string|`primary`|
|showBackDrop|是否显示遮罩层|boolean|true|
|fullScreen|是否全屏显示，若Loading显示在 body 上，建议设置该属性|boolean|false|
|wrapperClassName|容器样式(和antd配合时，容器样式添加到容器根部)|string|''|
|tip|Loading的文字描述|string|''|v2.0.0|
|spinning|是否为加载中状态|boolean|false|v4.0.0|
|antd|支持组件中有children时渲染|boolean|false|v4.0.0|
|delay|延迟显示加载效果的时间（防止闪烁）|number (毫秒)|-|v4.0.0|
|getPopupContainer|渲染到的容器，通过this可以显示在该组件的上面，也可以通过function中return一个元素来显示在指定元素上面|this或者function|默认显示在body上面|v4.0.0

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|show|是否为加载中状态，建议使用spinning属性|boolean|false|
|container|渲染到的容器，通过this可以显示在该组件的上面，也可以通过function中return一个元素来显示在指定元素上面|this或者function|默认显示在body上面|