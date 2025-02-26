/**
 * @title 基础用法
 * @description 基础用法
 */
import './demo.less';
import React from 'react'
import type { PopoverProps } from '@tinper/m';
import { Popover, Button } from '@tinper/m';
import { placementList } from './PlacementList'

function BasicUsage() {
  return (
    <Popover
      content='Popover Content'
      placement='right-start'
      defaultVisible
    >
      <Button>Open Popover</Button>
    </Popover>
  )
}

function DarkPopover() {
  return (
    <Popover
      content='Popover Content'
      placement='right-start'
      mode='dark'
      trigger='click'
      fieldid="popover-dark-demo"
    >
      <Button>Open Popover</Button>
    </Popover>
  )
}


function PopoverPosition() {
  const PopoverItem = ({ placement }: { placement: PopoverProps['placement'] }) => {
    return (
      <Popover
        key={placement}
        content={
          <>
            Popover
            <br />
            Content
          </>
        }
        placement={placement}
      >
        <Button >{placement}</Button>
      </Popover>
    )
  }

  return (
    <div className="placementList">
      {
        placementList.map(placement => (
          <PopoverItem key={placement} placement={placement} />
        ))
      }
    </div>
  )
}




const Demo = () => (
  <div className="popover-demo">
    <>
      <h3>基础用法</h3>
      <BasicUsage />
    </>
    <>
      <h3>深色气泡</h3>
      <DarkPopover />
    </>
    <>
      <h3>气泡位置</h3>
      <PopoverPosition />
    </>
  </div>
)

export default Demo
