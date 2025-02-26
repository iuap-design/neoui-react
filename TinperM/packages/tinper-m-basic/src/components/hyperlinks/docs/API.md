## Hyperlinks 属性
### API

| 属性                     | 说明       | 类型                                               | 默认值   |
|------------------------|----------|--------------------------------------------------|-------|
| linkTextPlaceholder    | 链接文字输入提示 | string                                           | -     |
| linkAddressPlaceholder | 链接地址输入提示 | string                                           | -     |
| disabled               | 是否禁用     | boolean                                          | false |
| value                  | 值        | LinkProps                                        | -     |    
| defaultvalue           | 默认值      | LinkProps                                        | -     |    
| onChange               | 值改变事件    | (value: LinkChangeValue) => void                 |
| onBlur                 | 失去焦点事件   | (value: LinkChangeValue) => void                 |
| onFocus                | 聚焦焦点事件   | (value: LinkChangeValue) => void                 |
| onClick                | 浏览态点击事件  | (event: MouseEvent, linkAddress: string) => void |
| fieldid                | dom标识    | `string `                                        | -     | false
| className              | 样式类名     | `string`                                         | -     
| clsPrefix              | class前缀  | `string`                                         | mui   |

### 类型定义
```ts
type  Protocol  = 'http:' | 'https:'
interface LinkProps {
  linkText?: string
  linkAddress?: string
  protocol?: Protocol
}
type LinkChangeValue = JsonSerialized<LinkProps>

```

## fieldid 说明

| 场景   | 生成规则                           |
|------|--------------------------------|
| 根元素  | fieldid                        |
| 链接地址 | fieldid + '-linkAddress'       |
| 链接文本 | fieldid + '-linkText'          |
| 链接协议 | fieldid + '-protocol-trigger'  |
| 协议内容 | fieldid + '-protocol-floating' |
