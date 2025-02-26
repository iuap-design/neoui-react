## ActionSheet 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actions | 面板选项列表 | `Action[]` | `[]` |
| afterClose | 完全关闭后触发 | `() => void` | - |
| cancelText | 取消按钮文字，如果设置为空则不显示取消按钮 | `ReactNode` | - |
| closeOnAction | 点击选项后是否关闭 | `boolean` | `false` |
| closeOnMaskClick | 点击背景蒙层后是否关闭 | `boolean` | `true` |
| destroyOnClose | 不可见时是否销毁 `DOM` 结构 | `boolean` | `false` |
| forceRender | 强制渲染内容 | `boolean` | `false` |
| extra | 顶部的额外区域 | `ReactNode` | - |
| getContainer | 指定挂载的 `HTML` 节点，默认为 `body`，如果为 `null` 的话，会渲染到当前节点 | `HTMLElement \| () => HTMLElement \| null` | `document.body` |
| onAction | 点击选项时触发，禁用或加载状态下不会触发 | `(action: Action, index: number) => void` | - |
| onClose | 关闭时触发 | `() => void` | - |
| onMaskClick | 点击背景蒙层时触发 | `() => void` | - |
| popupClassName | `ActionSheet` 弹出层类名 | `string` | - |
| safeArea | 是否开启安全区适配 | `boolean` | `true` |
| visible | 显示隐藏 | `boolean` | `false` |
| styles | 语义化结构 style | `Partial<Record<''body' \| 'mask', CSSProperties>>` | - |
| className | 类名 | `string` | `-` |
| clsPrefix | `class`前缀 | `string` | `mui` |
| fieldid | `dom`标识 | `string` | `-` |

### Action

| 属性        | 说明           | 类型               | 默认值  |
| ----------- | -------------- | ------------------ | ------- |
| danger      | 是否为危险状态 | `boolean`          | `false` |
| description | 描述           | `ReactNode`        | -       |
| disabled    | 是否为禁用状态 | `boolean`          | `false` |
| key         | 唯一标记       | `string \| number` | -       |
| onClick     | 点击时触发     | `() => void`       | -       |
| text        | 标题           | `ReactNode`        | -       |
| bold        | 标题是否加粗   | `boolean`          | `false` |
| className   | 添加类名   | `string`          | `-` |
| style        | 添加样式   | `React.CSSProperties`          | `-` |

### 指令式

可以通过指令式的方式使用 ActionSheet：

```ts | pure
const handler = ActionSheet.show(props)
```

可以通过调用 `ActionSheet` 上的 `show` 方法直接打开动作面板，其中 `props` 参数的类型同上表，但不支持传入 `visible` 属性。

当动作面板被关闭后，组件实例会自动销毁。

`show` 方法的返回值为一个组件控制器，包含以下属性：

| 属性  | 说明         | 类型         |
| ----- | ------------ | ------------ |
| close | 关闭动作面板 | `() => void` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 浮框           | fieldid + `"_action_sheet_popup"`          |
| 背景蒙层            | fieldid + `"_action_sheet_popup_mask"`  |
| 浮框内容         | fieldid + `"_action_sheet_popup_body"`  |
| 面板              | fieldid + `"_action_sheet"`  |
| 顶部扩展              | fieldid + `"_action_sheet_extra"`  |
| 动作列表            | fieldid + `"_action_sheet_button_list"`  |
| 动作子元素    | fieldid + `"_action_sheet_button_item_${index}"`  |
| 取消按钮    | fieldid + `"_action_sheet_cancel"`  |

