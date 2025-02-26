## rendertype

在表格中提供了多种rendertype可以供选择，比如下拉框，输入框，日期等

## 如何引用

需要单独的去引用相应的js文件，目录在render文件夹，示例如下：

```js
import renderInput from "tinper-bee/lib/InputRender.js";

```

### InputRender

输入框类型render

#### 依赖的组件

该render依赖于`Icon`,`Input`,`Form`,`Tooltip`。

#### 配置

| 参数                | 说明                                       | 类型         | 默认值    |
| ----------------- | ---------------------------------------- | ---------- | ------ |
| name              | 该输入框获取数据时的key值，该值不能设置重复且必填               | string     | -      |
| placeholder       | 输入框的提示信息                                 | string     | -      |
| value             | 输入框中的显示值                                 | string     | 无      |
| isclickTrigger    | 是否使用点击触发编辑状态                             | boolean    | false  |
| onChange          | 当值发生改变的时候触发的方法                           | Function   | 无      |
| format            | 浏览态格式化类型，Currency:货币数字;                  | string     | 无      |
| formItemClassName | FormItem的class                           | string     | -      |
| mesClassName      | 校验错误信息的class                             | string     | -      |
| isRequire         | 是否必填                                     | bool       | false  |
| check             | 验证的回调函数，参数两个，第一个为校验是否成功`true/false` 第二个为验证结果对象`{name: "", verify: false, value: ""}` | function   | -      |
| method            | 校验方式，change/blur                         | string     | -      |
| errorMessage      | 错误提示信息                                   | dom/string | "校验失败" |
| htmlType          | 数值类型，目前支持 email/tel/IDCard/chinese/password'类型 | string     | -      |
| reg               | 校验正则，注：设置 htmlType 后 reg 无效              | regExp     | -      |

#### 使用

```js
import renderInput from "tinper-bee/lib/InputRender.js";
import { Icon, Form , Input } from 'tinper-bee';
const InputRender = renderInput(Form, Input, Icon);

```

### DateRender

日期类型render

#### 依赖的组件

该render依赖于`moment`, `Datepicker`, `Icon`

#### 配置

| 参数                | 说明                                       | 类型         | 默认值    |
| ----------------- | ---------------------------------------- | ---------- | ------ |
| isclickTrigger    | 是否使用点击触发编辑状态                             | boolean    | false |
| type  | 控制日期的显示格式，DatePicker、MonthPicker或者WeekPicker，暂时不支持RangePicker | string | "DatePicker" |

注:其他参数参见Datepicker组件参数配置

#### 使用

```js
import renderDate from "tinper-bee/lib/DateRender.js";
import Datepicker from "tinper-bee/lib/Datepicker";
import { Icon } from 'tinper-bee';
const DateRender = renderDate(Datepicker, Icon);

```

### SelectRender

下拉框类型render

#### 依赖的组件

该render依赖于`Icon`,`Select`

#### 配置

| 参数             | 说明                                       | 类型      | 默认值   |
| -------------- | ---------------------------------------- | ------- | ----- |
| isclickTrigger | 是否使用点击触发编辑状态                             | boolean | false |
| dataSource     | 数据的键值对，在表格浏览态的时候能显示真实的key值。比如`[{key:"张三",value:"01"}]` | array   | -     |

注:其他参数参见Select组件参数配置

#### 使用

```js
import renderSelect from "tinper-bee/lib/SelectRender.js";
import { Icon, Select } from 'tinper-bee';
const SelectRender = renderSelect(Select, Icon);

```

### CheckboxRender

复选框类型render

#### 依赖的组件

该render依赖于`Icon`,`Checkbox`

#### 配置

| 参数             | 说明                                       | 类型      | 默认值   |
| -------------- | ---------------------------------------- | ------- | ----- |
| onChange | 修改后触发回调函数 | function | () => {} |
| value    | 设置是否选中值 | boolean   | false   |

注:其他参数参见Checkbox组件参数配置

#### 使用

```js
import renderCheckbox from "tinper-bee/lib/CheckboxRender.js";
import { Icon, Checkbox } from 'tinper-bee';
const CheckboxRender = renderCheckbox(Checkbox, Icon);

```
