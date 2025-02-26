import React, {useContext, useImperativeHandle, useRef} from 'react'
import Group from '../../wui-input-group/src'
import InputGroupAddon from '../../wui-input-group/src/InputGroupAddon'
import {ConfigContext} from '../../wui-provider/src/context'
import Input from './Input'
import {setComponentSize} from '../../wui-core/src/componentStyle'
import type {InputProps, MutableRefObject} from './iInput'
import type {SizeType} from '../../wui-core/src/iCore'

const InputWithProvider: React.ForwardRefRenderFunction<unknown, InputProps> = (props, ref) => {
    const inputRef = useRef() as MutableRefObject
    const context = useContext(ConfigContext) // 接受provider控制
    // eslint-disable-next-line react/prop-types
    let {antd, size, type, autoComplete, showClose, allowClear, showMaxLabel, showCount, disabled, align, bordered, ...other} = props
    antd = antd ?? context.antd ?? false
    disabled = disabled ?? context.disabled ?? false
    bordered = bordered ?? context.bordered ?? true
    align = align ?? context.align
    size = setComponentSize(size || context.size as SizeType, {defaultIsMd: true})

    // TODO: 将来统一config之后，注入到props里面
    useImperativeHandle(ref as React.RefObject<HTMLInputElement>, () => {
        return {
            input: inputRef.current?.input,
            focus: () => inputRef.current?.input.focus(),
            dom: type === 'textarea' ? inputRef.current?.input?.resizableTextArea?.textArea : inputRef.current?.input,
            ...inputRef.current
        }
    })

    return (
        <Input
            {...other}
            antd={antd}
            disabled={disabled}
            size={size}
            align={align}
            bordered={bordered}
            ref={inputRef}
            type={type}
            autoComplete={autoComplete || (type === 'password' ? 'new-password' : 'off')}
            allowClear={showClose ?? allowClear}
            showMaxLabel={showMaxLabel ?? showCount}
        />
    )
}

interface CompoundedComponent extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLElement>> {
    TextArea: typeof Input
    Search: typeof Input
    Password: typeof Input
    Group: typeof Group
    Button: typeof ButtonComponent
}

const ButtonComponent = React.forwardRef((props, ref: React.Ref<any>) => (
    <InputGroupAddon ref={ref} addonType='button' {...props} />
))

const InputWrapper = React.forwardRef(InputWithProvider) as CompoundedComponent

;['TextArea', 'Search', 'Password'].forEach(item => {
    const typeName = item.toLowerCase()
    const Comp = ({type, ...others}: InputProps, ref: React.ForwardedRef<unknown>) =>
        InputWithProvider({...others, type: typeName}, ref)
    InputWrapper[item] = React.forwardRef(Comp)
})

InputWrapper.Group = Group
InputWrapper.Button = ButtonComponent

export default InputWrapper
