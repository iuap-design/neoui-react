## Popup 属性

### API

| 属性            | 说明                                                                        | 类型                                                               | 默认值          |
| --------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------- |
| visible         | 是否可见                                                                    | `boolean`                                                          | `false`         |
| mask            | 是否展示蒙层                                                                | `boolean`                                                          | `true`          |
| onMaskClick     | 点击蒙层触发                                                                | `(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void` | -               |
| destroyOnClose  | 不可见时卸载内容                                                            | `boolean`                                                          | `false`         |
| forceRender     | 强制渲染内容                                                                | `boolean`                                                          | `false`         |
| getContainer    | 指定挂载的 `HTML` 节点，默认为 `body`，如果为 `null` 的话，会渲染到当前节点     | `HTMLElement \| () => HTMLElement \| null`                         | `document.body` |
| afterShow       | 完全展示后触发                                                              | `() => void`                                                       | -               |
| afterClose      | 完全关闭后触发                                                              | `() => void`                                                       | -               |
| position        | 指定弹出的位置                                                              | `'bottom' \| 'top' \| 'left' \| 'right'`                           | `'bottom'`      |
| className       | 容器类名                                                                    | `string`                                                           | -               |
| clsPrefix       | `class`前缀                                                                | `string`                                                           | `mui`            |
| style           | 容器样式                                                                    | `React.CSSProperties`                                              | -               |
| bodyClassName   | 内容区域类名                                                                | `string`                                                           | -               |
| bodyStyle       | 内容区域样式                                                                | `React.CSSProperties`                                              | -               |
| maskClassName   | 遮罩类名                                                                    | `string`                                                           | -               |
| maskStyle       | 遮罩样式                                                                    | `React.CSSProperties`                                              | -               |
| onClick         | 点击时触发，常用于阻止事件冒泡                                                | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void`    | -               |
| stopPropagation | 阻止某些事件的冒泡                                                           | `PropagationEvent[]`                                               | `['click']`     |
| onClose         | 关闭浮框时触发                                                               | `() => void`                                                       | -               |
| showCloseButton | 是否显示关闭按钮                                                             | `boolean`                                                          | `false`         |
| closeOnMaskClick | 点击背景蒙层后是否关闭                                                       | `boolean`                                                          | `false`         |
| closeOnSwipe    | 是否支持向上/下滑动关闭                                                       | `boolean`                                                          | `false`         |
| fieldid         | `dom`标识                                                                   | `string`                                                           | -               |
| popupTitle      | 标题，只在`position`为`bottom`时生效                                          | `ReactNode`                                                           | -               |
| footer          | 底部内容，只在`position`为`bottom`时生效                                       ｜ `Action[] \| ReactNode`                              | -                |
| safeAreaBottom  | 底部是否需要安全区域                                                      | `boolean`                                                          | `false`         |
| hideTitleOnNoClose  | 没有设置标题且设置了关闭按钮时，隐藏标题区域                 | `boolean`                                                          | `false`         |

### Action

| 属性      | 说明           | 类型                          | 默认值  |
| --------- | -------------- | ----------------------------- | ------- |
| text      | 标题           | `string`                      | -       |
| disabled  | 是否为禁用状态 | `boolean`                     | `false` |
| danger    | 是否为危险状态 | `boolean`                     | `false` |
| primary   | 是否为主要状态 | `boolean`                     | `false` |
| bold      | 是否文字加粗   | `boolean`                     | `false` |
| style     | `Action` 样式  | `React.CSSProperties`         | -       |
| className | `Action` 类名  | `string`                      | -       |
| onPress   | 点击时触发     | `() => void \| Promise<void>` | -       |

### CSS 变量

|属性|说明|默认值|全局变量|
|----|----|----|----|
| --z-index | 元素的 `z-index` | `1000` | `-` |

## CenterPopup 属性

和 Popup 不同，CenterPopup 是从中间弹出的。

### API

CenterPopup 不支持 `position` 属性，其他属性同 Popup。

### CSS 变量

|属性|说明|默认值|全局变量|
|----|----|----|----|
| --background-color | 弹层的背景色 | `#ffffff` | `--ynfm-color-bg-center-popup` |
| --border-radius | 弹层的边框圆角 | `0.16rem` | `--ynfm-border-radius-center-popup` |
| --max-width | 弹层的最大宽度 | `75vw` | `--ynfm-size-max-width-center-popup` |
| --min-width | 弹层的最小宽度 | `5.32rem` | `--ynfm-size-min-width-center-popup` |
| --z-index | 元素的 `z-index` | `1000` | `-` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_popup"`          |
| 内容            | fieldid + `"_popup_body"`  |
| 关闭按钮         | fieldid + `"_popup_close_icon"`  |
| 标题            | fieldid + `"_popup_title"`  |
