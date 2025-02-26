// import PropTypes from 'prop-types';
import React, {Component} from 'react'
import {WebUI, getNid} from '../../wui-core/src/index'
import InputNumber from './InputNumber'
import {InputNumberGroupProps, InputNumberGroupState} from './iInputNumberGroup'

const noop = () => {}

const defaultProps = {
    clsPrefix: 'u-input-number',
    className: '',
    placeholder: ['', ''],
    onChange: noop,
    onBlur: noop,
    onFocus: noop
}

@WebUI({name: 'input-number', defaultProps})
class InputNumberGroup extends Component<InputNumberGroupProps, InputNumberGroupState> {
    static readonly displayName = 'InputNumberGroup'

    constructor(props: InputNumberGroupProps) {
        super(props)
        this.state = {
            value: props.value || ['', '']
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: InputNumberGroupProps) {
        if ('value' in nextProps) {
            if (Array.isArray(nextProps.value)) {
                this.setState({
                    value: nextProps.value
                })
            } else if (!nextProps.value) {
                this.setState({
                    value: ['', '']
                })
            }
        }
    }

    onChange = (index: number, v: number) => {
        let {value} = this.state
        value[index] = v
        this.setState({
            value
        })
        this.props.onChange?.(value)
    }
    onFocus = (index: number, v: number) => {
        let {value} = this.state
        value[index] = v
        this.setState({
            value
        })
        this.props?.onFocus?.(value)
    }
    onBlur = (index: number, v: number) => {
        let {value} = this.state
        if (index === 1) {
            if ((value[0] || value[0] === 0) && v < +value[0]) {
                console.warn('The second value must be greater than or equal to the first value')
            }
        }
        value[index] = v
        this.setState({
            value
        })

        this.props?.onBlur?.(value)
    }

    render() {
        let {className, clsPrefix, value, placeholder, split, id, ...other} = this.props
        let {value: stateValue} = this.state
        let adapterNid = getNid(this.props)
        return (
            <div className={`${clsPrefix}-group ${className}`} id={id} {...adapterNid} /* id不能下传到Input，否则将存在两个相同id */>
                <InputNumber
                    {...other}
                    onChange={(value: number) => {
                        this.onChange(0, value)
                    }}
                    onBlur={(value: number) => {
                        this.onBlur(0, value)
                    }}
                    onFocus={(value: number) => {
                        this.onFocus(0, value)
                    }}
                    value={stateValue[0]}
                    placeholder={(placeholder as InputNumberGroupProps['placeholder'])?.[0]}
                />
                {split ? split : <span className={`${clsPrefix}-group-split`}>~</span>}
                <InputNumber
                    {...other}
                    onChange={(value: number) => {
                        this.onChange(1, value)
                    }}
                    onBlur={(value: number) => {
                        this.onBlur(1, value)
                    }}
                    onFocus={(value: number) => {
                        this.onFocus(1, value)
                    }}
                    value={stateValue[1]}
                    placeholder={(placeholder as InputNumberGroupProps['placeholder'])?.[1]}
                />
            </div>
        )
    }
}

export default InputNumberGroup
