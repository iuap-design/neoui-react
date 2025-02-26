
## ImageViewer 属性
### API
| 属性 | 说明 | 类型 | 默认值                                                     |
| --- | --- | --- |---------------------------------------------------------|
|<span style="display:inline-block;width:100px">className</span> | 样式class       | `string`                                           | <span style="display:inline-block;width:100px">-</span> |
|style | 样式style       | `React.CSSProperties `                             | -                                                       |
|fieldid | dom标识         | `string `                                          | -                                                       |
|clsPrefix | class前缀       | `string`                                           | -                                                       |
| getContainer | 指定挂载的 HTML 节点，默认为 `null` 渲染到当前节点 | `HTMLElement \| () => HTMLElement \                                     | document.body ? null | 
| visible | 隐藏/显示预览 | `boolean` | `false`                                                 |
| closeBtn | 是否展示关闭按钮 | `boolean` | `false`                                                 |
| deleteBtn | 是否显示删除操作 | `boolean` | `false`                                                 |
| maxZoom | 最大缩放比例 | `number \| 'auto'`                                                 | `3` |
| onClose | 关闭时触发 | `(event: React.MouseEvent<HTMLElement, MouseEvent>) => void` | -                                                       |
| afterClose | 完全关闭后触发 | `(event: React.MouseEvent<HTMLElement, MouseEvent>) => void` | -                                                       |
| renderFooter | 渲染底部额外内容 | `(image: string) => ReactNode` | -                                                       |
| image | 图片资源的 `url` | `string` | -                                                       |

### CSS 变量
|属性| 说明   | 默认值    |全局变量
|----|------|--------|----
|--font-size | 文字字号 | `0.3rem` | `--ynfm-font-size-imageviewer`
|--font-weight | 文字字重 | `500`  | `--ynfm-font-weight-imageviewer`

### Ref
| 属性    | 说明           | 类型                                          |
| ------- | -------------- | --------------------------------------------- |
| swipeTo | 切换到指定索引 | `(index: number, immediate: boolean) => void` |

## ImageViewer.Multi 属性
### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultIndex | 默认显示第几张图片 | `number` | `0` |
| images | 图片资源的 url 列表 | `string[]` | - |
| onIndexChange | 切换图片时触发 | `(index: number) => void` | - |
| renderFooter | 渲染底部额外内容 | `(image: string, index: number) => ReactNode` | - |

其他属性同 `ImageViewer`，但是去掉了 `image` 属性。


## 指令式

相比于上文中组件式的使用方式，指令式更加方便也更加常用，在大多数情况下，都推荐使用这种方式：

```ts | pure
const handler = ImageViewer.show(props)
const handlerMulti = ImageViewer.Multi.show(props)
```

可以通过调用 `ImageViewer` 上的 `show` 方法直接进入图片查看。其中 `props` 参数的类型同上表，但不支持传入 `visible` 属性。当查看器被关闭后，组件实例会自动销毁。

`show` 方法的返回值为一个组件控制器，包含以下属性：

| 属性  | 说明           | 类型         |
| ----- | -------------- | ------------ |
| close | 关闭图片查看器 | `() => void` |

如果你想关闭全部通过指令式创建出来的 ImageViewer，可以调用 `ImageViewer.clear()`。

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 内容区域           | fieldid      |
| 遮罩层           | fieldid + "_mask" |
| 滑动区域           | fieldid + "_slide" |

