
import { ReactInstance } from 'react';
export type Placement = "top" | "right" | "bottom" | "left" | "topLeft" | "rightTop" | "bottomLeft" | "leftTop" | "topRight" | "rightBottom" | "bottomRight" | "leftBottom"

export interface PortalProps {
    container: ReactInstance | undefined | null | ((el: HTMLElement) => HTMLElement);
    children?: any;
}