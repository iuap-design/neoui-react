import React, { useState } from 'react'
import { CascadePickerView } from '@tinper/m'
import { sleep } from '../../../utils/Sleeps';
import { CascadePickerOption } from '../../cascade-picker/src';

export function AsyncDemo() {
  async function mockApi(key: string) {
    await sleep(1000)
    return [key + '1', key + '2', key + '3']
  }
  const [options, setOptions] = useState<CascadePickerOption[]>([
    {
      label: 'A',
      value: 'A',
      children: [],
    },
    {
      label: 'B',
      value: 'B',
      children: [],
    },
  ])

  return (
    <CascadePickerView
      options={options}
      onChange={val => {
        const key = val[0]
        if (!key) return
        mockApi(key).then(data => {
          setOptions(options =>
            options.map(option => {
              if (option.value === key) {
                return {
                  ...option,
                  children: data.map(x => ({ label: x, value: x })),
                }
              }
              return option
            })
          )
        })
      }}
    />
  )
}
