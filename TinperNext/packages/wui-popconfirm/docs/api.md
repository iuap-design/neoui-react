# 气泡弹窗 Popconfirm

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户

## API

<!--Popconfirm-->

| 参数                  | 说明                                   | 类型                  | 默认值              | 版本   |
| --------------------- | -------------------------------------- | --------------------- | ------------------- | ------ |
| defaultVisible   | 默认是否显示                           | bool                  | false               |
| title                 | 确认内容的标题                         | node/string           | -                   | 4.4.4  |
| content               | 确认内容的详细描述                     | node/string           | -                   |
| onClick               | 点击事件的钩子函数                     | function              | -                   |
| ~~onConfirm~~ onClose | 确认按钮的点击事件                     | function              | -                   |
| onCancel              | 取消按钮的点击事件                     | function              | -                   |
| rootClose             | 是否点击除弹出层任意地方隐藏           | boolean               | false               |
| onRootClose           | 点击除弹出层任意地方隐藏的回调         | func                  | -                   |
| transition            | 过度动画组件                           | component             | -                   |
| placement             | 弹出位置                               | top/left/right/bottom | top                 |
| ~~secondPlacement~~   | 当 placement 放不下时的弹出位置        | top/left/right/bottom | right               |
| locale                | 显示文字语言对象                       | object                | {lang: 'zh-cn'}     |
| animation             | 是否要使用动画                         | bool                  | true                |
| show                  | 显示隐藏是否受控                       | bool                  | -                   |
| showCancel            | 是否显示取消按钮                       | boolean               | true                | 4.4.4  |
| disabled              | 阻止点击 Popconfirm 子元素时弹出确认框 | boolean               | false               | 4.4.4  |
| cancelButtonProps     | cancel 按钮 props                      | ButtonProps           | -                   |
| okButtonProps         | ok 按钮 props                          | ButtonProps           | -                   |
| cancel_btn            | 自定义的取消按钮                       | node/function         | -                   |
| close_btn             | 自定义的确定按钮                       | node/function         | -                   |
| getPopupContainer     | 浮层渲染父节点，默认渲染到 body 上     | function(triggerNode) | () => document.body | v4.0.0 |
| fieldid               | 自动化测试专用属性                     | String                | -                   | 4.3.0  |

## 已废除

| 参数      | 说明                               | 类型     |
| --------- | ---------------------------------- | -------- |
| ~~container~~ | 浮层渲染父节点，默认渲染到 body 上 | element  |
| ~~onConfirm~~ | 确认按钮的点击事件                 | function |

### 开启 keyboard 后支持的键盘操作

| 按键    | 功能     |
| ------- | -------- |
| Alt + Y | 确认     |
| Alt + N | 取消     |
| esc     | 关闭面板 |

### fieldid 场景说明

| 场景     | 生成规则说明         | 版本  |
| -------- | -------------------- | ----- |
| 弹窗     | fieldid              | 4.3.0 |
| 取消按钮 | fieldid + "\_cancel" | 4.3.0 |
| 确定按钮 | fieldid + "\_ok"     | 4.3.0 |
