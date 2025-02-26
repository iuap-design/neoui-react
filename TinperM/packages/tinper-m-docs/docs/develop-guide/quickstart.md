---
nav: basic-components
group:
  title: 开发指南
  order: 0
order: 2
title: 快速开始
toc: content
---

# 快速开始

## 安装 TinperM

```shell
// 全局安装ynpm-tool
$ npm install ynpm-tool -g

// 使用ynpm安装组件库
$ ynpm install --save @tinper/m
```

## 项目中使用

推荐通过在工程中module.xml文件进行配置
```xml
<?xml version="1.0" encoding="utf-8"?>
<module name="your program name" description="你的工程">
    <nginx_mode>ucf</nginx_mode>
    <ucf_engine>
        <cdn scope="html,js,css,map,ftl"></cdn>
        <dependencies>
            <dependency name="iuap-tns.share-fe"  tag="release"  />
            <dependency name="iuap-tinper.m-fe"  tag="release"  />
        </dependencies>
    </ucf_engine>
</module>
```

以button组件为例

```jsx
import React, { Component } from 'react'
import { Button } from '@tinper/m';

export default class myComponent extends Component {

  render() {
    return (
      <div>
        <Button onClick={onClick} >按钮</Button>
      </div>
    )
  }
}
```

## 引入方式一：使用package.json依赖引入

```jsx
{
    "dependencies": {
         "@tinper/m": "latest",
    }
}
```

## 引入方式二：使用CDN方式外部引入

组件库打包排除react和react-dom,需要在引入组件库前引入
引入React/ReactDom
```html
<script src="//design.yonyoucloud.com/static/react/18.2.0/umd/react.production.min.js"></script>
<script src="//design.yonyoucloud.com/static/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
```
引入css样式
```html
//引入指定版本号
<link href="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/[版本号]/tinper-m.css" type="text/css" rel="stylesheet" />

//平台开发环境
<link href="//oss-iuap-dev.yyuap.com/static/ucf/iuap-tinper.m-fe/snapshot/tinper-m.css" type="text/css" rel="stylesheet" />
//测试环境
<link href="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/snapshot/tinper-m.css" type="text/css" rel="stylesheet" />
//日常环境
<link href="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/alpha/tinper-m.css" type="text/css" rel="stylesheet" />
//预发环境
<link href="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/beta/tinper-m.css" type="text/css" rel="stylesheet" />
//核心1环境
<link href="//static-dc-core1.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/rc1/tinper-m.css" type="text/css" rel="stylesheet" />
//核心2、3、4、商开环境
<link href="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/release/tinper-m.css" type="text/css" rel="stylesheet" />
```
引入js脚本
```html
//引入指定版本号
<script src="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/[版本号]/tinper-m.min.js"></script>

//平台开发环境
<script src="//oss-iuap-dev.yyuap.com/static/ucf/iuap-tinper.m-fe/snapshot/tinper-m.min.js"></script>
//测试环境
<script src="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/snapshot/tinper-m.min.js"></script>
//日常环境
<script src="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/alpha/tinper-m.min.js"></script>
//预发环境
<script src="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/beta/tinper-m.min.js"></script>
//核心1环境
<script src="//static-dc-core1.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/rc1/tinper-m.min.js"></script>
//核心2、3、4、商开环境
<script src="//design.yonyoucloud.com/static/ucf/iuap-tinper.m-fe/release/tinper-m.min.js"></script>
```

<!-- ## 引入方式三：如果你的项目在统一域名下

```html
bip-test.yyuap.com、bip-daily.yyuap.com、bip-pre.diwork.com、yonbip.diwork.com, 通过访问 "${统一域名}/iuap-tinper/ucf-wh/m/version.json" 可以获取当前使用的TinperM版本
```

使用下方TNS地址代替
```html
<script src="/iuap-tns/ucf-wh/share/static/react/16.14.0/umd/react.production.min.js"></script>
<script src="/iuap-tns/ucf-wh/share/static/react-dom/16.14.0/umd/react-dom.production.min.js"></script>
```

(公有云/专属云)
```html
<script id="tinper-m-js-id" src="/iuap-tinper/ucf-wh/m/tinper-m.min.js"></script>
<link  crossorigin="anonymous" rel="stylesheet" id="tinper-m-css-id" type="text/css" href="/iuap-tinper/ucf-wh/m/tinper-m.css">
```

在webpack配置中排除

```javascript
module.exports = {
    // ...
    externals : {
    '@tinper/m': 'TinperM'
  }
    // ...
}
``` -->
## 按需加载

使用 babel-plugin-import 来进行自动语法转换。

安装 `babel-import-plugin` 后，在babel配置文件中添加:

```jsx
"plugins": [
  [
    'import',
    {
      libraryName: '@tinper/m',
      customName: (name) => {
        return `@tinper/m/lib/cjs/components/${name}/src`;
      }
    },
    '@tinper/m'
  ]
],
```

配置了按需引用后需要单独引入主题样式文件
`import '@tinper/m/lib/cjs/theme/index.css'`

