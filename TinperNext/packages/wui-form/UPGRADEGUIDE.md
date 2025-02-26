# bee-form组件升级指南

> 2.0.0版本的`bee-form`相较于之前版本的`bee-form`有较大的改动，此文通过登陆框的实现，说明旧版和新版的差别和升级方式

## 旧版`bee-form`的实现

```
class Demo2 extends Component {
    checkForm = (flag,obj) => {
        console.log(flag);
        console.log(obj);
    }
    render() {
        let cancel=()=>{
            return (
                <Button shape="border" className="cancel">取消</Button>
            )
        }
        return (
            <div className="demo2">
                <Form  submitCallBack={this.checkForm} afterSubmitBtn={cancel()}>
                    <FormItem showMast={true}  labelName="用户名:" isRequire={true}  
                    errorMessage="请输入用户名" method="blur"  inline={true} valuePropsName='value'>
                        <Input name="username"   placeholder="请输入用户名" />
                    </FormItem>
                    <FormItem showMast={true}  labelName="密码:" isRequire={true} 
                    method="blur" errorMessage="请输入密码" 
                    inputAfter={<span className='forget'>忘记密码？</span>}  inline={true} valuePropsName='value'>
                        <Input name="password"  type="password" placeholder="请输入密码"   />
                    </FormItem>
                </Form>
            </div>
        )
    }
}
```

## 新版`bee-form`的实现

```
class Demo2 extends Component {

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('校验失败', values);
            } else {
                console.log('提交成功', values)
            }
        });
    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className="demo2">
                <Form >
                    <FormItem>
                        <Label>用户名：</Label>
                        <Input placeholder="请输入用户名"
                            {...getFieldProps('username', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: '请输入用户名',
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('username')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>密码：</Label>
                        <Input placeholder="请输入密码" type='password'
                            {...getFieldProps('password', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: '请输入密码',
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('password')}
                        </span>
                    </FormItem>
                    <div className='submit'>
                        <Button colors="primary" className="login" onClick={this.submit}>登陆</Button>
                        <Button shape="border" className="reset">取消</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.createForm()(Demo2);
```

## 新版功能

> 通过新旧版可以看出，新版有以下特点

- 不限定格式写法，用户随意变更
- 需要使用 `Form.createForm()(Demo2)` 包装
- 用户在任何时间任何位置都可以获得表单相关数据，更灵活

## 新版升级注意事项

- 不再有 `label` 相关配置
- 不再有栅格布局相关配置
- 必须使用 `Form.createForm()(Demo2)` 包装
- 使用 `getFieldProps`或者`getFieldDecorator` 处理表单元素
- 使用 `getFieldValue 、 getFieldsValue` 获得表单元素的值
- 使用 `setFieldsValue 、setFieldsInitialValue` 设置表单元素的值
- 使用 `validateFields` 校验表单
- 使用 `getFieldError、getFieldsError` 获得错误信息
- 使用 `rule` 设置校验规则
- 不得使用 `ref` 获得 `React` 组件，需要使用 `this.props.form.getFieldInstance` 代替，或者使用如下方法代替

```
<input {...getFieldProps('ref',{
  ref: this.saveRef 
})} />
```

更多实例请参考本组件demo或者 [rc-form](http://react-component.github.io/form/)
