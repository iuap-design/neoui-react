## DatePicker 属性
### API
属性| 说明                                                             | 类型                                                                                                  |默认值
----|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|----
value | 选中值                                                            | `Date`                                                                                              | -
defaultValue | 默认值                                                            | `Date`                                                                                              | -
title | 标题                                                             | `string`                                                                                            | -
onSelect | 选项改变时触发                                                        | `(value: Date) => void`                                                                             | -
onConfirm | 确认时触发                                                          | `(value: Date) => void`                                                                             | -
min | 最小值                                                            | `Date`                                                                                              | 十年前
max | 最大值                                                            | `Date`                                                                                              | 十年后
precision | 精度                                                             | `'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second' \| 'week' \| 'week-day' \| 'quarter'` | 'day'
| fieldid          | dom标识 | `string `                                                                                           | 无 | false
children | 所选项的渲染函数                                                       | `(value: Date) => ReactNode`                                                                        | -
renderLabel | 自定义渲染每列展示的内容。其中 `type` 参数为 `precision` 中的任意值，`data` 参数为默认渲染的数字 | `(type: string, data: number) => ReactNode`                                                         | -
filter | 过滤可供选择的时间                                                      | `DatePickerFilter`                                                                                  | -
use12Hours | 12小时制                                                          | `boolean`                                                                                           | false
minuteStep | 分钟数递增步长设置                                                      | `number`                                                                                            | 1
disabled | 是否禁用                                                           | `boolean`                                                                                           | false
clsPrefix | class前缀                                                        | `string`                                                                                            | mui-datepicker
className         | 样式类名 | `string`                                                                                            | -


此外还支持 `Picker` 的以下属性：`onCancel` `onClose` `closeOnMaskClick` `visible` `confirmText` `cancelText` `getContainer` `afterShow` `afterClose` `onClick` `title` `stopPropagation` `popupClassName` `popupStyle` `loading` `showClear`。

### CSS 变量
同picker

## fieldid 说明

| 场景  | 生成规则                 |
|-----|----------------------|
| 根元素 | fieldid              |
| 取消     | fieldid + "-cancel"           |
| 确定     | fieldid + "-confirm"          |
