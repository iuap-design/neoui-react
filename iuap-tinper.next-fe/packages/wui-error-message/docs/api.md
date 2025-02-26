# 异常提示 ErrorMessage

基于Message组件封装的异常信息提示组件, 用于运行失败时展示异常信息

## API

- 默认继承[Message](https://yondesign.yonyou.com/website/#/detail/component/wui-message/other)

以下为特有属性：

| 参数             | 说明                                           | 类型                      | 默认值      | 版本 |
| ---------------- | ---------------------------------------------- | ------------------------- | ----------- | ---- |
| detailMsg     | 异常详情               | ReactNode               | -          | 1.0.5  |
| message     | 异常摘要 |  ReactNode  | -          | 1.0.5  |
| footer     | 信息框底部, 默认显示查看详情，可以自定义 |  ReactNode \| (defaultFooter) => ReactNode | -          | 1.0.3  |
| isCopy     | 底部是否显示复制功能               | boolean               | true          | 1.0.3  |
| defaultShowContent   | 默认是否展开内容详情               | boolean               | false         | 1.0.3  |
| errorInfo | 头部状态码信息，包含状态码和编码跳转地址|{displayCode: string; href: string}， 没有默认显示999-999-999 | -  | 1.0.5  |
| traceId | 链路ID | string  | - | 1.0.5  |
| level | 异常级别 0: 错误；1: 警告  | number  | 0 | 1.0.5  |
| uploadable | 是否可上报 0否，1是(默认) | -  | 1 | 1.0.5  |
| onUploadClick | 点击上报回调, 返回promise(成功: {status: true, callback}; 失败: {status: false, callback}; callback不是必填项) | () => Promise<Object>  | - | 1.0.5  |


- 通用api设置

```
ErrorMessage.config({
    isCopy: false, // 是否显示复制按钮
    uploadable: 0, // 是否显示上报按钮
    defaultShowContent: true, // 默认是否展开内容详情
    locale: 'zh-cn' // 国际化配置
});

//销毁所有消息
ErrorMessage.destroy();

//创建消息
ErrorMessage.create({});

```