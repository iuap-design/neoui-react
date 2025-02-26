## Swiper 属性
### API
 属性             | 说明                                                         | 类型                                                         | 默认值         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- |
| defaultIndex     | 初始位置                                                     | `number`                                                     | `0`            |
| allowTouchMove   | 是否允许手势滑动                                             | `boolean`                                                    | `true`         |
| autoplay         | 是否自动切换                                                 | `boolean`                                                    | `false`        |
| autoplayInterval | 自动切换的间隔，单位为 `ms`                                  | `number`                                                     | `3000`         |
| loop             | 是否循环                                                     | `boolean`                                                    | `false`        |
| direction        | 方向，默认是水平方向                                         | `'horizontal' \| 'vertical'`                                  | `'horizontal'` |
| onIndexChange    | 切换时触发                                                   | `(index: number) => void`                                    | -              |
| indicatorProps   | 指示器的相关属性                                             | `{color: ''}` | -              |
| indicator        | 自定义指示器                                                 | `(total: number, current: number) => ReactNode`              | -              |
| slideSize        | 滑块的宽度百分比                                             | `number`                                                     | `100`          |
| trackOffset      | 滑块轨道整体的偏移量百分比                                   | `number`                                                     | `0`            |
| stuckAtBoundary  | 是否在边界两边卡住，避免出现空白，仅在非 `loop` 模式且 `slideSize` < 100 时生效 | `boolean`                                                    | `true`         |
| rubberband       | 是否在拖动超出内容区域时启用橡皮筋效果，仅在非 `loop` 模式下生效 | `boolean`                                                    | `true`         |
|className | 样式类名 | `string` | - |
|style | 自定义样式 | `React.CSSProperties` | -|
|fieldid | dom标识 | `string` | -|
|clsPrefix | class前缀 | `string` | `'mui'`|
### CSS变量
| CSS变量                         | 描述                                 | 默认值                         | 全局变量值                                       |
| ------------------------------ | ---------------------------------------- | ------------------------------ | -------------------------------------------- |
| --width                     | 宽度                                 | `100%`                   | `--ynfm-size-width-swiper`           |
| --height                    | 高度                                 | `auto`                   | `--ynfm-size-height-swiper`           |
| --border-radius                    | 圆角                                 | `0`                   | `--ynfm-border-radius-swiper`           |
| --track-padding                   | 轨道padding                                 | `0`                   | `--ynfm-spacing-padding-track-swiper`           |

### Ref
|属性	|说明	|类型|
|---	|---	|---	|
|swipeTo	|切换到上一页	|()=>void |
|swipeNext	|切换到下一页	|()=>void |
|swipePrev	|切换到指定轮播	|(index: number)=>void |

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |
