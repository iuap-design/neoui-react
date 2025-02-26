import React from "react";
import {ViewItemProps, ViewItemState} from "./iDynamicView";
import shallowequal from 'shallowequal';

class ViewItem extends React.Component<ViewItemProps, ViewItemState> {
    constructor(props:ViewItemProps) {
        super(props);
        // console.log('AAA----[ViewItem]---》create', props);
    }

    // 性能优化：避免store变化引起非必要的多次渲染
    shouldComponentUpdate(nextProps: Readonly<ViewItemProps>): boolean {
        let thisMeta = this.props.meta || {};
        let nextMeta = nextProps.meta || {};
        // 注意仅对props.meta更新场景做优化比较，避免store变化引起的多余render，对除props.meta以外的属性变更时，任然需要触发render
        if (this.props.metaLastUpdate !== nextProps.metaLastUpdate) {
            if (Object.keys(thisMeta).length !== Object.keys(nextMeta).length) { // meta长度变化则重新渲染
                return true;
            }
            for (const key in nextMeta) {
                // 注意：仅做了meta下的一层对象比较
                if (!shallowequal(thisMeta[key], nextMeta[key])) { // meta中任意一项变化则重新渲染
                    return true;
                }
            }
            return false;
        } else {
            return true;
        }
    }

    // componentWillMount(): void {
    //     let {onViewWillMount} = this.props;
    //     onViewWillMount && onViewWillMount()
    // }
    // componentDidMount(): void {
    //     let {onViewDidMount} = this.props;
    //     onViewDidMount && onViewDidMount()
    // }
    // componentWillUpdate(nextProps: Readonly<ViewItemProps>, nextState: Readonly<ViewItemState>, nextContext: any): void {
    //     let {onViewWillUpdate} = this.props;
    //     onViewWillUpdate && onViewWillUpdate(nextProps, nextState, nextContext)
    // }
    // componentDidUpdate(prevProps: Readonly<ViewItemProps>, prevState: Readonly<ViewItemState>, snapshot?: any): void {
    //     let {onViewDidUpdate} = this.props;
    //     onViewDidUpdate && onViewDidUpdate(prevProps, prevState, snapshot)
    // }
    //
    // componentWillUnmount(): void {
    //     let {onViewWillUnmount} = this.props;
    //     onViewWillUnmount && onViewWillUnmount()
    // }

    render() {
        let {forwardKey, forwardRef, parser, meta, event, children} = this.props;
        // console.log('AAA----[ViewItem][' + meta!.uitype + ']---》响应store变化render', meta);
        return React.createElement(parser, {key: forwardKey, ref: forwardRef, ...meta, ...event}, children);
    }
}


export default ViewItem;
