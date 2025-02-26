// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import {componentOrElement} from '../../wui-core/src';
import { OrNull } from '../../wui-core/src/utils/type';
import { PortalProps } from './iOverlay';
import getContainer from './utils/getContainer';
import ownerDocument from './utils/ownerDocument';


const isReact16 = ReactDOM.createPortal !== undefined;
isReact16 ? ReactDOM.createPortal : ReactDOM.unstable_renderSubtreeIntoContainer;

// const propTypes = {
//     /**
// 	 * 存放子组件的容器
// 	 */
//     container: PropTypes.oneOfType([
//         componentOrElement,
//         PropTypes.func
//     ])
// };

const defaultProps: PortalProps = {
    container: null
};

/**
 * Portal组件是将子组件渲染到指定container容器
 */
class Portal extends Component<PortalProps, {portalContainerNode: OrNull<HTMLElement>}> {
    static defaultProps = defaultProps;
    constructor(props: PortalProps) {
        super(props);
        // this.getMountNode = this.getMountNode.bind(this);
        // this.getOverlayDOMNode = this.getOverlayDOMNode.bind(this);
        // this.mountOverlayTarget = this.mountOverlayTarget.bind(this);
        // this.unmountOverlayTarget = this.unmountOverlayTarget.bind(this);
        // this.renderOverlay = this.renderOverlay.bind(this);
        // this.unrenderOverlay = this.unrenderOverlay.bind(this);
        // this.overlayTarget =  isReact16 ? document.createElement('div') : null;
        this.state = {
            portalContainerNode: null
        }
    }


    componentDidMount() {
        //         if(isReact16){
        let portalContainerNode = getContainer(this.props.container, ownerDocument(this).body);
        this.setState({portalContainerNode});
        //             this.portalContainerNode.appendChild(this.overlayTarget);
        //
        //         }else{
        //             this.renderOverlay();
        //         }
        //
        //
        //
        //       this.mounted = true;
    }

    //
    //   componentDidUpdate() {
    //         if(isReact16){
    //             let overlay = !this.props.children
    //                 ? null
    //                 : React.Children.only(this.props.children);
    //             if(overlay === null){
    //                 this.unrenderOverlay();
    //                 this.unmountOverlayTarget();
    //             }else{
    //
    //             }
    //         }else{
    //             this.renderOverlay();
    //         }
    //
    //
    //   }
    // //this._overlayTarget为当前的要添加的子组件， this._portalContainerNode要添加组件的容器元素
    UNSAFE_componentWillReceiveProps(nextProps: PortalProps) {
        if (/* this.overlayTarget &&*/ nextProps.container !== this.props.container) {
            //       this.portalContainerNode.removeChild(this.overlayTarget);
            let portalContainerNode = getContainer(nextProps.container, ownerDocument(this).body);
            this.setState({portalContainerNode})
            //       this.portalContainerNode.appendChild(this.overlayTarget);
        }
    }

    componentWillUnmount() {
        // this.unrenderOverlay();
        // this.unmountOverlayTarget();

        // this.mounted = false;
    }

    //   getMountNode(){
    //     return this.overlayTarget;
    //   }
    //
    //   getOverlayDOMNode() {
    //     if (!this.mounted) {
    //       throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    //     }
    //
    //     if (this.overlayInstance) {
    //       return ReactDOM.findDOMNode(this.overlayInstance);
    //     }
    //
    //     return null;
    // }
    //
    //
    // /**
    //  * 如果要添加的子组件不存在，就将div添加到要添加容器的DOM中；
    //  */
    //
    //   mountOverlayTarget() {
    //     if (!this.overlayTarget) {
    //       this.overlayTarget = document.createElement('div');
    //       this.portalContainerNode = getContainer(this.props.container, ownerDocument(this).body);
    //       this.portalContainerNode.appendChild(this.overlayTarget);
    //     }
    //   }
    // /**
    //  * 将要添加的子元素从容器中移除，并把变量置为null
    //  */
    //   unmountOverlayTarget() {
    //     if (this.overlayTarget) {
    //       this.portalContainerNode.removeChild(this.overlayTarget);
    //       this.overlayTarget = null;
    //     }
    //     this.portalContainerNode = null;
    //   }
    // /**
    //  * 手动渲染_overlayTarget
    //  */
    //   renderOverlay() {
    //
    //     let overlay = !this.props.children
    //       ? null
    //       : React.Children.only(this.props.children);
    //
    //     // Save reference for future access.
    //     if (overlay !== null) {
    //       this.mountOverlayTarget();
    //       this.overlayInstance = ReactDOM.createPortal(overlay, this.overlayTarget);
    //     } else {
    //       // Unrender if the component is null for transitions to null
    //       this.unrenderOverlay();
    //       this.unmountOverlayTarget();
    //     }
    //   }
    // /**
    //  * 销毁_overlayTarget组件。并把_overlayInstance置为null
    //  */
    //   unrenderOverlay() {
    //     if (this.overlayTarget) {
    //       !isReact16 && ReactDOM.unmountComponentAtNode(this.overlayTarget);
    //       this.overlayInstance = null;
    //     }
    //   }

    render() {
        if (!isReact16) {
            return null;
        }

        let overlay = !this.props.children
            ? null
            : React.Children.only(this.props.children);
        let containerDOM = this.state.portalContainerNode || getContainer(this.props.container, document.body);
        return ReactDOM.createPortal(
            overlay, containerDOM
        )
    }

}

// Portal.propTypes = propTypes;
// Portal.defaultProps = defaultProps;

export default Portal;
