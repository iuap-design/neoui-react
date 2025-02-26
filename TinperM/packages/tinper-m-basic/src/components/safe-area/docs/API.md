## SafeArea 属性
### API
| 属性     | 说明         | 类型                | 默认值 |
| -------- | ------------ | ------------------- | ------ |
| position | 安全区的位置 | `'top' \| 'bottom'` | -      |
| style | 自定义样式   | `React.CSSProperties` | -- |   
|className | 样式类名 | `string` | -- |
|fieldid | dom标识 | `string` | -- |
|clsPrefix | class前缀 | `string` | `'mui'`|

### CSS 变量

| 属性       | 说明       | 默认值 | 全局变量                   |
| ---------- | ---------- | ------ | -------------------------- |
| --multiple | 显示的倍数 | `1`    | `--mui-safe-area-multiple` |

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |

## 常见问题

### 安全区未生效
在页面中添加
```html
<meta name="viewport" content="viewport-fit=cover">
```
