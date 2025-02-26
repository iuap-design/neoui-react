# 平面提示 Alert

平面提示又称为警告提示，一般会在页面顶部挤占式常驻，多用于危险、警告、紧急等负面情绪当中，需要用户手动点击关闭或不可关闭，不会自动消失,若需背景颜色加深需加`dark`类。

## API

<!--Alert-->

| 参数        | 说明                                                                  | 类型       | 默认值                   | 版本   |
| ----------- | --------------------------------------------------------------------- | ---------- | ------------------------ | ------ |
| id          | 警告提示的 id                                                         | string     | -                        |
| fieldid     | fieldid【自动化测试专用属性】                                         | string     | -                        | 4.3.0  |
| className   | 类名                                                                  | string     | -                        |
| type      | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`danger` | string     | `info`                   |
| closeText  | 关闭按钮自定义展示                                                    | ReactNode  | <Icon type='uf-close' /> |
| onClose   | 关闭 alert 触发的方法                                                 | func       | -                        |
| dark        | 显示颜色深度                                                          | bool       | false                    |
| closable    | 默认显示关闭按钮                                                      | boolean    | true                     | v4.0.0 |
| message     | 警告提示内容                                                          | ReactNode  | -                        | v4.0.0 |
| description | 警告提示的辅助性文字介绍                                              | ReactNode  | -                        | v4.0.0 |
| showIcon    | 是否显示辅助图标                                                      | boolean    | true                     | v4.0.0 |
| icon        | 自定义图标显示 showIcon 为 true 生效                                  | boolean    | null                     | v4.4.4 |
| action      | 右上角自定义操作项                                                    | ReactNode  | null                     | v4.4.4 |
| bordered    | 是否显示边框                                                          | boolean    | false                    | v4.4.4 |
| closeIcon   | 关闭按钮自定义展示同 closeText                                       | ReactNode  | <Icon type='uf-close' /> | v4.4.4 |
| afterClose  | 关闭后触发的回调函数                                                  | () => void | -                        | v4.4.5  |

### fieldid 场景说明

| 场景      | 生成规则说明                            | 版本  |
| --------- | --------------------------------------- | ----- |
| 根元素    | fieildid                                | 4.3.0 |
| 提示 icon | fieldid + "\_alert" + color             | 4.3.0 |
| 关闭 icon | fieldid + "\_alert" + color + "\_close" | 4.3.0 |
## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| colors      | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`danger` | string     | `info`                   |
| onDismiss   | 关闭 alert 触发的方法                                                 | func       | -                        |
| closeLabel  | 关闭按钮自定义展示                                                    | ReactNode  | <Icon type='uf-close' /> |
