import React from 'react'
import type { FC } from 'react'
import { NativeProps, withNativeProps } from '@utils/NativeProps'
import IconFinsih from '@components/steps/src/IconFinish';

const IconWait: FC<NativeProps> = props => withNativeProps(
props,
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>icon/步骤条/未完成</title>
    <g id="组件示例" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Steps" transform="translate(-301.500000, -144.000000)" fill="var(--mui-color-light)" fill-rule="nonzero">
        <g id="Group-7" transform="translate(0.000000, 106.000000)">
          <g id="步骤条/3步" transform="translate(0.000000, 26.000000)">
            <g id="步骤图标" transform="translate(53.500000, 12.000000)">
              <g id="icon/步骤条/未完成" transform="translate(248.000000, 0.000000)">
                <path d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M10,6 C7.790861,6 6,7.790861 6,10 C6,12.209139 7.790861,14 10,14 C12.209139,14 14,12.209139 14,10 C14,7.790861 12.209139,6 10,6 Z" id="椭圆形"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default IconWait
