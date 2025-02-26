import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { resolveContainer } from '@utils/GetContainer'
import ReactDOM from 'react-dom'
import ErrorMessage from './ErrorMessage'
import { ErrorMessageProps } from './iErrorMessage'
import { mergeProps } from '@utils/WithDefaultProps'

const containers = [] as HTMLDivElement[]

/**
 * 从指定的容器中卸载React组件并移除该容器
 *
 * @param container 要卸载组件的容器元素
 */
function unmount(container: HTMLDivElement) {
  const unmountResult = ReactDOM.unmountComponentAtNode(container)
  if (unmountResult && container.parentNode) {
    container.parentNode.removeChild(container)
  }
}

export type ErrorMessageCreateProps = Omit<ErrorMessageProps, 'visible'>

const defaultProps = {
  singleton: true
}

export type ErrorMessageHandler = {
  close: () => void
}

type ErrorMessageCreateRef = ErrorMessageHandler

/**
 * 显示ErrorMessage组件
 *
 * @param p ErrorMessage组件的属性和内容
 * @returns ErrorMessage组件的关闭方法
 */
export function create(p: ErrorMessageCreateProps | string) {
  const props = mergeProps(
    defaultProps,
    typeof p === 'string' ? { content: p } : p
  )
  const { getContainer = () => document.body } = props
  const container = document.createElement('div')
  const bodyContainer = resolveContainer(getContainer)
  bodyContainer?.appendChild(container)
  if (props.singleton) destroy()

  containers.push(container)

  const TempErrorMessage = forwardRef<ErrorMessageCreateRef>((_, ref) => {
    const [visible, setVisible] = useState(true)
    useEffect(() => () => {
      props.afterClose?.()
    }, [])

    useImperativeHandle(ref, () => ({ close: () => setVisible(false), }))

    return (
      <ErrorMessage
        {...props}
        // getContainer={() => container}
        visible={visible}
        onClose={() => setVisible(false)}
        afterClose={() => {
          unmount(container)
        }}
      />
    )
  })

  const ref = createRef<ErrorMessageCreateRef>()
  ReactDOM.render(<TempErrorMessage ref={ref} />, container)
  return {
    close: () => {
      if (!ref.current) unmount(container)
      else ref.current?.close()
    },
  } as ErrorMessageHandler
}

/**
 * 清除所有挂载的容器。
 */
export function destroy() {
  while (true) {
    const container = containers.pop()
    if (!container) break
    unmount(container)
  }
}
