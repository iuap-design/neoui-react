import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import Swiper from './Swiper'
import SwiperItem from './SwiperItem'
import './Swiper.less'

export type { SwiperProps, SwiperRef } from './iSwiper'

export default attachPropertiesToComponent(Swiper, { Item: SwiperItem, })
