# svg图标 SvgIcon

## 何时使用

SVG 图标

## API

<!--SvgIcon-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|className|自定义类名|string|-|
|type|图标类型。遵循图标的命名规范|string|-|
|component|控制如何渲染图标，通常是一个渲染根标签为 <svg> 的 React 组件，会使 type 属性失效|ComponentType|-|
|fieldid|组件内元素标识, 推荐自动化测试使用|string|-|
|fontFamily|加载自定义图标资源（接收字符串为自定义图标资源的id）|string|-|

## 注意

目前提供了一些内置的svg图标，需要手动引入svg图标文件

```js
import iconfont from '@tinper/next-ui/lib/wui-svgicon/src/iconfont.js';
```

## 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| 根元素 | fieldid  | - 