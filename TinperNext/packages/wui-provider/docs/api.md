# 全局化配置 ConfigProvider

ConfigProvider组件，在使用时，需要将你的App跟组件包裹起来。这样才能影响到所有使用的子组件。

## API

<!--ConfigProvider-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|locale|设置的语言对象|object|中文语言包|v4.0.0
|antd|设置和antd返回参数一致|bool|false|v4.0.0
|size|设置组件的尺寸|string|-|v4.0.0
|bordered|设置输入类组件的边框，支持无边框、下划线模式|`boolean`\|`bottom`| -|v4.5.2
|align|设置输入类组件的文本对齐方式|`left`\|`center`\|`right`|  -|v4.5.2
|table|设置Table组件的通用属性|string|-|v4.2.1


提供全局设置 locale方法
```
ConfigProvider.config({locale: 'xxx'})
```
