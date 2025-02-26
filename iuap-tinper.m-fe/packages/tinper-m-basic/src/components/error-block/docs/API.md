## ErrorBlock 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 描述 | `ReactNode` | - |
| fullPage | 是否为整页异常 | `boolean` | `false` |
| image | 图片 | `string \| ReactElement` | - |
| status | 默认错误类型 | `'default' \| 'disconnected' \| 'failed' \| 'denied' \| 'error'` | `'default'` |
| title | 标题 | `ReactNode` | - |
| style | 样式style | `React.CSSProperties` | - |
| fieldid | dom标识 | `string` | - |
| className | 样式类名 | `string` | - |
| clsPrefix | class前缀 | `string` | `mui` |

### CSS 变量

| 属性 | 说明 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --image-height | 图片的高度 | `2.1rem` | `--ynfm-size-height-image-errorblock` |
| --image-height-full-page | 整页模式下的图片高度 | `2.1rem` | `--ynfm-size-height-image-fullpage-errorblock` |
| --image-width | 图片的宽度 | `auto` | `--ynfm-size-width-image-errorblock` |
| --image-width-full-page | 整页模式下的图片宽度 | `auto` | `--ynfm-size-width-image-fullpage-errorblock` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid          |
| 图片            | fieldid + `"_image"`  |
| 描述标题            | fieldid + `"_description_title"`  |
| 描述子标题           | fieldid + `"_description_subtitle"`  |
