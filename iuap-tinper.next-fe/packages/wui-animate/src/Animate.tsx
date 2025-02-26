/**
 * This source code is quoted from rc-animate.
 * homepage: https://github.com/react-component/animate
 */

import React, {Component, ReactElement} from 'react';
import AnimateChild from './AnimateChild';
import {
    findChildInChildrenByKey,
    findShownChildInChildrenByKey,
    isSameChildren,
    mergeChildren,
    toArrayChildren,
} from './ChildrenUtils';
import { AnimateProps } from './iAnimate';
import animUtil from './util';
import { Key } from '../../wui-core/src/iCore';

const defaultKey = `u_animate_${Date.now()}`;

function getChildrenFromProps(props: AnimateProps): ReactElement {
    const children = props.children as ReactElement;
    if (React.isValidElement(children)) {
        if (!children.key) {
            return React.cloneElement(children, {
                key: defaultKey,
            }) as ReactElement ;
        }
    }
    return children;
}

function noop() {
}

const defaultProps: AnimateProps = {
    animation: {},
    component: 'div',
    transitionEnter: true,
    transitionLeave: true,
    transitionAppear: false,
    onEnd: noop,
    onEnter: noop,
    onLeave: noop,
    onAppear: noop
}

class Animate extends Component<AnimateProps, {children: ReactElement[]}> {
    private currentlyAnimatingKeys: Record<any, boolean>;
    private keysToEnter: (string | number | null)[] = [];
    private keysToLeave: (string | number | null)[] = [];
    private mounted: boolean | undefined;
    private nextProps: AnimateProps | undefined;
    static defaultProps = defaultProps;
    constructor(props: AnimateProps) {
        super(props);
        this.currentlyAnimatingKeys = {};
        this.keysToEnter = [];
        this.keysToLeave = [];
        this.state = {
            children: toArrayChildren(getChildrenFromProps(this.props)!),
        };

        this.performEnter = this.performEnter.bind(this);
        this.performAppear = this.performAppear.bind(this);
        this.handleDoneAdding = this.handleDoneAdding.bind(this);
        this.performLeave = this.performLeave.bind(this);

        this.performLeave = this.performLeave.bind(this);
        this.handleDoneLeaving = this.handleDoneLeaving.bind(this);
        this.isValidChildByKey = this.isValidChildByKey.bind(this);
        this.stop = this.stop.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        const showProp = this.props.showProp;
        let children = this.state.children;
        if (showProp) {
            children = children.filter((child) => {
                return !!child.props[showProp];
            });
        }
        children.forEach((child) => {
            if (child) {
                this.performAppear(child.key as Key);
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    UNSAFE_componentWillReceiveProps(nextProps: AnimateProps) {
        this.nextProps = nextProps;
        const nextChildren = toArrayChildren(getChildrenFromProps(nextProps));
        const props = this.props;
        // exclusive needs immediate response
        if (props.exclusive) {
            Object.keys(this.currentlyAnimatingKeys).forEach((key) => {
                this.stop(key);
            });
        }
        const showProp = props.showProp;
        const currentlyAnimatingKeys = this.currentlyAnimatingKeys;
        // last props children if exclusive
        const currentChildren = props.exclusive ?
            toArrayChildren(getChildrenFromProps(props)) :
            this.state.children;
        // in case destroy in showProp mode
        let newChildren = [];
        if (showProp) {
            currentChildren.forEach((currentChild) => {
                const nextChild = currentChild && findChildInChildrenByKey(nextChildren, currentChild.key as Key);
                let newChild;
                if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
                    newChild = React.cloneElement(nextChild || currentChild, {
                        [showProp]: true,
                    });
                } else {
                    newChild = nextChild;
                }
                if (newChild) {
                    newChildren.push(newChild);
                }
            });
            nextChildren.forEach((nextChild) => {
                if (!nextChild || !findChildInChildrenByKey(currentChildren, nextChild.key as Key)) {
                    newChildren.push(nextChild);
                }
            });
        } else {
            newChildren = mergeChildren(
                currentChildren,
                nextChildren
            );
        }

        // need render to avoid update
        this.setState({
            children: newChildren,
        });

        nextChildren.forEach((child) => {
            const key = child && child.key as Key;
            if (child && currentlyAnimatingKeys[key]) {
                return;
            }
            const hasPrev = child && findChildInChildrenByKey(currentChildren, key);
            if (showProp) {
                const showInNext = child.props[showProp];
                if (hasPrev) {
                    const showInNow = findShownChildInChildrenByKey(currentChildren, key, showProp);
                    if (!showInNow && showInNext) {
                        this.keysToEnter.push(key);
                    }
                } else if (showInNext) {
                    this.keysToEnter.push(key);
                }
            } else if (!hasPrev) {
                this.keysToEnter.push(key!);
            }
        });

        currentChildren.forEach((child) => {
            const key = child && child.key as Key;
            if (child && currentlyAnimatingKeys[key]) {
                return;
            }
            const hasNext = child && findChildInChildrenByKey(nextChildren, key);
            if (showProp) {
                const showInNow = child.props[showProp];
                if (hasNext) {
                    const showInNext = findShownChildInChildrenByKey(nextChildren, key, showProp);
                    if (!showInNext && showInNow) {
                        this.keysToLeave.push(key);
                    }
                } else if (showInNow) {
                    this.keysToLeave.push(key);
                }
            } else if (!hasNext) {
                this.keysToLeave.push(key);
            }
        });
    }

    componentDidUpdate() {
        const keysToEnter = this.keysToEnter;
        this.keysToEnter = [];
        keysToEnter.forEach(this.performEnter);
        const keysToLeave = this.keysToLeave;
        this.keysToLeave = [];
        keysToLeave.forEach(this.performLeave);
    }

    performEnter(key: Key) {
        // may already remove by exclusive
        if (this[key]) {
            this.currentlyAnimatingKeys[key] = true;
            this[key].componentWillEnter(
                this.handleDoneAdding.bind(this, key, 'enter')
            );
        }
    }

    performAppear(key: Key) {
        if (this[key]) {
            this.currentlyAnimatingKeys[key] = true;
            this[key].componentWillAppear(
                this.handleDoneAdding.bind(this, key, 'appear')
            );
        }
    }

    handleDoneAdding(key: Key, type: string) {
        const props = this.props;
        delete this.currentlyAnimatingKeys[key];
        // if update on exclusive mode, skip check
        if (props.exclusive && props !== this.nextProps) {
            return;
        }
        const currentChildren = toArrayChildren(getChildrenFromProps(props));
        if (!this.isValidChildByKey(currentChildren, key)) {
            // exclusive will not need this
            this.performLeave(key);
        } else {
            if (type === 'appear') {
                if (animUtil.allowAppearCallback(props)) {
                    props.onAppear(key);
                    props.onEnd(key, true);
                }
            } else {
                if (animUtil.allowEnterCallback(props)) {
                    props.onEnter(key);
                    props.onEnd(key, true);
                }
            }
        }
    }

    performLeave(key: Key) {
        // may already remove by exclusive
        if (this[key]) {
            this.currentlyAnimatingKeys[key] = true;
            this[key].componentWillLeave(this.handleDoneLeaving.bind(this, key));
        }
    }

    handleDoneLeaving(key: Key) {
        const props = this.props;
        delete this.currentlyAnimatingKeys[key];
        // if update on exclusive mode, skip check
        if (props.exclusive && props !== this.nextProps) {
            return;
        }
        const currentChildren = toArrayChildren(getChildrenFromProps(props));
        // in case state change is too fast
        if (this.isValidChildByKey(currentChildren, key)) {
            this.performEnter(key);
        } else {
            const end = () => {
                if (animUtil.allowLeaveCallback(props)) {
                    props.onLeave(key);
                    props.onEnd(key, false);
                }
            };
            /* eslint react/no-is-mounted:0 */
            if (this.mounted && !isSameChildren(this.state.children,
                currentChildren, props.showProp)) {
                this.setState({
                    children: currentChildren,
                }, end);
            } else {
                end();
            }
        }
    }

    isValidChildByKey(currentChildren: ReactElement[], key: Key) {
        const showProp = this.props.showProp;
        if (showProp) {
            return findShownChildInChildrenByKey(currentChildren, key, showProp);
        }
        return findChildInChildrenByKey(currentChildren, key);
    }

    stop(key: Key) {
        delete this.currentlyAnimatingKeys[key];
        const component = this[key];
        if (component) {
            component.stop();
        }
    }

    render() {
        const props = this.props;
        this.nextProps = props;
        const stateChildren = this.state.children;
        let children: any = null;
        if (stateChildren) {
            children = stateChildren.map((child: any) => {
                if (child === null || child === undefined) {
                    return child;
                }
                if (!child.key) {
                    throw new Error('must set key for <rc-animate> children');
                }

                // @ts-ignore
                return (<AnimateChild
                    key={child.key}
                    ref={ref => (this[child.key] = ref)}
                    animation={props.animation}
                    transitionName={props.transitionName}
                    transitionEnter={props.transitionEnter}
                    transitionAppear={props.transitionAppear}
                    transitionLeave={props.transitionLeave}>
                    {child}
                </AnimateChild>
                ) as any;
            });
        }
        const Component = props.component;
        if (Component) {
            let passedProps: Partial<AnimateProps> = props;
            if (typeof Component === 'string') {
                passedProps = {
                    className: props.className,
                    style: props.style,
                };
            }
            return <Component {...passedProps}>{children}</Component>;
        }
        return children[0] || null;
    }
}

export default Animate;
