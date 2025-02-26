## stepper 属性
### API
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- |----|
| allowEmpty | 是否允许内容为空 | `boolean` | `false` |
| defaultValue | 默认值 | `number \| null` | `0` |
| digits | 格式化到小数点后固定位数，设置为 `0` 表示格式化到整数。配置 `formatter` 时展示会以 `formatter` 为准 | `number` | - |
| disabled | 是否禁用步进器 | `boolean` | `false` |
| formatter | 格式化展示数值 | `(value?: number) => string` | - | -  |
| inputReadOnly | 输入框是否只读 | `boolean` | `false` |
| max | 最大值 | `number` | - |
| min | 最小值 | `number` | - |
| onBlur | 输入框失去焦点时触发 | `(e: React.FocusEvent<HTMLInputElement>) => void` | - |
| onChange | 变化时的回调 | `(value: number \| null) => void` | - |
| onFocus | 输入框获得焦点时触发 | `(e: React.FocusEvent<HTMLInputElement>) => void` | - |
| parser | 将输入解析为对应数字，一般配合 `formatter` 使用 | `(text: string) => number` | - | -  |
| step | 每次增加或减少的值，可以为小数 | `number` | `1` |
| stringMode | 字符值模式，开启后支持高精度小数。开启后 `defaultValue`、`value`、`min`、`max`、`onChange` 等都将转换为 `string` 类型 | `boolean` | `false` | -  |
| value | 当前数，受控值 | `number \| null` | - |
| handleBtnClick | 点击加减按钮回调 | `（type: up \| down, value: number \| null => void` | - |

当 `allowEmpty` 为 `true` 时，`onChange` 的 `value` 参数可能会为 `null`，在使用时请留意。

### Ref

| 属性          | 说明             | 类型                         |
| ------------- | ---------------- | ---------------------------- |
| blur          | 让输入框失去焦点 | `() => void`                 |
| focus         | 让输入框获得焦点 | `() => void`                 |
| nativeElement | 原始 input 元素  | `HtmlInputElement` \| `null` |

### css 变量
属性                           | 说明               | 默认值     | 全局变量                               
--------------------------------|--------------------|---------|----------------------------------------
--border-radius                | 步进器边框圆角     | 0.1rem  | --ynfm-border-radius-stepper           
--border-style-inner           | 内部边框样式       | solid   | --ynfm-border-style-inner-stepper      
--border-style-left-button     | 左按钮边框样式     | solid   | --ynfm-border-style-left-button-stepper
--border-style-right-button    | 右按钮边框样式     | solid   | --ynfm-border-style-right-button-stepper
--border-style                 | 边框样式           | solid   | --ynfm-border-style-stepper            
--border-style-actived         | 获焦边框样式       | solid   | --ynfm-border-style-stepper-actived    
--border-width-inner           | 内部边框粗细       | solid   | --ynfm-border-width-inner-stepper      
--border-width-right-button    | 右按钮边框粗细     | 0.1rem  | --ynfm-border-width-right-button-stepper
--border-width                 | 边框粗细           | 0px     | --ynfm-border-width-stepper            
--border-width-left-button     | 左按钮边框粗细     | 0.1rem  | --ynfm-border-width-left-button-stepper
--border-width-actived         | 获焦边框粗细       | 0px     | --ynfm-border-width-stepper-actived    
--input-background-color       | 输入框背景颜色     | #F5F5F5 | --ynfm-color-bg-input-stepper          
--color-bg-left-button         | 左按钮背景颜色     | #F5F5F5 | --ynfm-color-bg-left-button-stepper    
--color-bg-right-button        | 右按钮背景颜色     | #F5F5F5 | --ynfm-color-bg-right-button-stepper   
--border-color-inner           | 内部边框颜色       | #F5F5F5 | --ynfm-color-border-inner-stepper      
--color-border-left-button     | 左按钮边框颜色     | #F5F5F5 | --ynfm-color-border-left-button-stepper
--color-border-right-button    | 右按钮边框颜色     | #F5F5F5 | --ynfm-color-border-right-button-stepper
--border-color                 | 边框颜色           | #F5F5F5 | --ynfm-color-border-stepper            
--border-color-actived         | 获焦边框颜色       | #F5F5F5 | --ynfm-color-border-stepper-actived    
--input-font-color             | 输入框字体颜色     | #404040 | --ynfm-color-text-input-stepper       
--color-text-left-button       | 左按钮字体颜色     | #404040 | --ynfm-color-icon-left-button-stepper 
--color-text-right-button      | 右按钮字体颜色     | #404040 | --ynfm-color-icon-right-button-stepper
--input-font-size              | 输入框字体大小     | 0.3rem  | --ynfm-font-size-input-stepper         
--font-size-left-button        | 左按钮字体大小     | 0.32rem | --ynfm-font-size-left-button-stepper   
--font-size-right-button       | 右按钮字体大小     | 0.32rem | --ynfm-font-size-right-button-stepper  
--height                       | 步进器高度         | 0.56rem | --ynfm-size-height-stepper             
--input-width                  | 输入框宽度         | 0.8rem  | --ynfm-size-width-input-stepper        
--width-left-button            | 左按钮宽度         | 0.56rem | --ynfm-size-width-left-button-stepper  
--width-right-button           | 右按钮宽度         | 0.56rem | --ynfm-size-width-right-button-stepper 


## fieldid 说明

| 场景      | 生成规则               |
|---------|--------------------|
| 根元素     | fieldid            |
| plus按钮  | fieldid + "-plus"  |
| minus按钮 | fieldid + "-minus" |
