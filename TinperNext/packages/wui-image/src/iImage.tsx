import { BaseProps } from "../../wui-core/src/iCore";

type Noop = () => void;

export interface ToolbarButtonOptions {
  click?: Function;
  show?: boolean;
  size?: 'small' | 'medium' | 'large';
  title?: string;
}
export type ToolbarOption = boolean | ToolbarButtonOptions | undefined;

export interface ToolbarOptions {
  flipHorizontal?: ToolbarOption;
  flipVertical?: ToolbarOption;
  next?: ToolbarOption;
  oneToOne?: ToolbarOption;
  play?: ToolbarOption;
  prev?: ToolbarOption;
  reset?: ToolbarOption;
  rotateLeft?: ToolbarOption;
  rotateRight?: ToolbarOption;
  zoomIn?: ToolbarOption;
  zoomOut?: ToolbarOption;
  [x: string]: ToolbarOption;
}

export interface ImageProps extends BaseProps {
    locale: string;
    getPopupContainer?: string | HTMLElement;
    container?: string | HTMLElement;
    ready: Noop;
    show: Noop;
    shown: Noop;
    hide: Noop;
    hidden: Noop;
    view: Noop;
    viewed: Noop;
    zoom: Noop;
    zoomed: Noop;
    asyncLoad: boolean;
    inline?: boolean;
    button?: boolean;
    title?: boolean;
    alt?: boolean;
    navbar?: boolean;
    toolbar?: boolean |ToolbarOptions;
    tooltip?: boolean;
    movable?: boolean;
    zoomable?: boolean;
    rotatable?: boolean;
    scalable?: boolean;
    transition?: boolean;
    fullscreen?: boolean;
    keyboard?: boolean;
    interval?: number;
    zoomRatio?: number;
    minZoomRatio?: number;
    maxZoomRatio?: number;
    zIndex?: number;
    zIndexInline?: number;
    url?: string;
    src?: string;
    fieldid?: string;
    showAllToolbar?: boolean;
    dir?: 'ltr' | 'rtl';
}
