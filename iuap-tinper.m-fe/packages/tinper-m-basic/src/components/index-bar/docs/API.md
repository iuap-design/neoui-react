## IndexBar 属性

### API

| 属性          | 说明                 | 类型                      | 默认值 |
| ------------- | -------------------- | ------------------------- | ------ |
| onIndexChange | 当锚点变化时回调     | `(index: string) => void` | -        |
| sticky        | 是否开启锚点自动吸顶  | `boolean`                 | `true`   |
| style         | 样式               | `React.CSSProperties`     | -        |
| className     | 类名               | `string`                  | `string` |
| fieldid       | `dom`标识          | `string`                  | -        |
| clsPrefix     | `class`前缀        | `string`                  | `mui`    |

### Ref

| 属性     | 说明           | 类型                      |
| -------- | -------------- | ------------------------- |
| scrollTo | 滚动到指定锚点 | `(index: string) => void` |

### CSS 变量

| 属性                | 说明                       | 默认值 | 全局变量 |
| ------------------- | -------------------------- | ------ | -------- |
| --sticky-offset-top | 锚点自动吸顶时与顶部的距离 | `0`    | `-` |

## IndexBar.Panel 属性

### API

| 属性  | 说明                   | 类型        | 默认值                      |
| ----- | ---------------------- | ----------- | --------------------------- |
| brief | 右侧索引条中的显示内容 | `ReactNode` | 默认取 `index` 的第一个字符 |
| index | 索引（不可以重复）     | `string`    | -                           |
| title | 左侧主内容区的分组标题 | `ReactNode` | 默认取 `index`              |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_index_bar"`          |
| 侧边栏            | fieldid + `"_index_bar_sidebar"`  |
| 侧边栏子元素         | fieldid + `"_index_bar_sidebar_row_${index}"`  |
| 内容            | fieldid + `"_index_bar_body"`  |
| 锚点            | fieldid + `"_index_bar_anchor_${index}"`  |
| 锚点标题            | fieldid + `"_index_bar_anchor_title_${index}"`  |
