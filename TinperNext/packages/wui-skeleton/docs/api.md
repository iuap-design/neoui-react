# 骨架屏 Skeleton

在需要等待加载内容的位置提供一个占位图形组合。

## API

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。
- 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。

### Skeleton

<!--Skeleton-->
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| active | 是否展示动画效果 | boolean | false |
| avatar | 是否显示头像占位图 | boolean \| SkeletonAvatarProps | false |
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | boolean | - |
| paragraph | 是否显示段落占位图 | boolean \| SkeletonParagraphProps | true |
| round | 为 true 时，段落和标题显示圆角 | boolean | false |
| title | 是否显示标题占位图 | boolean \| SkeletonTitleProps | true |

### SkeletonAvatarProps

<!--SkeletonAvatarProps-->
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| active | 是否展示动画效果，仅在单独使用头像骨架时生效 | boolean | false |
| shape | 指定头像的形状 | `circle` \| `square` | - |
| size | 设置头像占位图的大小 | number \| `large` \| `small` \| `default` | - |

### SkeletonTitleProps

<!--SkeletonTitleProps-->
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | 设置标题占位图的宽度 | number \| string | - |

### SkeletonParagraphProps

<!--SkeletonParagraphProps-->
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| rows | 设置段落占位图的行数 | number | - |
| width | 设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 | number \| string \| Array&lt;number \| string> | - |

### SkeletonButtonProps

<!--SkeletonButtonProps-->
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| active | 是否展示动画效果 | boolean | false |
| block | 按钮是否占一行（shape为circle的情况下无效） | boolean | false |
| shape | 指定按钮的形状 | `circle` \| `round` \| `default` | - |
| size | 设置按钮的大小 | `large` \| `small` \| `default` | - |

### SkeletonInputProps

<!--SkeletonInputProps-->
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| active | 是否展示动画效果 | boolean | false |
| size | 设置输入框的大小 | `large` \| `small` \| `default` | - |

### 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| 根元素 | fieldid  | - 