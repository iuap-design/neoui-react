import React, { memo, useContext } from 'react'
import { FieldContext, useWatch } from 'rc-field-form'
import type { FormInstance } from 'rc-field-form'
import type { NamePath } from 'rc-field-form/es/interface'
import { useIsomorphicUpdateLayoutEffect, useUpdate } from 'tne-fw-fe/hooks'
import { FormSubscribeProps } from './iForm'

export const FormSubscribe: React.FC<FormSubscribeProps> = props => {
  const update = useUpdate()
  const form = useContext(FieldContext)

  const value = form.getFieldsValue(props.to)

  // Memo to avoid useless render
  const childNode = React.useMemo(
    () => props.children(value, form),
    [JSON.stringify(value), props.children]
  )

  return (
    <>
      {childNode}
      {props.to.map(namePath => (
        <Watcher
          key={namePath.toString()}
          form={form}
          namePath={namePath}
          onChange={update}
        />
      ))}
    </>
  )
}

export const Watcher = memo<{
  form: FormInstance
  namePath: NamePath
  onChange: () => void
    }>(props => {
      const value = useWatch(props.namePath, props.form)
      useIsomorphicUpdateLayoutEffect(() => {
        props.onChange()
      }, [value])
      return null
    })
