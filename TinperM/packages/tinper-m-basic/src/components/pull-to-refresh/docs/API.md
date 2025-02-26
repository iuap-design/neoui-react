## PullToRefresh 属性
### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| canReleaseText | 释放的提示文案 | `React.ReactNode` | `'释放立即刷新'` |
| completeDelay | 完成后延迟消失的时间，单位为 ms | `number` | `500` |
| completeText | 完成时的提示文案 | `React.ReactNode` | `'刷新成功'` |
| disabled | 是否禁用下拉刷新 | `boolean` | `false` |
| headHeight | 头部提示内容区的高度，单位为 px | `number` | `40` |
| onRefresh | 触发刷新时的处理函数 | `() => Promise<any>` | - |
| pullingText | 下拉的提示文案 | `React.ReactNode` | `'下拉刷新'` |
| refreshingText | 刷新时的提示文案 | `React.ReactNode` | `'加载中……'` |
| renderText | 根据下拉状态，自定义下拉提示文案 | `(status: PullStatus) => React.ReactNode` | - |
| threshold | 触发刷新需要下拉多少距离，单位为 px | `number` | `60` |
|className | 样式类名 | `string` | - |
|fieldid | dom标识 | `string` | - |
|clsPrefix | class前缀 | `string` | `'mui'` |

## fieldid 说明
| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid      |
