/**
 * @title 基础用法
 * @description: 轻提示
 */
import React, { useEffect, useState, useRef } from 'react'
import CloudDownload from '@tinper/m-icons/lib/cjs/CloudDownload'
import { Button, Toast } from '@tinper/m'
import type { ToastHandler } from '@tinper/m/lib/cjs/components/toast/src'
import './demo.less'

const SecondText: React.FC = () => {
  const [second, setSecond] = useState(5)
  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecond(x => x > 1 ? x - 1 : x)
    }, 1000)
    return () => {
      window.clearInterval(interval)
    }
  }, [])
  return <span>还剩{second}秒</span>
}

const Demo1 = () => {
  const handler = useRef<ToastHandler>()
  return (
    <>
      <h3>基础用法</h3>
      <div className='demoBlock'>
        <Button
          mode='default'
          size='middle'
          onClick={() =>
            Toast.show({
              fieldid: 'Toast1',
              content: 'Hello World',
              afterClose: () => {
                console.log('after')
              },
            })
          }
        >
          轻提示
        </Button>
      </div>
      <h3>图标</h3>
      <div className='demoBlock'>
        <Button
          mode='default'
          size='middle'
          onClick={() =>
            Toast.show({
              fieldid: 'Toast2',
              icon: 'success',
              content: '保存成功',
            })
          }
        >
          成功
        </Button>
        <Button
          mode='default'
          size='middle'
          onClick={() => {
            Toast.show({
              fieldid: 'Toast3',
              icon: 'fail',
              content: '保存失败',
            })
          }}
        >
          失败
        </Button>
        <Button
          mode='default'
          size='middle'
          onClick={() => {
            Toast.show({
              fieldid: 'Toast4',
              icon: 'loading',
              content: '加载中…',
            })
          }}
        >
          加载中
        </Button>
        <Button
          mode='default'
          size='middle'
          style={{ marginTop: '0.2rem' }}
          onClick={() => {
            Toast.show({
              fieldid: 'Toast5',
              content: '上传中',
              icon: <CloudDownload style={{ width: '0.8rem', height: '0.8rem' }} />,
            })
          }}
        >
          自定义图标
        </Button>
      </div>


      <h3>更多功能</h3>
      <div className='demoBlock'>
        <Button
          mode='default'
          size='middle'
          onClick={() => {
            Toast.show({
              visible: false,
              fieldid: 'Toast6',
              content: 'Hello World',
              position: 'top',
            })
          }}
        >
          顶部提示
        </Button>
        <Button
          mode='default'
          size='middle'
          onClick={() => {
            Toast.show({
              content: 'Hello World',
              position: 'bottom',
            })
          }}
        >
          底部提示
        </Button>
        <Button
          mode='default'
          size='middle'

          onClick={() => {
            Toast.show({
              fieldid: 'Toast8',
              icon: 'loading',
              content: <SecondText />,
              duration: 5,
            })
          }}
        >
          动态内容
        </Button>
        <Button
          mode='default'
          size='middle'
          style={{ marginTop: '0.2rem' }}
          onClick={() => {
            Toast.show({
              fieldid: 'Toast7',
              content: '请耐心等待, 不要退出',
              maskClickable: false,
            })
          }}
        >
          阻止背景点击
        </Button>

      </div>


      <h3>手动清除</h3>
      <div className='demoBlock'>
        <Button
          mode='default'
          size='middle'
          onClick={() => {
            handler.current = Toast.show({
              fieldid: 'Toast9',
              content: '这条提示不会自动消失',
              duration: 0,
              position: 'top',
            })
          }}
        >
          显示
        </Button>
        <Button
          mode='default'
          size='middle'
          onClick={() => {
            Toast.clear()
          }}
        >
          清除
        </Button>
        <Button
          mode='default'
          size='middle'
          onClick={() => {
            handler.current?.close()
          }}
        >
          关闭
        </Button>
      </div>
    </>
  )
}

export default Demo1
