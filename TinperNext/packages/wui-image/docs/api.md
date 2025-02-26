# 图片查看器 Image

图片查看器

## API

<!--Image-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|asyncLoad|图片是否异步加载|bool|false|
|inline|启用 inline 模式|bool|false|
|button|显示右上角关闭按钮|bool|true|
|navbar|显示缩略图导航|bool|true|
|alt|显示当前图片的alt属性及图片尺寸|bool|true|
|toolbar|显示工具栏|bool|true|
|showAllToolbar|显示全部工具栏|bool|true|v4.6.0
|tooltip|显示缩放百分比|bool|true|
|movable|图片是否可移动|bool|true|
|zoomable|图片是否可缩放|bool|true|
|rotatable|图片是否可旋转|bool|true|
|scalable|图片是否可翻转|bool|true|
|transition|使用 CSS3 过度|bool|true|
|fullscreen|播放时是否全屏|bool|true|
|keyboard|是否支持键盘|bool|true|
|interval|播放间隔，单位为毫秒|number|5000|
|zoomRatio|鼠标滚动时的缩放比例|number|0.1|
|minZoomRatio|最小缩放比例|number|0.01|
|maxZoomRatio|最大缩放比例|number|100|
|zIndex|设置图片查看器 modal 模式时的 z-index|number|2015|
|zIndexInline|设置图片查看器 inline 模式时的 z-index|number|0|
|getPopupContainer|设置图片查看器 modal 模式的容器，inline 模式无效|element|body|v4.0.0
|src|图片查看器中图片的地址|string|data-original|
|shown|图片查看器显示后的回调|func|()=>{}|
|hidden|图片查看器关闭后的回调|func|()=>{}|
|fieldid| (children中img标签添加)组件内元素标识, 推荐自动化测试使用|string|-|

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|container|设置图片查看器 modal 模式的容器，inline 模式无效|element|body|
|title|显示当前图片的alt属性及图片尺寸, 建议使用alt|bool|true|
|url|图片查看器中图片的地址, 建议使用src|string|data-original|
