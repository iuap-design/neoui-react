import React from 'react'
import { List as RCList } from 'rc-field-form'
import List from '../../list/src/index'
import { FormArrayProps } from './iForm'
import WebUI from '@utils/UpdatePrefixs'

const FormArray: React.FC<FormArrayProps> = props => (
  <RCList name={props.name} initialValue={props.initialValue}>
    {(rcFields, operation) => {
      const fields = rcFields.map(field => ({
        index: field.name,
        key: field.key,
      }))
      const children = props
        .children(fields, operation)
        .map((child, index) => (
          <List
            key={fields[index].key}
            mode='card'
            header={props.renderHeader?.(fields[index], operation)}
          >
            {child}
          </List>
        ))
      if (props.renderAdd) {
        children.push(
          <List key='add' mode='card'>
            <List.Item
              className={`${props.clsPrefix}-form-list-operation`}
              fieldid={props.fieldid ? props.fieldid + '_form_list_operation' : undefined}
              onClick={() => {
                props.onAdd ? props.onAdd(operation) : operation.add()
              }}
              arrow={false}
            >
              {props.renderAdd()}
            </List.Item>
          </List>
        )
      }
      return <>{children}</>
    }}
  </RCList>
)

export default WebUI({ })(FormArray)
