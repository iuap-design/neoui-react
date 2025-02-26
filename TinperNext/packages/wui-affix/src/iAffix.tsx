import type {BaseHtmlProps} from '../../wui-core/src/iCore';

export interface ChanCgeArg {
    affixed: boolean;
    event: MouseEvent
}
export interface AffixProps extends Omit<BaseHtmlProps<HTMLDivElement>, 'container' | 'target' | 'onChange'> {
    container?: HTMLElement | Element | null;
    getPopupContainer?: HTMLElement | Element | null;
    offsetTop?: number;
    offsetBottom?: number;
    horizontal?: boolean;
    target?: () => Window | HTMLElement | Document | null;
    onChange?: (state: ChanCgeArg) => void;
    onTargetChange?: (state: Object) => void;
    childrenRef?: HTMLElement;
    zIndex?: number;
    canHidden?: boolean;
    initCalc?: boolean;
}

export interface AffixState {
    affixed: boolean;
    initTop: number;
    initBottom: number;
    initLeft: number;
    top: number;
    left: number;
    bottom: number;
    marginTop: number;
    marginBottom: number;
    marginLeft: number;
    height: number;
    width: number;
    containerHeight: number;
    containerWidth: number;
    containerId: string;
    isMount: boolean;
}