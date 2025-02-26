import React from 'react'
import type { FC } from 'react'
import { NativeProps, withNativeProps } from '@utils/NativeProps'
import IconError from '@components/steps/src/IconError';

const IconFinsih: FC<NativeProps> = props => withNativeProps(
  props,
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>icon/步骤/已完成</title>
    <g id="组件示例" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Steps" transform="translate(-53.500000, -144.000000)">
        <g id="Group-7" transform="translate(0.000000, 106.000000)">
          <g id="步骤条/3步" transform="translate(0.000000, 26.000000)">
            <g id="icon/步骤/已完成" transform="translate(53.500000, 12.000000)">
              <circle id="椭圆形" fill="var(--mui-color-success)" cx="10" cy="10" r="10"></circle>
              <path d="M6.25,6.0058642 C6.73001045,6.0058642 7.1191358,6.39498955 7.1191358,6.875 L7.119,10.3805 L13.75,10.3808642 C14.2047467,10.3808642 14.5779235,10.7301069 14.6159456,11.1750076 L14.6191358,11.25 C14.6191358,11.7300104 14.2300104,12.1191358 13.75,12.1191358 L6.25,12.1191358 C5.76998955,12.1191358 5.3808642,11.7300104 5.3808642,11.25 L5.3808642,6.875 C5.3808642,6.39498955 5.76998955,6.0058642 6.25,6.0058642 Z" id="路径-7" fill="var(--mui-color-white)" fill-rule="nonzero" transform="translate(10.000000, 9.062500) rotate(-45.000000) translate(-10.000000, -9.062500) "></path>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default IconFinsih
