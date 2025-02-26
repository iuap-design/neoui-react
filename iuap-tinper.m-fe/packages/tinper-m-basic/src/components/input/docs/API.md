## Input 属性

### API

属性 | 说明 | 类型 | 默认值 
----|-----|------|------
mode | 模式 | `text` / `password` / `idCard` / `ipAddress` / `bankCard16` / `bankCard19` / `number` | `text`
inputmode | 移动端弹出的小键盘 | `text` / `decimal` | `text`
textAlign | 文字对齐方向 | `left` / `right` / `center` | `left`
inputStyle | 输入框样式 | `React.CSSProperties` | `-`
fieldid | `dom`标识 | `string` | `-`
defaultValue | 默认值 | `string` | `-`
value | 输入值 | `string` | `-`
placeholder | 占位符 | `string` | `-`
disabled | 是否禁用 | `boolean` | `false`
readOnly | 是否只读 | `boolean` | `false`
maxLength | 最大输入长度 | `number` | `-`
onChange | 修改后回调 | `(value: string) => void` | `-`
onFocus | 获取焦点回调 | `(value: string) => void` | `-`
onBlur | 失去焦点回调 | `(value: string) => void` | `-`
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
onEnterPress | 按下回车的回调 | `(e: React.KeyboardEvent<HTMLInputElement>) => void` | `-`
onlyShowClearWhenFocus | 如果为 `false`，那么输入框失去焦点后依旧会显示清除按钮(showClose配合使用) | `boolean` | `true`
prefix | 左边注释 | `string` / `node` | `-`
suffix | 右边注释 | `string` / `node` | `-`
onSuffixClick | suffix 点击事件触发的回调函数 | `(e: Object) => void` | `-`
name | input 的 name | `string` | `-`
updatePlaceholder | 当清除内容时，是否将清除前的内容替换到 placeholder 中 | `boolean` | `false`
max | 最大值，仅在 `mode` 为 `number` 时生效 | `number` | `-`
min | 最小值，仅在 `mode` 为 `number` 时生效 | `number` | `-`
tips | 输入框下方提示文本 | `string` / `node` | `-`
className | 类名 | `string` | `-`
clsPrefix | `class`前缀 | `string` | `mui`

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
| 根元素           | fieldid + `"_input"`         |
| 输入框           | fieldid + `"_input_box"`         |
| 前缀           | fieldid + `"_input_prefix"`         |
| 后缀           | fieldid + `"_input_suffix"`         |
| 清空icon           | fieldid + `"_input_clear"`         |
| 密码icon           | fieldid + `"_input_password"`         |
