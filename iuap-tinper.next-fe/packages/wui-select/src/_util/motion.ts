// ================== Collapse Motion ==================
import {prefix} from "../../../wui-core/src/index";

const getCollapsedHeight = () => ({height: 0, opacity: 0});
const getRealHeight = (node: HTMLElement) => ({height: node.scrollHeight, opacity: 1});
const getCurrentHeight = (node: HTMLElement) => ({height: node.offsetHeight});
const skipOpacityTransition = (_: any, event: any) =>
    event.propertyName === 'height';

const collapseMotion = {
    motionName: `${prefix}-motion-collapse`,
    onAppearStart: getCollapsedHeight,
    onEnterStart: getCollapsedHeight,
    onAppearActive: getRealHeight,
    onEnterActive: getRealHeight,
    onLeaveStart: getCurrentHeight,
    onLeaveActive: getCollapsedHeight,
    onAppearEnd: skipOpacityTransition,
    onEnterEnd: skipOpacityTransition,
    onLeaveEnd: skipOpacityTransition,
    motionDeadline: 500,
};

const getTransitionName = (rootPrefixCls: string, motion: string, transitionName: string) => {
    if (transitionName !== undefined) {
        return transitionName;
    }
    return `${rootPrefixCls}-${motion}`;
};
export {getTransitionName};
export default collapseMotion;
