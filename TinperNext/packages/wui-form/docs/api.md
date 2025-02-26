# 表单 Form

需要校验表单数据，提交表单数据时

## API

### Form

<!--Form-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| form | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | [FormInstance] | - |  |
| initialValues | 表单默认值，只有初始化以及重置时生效 | object | - |  |
| labelAlign | label 标签的文本对齐方式 | `left` \| `right` | `right` |  |
| labelWrap | label 标签的文本换行方式 | boolean | false | 4.0.0 |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object] | - |  |
| layout | 表单布局 | `horizontal` \| `vertical` \| `inline` | `horizontal` |  |
| name | 表单名称，会作为表单字段 `id` 前缀使用 | string | - |  |
| requiredMark | 必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置 | boolean \| `optional` | true | v4.0.0 |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段 | boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) | false |  |
| validateMessages | 验证提示模板，说明[见下] | [ValidateMessages](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts) | - |  |
| validateTrigger | 统一设置字段触发验证的时机 | string \| string\[] | `onChange` | 4.3.0 |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object] | - |  |
| onFieldsChange | 字段更新时触发回调事件 | function(changedFields, allFields) | - |  |
| onFinish | 提交表单且数据验证成功后回调事件 | function(values) | - |  |
| onFinishFailed | 提交表单且数据验证失败后回调事件 | function({ values, errorFields, outOfDate }) | - |  |
| onValuesChange | 字段值更新时触发回调事件 | function(changedValues, allValues) | - |  |
| disabled | 字设置表单组件禁用，仅对支持 configProvider设置`disabled`属性的组件有效 | boolean | false | 4.4.5 |

### validateMessages

Form
为验证提供了[默认的错误提示信息](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts)，你可以通过配置 `validateMessages`
属性，修改对应的提示模板。一种常见的使用方式，是配置国际化提示信息：

```jsx
const validateMessages = {
  required: "'${name}' 是必选字段",
  // ...
};

<Form validateMessages={validateMessages} />;
```

## Form.Item

表单字段组件，用于数据双向绑定、校验、布局等。

<!--Form.Item-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| colon | 配合 `label` 属性使用，表示是否显示 `label` 后面的冒号 | boolean | true |  |
| extra | 额外的提示信息，和 `help` 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | ReactNode | - |  |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any\[]) => any | - |  |
| getValueProps | 为子元素添加额外的属性 | (value: any) => any | - | 4.2.0 |
| hasFeedback | 配合 `validateStatus` 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean | false |  |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | ReactNode | - |  |
| hidden | 是否隐藏字段（`true`或者`hidden`只是样式隐藏依然会收集和校验字段, `destroy`销毁dom元素） | boolean \| 'visible' \| 'hidden' \| 'destroy' | false | 4.4.0 |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string | - |  |
| initialValue | 设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准 | string | - | 4.2.0 |
| label | `label` 标签的文本 | ReactNode | - |  |
| labelAlign | 标签文本对齐方式 | `left` \| `right` | `right` |  |
| labelCol | `label` 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。你可以通过 Form 的 `labelCol` 进行统一设置，，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 | [object] | - |  |
| messageVariables | 默认验证字段的信息 | Record&lt;string, string> | - | 4.0.0 |
| name | 字段名，支持数组 | [NamePath] | - |  |
| normalize | 组件获取值后进行转换，再放入 Form 中。不支持异步 | (value, prevValue, prevValues) => any | - |  |
| noStyle | 为 `true` 时不带样式，作为纯字段控件使用 | boolean | false |  |
| required | 必填样式设置。如不设置，则会根据校验规则自动生成 | boolean | false |  |
| rules | 校验规则，设置字段的校验逻辑。 | \[] | - |  |
| tooltip | 配置提示信息 | ReactNode \| TooltipProps & { icon: ReactNode } | - | 4.0.0 |
| trigger | 设置收集字段值变更的时机，可选项为表单组件支持的回调函数 | string | `onChange` |  |
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 `parallel` 时会并行校验 | boolean \| `parallel` | false | 4.0.0 |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string | - |  |
| validateTrigger | 设置字段校验的时机 | string \| string\[] | `onChange` |  |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked'。该属性为 `getValueProps` 的封装，自定义 `getValueProps` 后会失效 | string | `value` |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol`。你可以通过 Form 的 `wrapperCol` 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 | [object] | - |  |

被设置了 `name` 属性的 `Form.Item` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被
Form 接管，这会导致以下结果：

1. 你**不再需要也不应该**用 `onChange` 来做数据收集同步（你可以使用 Form 的 `onValuesChange`），但还是可以继续监听 `onChange` 事件。
2. 你不能用控件的 `value` 或 `defaultValue` 等属性来设置表单域的值，默认值可以用 Form 里的 `initialValues` 来设置。注意 `initialValues` 不能被 `setState`
   动态更新，你需要用 `setFieldsValue` 来更新。
3. 你不应该用 `setState`，可以使用 `form.setFieldsValue` 来动态改变表单值。

### messageVariables

你可以通过 `messageVariables` 修改 Form.Item 的默认验证信息。

```jsx
<Form>
  <Form.Item messageVariables={{ another: 'good' }} label="user">
    <Input />
  </Form.Item>
  <Form.Item messageVariables={{ label: 'good' }} label={<span>user</span>}>
    <Input />
  </Form.Item>
</Form>
```

### Form.Item样式

使用TinperNext开发的自定义组件，可以通过给自定义组件添加固定的类名 `wui-form-item-custom` `wui-form-item-custom-error` `wui-form-item-custom-required` 来使用Form.Item的校验样式。

## Form.Provider

提供表单间联动功能，其下设置 `name` 的 Form 更新时，会自动触发对应事件。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFormChange | 子表单字段更新时触发 | function(formName: string, info: { changedFields, forms }) | - |
| onFormFinish | 子表单提交时触发 | function(formName: string, info: { values, forms }) | - |

```jsx
<Form.Provider
  onFormFinish={name => {
    if (name === 'form1') {
      // Do something...
    }
  }}
>
  <Form name="form1">...</Form>
  <Form name="form2">...</Form>
</Form.Provider>
```

### FormInstance

<!--FormInstance-->
| 名称 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| getFieldError | 获取对应字段名的错误信息 | (name: [NamePath]) => string\[] |  |
| getFieldInstance | 获取对应字段实例 | (name: [NamePath]) => any | 4.4.0 |
| getFieldsError | 获取一组字段名对应的错误信息，返回为数组形式 | (nameList?: [NamePath]\[]) => FieldError\[] |  |
| getFieldsValue | 获取一组字段名对应的值，会按照对应结构返回。默认返回现存字段值，当调用 `getFieldsValue(true)` 时返回所有值 | (nameList?: [NamePath]\[], filterFunc?: (meta: { touched: boolean, validating: boolean }) => boolean) => any |  |
| getFieldValue | 获取对应字段名的值 | (name: [NamePath]) => any |  |
| isFieldsTouched | 检查一组字段是否被用户操作过，`allTouched` 为 `true` 时检查是否所有字段都被操作过 | (nameList?: [NamePath]\[], allTouched?: boolean) => boolean |  |
| isFieldTouched | 检查对应字段是否被用户操作过 | (name: [NamePath]) => boolean |  |
| isFieldValidating | 检查一组字段是否正在校验 | (name: [NamePath]) => boolean |  |
| resetFields | 重置一组字段到 `initialValues` | (fields?: [NamePath]\[]) => void |  |
| scrollToField | 滚动到对应字段位置 | (name: [NamePath], options: \[[ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options)]) => void |  |
| setFields | 设置一组字段状态 | (fields: [FieldData]\[]) => void |  |
| setFieldsValue | 设置表单的值 | (values) => void |  |
| submit | 提交表单，与点击 `submit` 按钮效果相同 | () => void |  |
| validateFields | 触发表单验证 | (nameList?: [NamePath]\[]) => Promise |  |

#### validateFields 返回示例

```jsx
validateFields()
  .then(values => {
    /*
  values:
    {
      username: 'username',
      password: 'password',
    }
  */
  },errorInfo => {
    /*
    errorInfo:
      {
        values: {
          username: 'username',
          password: 'password',
        },
        errorFields: [
          { name: ['password'], errors: ['Please input your Password!'] },
        ],
        outOfDate: false,
      }
    */
  })
  .catch((e) => {});
```

### Interface

### FieldData

| 参数 | 说明 | 类型 |
| --- | --- | --- |
|errors|错误信息|string[]|
|name|字段名称|NamePath[]|
|value|字段对应值|any|

#### Rule

Rule 支持接收 object 进行配置，也支持 function 来动态获取 form 的数据：

```tsx
type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);
```

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| defaultField | 仅在 `type` 为 `array` 类型时有效，用于指定数组元素的校验规则 | [rule] |
| enum | 是否匹配枚举中的值（需要将 `type` 设置为 `enum`） | any\[] |
| fields | 仅在 `type` 为 `array` 或 `object` 类型时有效，用于指定子元素的校验规则 | Record&lt;string, [rule]> |
| len | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度 | number |
| max | 必须设置 `type`：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | number |
| message | 错误信息，不设置时会通过[模板]自动生成 | string |
| min | 必须设置 `type`：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | number |
| pattern | 正则表达式匹配 | RegExp |
| required | 是否为必选字段 | boolean |
| transform | 将字段值转换成目标值后进行校验 | (value) => any |
| type | 类型，常见有 `string` \|`number` \|`boolean` \|`url` \| `email`。更多请参考[此处](https://github.com/yiminghe/async-validator#type) | string |
| validateTrigger | 设置触发验证时机，必须是 Form.Item 的 `validateTrigger` 的子集 | string \| string\[] |
| validator | 自定义校验，接收 Promise 作为返回值。 | ([rule], value) => Promise |
| whitespace | 如果字段仅包含空格则校验不通过 | boolean |

## 以下为4.0以下版本的兼容模式，可以使用但不推荐

### Form

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|form|经过`Form.createForm`包装后的组件，都带有`this.props.form`属性|Object|-|
|prefixCls|类名前缀|String|u-form|
|className|类名|String|-|
|onSubmit|提交事件|Function|-|
|style|样式|Object|-|

### FormItem

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|prefixCls|类名前缀|String|u-form|
|className|类名|String|-|
|style|样式|Object|-|

### this.props.form

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|getFieldProps|配置受控表单元素，经过此方法包装的表单元素才可以使用`this.props.form`中的其它方法，此表单元素需要有`onChange`方法，并且`onChange`回调的第一个值为此表单元素当前值|-|-|
|getFieldDecorator|类似`getFieldProps`|-|-|
|getFieldsValue([fieldNames: String[]])|根据`name`获取多个表单元素的值|-|-|
|getFieldValue(fieldName: String)|根据`name`获取单个表单元素的值|-|-|
|getFieldInstance(fieldName: String)|根据`name`获取表单元素|-|-|
|setFieldsValue(obj: Object)|根据`name`设置多个表单元素的值|-|-|
|setFieldsInitialValue(obj: Object)|根据`name`设置多个表单元素的默认值|-|-|
|setFields(obj: Object)|根据`name`设置多个表单元素的属性|-|-|
|validateFields([fieldNames: String[]], [options: Object], callback: (errors, values) => void)|校验表单。options.force(bool):是否校验已经校验过的字段;|-|-|
|getFieldsError(names)|获取多个表单元素的错误信息|-|-|
|getFieldError(name)|获取单个表单元素的错误信息|-|-|
|isFieldValidating(name: String)|单个表单元素是否正在校验|-|-|
|isFieldsValidating(names: String[])|多个表单元素是否正在校验|-|-|
|isFieldTouched(names: String[])|单个表单元素的值是否已经被用户更改|-|-|
|isFieldsValidating(names: String[])|多个表单元素的值是否已经被用户更改|-|-|
|resetFields([names: String[]])|重置表单|-|-|
|isSubmitting()|表单是否正在提交|-|-|
|submit(callback: Function)|表单正在提交返回true，callback执行后返回false|-|-|

#### getFieldProps(name, option): Object { [valuePropName], [trigger], [validateTrigger] }

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|name|设置表单元素name，不可以重复|String|-|
|option.valuePropName|设置表单元素取值的属性|String|value|
|option.getValueProps|根据表单元素属性获得值|function|(value)=>({value})|
|option.getValueFromEvent|根据表单元素方法获得值|function|(value)=>({value})|
|option.normalize|格式化值|function|-|
|option.trigger|侦听以收集表单数据的事件|String|'onChange'|
|option.initialValue|设置默认值|any|-|
|option.validateTrigger|设置校验时机|String|onChange|
|option.rules|设置校验规则|Object|-|
|option.validateFirst|当第一个校验失败时候是否阻止校验下一个校验规则|boolean|false|
|option.hidden|是否在验证时忽略当前字段|boolean|false|
|option.onChange|代替组件上的onChange方法|function|-|

#### getFieldDecorator(name:String, option: Object) => (React.Node) => React.Node

与 `getFieldProps` 作用类似。 例如

```
<Form>

  {getFieldDecorator('name', otherOptions)(<Input />)}

</Form>

```

#### rules 常用

参考 [async-validator](https://github.com/yiminghe/async-validator)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| required | 是否必选 | boolean | `false` |
| type | 内建校验类型(string字符串/number数字/boolean布尔/method函数/integer整数/float带小数点的数字/array数组[使用Array.isArray判断]/object对象且不是array/enum枚举/date日期/url链接/email邮箱)， | string | 'string' |
| pattern | 正则表达式校验 | RegExp | - |
| min/max | 使用min和max属性定义范围。对于字符串和数组类型与长度进行比较，对于数字类型，数字不能小于min也不能大于max | - | - |
| len | 若要验证字段的确切长度，请指定len属性。对于长度属性执行字符串和数组类型比较，对于数字类型，此属性指示数字的精确匹配，即，它只能严格等于len。如果len属性与min和max范围属性组合，len优先。 | - | - |
| enum | 值为枚举类型中的一个。 例如：`rules:[{type: "enum", enum: ['admin', 'user', 'guest']}]` | - | - |
| transform | 校验前转换字段值 | function(value) => transformedValue:any | - |
| validator | 自定义校验（注意，callback 必须被调用） | function(rule, value, callback) | - |
| whitespace | 通常将仅包含空格的所需字段视为错误。若要为仅由空格组成的字符串添加额外的测试，值设置为true的规则添加空格属性。规则必须是字符串类型。 | boolean | `false` |
| fields | 如果需要验证深对象属性，可以通过向规则的字段属性分配嵌套规则来验证对象或数组类型的验证规则。 | Object | - |

### createForm(option: Object) => (WrappedComponent: React.Component) => React.Component

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|option.validateMessages|`async-validator`的预制消息|-|-|
|option.onFieldsChange|表单元素更改的回调，参数:(props, changed, all)|function|-|
|option.onValuesChange|表单元素值更改的回调，参数:(props, changed, all)|function|-|
|option.mapProps|将新的属性转义到WrappedComponent上|function|props => props|
|option.mapPropsToFields|将新的值从属性转义到表单元素上|function|-|
|option.fieldNameProp|设置存取 `getFieldProps` 名称的store|string|-|
|option.fieldMetaProp|设置存取 `getFieldProps` 原数据的store|string|-|
|option.fieldDataProp|设置存取 `getFieldProps` 数据的store|string|-|
|option.withRef(deprecated)|是否为包装组件实例维护ref，使用refs.wrappedComponent进行访问|boolean|false|

## 注意事项

- 同一个表单中，表单元素不能设置相同的name

- 使用 `getFieldProps` 后，不能使用 ref 。 可以使用 ` this.props.form.getFieldInstance('ref') `

- 使用 `getFieldProps` 后，`onChange` 要写到 `getFieldProps` 里边

- 使用 `getFieldProps` 后，`onChange` 里不要使用 `setFieldsValue`

- 使用 `getFieldProps` 后，尽量不要使用 `onChange` 处理 `value` ，如果需要格式化，使用 `normalize`

- 使用 `validator` 自定义校验时，callback 必须被调用
