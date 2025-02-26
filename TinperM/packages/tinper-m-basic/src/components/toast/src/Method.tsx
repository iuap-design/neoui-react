import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { resolveContainer } from '@utils/GetContainer'
import ReactDOM from 'react-dom'
import InternalToast from './Toast'
import { ToastProps } from './iToast'
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

export type ToastShowProps = Omit<ToastProps, 'visible'>

const defaultProps = {
  duration: 2,
  position: 'center',
  maskClickable: true,
  singleton: true
}

export type ToastHandler = {
  close: () => void
}

type ToastShowRef = ToastHandler

/**
 * 显示Toast组件
 *
 * @param p Toast组件的属性和内容
 * @returns Toast组件的关闭方法
 */
export function show(p: ToastShowProps | string) {
  const props = mergeProps(
    defaultProps,
    typeof p === 'string' ? { content: p } : p
  )
  let timer = 0
  const { getContainer = () => document.body } = props
  const container = document.createElement('div')
  const bodyContainer = resolveContainer(getContainer)
  bodyContainer?.appendChild(container)
  if (props.singleton) clear()

  containers.push(container)

  const TempToast = forwardRef<ToastShowRef>((_, ref) => {
    const [visible, setVisible] = useState(true)
    useEffect(() => () => {
      props.afterClose?.()
    }, [])

    useEffect(() => {
      if (props.duration === 0) {
        return
      }
      timer = window.setTimeout(() => {
        setVisible(false)
      }, props.duration * 1000)
      return () => {
        window.clearTimeout(timer)
      }
    }, [])

    useImperativeHandle(ref, () => ({ close: () => setVisible(false), }))

    return (
      <InternalToast
        {...props}
        getContainer={() => container}
        visible={visible}
        afterClose={() => {
          unmount(container)
        }}
      />
    )
  })

  const ref = createRef<ToastShowRef>()
  ReactDOM.render(<TempToast ref={ref} />, container)
  return {
    close: () => {
      if (!ref.current) unmount(container)
      else ref.current?.close()
    },
  } as ToastHandler
}

/**
 * 清除所有挂载的容器。
 */
export function clear() {
  while (true) {
    const container = containers.pop()
    if (!container) break
    unmount(container)
  }
}

/**
 * 配置Toast组件默认属性
 *
 * @param val 包含Toast组件duration、position、maskClickable属性的对象
 */
export function config(
  val: Pick<ToastProps, 'duration' | 'position' | 'maskClickable' | 'singleton'>
) {
  if (val.duration !== undefined) {
    defaultProps.duration = val.duration
  }
  if (val.position !== undefined) {
    defaultProps.position = val.position
  }
  if (val.maskClickable !== undefined) {
    defaultProps.maskClickable = val.maskClickable
  }
  if (val.singleton !== undefined) {
    defaultProps.singleton = val.singleton
  }
}
