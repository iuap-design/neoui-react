---
nav: basic-components
group:
  title: 开发指南
  order: 0
order: 3
title: 国际化
toc: content
---
# 国际化
## ConfigProvider 
TinperM提供了 [ConfigProvider](/basic-components/config-provider)  组件用于全局配置国际化文案。

```javascript
import React from 'react'
import { ConfigProvider } from '@tinper/m';

return (
  <ConfigProvider locale='en-US'>
    <App />
  </ConfigProvider>
)
```

 语言 | 对应值
------|------
简体中文 | `'zh-CN'`
英文 | `'en-US'`
繁体中文 | `'zh-TW'`

## FAQ
### 为什么组件指令式的调用不支持 ConfigProvider
以 Modal 为例，直接调用 Modal.alert 方法，TinperM 会通过 ReactDOM.render 动态创建新的 React 实体。其 context 与当前代码所在 context 并不相同，因而无法获取 context 信息。

可以通过 setTinpermLocaleConfig 设置默认语言

```javascript
import { ConfigProvider } from '@tinper/m';

ConfigProvider.setTinpermLocaleConfig('en-US')
```
