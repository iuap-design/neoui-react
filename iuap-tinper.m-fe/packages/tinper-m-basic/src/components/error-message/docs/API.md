## ErrorMessage 异常提示

### API

属性 | 说明 | 类型 | 默认值 
----|-----|------|------
message | 异常摘要 | `ReactNode` | `-`
errorInfo | 状态码 | `string` | `-`
onCodeClick | 点击状态码回调 | `() => void` | `-` 
traceId | 链路`ID` | `string` | `-`
uploadable | 是否可上报 | `boolean` | `false`
onUploadClick | 点击上报回调 | `() => void` | `-` 
detailMsg | 异常详情 | `string` | `-`
onClose | 关闭时触发 | `() => void` | `-` 
closeOnMaskClick | 是否支持点击遮罩关闭对话框 | `boolean` | `false`
visible | 显示隐藏 | `boolean` | `false`
fieldid | `dom`标识 | `string` | `mui`
style | 样式 | `React.CSSProperties` | `-`
className | 类名 | `string` | `-`

### ErrorMessage.create
create 方法支持传入一个 props 对象，它包含了以下这些属性：

属性 | 说明 | 类型 | 默认值
----|-----|------|------
message | 异常摘要 | `ReactNode` | `-`
errorInfo | 状态码 | `string` | `-`
onCodeClick | 点击状态码回调 | `() => void` | `-` 
traceId | 链路`ID` | `string` | `-`
uploadable | 是否可上报 | `boolean` | `false`
onUploadClick | 点击上报回调 | `() => void` | `-` 
detailMsg | 异常详情 | `string` | `-`
onClose | 关闭时触发 | `() => void` | `-` 
closeOnMaskClick | 是否支持点击遮罩关闭对话框 | `boolean` | `false`
fieldid | `dom`标识 | `string` | `mui`
style | 样式 | `React.CSSProperties` | `-`
className | 类名 | `string` | `-`

### ErrorMessage.destroy

关闭所有显示中的 ErrorMessage

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_error_message"`         |
| 链路ID复制           | fieldid + `"_error_message_id_copy"`         |
| 异常详情复制           | fieldid + `"_error_message_detail_copy"`         |