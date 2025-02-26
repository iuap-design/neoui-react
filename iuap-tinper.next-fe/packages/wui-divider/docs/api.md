# 分割线 Divider

## API

<!--Divider-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|className|分割线样式类|string| - |
|orientation|分割线标题的位置|left &#124; right &#124; center| center |
|style|分割线样式对象| Object| - |
|type|水平还是垂直类型|horizontal &#124; vertical| horizontal |
|lineType|分割线线型，默认实线,可以选择虚线、点线、双实线| solid &#124;dashed &#124; dotted &#124; double | solid | 4.5.2 |


### 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| 根元素 | fieldid  | - |

### 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|dashed|是否虚线, 建议使用lineType = 'dashed'|boolean| false |