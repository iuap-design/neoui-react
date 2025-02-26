import { createContext } from 'react'
import { RadioValue } from './iRadio'

export const RadioGroupContext = createContext<{
  value: RadioValue[]
  disabled: boolean
  check: (val: RadioValue) => void
  uncheck: (val: RadioValue) => void
    } | null>(null)
