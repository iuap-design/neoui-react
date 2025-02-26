## InputNumber 属性

### API

属性 | 说明 | 类型 | 默认值 
----|-----|------|------
textAlign | 文字对齐方向 | `left` / `right` / `center` | `left`
inputStyle | 输入框样式 | `React.CSSProperties` | `-`
fieldid | `dom`标识 | `string` | `-`
defaultValue | 默认值 | `string` | `-`
value | 输入值 | `string` | `-`
placeholder | 占位符 | `string` | `-`
disabled | 是否禁用 | `boolean` | `false`
readOnly | 是否只读 | `boolean` | `false`
onChange | 修改后回调（需要精度值取第一个参数，需要输入值取第二个参数） | `(param: string / number, e: React.MouseEvent / ChangeEvent<HTMLInputElement>) => void` | `-`
onFocus | 获取焦点回调 | `(e: React.FocusEvent<HTMLInputElement>) => void` | `-`
onBlur | 失去焦点回调 | `(e: React.FocusEvent<HTMLInputElement>) => void` | `-`
onClickClear | 点击清空按钮回调 | `(value: string) => void` | `-`
showClose | 是否打开清空按钮 | `boolean` | `false`
check | 是否需要校验 | `boolean` | `false`
required | 必填校验 | `boolean` | `false`
pattern | 输入过程中的校验规则 | `RegExp` | `-`
finalPattern | 输入结束的校验规则 | `RegExp / Array<{ reg: RegExp, text: string }>` | `-`
customCheck | 用户自定义校验 | `(value: string, final?: boolean) => boolean` | `-`
onError | 校验失败回调 | `(value: string, pattern: { reg?: RegExp, text?: string }) => void` | `-`
onSuccess | 校验成功回调 | `(value: string) => void` | `-`
id | `input` 元素的 `id`，常用来配合 `label` 使用 | `string` | `-`
onlyShowClearWhenFocus | 如果为 `false`，那么输入框失去焦点后依旧会显示清除按钮(showClose配合使用) | `boolean` | `true`
addonBefore | 设置前置标签 | `string` / `node` | `-`
addonAfter | 设置后置标签 | `string` / `node` | `-`
name | input 的 name | `string` | `-`
max | 最大值 | `number` | `Number.MAX_SAFE_INTEGER`
min | 最小值 | `number` | `Number.MIN_SAFE_INTEGER`
tips | 输入框下方提示文本 | `string` / `node` | `-`
className | 类名 | `string` | `-`
clsPrefix | `class`前缀 | `string` | `mui`
format | 指定输入框展示值的格式 | `function(value: number / string): string` | `-`
precision | 数值精度 | `number` | `-`
showUnit | 下方显示数量级单位 | `boolean` | `false`
integerMarks | 自定义显示数量级单位（`len key`二者需要对应，`mark`表示自定义显示内容） | `{ len: string, mark: string, key: string }` | `-`
maxLength | 最大输入长度 | `number` | `-`
autoSelect | 聚焦时是否全部自动选中 | `boolean` | `false`
toThousands | 是否显示千分符，默认千分符为逗号 | `boolean` | `false`
toThousandsFormat | 配合`toThousands`使用，控制千分符、小数点的展示格式 | `string` | `#,###[.]###`
roundAt | 当设置小数精度后，传值小数大于精度值时，大于等于此值入，小于舍 | `number` | `5`
decimalFormat | 设置精度时，是否要省略小数点后无用的零 | `boolean` | `false`
formatReg | 配合`hiddenChart``replaceChart`使用，实现占位遮掩效果 | `string` | `-`
hiddenChart | 配合`formatReg``replaceChart`使用，遮掩码符号 | `string` | `*`
replaceChart | 配合`formatReg``hiddenChart`使用，占位码符号 | `string` | `#`
autoCorrectCase | 传值不在最大最小值范围内时，不做矫正处理，并触发`invalidCaseError` | `boolean` | `false`
invalidCaseError | 传值不在最大最小值范围内时，且`autoCorrectCase`为`true`时，不做矫正处理，并触发`invalidCaseError`报错回调 | `func` | `-`

### CSS 变量

属性|说明|默认值|全局变量
----|----|----|----
--color | 文字颜色 | `#171717` | `--ynfm-color-text-input`
--cursor-color | 光标颜色 | `#006FE6` | `--ynfm-color-cursor-input`
--readonly-color | 只读颜色 | `#171717` | `--ynfm-color-text-input-readonly`
--disabled-color | 禁用颜色 | `#737373` | `--ynfm-color-text-input-disabled`
--placeholder-color | 暗文字颜色 | `#BFBFBF` | `--ynfm-color-text-placeholder-input`

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_input_number"`         |
| 输入框           | fieldid + `"_input_number_box"`         |
| 前缀           | fieldid + `"_input_number_addonbefore"`         |
| 后缀           | fieldid + `"_input_number_addonafter"`         |
| 清空icon           | fieldid + `"_input_number_clear"`         |
