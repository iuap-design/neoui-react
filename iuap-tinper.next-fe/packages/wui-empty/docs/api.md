# 空状态 Empty

空状态时的展示占位图、当目前没有数据时，用于显式的用户提示。

## API

<!--Empty-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|description|自定义描述内容|ReactNode|-|
|image|设置显示图片，为 string 可传入自定义图片地址或者内置的几种空状态（not-found,no-visualize-data,no-collect,no-data,no-search,no-network,no-data-easy）。|ReactNode/string|no-data|
|imageStyle|图片样式|CSSProperties|-|
|fieldid|组件内元素标识, 推荐自动化测试使用|string|-|