# 数字框 InputNumber

数字输入框

## API

<!--InputNumber-->

| 参数               | 说明                                                                                                         | 类型                          | 默认值               | 版本   |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | ----------------------------- | -------------------- | ------ |
| className          | 类名                                                                                                         | string                        | -                    |
| rootClassName      | 根节点类名                                                                                                   | string                        | -                    | v4.0.0 |
| max                | 最大值（blur 时校验）                                                                                        | number                        | -                    |
| min                | 最小值（blur 时校验）                                                                                        | number                        | -                    |
| keyboard           | 是否启用键盘快捷行为                                                                                         | boolean                       | true                 | v4.4.4 |
| step               | 每次加减改变步数                                                                                             | number                        | 1                    |
| defaultValue       | 初始值                                                                                                       | number                        | -                    |
| value              | 当前值                                                                                                       | number                        | 0                    |
| format             | 指定输入框展示值的格式                                                                                       | function                      | -                    |
| precision          | 显示精度。如要输入小数，此属性必须设置                                                                       | number                        | 显示小数点后面的位数 |
| delay              | 当持续按住增减按钮式，变换的速度（毫秒）                                                                     | number                        | 300                  |
| disabled           | 是否可编辑                                                                                                   | string                        | -                    |
| iconStyle          | 输入框样式形态，有 one 和 double 两个值                                                                      | string                        | double               | v4.0.0 |
| readOnly           | 只读                                                                                                         | string                        | -                    |
| autoFix            | onChange 时是否自动校正输入                                                                                  | bool                          | false                | v4.1.7 |
| toNumber           | onChange 回调内的值是否转换为 number 类型。当正在输入小数点或者小数点后第一位为 0 时，不能转换为 number 类型 | bool                          | true                 |
| toThousands        | 是否自动添加千分符                                                                                           | bool                          | false                |
| split              | InputNumberGroup 自定义分隔符                                                                                | node                          | ~                    |
| displayCheckPrompt | 是否显示超出限制范围之后的检验提示                                                                           | bool                          | false                |
| size               | 选择框大小，可选 lg sm                                                                                       | string                        | default              |
| align              | 输入框内容对齐方式                                                                                           | `left` \| `center` \| `right` | `left`               | 4.4.5  |
| minusRight         | 负号是否在右边，针对特殊场景使用                                                                             | bool                          | false                |
| handleBtnClick     | 点击右侧按钮的回调，第一个参数为类型，上/+ 为`up`，下/- 为`down`，第二个参数为 value 值                      | func                          | -                    |
| controls           | 隐藏加减按钮                                                                                                 | bool                          | false                |
| onChange           | 值改变的回调函数                                                                                             | function                      | -                    |
| onBlur             | 输入框失焦的回调函数                                                                                         | function(value, event)        | -                    |
| onFocus            | 输入框获取焦点的回调函数                                                                                     | function(value, event)        | -                    |
| onPressEnter       | 按下回车的回调                                                                                               | function                      | -                    | v4.0.0 |
| onStep             | 点击上下箭头的回调                                                                                           | function                      | -                    | v4.0.0 |
| addonAfter         | 带标签的 input，设置后置标签                                                                                 | ReactNode                     | -                    | v4.1.6 |
| addonBefore        | 带标签的 input，设置前置标签                                                                                 | ReactNode                     | -                    | v4.1.6 |
| fieldid            | 自动化测试专用属性                                                                                           | string                        | -                    | 4.3.0  |
| bordered           | 设置边框，支持无边框、下划线模式                                                                             | `boolean`\|`bottom`           | -                    | 4.5.2  |
| align              | 设置文本对齐方式                                                                                             | `left`\|`center`\|`right`     | -                    | 4.5.2  |
| requiredStyle      | 必填样式                                                                                                     | Boolean                       | false                | 4.6.6  |
| showMark           | 显示数量级标记                                                                                               | bool                          | false                | 4.6.3  |
| autoCorrectCase    | 传入值不在最大最小值范围内，不做矫正处理，并触发`invalidCaseError`报错回调                                         | bool                          | false                |
| invalidCaseError   | 传入值不在最大最小值范围内，且`autoCorrectCase`设置为`true`时，不做矫正处理，并触发`invalidCaseError`报错回调        | func                          | -                |
| showAmountInWords  | 是否显示金额大写。注意：此功能只在中文环境下显示，建议配合 `inputWidth`使用，不支持在`group`模式下使用。                | bool                          | false                |
| showAmountLayout   | 金额大写布局形式。注意事项同`showAmountInWords`                                                               | `vertical`\|`horizontal`      | `vertical`                |
| inputWidth         | 金额大写模式下，不包含大写区域宽度设置。注意事项同`showAmountInWords`，仅在`showAmountInWords`生效时有效             | string                       | -                |
| onlyShowAmount     | 金额大写模式下，是否只显示金额大写内容，不显示`大写：`几个字符。注意事项同`showAmountInWords`                          | bool                         |   false              |
| decimalFormat      | 不论是否有精度配置，都省略小数后无用的0                                                                          | bool                         |   false              |
| roundAt            | 当设置小数精度后，传值小数大于精度值时，大于等于此值入，小于舍                                                                           | number                         |   5              |
| formatReg          | 配合`hiddenChart``replaceChart`使用，实现占位遮掩效果                                                                           | string                         |   -             |
| hiddenChart        | 配合`formatReg``replaceChart`使用，遮掩码符号                                                                         | string                         |   `*`            |
| replaceChart       | 配合`formatReg``hiddenChart`使用，占位码符号                                                                        | string                         |   `#`            |

### fieldid 场景说明

| 场景     | 生成规则说明                | 版本  |
| -------- | --------------------------- | ----- |
| 根元素   | fieildid + "\_input-number" | 4.3.0 |
| 输入框   | fieldid                     | 4.3.0 |
| 增加按钮 | fieldid + "\_plus"          | 4.3.0 |
| 减少按钮 | fieldid + "\_minus"         | 4.3.0 |

### 已支持的键盘操作

| 按键      | 功能               |
| --------- | ------------------ |
| ↑(上箭头) | 增加一个 step 步长 |
| ↓(下箭头) | 减少一个 step 步长 |

### 已废弃

| 参数                 | 类型     | 描述                   |
| -------------------- | -------- | ---------------------- |
| ~~formatter~~        | function | 指定输入框展示值的格式 |
| ~~hideActionButton~~ | bool     | 隐藏加减按钮           |
