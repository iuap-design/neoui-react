interface Prop {
    transitionEnter?: boolean;
    transitionAppear?: boolean;
    transitionLeave?: boolean;
    [key: string]: any;
}
const util = {
    isAppearSupported(props: Prop) {
        return props.transitionName && props.transitionAppear || props.animation.appear;
    },
    isEnterSupported(props: Prop) {
        return props.transitionName && props.transitionEnter || props.animation.enter;
    },
    isLeaveSupported(props: Prop) {
        return props.transitionName && props.transitionLeave || props.animation.leave;
    },
    allowAppearCallback(props: Prop) {
        return props.transitionAppear || props.animation.appear;
    },
    allowEnterCallback(props: Prop) {
        return props.transitionEnter || props.animation.enter;
    },
    allowLeaveCallback(props: Prop) {
        return props.transitionLeave || props.animation.leave;
    },
};
export default util;
