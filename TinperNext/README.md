## 工程目录说明

```
|--next-ui                     // 根目录
    |--next-ui-demos           // 组件库示例工程
    |--next-ui-library         // 组件库发包工程
    |--packages                // 各组件源码集合
        |--wui-xxx             // 单个组件存放处
            |--demo            // 当前组件示例源码
            |--src             // 当前组件实现源码
            |--test            // 当前组件测试用例源码
        |--wui-xxx             // 单个组件存放处（同上）
```

## demo示例启动

```
首次使用（以在next-ui目录下为例）
cd ./next-ui-demos
ynpm install

启动调试
npm run start

打包构建
npm run build
```

##  组件库编译发包

```
首次使用（以在next-ui目录下为例）
cd ./next-ui-library
ynpm install

编译打包(非压缩)
npm run build:dev

编译打包(压缩)
npm run build:prod

编译打包(esmodule)
npm run build:lib

```
