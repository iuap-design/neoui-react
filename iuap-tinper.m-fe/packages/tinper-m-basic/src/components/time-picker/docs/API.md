## TimePicker 属性
### API
属性| 说明                           | 类型                                                        | 默认值        
----|------------------------------|-----------------------------------------------------------|------------
value | 选中值                          | `Date \| string`                                          | -              
defaultValue | 默认值                          | `Date                                          \| string` | -          
popTitle | 标题                           | `string`                                                  | -          
placeholder | 占位文本                         | `string`                                                  | -          
onClearReturn | 清空并返回时触发  | `() => void`                                              | -          
onDismiss | 取消时触发     | `() => void`                                              | -          
onOk | 确认时触发                        | `(value: Date) => void`                                   | -          
subuitype | 精度                           | `'HH:mm'  \| 'HH:mm:ss'`                                  | 'HH:mm:ss' 
format | 格式化 | `(date: Date \| string    \| null) => string;`            | -          
hourStep | 小时数递增步长设置                    | `number`                                                  | 1          
minuteStep | 分钟数递增步长设置                    | `number`                                                  | 1          
secondStep | 秒数递增步长设置                     | `number`                                                  | 1          
fieldid          | dom标识                        | `string `                                                 | 无          | false
use12Hours | 12小时制                        | `boolean`                                                 | false      
disabled | 是否禁用                         | `boolean`                                                 | false      
clsPrefix | class前缀                      | `string`                                                  | mui        
className         | 样式类名                         | `string`                                                  | -          
showClear         | 是否显示清空并返回按钮                         | `boolean`                                                  | true          

此外还支持 `Picker` 的以下属性： `popupClassName` `popupStyle` `getContainer`。


### CSS 变量
同 DatePicker

## fieldid 说明


| 场景     | 生成规则                          |
|--------|-------------------------------|
| 根元素    | fieldid                       |
| 取消     | fieldid + "-cancel"           |
| 确定     | fieldid + "-confirm"          |
| 清空并返回  | fieldid + "-clear-cancel"     |
