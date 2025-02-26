## DatePickerView 属性
### API
| 属性 | 说明 | 类型                                                                                                  | 默认值 | 版本 |
| --- | --- |-----------------------------------------------------------------------------------------------------| --- | --- |
| defaultValue | 默认选中项 | `PickerDate`                                                                                        | - |
| filter | 过滤可供选择的时间 | `DatePickerFilter`                                                                                  | - |
| max | 最大值 | `PickerDate`                                                                                        | 十年后 |
| min | 最小值 | `PickerDate`                                                                                        | 十年前 |
| mouseWheel | 是否允许通过鼠标滚轮进行选择 | `boolean`                                                                                           | `false` |
| onChange | 选项改变时触发 | `(value: PickerDate) => void`                                                                       | - |
| precision | 精度 | `'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second' \| 'week' \| 'week-day' \| 'quarter'` | `'day'` |
| renderLabel | 自定义渲染每列展示的内容。其中 `type` 参数为 `precision` 中的任意值，`data` 参数为默认渲染的数字 | `(type: string, data: number) => ReactNode`                                                         | - |
| value | 选中项 | `PickerDate`                                                                                        | - |
| loading | 是否处于加载状态 | `boolean`                                                                                           | `false` |
| loadingContent | 加载状态下展示的内容 | `ReactNode`                                                                                         | `默认提供了转圈加载中的加载效果` |
|use12Hours | 12小时制                                                          | `boolean`                                                                                           | false
|minuteStep | 分钟数递增步长设置                                                      | `number`                                                                                            | 1
|disabled | 是否禁用                                                           | `boolean`                                                                                           | false
|clsPrefix | class前缀                                                        | `string`                                                                                            | mui
|className         | 样式类名 | `string`                                                                                            | -
| fieldid          | dom标识 | `string `                                                                                           | 无 

关于 `DatePickerFilter` 的类型定义和使用，请参考 [DatePicker](/basic-components/date-picker) 的文档。

### CSS 变量

同 [PickerView](/basic-components/picker-view)。

## fieldid 说明

| 场景  | 生成规则                 |
|-----|----------------------|
| 根元素 | fieldid              |

