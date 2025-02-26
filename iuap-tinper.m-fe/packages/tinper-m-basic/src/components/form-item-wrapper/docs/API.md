## FormItemWrapper 属性
### API

| 属性         | 说明                             | 类型                        | 默认值    
| ------------ | -------------------------------- | --------------------------- | ----------
| singleLine   | 是否单行展示                     | `boolean`                   | `false`   
| label        | 标题                             | `string`                    | -         
| subLabel     | 副标题                           | `string`                    | -         
| required     | 是否必填                         | `boolean`                   | `false`   
| labelIcon    | 标题图标                         | `string \| React.ReactNode` | -        
| labelStyle   | 标题样式style                    | `React.CSSProperties`       | -       
| contentStyle | 内容样式style                    | `React.CSSProperties`       | -      
| error        | 是否显示错误                     | `boolean`                   | `false` 
| errorText    | 错误文案                         | `string`                    | -       
| onClick      | 点击标签回调                     | `(event) => void`           | -     
| style        | 自定义样式                       | `React.CSSProperties`       | -     
| tips         | 字段说明                         | `string`                    | -     
|className | 样式类名 | `string` | -
|fieldid | dom标识 | `string` | -
|clsPrefix | class前缀 | `string` | `'mui'`
| wrapMode    | 标题换行模式，`word`表示按照单词换行，`letter`表示按照字母换行 | `word \| letter` | `word`        

### CSS 变量

| CSS变量                         | 描述                                 | 默认值                         | 全局变量值                                       |
| ------------------------------ | ---------------------------------------- | ------------------------------ | -------------------------------------------- |
| --color-bg                     | 背景颜色                                 | `#FFFFFF`                   | `--ynfm-color-bg-formitemwrapper`           |
| --color-icon-required          | 必填图标的颜色                           | `#F50C00`              | `--ynfm-color-text-compulsory-formitemwrapper`                  |
| --color-title                  | 标题的颜色                               | `#404040`                   | `--ynfm-color-text-title-formitemwrapper`                       |
| --font-size-title              | 标题的字体大小                           | `0.26rem`               | `--ynfm-font-size-title-formitemwrapper`                        |
| --color-bg-verification        | 错误提示背景色                           | `#F50C001A`       | `--ynfm-color-bg-verification-formitemwrapper`                  |
| --color-text-verification      | 错误提示文本颜色                         | `#F50C00`       | `--ynfm-color-text-compulsory-formitemwrapper`               |
| --font-size-verification       | 错误提示字体大小                     | `0.26rem`       | `--ynfm-font-size-verification-formitemwrapper`                 |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + "_form-item-wrapper-box" |
| 标题             | fieldid + "_form-item-wrapper-label-main" |
| 副标题             | fieldid + "_form-item-wrapper-label-sub" |
| 必填标识             | fieldid + "_form-item-wrapper-box-required" |
| 字段描述             | fieldid + "_form-item-wrapper-label-tips" |
| 内容区域             | fieldid + "_form-item-wrapper-content" |
| 右侧图标             | fieldid + "_form-item-wrapper-box-icon" |
| 错误提示             | fieldid + "_form-item-wrapper-box-error" |
