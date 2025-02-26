# 消息提醒 Message

在用户执行操作时，不会中断当前用户操作的前提下，会在全局提示一条反馈的消息。使用频率较高

## API

### message函数参数

<!--Message-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|content|内容|ReactNode|-|
|duration|显示时间|number|1.5|
|color|颜色|`dark / light / success / error / warning / info`|
|onClose|关闭时的钩子函数|function|-|
|position|弹出框显示的位置|`top / bottom / topRight / topLeft / bottomRight / bottomLeft`|`top`|
|style|样式|object|{}|
|innerStyle|样式|object|{}|
|wrapperStyle|样式|object|{}|
|wrapperClassName|外层类名|string|-|
|keyboard|esc触发关闭|boolean|true|
|onEscapeKeyUp|响应ESC键时的钩子函数|function|-|
|showIcon|是否显示icon|boolean|true|
|getPopupContainer|设置容器|function/node| `tinper-next-role`/`document.body` |
|destroyWithKey|只能通过调用销毁函数仅传入key时销毁实例|boolean|false|-|
|icon|自定义显示icon图标[参考这里](https://yondesign.yonyou.com/website/#/detail/component/wui-icon/other?tab=api)|string|-|
|fieldid|组件内元素标识, 推荐自动化测试使用|string|-|
|maxCount|最大显示数, 超过限制时，最早的消息会被自动关闭|number|-|4.4.5|
|onClick|点击通知时触发的回调函数|function|-|4.4.5|
|key|当前通知唯一标志|string/number|-|4.4.5|
|containerKey|放置相同容器内唯一标识，传入后相当于 将containerKey相同的message 分组|string|-|4.5.4|
### Message以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|getContainer|设置容器|function/node| document.body |

### 函数api

- 内置4种快捷api调用

```
Message.warning({
    content: "warning",
    duration: 0,
    onClose: ()=>{console.log("close");}
})
Message.info({
    content: "info",
    duration: 0,
    onClose: ()=>{console.log("close");}
})
Message.success({
    content: "success",
    duration: 0,
    onClose: ()=>{console.log("close");}
})
Message.error({
    content: "error",
    duration: 0,
    onClose: ()=>{console.log("close");}
})
```

- 通用api设置

```
Message.config({
    top: 20,  //顶上显示时距顶部的位置
    bottom: 20, //左下右下显示时距底部的位置
    defaultBottom: 20, //底部显示时距底部的位置
    duration: 20, //显示持续时间
    width: 500 //左下左上右下右上显示时的宽度
    });

//销毁所有消息
Message.destroy();

//创建消息
Messsage.create({});

```

- 组件同时提供promise接口

```
Message[level]({}).then(afterClose)
// message[level]是组件已经提供的静态方法。then接口返回值是Promise。
```

### 已支持的键盘操作

|按键|功能|
| --- | --- |
|esc |关闭message|
