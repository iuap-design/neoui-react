# 分页 Pagination

用于内容过多，分页显示内容

## API

<!--Pagination-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|current|当前页码|number|-|4.x.x
|defaultCurrent|默认页码|number|1|4.x.x
|dropdownAlign|控制页码下拉框方向的align对象 参考[这里](https://github.com/yiminghe/dom-align#usage)|object|-|4.x.x
|onChange|切换页的方法|func |() => {}|4.x.x
|maxButtons|显示最多页数按钮|number|5|
|prev|显示上一页按钮|bool|true|
|next|显示下一页按钮|bool|true|
|first|显示第一页按钮|bool|true|
|last|显示最后一页按钮|bool|true|
|ellipsis|显示省略按钮|bool|true|
|boundaryLinks|显示边界按钮|bool|true|
|gap|按钮之间有间隔,页码有边框的情况下生效|bool|true|
|noBorder|不显示按钮边框|bool|true|
|size|分页按钮大小(lg sm)|string|'sm'|
|showQuickJumper|是否显示跳页选择|bool|true|4.x.x
|showSizeChanger|是否显示页码选择框|bool|false|4.x.x
|showTotal|用于显示数据总量和当前数据顺序, 返回null则不显示总条数|function(total, range)|-|4.4.4|
|onPageSizeChange|选择每页多少条的回调函数|func|() => {}|4.x.x
|pageSizeOptions|每页多少条的下拉选择Option内容|array|['10','20','30','50','100','200','500','1000',]|4.x.x
|defaultPageSize| 默认每页数量(优先级：pageSize >  手动选择下拉框 > defaultPageSize) |10| |4.x.x
|pageSize| 每页数量（优先级高于dataNum），当pageSize和pageSizeOptions同时存在，且pageSizeOptions中不存在pageSize，自动将pageSize加入到pageSizeOptions | num| |4.x.x
|total|一共多少条; 为Infinity时，有无穷条，且分页处于loading状态，详见示例|num|0|
|disabled|pagination不可用，不可点击|bool|false|
|confirmBtn|渲染确认按钮dom的方法,showQuickJumper为true的情况下有效|func|() => {}|
|pageSizeInput|每页显示数是否支持自定输入|bool|false|
|sizeChangerProps|页码选择框配置,可使用select相关属性（bordered, dropdownClassName, dropdownStyle, fieldid, id, listHeight, placement, dropdownAlign, suffixIcon, getPopupContainer）|object||
|simple| 简单模式 | boolean \| {showSizeChanger?: boolean; showQuickJumper?: boolean;} | false |4.6.5|
|locale| 语言(zh-cn/en-us/zh-tw) | string | zh-cn ||
|fieldid|自动化测试专用属性|string||
|hideOnSinglePage|只有一页时是否隐藏分页器|boolean|false|4.4.4|
|itemRender|用于自定义页码的结构，可用于优化SEO|(page, type: 'page'/'prev'/'next'/'first'/'last', originalElement) => React.ReactNode|-|4.4.4|
|cacheId|使用cacheId记录当前pageSize, 具体使用方法见示例|string|-|

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|items|总页数(不建议使用,建议使用total设置总记录数，items优先级最高，即设置了items则total不再自动计算总页数)|number|1|
|activePage|当前页码; 建议使用current|number|1|
|defaultActivePage|默认页码|number|1|
|showJump|是否显示跳页选择，建议使用showQuickJumper|bool|false|
|onSelect|切换页的方法，建议使用onChange|func|() => {}|
|onDataNumSelect|选择每页多少条的回调函数，建议使用onPageSizeChange|func|-|
|dataNumSelect|每页多少条的下拉选择Option内容，建议使用pageSizeOptions|array|同pageSizeOptions|
|dataNum|每页显示条数在 dataNumSelect 数组中的下标 index。例如每页显示 15 条，那么 dataNum 的值应为 '15' 在 ['10','15','20','30','50','100','200','500','1000',] 中的下标：1；请使用pageSize代替 |num|1|

## 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| 根元素 | fieldid | - 
| 总页数 | fieldid-total | - 
| 分页下拉 | fieldid-size-changer | - 
| 页码跳转输入框 | fieldid-jump | - 
| 第一页图标 | fieldid-first | - 
| 上一页图标 | fieldid-prev | - 
| 下一页图标 | fieldid-next | - 
| 最后一页图标 | fieldid-last | - 


