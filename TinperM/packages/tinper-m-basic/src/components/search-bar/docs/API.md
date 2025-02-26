## SearchBar 属性

### API

| 属性                   | 描述                                                                                      | 类型                                                                 | 默认值             |
| ---------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------ |
| value                  | 输入框的值                                                                                | `string`                                                           | -                  |
| defaultValue           | 输入框的默认值                                                                            | `string`                                                           | -                  |
| placeholder            | 输入框的占位文本                                                                          | `string`                                                           | `'输入进行搜索'` |
| maxLength              | 输入框的最长长度                                                                          | `string`                                                           | -                  |
| disabled               | 是否禁用输入框                                                                            | `boolean`                                                          | `false`          |
| onChange               | 输入框内容发生变化时的回调函数                                                            | `(value) => void`                                                  | -                  |
| onFocus                | 输入框获得焦点时的回调函数                                                                | `() => void`                                                       | -                  |
| onBlur                 | 输入框失去焦点时的回调函数                                                                | `() => void`                                                       | -                  |
| onClear                | 点击清除图标时的回调函数                                                                  | `(preValue) => void`                                               | -                  |
| leftIcon               | 左侧图标，如果不传则使用默认放大镜图标                                                    | `ReactNode`                                                        | `'放大镜图标'`   |
| rightIcon              | 右侧图标，如果不传则使用默认扫描图标                                                      | `ReactNode`                                                        | `'扫描图标'`     |
| onRightIconClick       | 点击右侧图标时的回调函数                                                                  | `() => void`                                                       | -                  |
| fieldid                | 输入框的 DOM 标识                                                                         | `string`                                                           | -                  |
| showCancelButton       | 是否一直显示取消按钮                                                                      | `boolean`                                                          | `false`          |
| cancelText             | 取消按钮的文本                                                                            | `string`                                                           | `'取消'`         |
| onCancel               | 点击取消按钮时的回调函数                                                                  | `(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void` | -                  |
| clearOnCancel          | 点击取消按钮后是否清空输入框                                                              | `boolean`                                                          | `true`           |
| clearable              | 是否启用清除图标，点击清除图标后清空输入框                                                | `boolean`                                                          | `true`           |
| onSearch               | 在输入框中按下回车键时的回调函数                                                          | `(value: string) => void`                                          | -                  |
| className              | 样式类名                                                                                  | `string`                                                           | -                  |
| onlyShowClearWhenFocus | 如果为 true，只有输入框聚焦时才显示清除按钮；如果为 false，输入框失去焦点后仍显示清除按钮 | `boolean`                                                          | `undefined`      |
| autoFocus              | 自动聚焦                                                                                  | `boolean`                                                          | `false`          |

### CSS 变量

| 属性            | 描述                 | 默认值      | 全局变量                                  |
| --------------- | -------------------- | ----------- | ----------------------------------------- |
| --background    | 背景色               | `#FFF`    | `--ynfm-color-bg-searchbar`             |
| --border-radius | 圆角                 | `0.08rem` | `--ynfm-border-radius-searchbar`        |
| --height        | 高度                 | `0.88rem` | `--ynfm-size-height-input-searchbar`    |
| --padding-left  | 搜索框的左侧 padding | `0.22rem` | `--ynfm-spacing-padding-left-searchbar` |

### Ref

| 属性  | 说明             | 类型           |
| ----- | ---------------- | -------------- |
| focus | 输入框激活       | `() => void` |
| blur  | 搜索框失焦       | `() => void` |
| clear | 搜索框清空       | `() => void` |
| value | 获取搜索框当前值 | --             |

## fieldid 说明

| 场景         | 生成规则                   |
| ------------ | -------------------------- |
| 根元素       | fieldid                    |
| 输入框       | fieldid + "_input"         |
| 取消按钮     | fieldid + "_cancel_btn"    |
| 默认搜索图标 | fieldid + "_icon_search"   |
| 默认扫描图标 | fieldid + "_icon_scanning" |
