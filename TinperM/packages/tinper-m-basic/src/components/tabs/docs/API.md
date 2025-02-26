## Tabs 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前激活 `tab` 面板的 `key` | `string \| null` | - |
| activeLineMode | 激活 `tab` 下划线的模式 | `'auto' \| 'full' \| 'fixed'` | `'fixed'` |
| defaultActiveKey | 初始化选中面板的 `key`，如果没有设置 `activeKey` | `string \| null` | 第一个面板的 `key` |
| onChange | 切换面板的回调 | `(key: string, prevTab: any, currentTab: any) => void` | - |
| onTabClick | 点击头部 Tab 的回调 | `(key: string, clickTab: any) => void` | - |
| stretch | 选项卡头部是否拉伸 | `boolean` | `false` |
| clsPrefix | `class`前缀 | `string` | `mui` |
| className | 自定义类名 | `string` | - |
| fieldid | `dom`标识 | `string` | - |
| decoration | 激活 `tab` 下划线的样式选择 | `'line' \| 'dotLine'` | `'line'` |
| renderTabBar | 替换`Header`，注意使用时要把`header`传回来，例如`(header) => return <div>{header}</div>` | `(header) => void` | `-` |
| prerenderingSiblingsNumber | 预加载两侧`Tab`数量 | `number` | `1` |
| tabBarPosition | `Tab`位置，当值为`left``right`时，`decoration``activeLineMode`属性无效，因此不建议使用，此属性目前只为兼容旧版本组件 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| tabMaxWidth | `tab`的最大宽度，传值时需要带上单位 | `string` | `unset` |
| headerWrapClass | 标题`wrap`区域类名 | `string` | - |

### CSS 变量

| 属性 | 说明 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --active-line-border-radius | 当前激活 `tab` 下划线的圆角 | `999px` | `--ynfm-border-radius-line-tab-selected` |
| --active-line-color | 当前激活 `tab` 下划线的颜色 | `#EE2233` | `--ynfm-color-bg-line-tab-selected` |
| --active-line-height | 当前激活 `tab` 下划线的高度 | `0.06rem` | `--ynfm-size-height-line-tab-selected` |
| --active-title-color | 当前激活 `tab` 选项文字颜色 | `#171717` | `--ynfm-color-text-tab-selected` |
| --content-padding | `tab` 内容区的 `padding` | `0` | `--ynfm-spacing-padding-content-tab` |
| --fixed-active-line-width | 当前激活 `tab` 下划线的宽度，仅在 `activeLineMode` 为 `'fixed'` 时有效 | `0.32rem` | `--ynfm-size-width-line-tab-selected` |
| --title-font-size | 选项卡头文字的大小 | `0.28rem` | `--ynfm-font-size-tab` |

## Tabs.Tab 属性

### API

| 属性           | 说明                        | 类型        | 默认值  |
| -------------- | --------------------------- | ----------- | ------- |
| destroyOnClose | 不可见时是否销毁 `DOM` 结构 | `boolean`   | `false` |
| disabled       | 是否禁用                    | `boolean`   | `false` |
| forceRender    | 被隐藏时是否渲染 `DOM` 结构 | `boolean`   | `false` |
| key            | 对应 `activeKey`            | `string`    | -       |
| title          | 选项卡头显示文字            | `ReactNode` | -       |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_tabs"`          |
| Tab             | fieldid + `"_tabs_tab_${key}"`  |
| 下划线           | fieldid + `"_tabs_tab_line"`  |
| 内容            | fieldid + `"_tabs_tab_content_${key}"`  |

## FAQ

### Tabs 是否支持 sticky 吸顶效果？

支持，但是 Tabs 并没有一个类似于 `sticky` 的属性。你可以自己在 Tabs 的外层容器中增加一下 `position: sticky` 的 CSS 样式，从而实现吸顶效果。

### Tabs.Tab 关于 key 的类型问题

因为 `React` 内部会把传入的 `key` 转为 `string`，所以这里 `key` 的类型其实只要是符合 `React.Key` 都是可以的。
