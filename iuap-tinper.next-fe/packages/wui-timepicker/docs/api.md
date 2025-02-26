# 时间 TimePicker

时间输入框

## API

<!--TimePicker-->

| 参数                | 说明                                                               | 类型                      | 默认值            | 版本  |
| ------------------- | ------------------------------------------------------------------ | ------------------------- | ----------------- | ----- |
| fieldid             | fieldid 前缀(如 fieldid_inner)【自动化测试专用属性】               | String                    | -                 | 4.3.0 |
| locale              | 多语                                                               | String                    | 'zh-cn'           |
| clearText           | 清除按钮提示信息                                                   | String                    | 'clear'           |
| clearIcon           | 自定义的清除图标                                                   | ReactNode                 |                   |
| requiredStyle       | 必填样式                                                           | Boolean                   | false             | 4.6.6 |
| bordered            | 设置边框，支持无边框、下划线模式                                   | `boolean`\|`bottom`       | -                 | 4.5.2 |
| align               | 设置文本对齐方式                                                   | `left`\|`center`\|`right` | -                 | 4.5.2 |
| disabled            | 禁用时间组件                                                       | Boolean                   | false             |
| allowEmpty          | 允许为空                                                           | Boolean                   | true              |
| autoComplete        | 浏览器自动填充功能                                                 | String                    | 'off'             |
| allowClear          | 是否显示清空按钮                                                   | Boolean                   | true              |
| open                | 设置当前弹出状态                                                   | Boolean                   | false             |
| defaultValue        | 默认值                                                             | moment                    | null              |
| defaultOpenValue    | 默认打开的值                                                       | moment                    | moment()          |
| value               | 当前值                                                             | moment                    | null              |
| placeholder         | 输入框的 placeholder                                               | String                    | ''                |
| className           | 设置 TimePicker 的 className                                       | String                    | ''                |
| popupClassName      | 弹出面板的 ClassName                                               | String                    | ''                |
| showNow             | 面板是否显示“此刻”按钮                                             | Boolean                   | false             | 4.4.4 |
| showHour            | 设置显示小时                                                       | Boolean                   | true              |
| showMinute          | 设置显示分钟                                                       | Boolean                   | true              |
| showSecond          | 设置显示秒                                                         | Boolean                   | true              |
| format              | 显示格式                                                           | String                    | -                 |
| disabledHours       | 设置禁用的小时                                                     | Function                  | -                 |
| disabledMinutes     | 设置禁用的分钟                                                     | Function                  | -                 |
| disabledSeconds     | 设置禁用的秒                                                       | Function                  | -                 |
| use12Hours          | 切换 12 小时制                                                     | Boolean                   | false             |
| hourStep            | 小时间隔                                                           | Number                    | 1                 |
| minuteStep          | 分钟间隔                                                           | Number                    | 1                 |
| secondStep          | 秒间隔                                                             | Number                    | 1                 |
| hideDisabledOptions | 是否隐藏禁用选项                                                   | Boolean                   | false             |
| onChange            | 改变时的回调                                                       | Function                  | null              |
| renderExtraFooter   | 从时间面板渲染一些插件在它的底部，如 OK 按钮。接收面板实例作为参数 | Function                  | -                 |
| placement           | enum('topLeft', 'topRight', 'bottomLeft', 'bottomRight')           | String                    | bottomLeft        |
| name                | 设置 input 的 name 属性                                            | String                    | -                 |
| onOpenChange        | 面板打开/关闭时的回调                                              | Function({ open })        | -                 |
| getPopupContainer   | 定义浮层的容器，默认为 body 上新建 div                             | Function                  | -                 |
| suffixIcon          | 设置输入框中的图标                                                 | node                      | -                 |
| prefixCls           | prefixCls of this component                                        | String                    | 'wui-time-picker' |

## 已废弃

| 参数          | 说明                                                                                           | 类型               | 默认值 | 版本 |
| ------------- | ---------------------------------------------------------------------------------------------- | ------------------ | ------ | ---- |
| ~~onOpen~~    | 面板打开时的回调                                                                               | Function({ open }) | -      |      |
| ~~onClose~~   | 面板关闭时的回调                                                                               | Function({ open }) | -      |      |
| ~~inputIcon~~ | 设置输入框中的图标按钮                                                                         | node               | -      |      |
| ~~showClear~~ | 是否显示清空按钮，建议使用 allowClear                                                          | node               | -      |      |
| ~~addon~~     | 从时间面板渲染一些插件在它的底部，如 OK 按钮。接收面板实例作为参数，建议使用 renderExtraFooter | node               | -      |      |

### fieldid 场景说明

| 场景     | 生成规则说明        | 版本  |
| -------- | ------------------- | ----- |
| 根元素   | fieldid             | 4.3.0 |
| 输入框   | fieldid + "\_input" | 4.3.0 |
| 清除按钮 | fieldid + "\_clear" | 4.3.0 |
