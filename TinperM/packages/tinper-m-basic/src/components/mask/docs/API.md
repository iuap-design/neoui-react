## Mask 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterClose | 完全关闭后触发 | `() => void` | - |
| afterShow | 完全展示后触发 | `() => void` | - |
| color | 背景蒙层的颜色 | `'black' \| 'white' \| string` | `'black'` |
| destroyOnClose | 不可见时是否销毁 `DOM` 结构 | `boolean` | `false` |
| disableBodyScroll | 是否禁用 `body` 滚动 | `boolean` | `true` |
| forceRender | 强制渲染内容 | `boolean` | `false` |
| getContainer | 指定挂载的 `HTML` 节点，如果为 `null` 的话，会渲染到当前节点 | `HTMLElement \| () => HTMLElement \| null` | `null` |
| onMaskClick | 点击蒙层自身触发 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | - |
| opacity | 透明度 | `'default' \| 'thin' \| 'thick' \| number` | `'default'` |
| stopPropagation | 阻止某些事件的冒泡 | `PropagationEvent[]` | `['click']` |
| visible | 是否可见 | `boolean` | `true` |
| style         | 样式               | `React.CSSProperties`     | -        |
| className     | 类名               | `string`                  | `string` |
| fieldid       | `dom`标识          | `string`                  | -        |
| clsPrefix     | `class`前缀        | `string`                  | `mui`    |

### CSS 变量

| 属性      | 说明             | 默认值 | 全局变量             |
| --------- | ---------------- | ------ | -------------------- |
| --z-index | 元素的 `z-index` | `1000` | `-` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_mask"`          |
| 内容            | fieldid + `"_mask_content"`  |
