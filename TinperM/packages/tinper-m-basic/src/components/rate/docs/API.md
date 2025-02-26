## Rate 属性
### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否允许再次点击后清除 | `boolean` | `true` |
| allowHalf | 是否允许半选 | `boolean` | `false` |
| character | 自定义字符 | `ReactNode` | 默认的星形 |
| count | star 总数 | `number` | `5` |
| defaultValue | 默认值 | `number` | `0` |
| onChange | 选择时的回调 | `(value: number) => void` | - |
| readOnly | 只读，无法进行交互 | `boolean` | `false` |
| disabled | 禁用，无法进行交互 | `boolean` | `false` |
| value | 当前数，受控值 | `number` | - |
| fieldid          | dom标识 | `string `                                                        | -                                                                              | false
| className         | 样式类名 | `string` | -
| clsPrefix                                                       | class前缀       | `string`                                                          | mui                                                     |


### CSS 变量

| 属性 | 说明 | 默认值                       |
| --- | --- |---------------------------|
| --active-color | 填充色 | `--ynfm-color-icon-rate-selected` |
| --star-size | star 大小 | `--ynfm-font-size-icon-rate`                 |
| --inactive-color | 原始填充色 | `--ynfm-color-icon-rate` |


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
