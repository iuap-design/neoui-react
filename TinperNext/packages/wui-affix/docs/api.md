# 固钉 Affix

将页面元素钉在可视范围

## API

<!--Affix-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|offsetTop|固定被触发距离，默认是0 ，可选的属性|number|0|
|horizontal|被固定时是否可以左右滑动，默认是false，可选的属性|boolean|false|
|target|设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数，默认值() => window |function|() => window|
|onChange|触发固定或者固定取消时的回调函数,返回值{ affixed: true, event: evt} |function|-|
|onTargetChange|时刻获取Affix的状态值,返回值{state} |function|-|
|childrenRef|child是动态变化的时候，使用该属性重新计算child宽高|object|-|
|getPopupContainer|固定元素所属容器|object|document.body|v4.0.0
|offsetBottom|距离窗口底部达到指定偏移量后触发|number|-|v4.0.0
|initCalc|页面初始时是否计算DOM需要定位|false|-|v4.3.0

---

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|container|固定元素所属容器|object|document.body|
