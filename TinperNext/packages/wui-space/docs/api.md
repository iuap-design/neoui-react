# 间距 Space

设置组件之间的间距。

## API

### Space

<!--Space-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 对齐方式 | start、end、center、baseline | - | 4.0.0 |
| direction | 间距方向 | `vertical` \ `horizontal` | `horizontal` | 4.0.0 |
| size | 间距大小 | small、middle、large 或 number像素值 | small | 4.0.0 |
| split | 设置拆分 | ReactNode | - | 4.0.0 |
| wrap | 是否自动换行，仅在 `horizontal` 时有效 | boolean | false | 4.0.0 |

### Space.Compact
> 自@4.4.4 版本开始提供该组件。

需要表单组件之间紧凑连接且合并边框时，使用 Space.Compact。支持的组件有：

- Button
- Input
- InputNumber
- DatePicker
- TimePicker
- Select
- TreeSelect
- Cascader
- AutoComplete

<!--Space.Compact-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将宽度调整为父元素宽度的选项 | boolean | false | 4.4.4 |
| direction | 指定排列方向 | `vertical` \ `horizontal` | `horizontal` | 4.4.4 |
