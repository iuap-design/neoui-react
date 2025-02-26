import Slider, { Settings } from 'react-slick';
import { BaseProps } from '../../wui-core/src/iCore';


export type CarouselEffect = 'scrollx' | 'fade';
export type DotPosition = 'top' | 'bottom' | 'left' | 'right';

export interface CarouselProps extends Settings, BaseProps{
    autoplay?: boolean;
    dotPosition?: DotPosition;
    dots?: boolean;
    easing?: string;
    arrows?: boolean;
    draggable?: boolean;
    effect?: CarouselEffect;
    speed?: number;
    initialSlide?: number;
    vertical?: boolean | undefined;
    dir?:'ltr' | 'rtl';
}

export class SlickObj extends Slider {
    innerSlider: any
}
