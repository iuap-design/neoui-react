import React from 'react'
import type { FC } from 'react'
import { NativeProps, withNativeProps } from '@utils/NativeProps'

const IconError: FC<NativeProps> = props => withNativeProps(
  props,
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>icon/步骤/进行中</title>
    <defs>
      <path d="M0.000172055785,0.237756305 C-0.00276280863,0.106447124 0.0909920729,0 0.228616089,0 L1.54916343,0 C1.67826445,0 1.7806903,0.0998263889 1.77760746,0.237756305 L1.58956182,8.65113258 C1.58662696,8.78244177 1.47512063,8.88888889 1.35459931,8.88888889 L0.423180205,8.88888889 C0.296348857,8.88888889 0.191300536,8.7890625 0.188217693,8.65113258 L0.000172055785,0.237756305 Z M0.888888889,11.5555556 C0.397969111,11.5555556 0,11.1575864 0,10.6666667 C0,10.1757469 0.397969111,9.77777778 0.888888889,9.77777778 C1.37980867,9.77777778 1.77777778,10.1757469 1.77777778,10.6666667 C1.77777778,11.1575864 1.37980867,11.5555556 0.888888889,11.5555556 Z" id="path-1"></path>
    </defs>
    <g id="组件示例" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Steps" transform="translate(-177.500000, -296.000000)">
        <g id="Group-7-Copy-4" transform="translate(0.000000, 258.000000)">
          <g id="步骤条/3步" transform="translate(0.000000, 26.000000)">
            <g id="步骤图标" transform="translate(53.500000, 12.000000)">
              <g id="icon/步骤/进行中" transform="translate(124.000000, 0.000000)">
                <circle id="椭圆形" fill="var(--mui-color-danger)" cx="10" cy="10" r="10"></circle>
                <g id="checked" transform="translate(9.111111, 3.777778)">
                  <mask id="mask-2" fill="white">
                    <use xlinkHref="#path-1"></use>
                  </mask>
                  <g id="fail" fillRule="nonzero"></g>
                  <g id="color" mask="url(#mask-2)" fill="var(--mui-color-white)">
                    <g transform="translate(-7.111111, -1.777778)" id="矩形">
                      <rect x="0" y="0" width="16" height="16"></rect>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default IconError
