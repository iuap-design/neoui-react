# 回到顶部 BackTop

页面滚动到指定部位，返回到最上边或者指定位置时

## API

<!--BackTop-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|visibilityHeight|当滚动条高度达到多少显示backtop|`number`|400|
|target|设置要监听滚动事件的元素|`function`|() => window|
|click|点击backtop时的回调函数|`function`|-|
|character|自定义字符|`ReactNode`/`string`|<Icon type="uf-top-up"/>|
|fieldid|组件内元素标识, 推荐自动化测试使用|string|-|
