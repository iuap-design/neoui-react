## TimeRangePicker 属性
### API
属性| 说明        | 类型                                                                       | 默认值            
----|-----------|--------------------------------------------------------------------------|----------------
value | 选中值       | `RangeDate`                                                                 | -              
defaultValue | 默认值       | `RangeDate`                                                                 | -              
popTitle | 标题        | `string`                                                                 | -              
placeholder | 占位文本      | `string`                                                                 | -              
onClearReturn | 清空并返回时触发  | `() => void`                                                             | -              
onDismiss | 取消时触发     | `() => void`                                                             | -              
onOk | 确认时触发     | `(value: RangeDate) => void`                                                | -              
minDate | 最小值       | `Date \| string`                                                         | -
maxDate | 最大值       | `Date \| string`                                                         | -              
mode | 精度        | `'year' \| 'month' \| 'day' \|  'minute' \| 'second' \| 'time' \| 'hms'` | day            
| fieldid          | dom标识     | `string `                                                                | 无              | false
minuteStep | 分钟数递增步长设置 | `number`                                                                               | 1
filter | 过滤可供选择的时间 | `DatePickerFilter`                                                                     | -
disabled | 是否禁用      | `boolean`                                                                              | false
use12Hours | 12小时制     | `boolean`                                                                | false          
clsPrefix | class前缀   | `string`                                                                 | mui-datepicker 
className         | 样式类名      | `string` | -
showClear         | 是否显示清空并返回按钮      | `boolean` | `true`

此外还支持 `Picker` 的以下属性： `popupClassName` `popupStyle` `getContainer`。

### 类型定义
```ts
type RangeDate = [start:Date | string, end:Date | string]
```


### CSS 变量
同 DatePicker


## fieldid 说明


| 场景     | 生成规则                          |
|--------|-------------------------------|
| 根元素    | fieldid                       |
| 取消     | fieldid + "-cancel"           |
| 确定     | fieldid + "-confirm"          |
| 清空并返回  | fieldid + "-clear-cancel"     |
