## Switch 属性
### API


| 参数                                                              | 说明 | 类型 | 默认值                                                     |
|-----------------------------------------------------------------| --- | --- |---------------------------------------------------------|
| <span style="display:inline-block;width:120px">className</span> | 样式class       | `string`                                           | <span style="display:inline-block;width:100px">-</span> |
| style                                                           | 样式style       | `React.CSSProperties `                             | -                                                       |
| fieldid                                                         | dom标识         | `string `                                          | -                                                       |
| clsPrefix                                                       | class前缀       | `string`                                           | -                                                       |
| checked                                                         | 指定当前是否打开 | `boolean` | `false`                                                 |
| defaultChecked                                                  | 初始是否打开 | `boolean` | `false`                                                 |
| disabled                                                        | 是否禁用 | `boolean` | `false`                                                 |
| checkedText                                                     | 选中时的内容 | `ReactNode` | -                                                       |
| uncheckedText                                                   | 非选中时的内容 | `ReactNode` | -                                                       |
| loading                                                         | 加载状态 | `boolean` | `false`                                                 |
| visible                                                         | 是否可见 | `boolean` | `true`                                                  |
| beforeChange                                                    | 变化前执行 | `(val: boolean) => Promise<void>` | - |
| onChange                                                        | 变化时的回调函数，当返回 Promise 时，会自动显示加载状态 | `(val: boolean) => void \| Promise<void>` | - |

### CSS 变量

| 属性            | 说明       | 默认值                                                                | 全局变量                                     |
|---------------|----------|--------------------------------------------------------------------|------------------------------------------|
|--checked-color | 填充颜色     | `#EE2233`                                                          | `--ynfm-color-bg-switch-opened`          |
|--height | 高度       | `0.4rem`                                                          | `--ynfm-size-height-switch`              |
|--width | 宽度       | `0.72rem`                                                          | `--ynfm-size-width-switch`               |
|--border-width | 边框宽度     | `0.04rem`                                                              | `--ynfm-border-width-bg-switch`          |
|--border-radius-switch | 边线圆角     | `999px`                                                            | `--ynfm-border-radius-switch`            |
|--box-shadow-handle-switch | 手柄阴影     | `0 2px 8px 0 rgb(0 0 0 / 0.2), 0 4px 16px -1px rgb(0 0 0 / 0.16))` | `--ynfm-box-shadow-handle-switch`        |
|--color-bg-handle-switch | 手柄背景颜色   | `#FFFFFF`                                                          | `--ynfm-color-bg-handle-switch`          |
|--color-bg-switch-closed | 关闭背景颜色   | `#E5E5E5`                                                          | `--ynfm-color-bg-switch-closed`          |
|--font-size-switch | 文字字号     | `0.2rem`                                                           | `--ynfm-font-size-switch`                |
|--height-handle-switch | 手柄高度     | `0.32rem`                                                           | -                                        |
|--width-handle-switch | 手柄宽度     | `0.32rem`                                                           | -                                        |


## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
