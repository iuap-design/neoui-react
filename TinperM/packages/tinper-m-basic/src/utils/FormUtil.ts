import { isMemo, isFragment } from 'react-is'
export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) return []

  return Array.isArray(candidate) ? candidate : [candidate]
}

// eslint-disable-next-line @typescript-eslint/ban-types
function shouldConstruct(Component: Function) {
  const prototype = Component.prototype
  return !!(prototype && prototype.isReactComponent)
}

function isSimpleFunctionComponent(type: any) {
  return (
    typeof type === 'function' &&
    !shouldConstruct(type) &&
    type.defaultProps === undefined
  )
}

export function isSafeSetRefComponent(component: any): boolean {
  if (isFragment(component)) return false
  if (isMemo(component)) return isSafeSetRefComponent(component.type)

  return !isSimpleFunctionComponent(component.type)
}
