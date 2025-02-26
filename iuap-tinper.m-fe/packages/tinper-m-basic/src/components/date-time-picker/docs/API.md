## DateTimePicker 属性
### API
属性| 说明      | 类型                                                                       | 默认值           
----|---------|--------------------------------------------------------------------------|---------------
value | 选中值     | `Date \| string`                                                         | -             
defaultValue | 默认值     | `Date \| string`                                                         | -             
popTitle | 标题      | `string`                                                                 | -             
placeholder | 占位文本    | `string`                                                                 | -             
onOk | 确认时触发   | `(value: Date) => void`                                                  | -             
onClearReturn | 清空并返回时触发  | `() => void`                                                             | -             
onDismiss | 取消时触发     | `() => void`                                                             | -             
minDate | 最小值     | `Date \| string`                                                         | -             
maxDate | 最大值     | `Date \| string`                                                         | -             
format | 格式化 | `(date:Date \| string) => string`                                        | -              
mode | 精度      | `'year' \| 'month' \| 'day' \|  'minute' \| 'second' \| 'time' \| 'hms'` | day           
| fieldid          | dom标识   | `string `                                                                | 无             | false
use12Hours | 12小时制   | `boolean`                                                                | false         
disabled | 是否禁用    | `boolean`                                                                | false         
clsPrefix | class前缀 | `string`                                                                 | mui-datepicker 
className         | 样式类名 | `string`                                                                 | -             
getContainer | 指定挂载的 `HTML` 节点，默认为 `body`，如果为 `null` 的话，会渲染到当前节点 | `'HTMLElement' \| '() => HTMLElement' \| 'null'` | `document.body`

### CSS 变量
同 DatePicker

## fieldid 说明

| 场景     | 生成规则                          |
|--------|-------------------------------|
| 根元素    | fieldid                       |
| 取消     | fieldid + "-cancel"           |
| 确定     | fieldid + "-confirm"          |
| 清空并返回  | fieldid + "-clear-cancel"     |
