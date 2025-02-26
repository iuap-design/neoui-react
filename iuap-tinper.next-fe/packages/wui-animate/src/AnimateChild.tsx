/**
 * This source code is quoted from rc-animate.
 * homepage: https://github.com/react-component/animate
 */
import {Component} from 'react';
import ReactDOM from 'react-dom';
import {cssAnimation} from '../../wui-core/src';
import { AnimateChildProps } from './iAnimate';
import animUtil from './util';

const transitionMap = {
    enter: 'transitionEnter',
    appear: 'transitionAppear',
    leave: 'transitionLeave',
};

class AnimateChild extends Component<AnimateChildProps> {
    private stopper: any;
    constructor(props: AnimateChildProps) {
        super(props);
        this.transition = this.transition.bind(this);
        this.stop = this.stop.bind(this);
    }

    componentWillUnmount() {
        this.stop();
    }

    componentWillEnter(done: () => void) {
        if (animUtil.isEnterSupported(this.props)) {
            this.transition('enter', done);
        } else {
            done();
        }
    }

    componentWillAppear(done: () => void) {
        if (animUtil.isAppearSupported(this.props)) {
            this.transition('appear', done);
        } else {
            done();
        }
    }

    componentWillLeave(done: () => void) {
        if (animUtil.isLeaveSupported(this.props)) {
            this.transition('leave', done);
        } else {
            // always sync, do not interupt with react component life cycle
            // update hidden -> animate hidden ->
            // didUpdate -> animate leave -> unmount (if animate is none)
            done();
        }
    }

    transition(animationType: string, finishCallback: () => void) {
        const node = ReactDOM.findDOMNode(this);
        const props = this.props;
        const transitionName = props.transitionName;
        const nameIsObj = typeof transitionName === 'object';
        this.stop();
        const end = () => {
            this.stopper = null;
            finishCallback();
        };
        if ((cssAnimation.isCssAnimationSupported || !props.animation[animationType]) &&
			transitionName && props[transitionMap[animationType]]) {
            const name = nameIsObj ? transitionName[animationType] : `${transitionName}-${animationType}`;
            let activeName = `${name}-active`;
            if (nameIsObj && transitionName[`${animationType}Active`]) {
                activeName = transitionName[`${animationType}Active`];
            }
            this.stopper = cssAnimation(node, {
                name,
                active: activeName,
            }, end);
        } else {
            this.stopper = props.animation[animationType](node, end);
        }
    }

    stop() {
        const stopper = this.stopper;
        if (stopper) {
            this.stopper = null;
            stopper.stop();
        }
    }

    render() {
        return this.props.children;
    }
}

export default AnimateChild;
