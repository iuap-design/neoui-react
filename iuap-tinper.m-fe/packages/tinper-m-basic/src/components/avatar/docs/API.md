## Avatar 属性

### API

| 属性      | 说明           | 类型                                                     | 默认值      |
| --------- | -------------- | -------------------------------------------------------- | ----------- |
| fallback  | 占位图         | `ReactNode`                                            | 默认占位图  |
| fit       | 图片填充模式   | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` |
| src       | 头像的图片地址 | `string`                                               | -           |
| className | 样式类名       | `string`                                               | -           |
| style     | 自定义样式     | `React.CSSProperties`                                  | -           |
| fieldid   | dom标识        | `string`                                               | -           |
| clsPrefix | class前缀      | `string`                                               | `'mui'`   |

此外，还支持 [Image](/basic-components/image) 组件的 `alt` `lazy` `onClick` `onError` `onLoad` 属性。

### CSS 变量

| 属性            | 说明             | 默认值      | 全局变量                        |
| --------------- | ---------------- | ----------- | ------------------------------- |
| --border-radius | 圆角             | `100%`    | `--ynfm-border-radius-avatar` |
| --size          | 大小，宽度和高度 | `0.88rem` | `--ynfm-font-size-avatar`     |

## fieldid 说明

| 场景   | 生成规则 |
| ------ | -------- |
| 根元素 | fieldid  |

## Avatar.Group属性

### API

| 属性              | 说明                                                                    | 类型                                       | 默认值 |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------ | ------ |
| max               | 最多显示头像数                                                          | `number`                                 | 3      |
| maxContentType    | 超出部分显示模式(标签文字 ｜头像文字 ｜ 默认)                          | `'text' \| 'avatarText'`                  | --     |
| maxContent        | 自定义超出部分内容, 可定义为ReactNode或函数，函数接受超出的数量作为参数 | `ReactNode \| (overCounts) => ReactNode)` | --     |
| onMaxContentClick | 超出部分点击事件, 可获取到当前头像组的ref与组内全部的头像               | `(event, ref, avatars)=> void`           | --     |
| level             | 叠加方向(left为左侧被遮挡，right为右侧被遮挡)                           | `'left'\|'right'`                         | --     |
| gap               | 头像间距(负值为叠加展示)                                                | `number`                                 | -8     |

### CSS变量

| 属性                   | 说明         | 默认值      | 全局变量                        |
| ---------------------- | ------------ | ----------- | ------------------------------- |
| --avatar-border-radius | 组内图标圆角 | `100%`    | `--ynfm-border-radius-avatar` |
| --avatar-size          | 组内图标大小 | `0.88rem` | `--ynfm-font-size-avatar`     |
