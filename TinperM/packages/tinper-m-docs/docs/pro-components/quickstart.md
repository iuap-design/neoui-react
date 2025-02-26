---
nav: pro-components
group:
  title: 开发指南
  order: 0
order: 2
title: 快速开始
toc: content
---
# TinperM-Pro

TinperM-Pro是一套构建于 TinperM 基础组件之上的高级组件库，专为加速业务场景开发而设计，提供一致性 UI 解决方案。通过提供更高层次的抽象和开箱即用的功能，提高了业务页面开发的效率，使开发者能够更加聚焦于页面逻辑本身。

在决定是否将这些组件应用于你的业务之前，建议先浏览官方提供的典型示例，以便更好地评估其适用性。

## 如何使用TinperM-Pro

### 引入二方包

TinperM-Pro 作为 ynf-tinper-m-pro 二方包提供，通过 TNS（统一前端NGINX服务）进行资源托管与管理。

确保你的项目已接入 TNS。

### 直接引入组件

工程接入tns后，可直接从二方包引入组件使用

```tsx
import { Table } from 'ynf-tinper-m-pro';

export default class myComponent extends Component {
  render() {
    return (
      <div>
        <Table></Table>
      </div>
    )
  }
}
```

### 使用 Module Federation 模块联邦

对于模块联邦的支持，可以通过 ynf-core-loader 进行远程模块加载：

```tsx
import { YNFLoader } from 'ynf-core-loader';

function MyComponent(props){
  return (
    <YNFLoader 
        providerPackage="ynf-tinper-m-pro"
        providerEntry="Table" 
        {...props}
    />
  );
}
```

### 使用 ynpm 安装依赖

```tsx
// 全局安装ynpm-tool
$ npm install ynpm-tool -g

// 使用ynpm安装组件库
// 测试包
$ ynpm install --save @tinper/m-pro@snapshot
// 预发布包
$ ynpm install --save @tinper/m-pro@bata
// 正式包
$ ynpm install --save @tinper/m-pro
```

安装后可从本地依赖中引入组件

```tsx
import { Table } from '@tinper/m-pro'
```

通过上述步骤，即可轻松集成并使用 TinperM-Pro 高级组件，提升开发效率与页面质量。
