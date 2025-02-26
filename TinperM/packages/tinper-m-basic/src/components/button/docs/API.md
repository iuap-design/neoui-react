## Button 属性

### API

| 属性         | 说明                                                                                 | 类型                                                                                  | 默认值              |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------- |
| mode         | 按钮模式                                                                             | `'default' \| 'primary' \| 'warning'\| 'info'\| 'success'\| 'danger' \| 'ghost' \| 'text'` | `'default'`       |
| size         | 按钮尺寸                                                                             | `'large' \| 'middle' \| 'small'`                                                      | `'middle'`        |
| block        | 通栏按钮，放置多个时按照父容器宽度均分                                               | `boolean`                                                                           | `false`           |
| visible      | 是否可见                                                                             | `boolean`                                                                           | `true`            |
| loading      | 是否加载中                                                                           | `boolean`                                                                           | `false`           |
| loadingIcon  | 加载状态图标                                                                         | `React.ReactNode \| string`                                                          | `<SpinLoading />` |
| loadingText  | 加载状态文字                                                                         | `string`                                                                            | -                   |
| icon         | 按钮图标                                                                             | `React.ReactNode \| string`                                                          | -                   |
| iconPosition | 图标位置                                                                             | `'top' \| 'right' \| 'bottom' \| 'left'`                                               | `'left'`          |
| className    | 样式类名                                                                             | `string`                                                                            | -                   |
| style        | 自定义样式                                                                           | `React.CSSProperties`                                                               | -                   |
| disabled     | 是否禁用                                                                             | `boolean`                                                                           | `false`           |
| fieldid      | dom标识                                                                              | `string`                                                                            | -                   |
| clsPrefix    | class前缀                                                                            | `string`                                                                            | `'mui'`           |
| onClick      | 点击事件                                                                             | `(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void`                  | -                   |
| shape        | 按钮圆角大小，设置为 `rounded、rectangular`时，`CSS`变量 `--border-radius`失效 | `'default' \| 'rounded' \| 'rectangular'`                                             | `default`         |

### CSS 变量

| 属性                   | 说明                              | 默认值      | 全局变量                             |
| ---------------------- | --------------------------------- | ----------- | ------------------------------------ |
| --text-color-default   | default 模式下文字颜色            | `#171717` | `--ynfm-color-text-stroke-btn`     |
| --text-color-primary   | primary 模式下文字颜色            | `#FFFFFF` | `--ynfm-color-text-fill-btn`       |
| --border-color-replica | default 和 warning 模式下边框颜色 | `#E5E5E5` | `--ynfm-color-border-stroke-btn`   |
| --color-primary        | 主题色                            | `#EE2233` | `--ynfm-color-bg-fill-btn-primary` |
| --border-radius        | 圆角大小                          | `0.08rem` | `--ynfm-border-radius-stroke-btn`  |
| --border-style         | 边框样式                          | `solid`   | `--ynfm-border-style-stroke-btn`   |
| --border-width         | 边框宽度                          | `0.02rem` | `--ynfm-border-width-stroke-btn`   |

## fieldid 说明

| 场景       | 生成规则                  |
| ---------- | ------------------------- |
| 根元素     | fieldid                   |
| 图标       | fieldid + "_icon"         |
| 加载中图标 | fieldid + "_loading_icon" |
