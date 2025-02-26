## Image 属性
### API

| 属性               | 说明                                | 类型                                                               | 默认值                          |
|------------------| ----------------------------------- |------------------------------------------------------------------|------------------------------|
| <span style="display:inline-block;width:120px">className</span> | 样式class       | `string`                                                          | <span style="display:inline-block;width:100px">-</span> |
| style            | 自定义样式 | `React.CSSProperties`                                            | -                            |
| fieldid          | dom标识 | `string `                                                        | -                            |
| clsPrefix        | class前缀 | `string `                                                        | -                            |
| src              | 图片地址                            | `string `                                                        |  <span style="display:inline-block;width:100px">-</span>  |
| alt              | 图片描述                            | `string`                                                         | -                            |
| width            | 图片宽度，如果传入数字则单位为 `px` | `string/number`                                                  | -                            |
| height           | 图片高度，如果传入数字则单位为 `px` | `string/number`                                                  | -                            |
| fit              | 图片填充模式                        | 'contain' / 'cover'/ 'fill' / 'none' / 'scale-down'              | `'fill'`                     |
| placeholder      | 加载时的占位                        | `React.ReactNode`                                                | 默认占位                         |
| fallback         | 加载失败的占位                      | `React.ReactNode `                                               | 默认占位                         |
| lazy             | 是否懒加载图片                      | `boolean `                                                       | `false`                      |
| draggable        | 是否允许用户拖拽图片 | `boolean `                                                       | `false`                      |
| onError          | 加载失败时触发                      | `(event: React.SyntheticEvent<HTMLImageElement, Event>) => void` | -                            |
| onClick          | 图片点击事件                        | `(event: React.MouseEvent<HTMLImageElement, Event>) => void`     | -                            |
| onContainerClick | 容器点击事件                        | `(event: React.MouseEvent<HTMLImageElement, Event>) => void`     | -                            |
| onLoad           | 图片加载完时触发                    | `(event: React.SyntheticEvent<HTMLImageElement, Event>) => void` | -                            |


### CSS 变量

属性|说明|默认值|全局变量
----|----|----|----
--height | 图片高度 | `auto` | `--ynfm-size-height-image`
--width | 图片宽度 | `auto` | `--ynfm-size-width-image`

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| img标签           | fieldid + "_img" |
