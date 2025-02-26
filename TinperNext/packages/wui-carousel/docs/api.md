# 走马灯 Carousel

一组轮播的区域，基于 react-slick 实现。

## API

<!--Carousel-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|autoplay |是否自动切换|boolean|false|
|dotPosition |面板指示点位置，可选 `top` `bottom` `left` `right`|string|bottom|
|dots |是否显示面板指示点|boolean|true|
|dotsClass |自定义面板指示点类名|string|-|4.5.0|
|draggable |是否可以拖拽面板|boolean|false|
|easing |动画效果|string|linear|
|effect |动画效果函数，可取 scrollx, fade|string|scrollx|
|speed |动画速率(单位毫秒)|number|500|
|beforeChange |切换面板的回调|function(from, to)|false|
|afterChange |切换面板的回调|function(current)|无|
|arrows | 显示左右切换箭头 | boolean | false | 4.5.2 |

## 方法

|名称|描述|
| --- | --- |
|goTo(slideNumber, dontAnimate) |切换到指定面板, dontAnimate = true 时，不使用动画|
|next() |切换到下一面板|
|prev() |切换到上一面板|

更多参数可参考：https://github.com/akiran/react-slick

### 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| 根元素 | fieldid  | - |

