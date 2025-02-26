
## picker 属性
### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cancelText | 取消按钮的文字 | `ReactNode` | `'取消'` |
| children | 所选项的渲染函数 | `(items: PickerColumnItem[], actions: PickerActions) => ReactNode` | - |
| closeOnMaskClick | 点击背景蒙层后是否关闭 | `boolean` | `true` |
| columns | 配置每一列的选项 | `PickerColumn[] \| ((value: PickerValue[]) => PickerColumn[])` | - |
| confirmText | 确定按钮的文字 | `ReactNode` | `'确定'` |
| defaultValue | 默认选中项 | `PickerValue[]` | `[]` |
| destroyOnClose | 不可见时是否销毁 `DOM` 结构 | `boolean` | `false` |
| forceRender | 强制渲染内容 | `boolean` | `false` |
| mouseWheel | 是否允许通过鼠标滚轮进行选择 | `boolean` | `false` |
| onCancel | 取消时触发 | `() => void` | - |
| onClose | 确认和取消时都会触发关闭事件 | `() => void` | - |
| onConfirm | 确认时触发 | `(value: PickerValue[], extend: PickerValueExtend) => void` | - |
| onSelect | 选项改变时触发 | `(value: PickerValue[], extend: PickerValueExtend) => void` | - |
| popupClassName | Popup 弹层容器的自定义类名 | `string` | - |
| popupStyle | Popup 弹层容器的自定义样式 | `React.CSSProperties ` | - |
| renderLabel | 自定义渲染每列展示的内容 | `(item: PickerColumnItem) => ReactNode` | `(item) => item.label` |
| title | 标题 | `ReactNode` | - |
| value | 选中项 | `PickerValue[]` | - |
| visible | 是否显示选择器 | `boolean` | `false` |
| loading | 是否处于加载状态 | `boolean` | `false` |
| loadingContent | 加载状态下展示的内容 | `ReactNode` | `默认提供了转圈加载中的加载效果` |
| showClear | 是否显示清空并返回按钮 | `boolean` | `false` |

此外还支持 [Popup](/zh/components/popup) 的以下属性：`getContainer` `afterShow` `afterClose` `onClick` `stopPropagation`

**请留意，`columns` 属性的类型是二级数组**，第一级对应的是每一列，而第二级对应的是某一列中的每一个选项。因此，下面的这种写法是错误的：

```jsx
<Picker
  columns={[
    { label: 'Foo', value: 'foo' },
    { label: 'Bar', value: 'bar' },
  ]}
/>
```

需要写成：

```jsx
<Picker
  columns={[
    [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' },
    ]
  ]}
/>
```

### 类型定义
```typescript
type PickerColumnItem = {
  label: ReactNode
  value: string
  key?: string | number
}

type PickerColumn = (string | PickerColumnItem)[]

type PickerValue = string | null

type PickerValueExtend = {
  items: (PickerColumnItem | null)[]
}
```
### Ref

同 PickerActions。


### CSS 变量

| 属性                           | 说明               | 默认值      | 全局变量                               |
| ------------------------------| ------------------|-------------| --------------------------------------|
| --title-text-color            | 标题文本颜色       | `#171717`   | --ynfm-color-text-title-picker       |
| --title-font-size             | 标题字号           | `0.34rem`   | --ynfm-font-size-title-picker        |
| ---title-height           | 标题高度           | `0.88rem`   | --ynfm-size-height-title-picker      |
| --title-font-weight           | 标题字重           | `400`       | --ynfm-font-weight-title-picker      |

此外还支持pickerView css变量

### PickerActions 
| 属性   | 说明                         | 类型         |
| ------ | ---------------------------- | ------------ |
| close  | 关闭 Picker                  | `() => void` |
| open   | 显示 Picker                  | `() => void` |
| toggle | 切换 Picker 的显示和隐藏状态 | `() => void` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 取消     | fieldid + "-cancel"           |
| 确定     | fieldid + "-confirm"          |
