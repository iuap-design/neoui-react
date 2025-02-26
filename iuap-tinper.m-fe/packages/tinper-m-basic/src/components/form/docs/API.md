## Form 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | `boolean` | `false` |
| footer | 表单尾部的内容，常常用来放置提交按钮 | `ReactNode` | - |
| form | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | `FormInstance` | - |
| hasFeedback | 是否展示错误反馈 | `boolean` | `true` |
| initialValues | 表单默认值，只有初始化以及重置时生效 | `object` | - |
| layout | 布局模式 | `'vertical' \| 'horizontal'` | `'vertical'` |
| mode | 支持默认和卡片两种模式 | `'default' \| 'card'` | `'default'` |
| name | 表单名称，会作为表单字段 `id` 前缀使用 | `string` | - |
| onFieldsChange | 字段更新时触发 | `(changedFields, allFields) => void` | - |
| onFinish | 提交表单且数据验证成功后触发 | `(values) => void` | - |
| onFinishFailed | 提交表单且数据验证失败后触发 | `({ values, errorFields, outOfDate }) => void` | - |
| onValuesChange | 字段值更新时触发 | `(changedValues, allValues) => void` | - |
| preserve | 当字段被删除时保留字段值 | `boolean` | `true` |
| requiredMarkStyle | 必填选填的标记样式 | `'asterisk' \| 'text-required' \| 'text-optional' \|'none'` | `'asterisk'` |
| validateMessages | 验证提示模板，说明见下 | `ValidateMessages` | - |
| validateTrigger | 统一设置字段触发验证的时机 | `string \| string[]` | `'onChange'` |
| fieldid | `dom`标识 | `string` | `-` |
| className | 类名 | `string` | `-` |
| clsPrefix | `class`前缀 | `string` | `mui` |
| requiredPosition | 必填标识小图标基于文字的位置 | `'left' \| 'right'` | `right` |

### FormInstance

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| getFieldError | 获取对应字段名的错误信息 | `(name: NamePath) => string[]` |
| getFieldValue | 获取对应字段名的值 | `(name: NamePath) => any` |
| getFieldsError | 获取一组字段名对应的错误信息，返回为数组形式 | `(nameList?: NamePath[]) => FieldError[]` |
| getFieldsValue | 获取一组字段名对应的值，会按照对应结构返回。默认返回现存字段值，当调用 `getFieldsValue(true)` 时返回所有值 | `(nameList?: NamePath[], filterFunc?: (meta: { touched: boolean, validating: boolean }) => boolean) => any` |
| isFieldTouched | 检查对应字段是否被用户操作过 | `(name: NamePath) => boolean` |
| isFieldsTouched | 检查一组字段是否被用户操作过，`allTouched` 为 `true` 时检查是否所有字段都被操作过 | `(nameList?: NamePath[], allTouched?: boolean) => boolean` |
| resetFields | 重置一组字段到 `initialValues` | `(fields?: FieldData[]) => void` |
| setFields | 设置一组字段状态 | `(fields: FieldData[]) => void` |
| setFieldValue | 设置对应字段名的值 | `(name: NamePath, value: any) => void` |
| setFieldsValue | 设置表单的值（该值将直接传入 form store 中。如果你不希望传入对象被修改，请克隆后传入） | `(values) => void` |
| submit | 提交表单，与点击 `submit` 按钮效果相同 | `() => void` |
| validateFields | 触发表单验证 | `(nameList?: NamePath[]) => Promise` |

### validateMessages

Form 为验证提供了默认的错误提示信息：

```jsx
const typeTemplate = "${label}不是一个有效的${type}";
const defaultValidateMessages: {
    default: '字段验证错误${label}',
    required: '请输入${label}',
    enum: '${label}必须是其中一个[${enum}]',
    whitespace: '${label}不能为空字符',
    date: {
    format: '${label}日期格式无效',
    parse: '${label}不能转换为日期',
    invalid: '${label}是一个无效日期',
    },
    types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
    },
    string: {
    len: '${label}须为${len}个字符',
    min: '${label}最少${min}个字符',
    max: '${label}最多${max}个字符',
    range: '${label}须在${min}-${max}字符之间',
    },
    number: {
    len: '${label}必须等于${len}',
    min: '${label}最小值为${min}',
    max: '${label}最大值为${max}',
    range: '${label}须在${min}-${max}之间',
    },
    array: {
    len: '须为${len}个${label}',
    min: '最少${min}个${label}',
    max: '最多${max}个${label}',
    range: '${label}数量须在${min}-${max}之间',
    },
    pattern: { mismatch: '${label}与模式不匹配${pattern}', },
}
```

你可以通过配置 `validateMessages` 属性，修改对应的提示模板。一种常见的使用方式，是配置国际化提示信息：

```jsx
const validateMessages = {
  required: "'${name}' 是必选字段",
  // ...
};
<Form validateMessages={validateMessages}/>;
```

### CSS 变量

| 属性 | 说明 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --border-bottom | 表单容器底部的边框样式 | `solid 0.5px #F0F0F0` | `--ynfm-border-style-bottom-form --ynfm-border-width-bottom-form --ynfm-color-border-bottom-form` |
| --border-inner | 表单项之间的边框样式 | `solid 0.5px #F0F0F0` | `--ynfm-border-style-divider-form --ynfm-border-width-divider-form --ynfm-color-border-divider-form` |
| --border-top | 表单容器顶部的边框样式 | `solid 0.5px #F0F0F0` | `--ynfm-border-style-top-form --ynfm-border-width-top-form --ynfm-color-border-top-form` |
| --prefix-width | 水平布局时，表单项的标签宽度 | `1.86rem` | `--ynfm-size-width-title-horizontal-form` |

## Form.Item 属性

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| childElementPosition | 表单控件部分的位置 | `'normal' \| 'right'` | `'normal'` |
| dependencies | 设置依赖字段，说明见下 | `NamePath[]` | - |
| disabled | 是否禁用 | `boolean` | 父级 Form 的 `disabled` |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | `(..args: any[]) => any` | - |
| getValueProps | 为子元素添加额外的属性 | `(value) => any` | - |
| hasFeedback | 是否展示错误反馈 | `boolean` | `true` |
| help | 提示文本 | `ReactNode` | - |
| hidden | 是否隐藏整个字段 | `boolean` | `false` |
| initialValue | 设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准 | `any` | - |
| label | 标签名 | `ReactNode` | - |
| layout | 布局模式 | `'vertical' \| 'horizontal'` | 父级 Form 的 `layout` |
| messageVariables | 默认验证字段的信息 | `Record<string, string>` | - |
| name | 字段名，支持数组 | `NamePath` | - |
| normalize | 组件获取值后进行转换，再放入 Form 中。不支持异步 | `(value, prevValue, prevValues) => any` | - |
| noStyle | 不使用样式，只使用字段管理 | `boolean` | `false` |
| onClick | 点击事件并收集子组件 Ref | `(e:React.MouseEvent, widgetRef: React.MutableRefObject<any>)` | - |
| preserve | 当字段被删除时保留字段值 | `boolean` | `true` |
| required | 是否必选，需要注意的是这个属性仅仅用来控制外观，并不包含校验逻辑 | `boolean` | `false`（如有设置 `rules`，则会根据 `rules` 判断） |
| rules | 校验规则，设置字段的校验逻辑 | `Rule[]` | - |
| shouldUpdate | 自定义字段更新逻辑，说明见下 | `boolean \| (prevValue, curValue) => boolean` | `false` |
| trigger | 设置收集字段值变更的时机 | `string` | `onChange` |
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验 | `boolean \| 'parallel'` | `false` |
| validateTrigger | 设置字段校验的时机 | `string \| string[]` | `onChange` |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked'。该属性为 `getValueProps` 的封装，自定义 `getValueProps` 后会失效 | `string` | `value` |
| fieldid | `dom`标识 | `string` | `-` |
| clsPrefix | `class`前缀 | `string` | `mui` |
| className | 类名 | `string` | `-` |
| requiredPosition | 必填标识小图标基于文字的位置 | `'left' \| 'right'` | `right` |
| rightIcon | 可自定义右侧报错图标（需要参照示例结合`showErrorIcon、showFeedbackError`使用）| `ReactNode` | - |
| showErrorIcon | 是否显示右侧报错图标（需要参照示例结合`rightIcon、showFeedbackError`使用）| `boolean` | `false` |
| showFeedbackError | 是否显示下方报错信息（需要参照示例结合`rightIcon、showErrorIcon`使用）| `boolean` | `true` |
| rightErrorIconStyle | 右侧报错图标样式调整（需要参照示例结合`rightIcon`等使用）| `React.CSSProperties` | `{ right: 0.36rem, top: 0.28rem }` |

`rightIcon、showErrorIcon、showFeedbackError、rightErrorIconStyle`使用时要注意：

1. 首先只有属性`hasFeedback`为`true`时，设置这些属性才有效果。  
2. 不设置这些属性时，错误信息默认是显示在下方的，由于 BIP 部分特殊场景需要，可以结合几个属性进行调整，其余场景不建议使用。  
3. 特殊场景大致为：输入框聚焦时错误显示在下方，失焦后下方错误展示收起，在输入框后方展示错误图标，没有错误的时候，双方均不展示。  
4. 可参考最后一个示例： [错误提示特殊场景](#docs-basic-components-form-demo-demo5)  
5. 若有其他问题可咨询右侧支持人员  

Form.Item 的布局是基于 List.Item 实现的，所以它还支持 List.Item 的以下属性：

`extra` `clickable` `arrow` `description`

被设置了 `name` 属性的 `Form.Item` 包装的控件，表单控件会**自动添加** `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form 接管，因此，如果你给 `Form.Item` 设置了 `name` 属性，**那么请确保它的 `children` 是一个有效的 `ReactElement` 控件** ，并且能够接受上文中提到的 `value` 和 `onChange` 属性（或指定的其他属性），例如：

```jsx
<Form.Item name='foo'>
  <Input/>
</Form.Item>
```

而下面这些写法都是错误的：

```jsx
<Form.Item name='foo'>
  <Input/>
  <div>hello</div>
</Form.Item>
// 错误：Form.Item 的 children 中包含了多个元素
```

```jsx
<Form.Item name='foo'>
  hello
  <Input/>
</Form.Item>
// 错误：同上，Form.Item 的 children 中包含了多个元素
```

```jsx
<Form.Item name='foo'>
  <div>
    <Input/>
  </div>
</Form.Item>
// 错误：Form.Item 的 children 其实是 div，而 div 并不能接受 value 和 onChange 属性
```

同时请注意：

1. 你**不再需要也不应该**用 `onChange` 来做数据收集同步（你可以使用 Form 的 `onValuesChange`），但还是可以继续监听 `onChange` 事件。
2. 你不能用控件的 `value` 或 `defaultValue` 等属性来设置表单域的值，默认值可以用 Form 里的 `initialValues` 来设置。注意 `initialValues` 不能被 `setState` 动态更新，你需要用 `setFieldsValue` 来更新。
3. 你不应该用 `setState`，可以使用 `form.setFieldsValue` 来动态改变表单值。

举个例子，下面的这种写法是错误的：

```jsx
<Form.Item name='foo'>
  <Input
    value={myInputValue} // 错误：value 不应该被手动控制
    onChange={(v) => {
      setMyInputValue(v)
    }} // 错误：虽然你可以监听 onChange 事件，但是你不应该在这里去维护自己的状态
  />
</Form.Item>
```

### dependencies

当字段间存在依赖关系时使用。如果一个字段设置了 `dependencies` 属性。那么它所依赖的字段更新时，该字段将自动触发更新与校验。一种常见的场景，就是注册用户表单的“密码”与“确认密码”字段。“确认密码”校验依赖于“密码”字段，设置 `dependencies` 后，“密码”字段更新会重新触发“校验密码”的校验逻辑。

`dependencies` 不应和 `shouldUpdate` 一起使用，因为这可能带来更新逻辑的混乱。

### shouldUpdate

Form 通过增量更新方式，只更新被修改的字段相关组件以达到性能优化目的。大部分场景下，你只需要编写代码或者与 `dependencies` 属性配合校验即可。而在某些特定场景，例如修改某个字段值后出现新的字段选项、或者纯粹希望表单任意变化都对某一个区域进行渲染。你可以通过 `shouldUpdate` 修改 Form.Item 的更新逻辑。

当 `shouldUpdate` 为 `true` 时，Form 的任意变化都会使该 Form.Item 重新渲染。这对于自定义渲染一些区域十分有帮助：

```jsx
<Form.Item shouldUpdate>
  {() => {
    return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
  }}
</Form.Item>
```

当 `shouldUpdate` 为方法时，表单的每次数值更新都会调用该方法，提供原先的值与当前的值以供你比较是否需要更新。这对于是否根据值来渲染额外字段十分有帮助：

```jsx
<Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
  {() => {
    return (
      <Form.Item name="other">
        <Input/>
      </Form.Item>
    );
  }}
</Form.Item>
```

### messageVariables

你可以通过 `messageVariables` 修改 Form.Item 的默认验证信息。

```jsx
<Form>
  <Form.Item messageVariables={{another: 'good'}} label="user">
    <Input/>
  </Form.Item>
  <Form.Item messageVariables={{label: 'good'}} label={<span>user</span>}>
    <Input/>
  </Form.Item>
</Form>
```

## 自定义表单字段

自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：

- 提供受控属性 `value` 值同名的属性。
- 提供 `onChange` 事件。

### 示例

参考示例：[自定义控件示例](#docs-basic-components-form-demo-demo3)

## Form.Header

你可以通过 `Form.Header` 来对表单项进行分组。

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 分组标题，如果不传的话，则会渲染为一个没有内容的分隔 | `ReactNode` | - |

## Form.Subscribe

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 渲染函数 | `(changedValues: Record<string, any>, form: FormInstance) => ReactNode` | - |
| to | 同 Form.Item 的 `dependencies` | `NamePath[]` | - |

### 示例

参考示例：[Form.Subscribe 示例](#docs-basic-components-form-demo-demo4)

### useWatch

参考示例：[useWatch 示例](#docs-basic-components-form-demo-demo4)

## Form.Array

为字段提供数组化管理。
在测试阶段，如果使用，请定期关注上线日志。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 渲染函数 | `(fields: FormArrayField[], operation: FormArrayOperation) => ReactElement[]` | - |
| initialValue | 设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准 | `any[]` | - |
| name | 字段名，支持数组 | `NamePath[]` | - |
| onAdd | 自定义添加方法 | `(operation: FormArrayOperation) => void` | - |
| renderAdd | 渲染添加按钮的文案 | `() => ReactNode` | - |
| renderHeader | 渲染每一项的头部内容 | `(field: FormArrayField, operation: FormArrayOperation) => ReactNode` | - |

### FormArrayField

| 属性  | 说明                | 类型     |
| ----- | ------------------- | -------- |
| index | 当前 Field 是第几项 | `number` |
| key   | 唯一标识            | `number` |

### FormArrayOperation

Form.Array 渲染表单相关操作函数。

| 属性   | 说明       | 类型                       |
| ------ | ---------- | -------------------------- |
| add    | 新增表单项 | `(initValue: any) => void` |
| remove | 删除表单项 | `(index: number) => void`  |

### 示例

参考示例：[Form.Array 示例](#docs-basic-components-form-demo-demo5)

## 一些通用的类型定义

### NamePath

`string | number | (string | number)[]`

### FieldData

| 属性       | 说明             | 类型         |
| ---------- | ---------------- | ------------ |
| errors     | 错误信息         | `string[]`   |
| name       | 字段名称         | `NamePath[]` |
| touched    | 是否被用户操作过 | `boolean`    |
| validating | 是否正在校验     | `boolean`    |
| value      | 字段对应值       | `any`        |

### Rule

Rule 支持接收 object 进行配置，也支持 function 来动态获取 form 的数据：

```tsx
type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);
```

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| defaultField | 仅在 `type` 为 `array` 类型时有效，用于指定数组元素的校验规则 | `rule` |
| enum | 是否匹配枚举中的值（需要将 `type` 设置为 `enum`） | `any[]` |
| len | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度 | `number` |
| max | 必须设置 `type`：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | `number` |
| message | 错误信息，不设置时会通过 `validatemessages` 自动生成 | `string` |
| min | 必须设置 `type`：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | `number` |
| pattern | 正则表达式匹配 | `RegExp` |
| required | 是否为必选字段 | `boolean` |
| transform | 将字段值转换成目标值后进行校验 | `(value) => any` |
| type | 类型，常见有 `string` \|`number` \|`boolean` \|`url` \| `email`。| `string` |
| validateTrigger | 设置触发验证时机，必须是 Form.Item 的 `validateTrigger` 的子集 | `string \| string[] ` |
| validator | 自定义校验，接收 Promise 作为返回值。可参考[自定义控件示例](#docs-basic-components-form-demo-demo3) | `(rule, value) => Promise` |
| warningOnly | 仅警告，不阻塞表单提交 | `boolean` |
| whitespace | 如果字段仅包含空格则校验不通过，只在 `type: 'string'` 时生效 | `boolean` |

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| Form           | fieldid + `"_form"`          |
| Form.Item            | fieldid + `"_form_item"`  |
