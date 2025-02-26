## Empty 属性
### API

属性 | 说明 | 类型 | 默认值
----|----|----|----------
mode | 模式 noData: 无数据 noCollect: 暂无收藏 noResult: 暂无搜索结果 | `'noData' / 'noCollect' / 'noResult'` | `'noData'`
message | 显示信息 | `string` | `'暂无文件'`
style | 样式style | `React.CSSProperties` | -
fieldid | dom标识 | `string` | -
image | 自定义图片 | `string(url) / React.ReactNode` | `'noData'`
imageStyle | 自定义图片样式 | `React.CSSProperties` | -
className | 样式类名 | `string` | -
clsPrefix | class前缀 | `string` | `mui`


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 图片           | fieldid + `"_image"`  |
| 描述           | fieldid + `"_description"`          |
