import getOffset from 'dom-helpers/query/offset';
import requestAnimationFrame from 'dom-helpers/util/requestAnimationFrame';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {componentOrElement} from '../../wui-core/src';

import Affix from './Affix';
import addEventListener from './utils/addEventListener';
import getContainer from './utils/getContainer';
import getDocumentHeight from './utils/getDocumentHeight';
import ownerDocument from './utils/ownerDocument';
import ownerWindow from './utils/ownerWindow';

const propTypes = {
    ...Affix.propTypes,
    /**
	 * 容器组件
	 */
    container: PropTypes.oneOfType([
        componentOrElement,
        PropTypes.func
    ]),
    /**
	 * 是否自适应宽度
	 */
    autoWidth: PropTypes.bool
};

const defaultProps = {
    viewportOffsetTop: 0,
    autoWidth: true
};

/**
 * 对Affix进行包装，提供自动计算偏移量
 */
class AutoAffix extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            offsetTop: null,
            offsetBottom: null,
            width: null
        };

        this.onWindowScroll = this.onWindowScroll.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.updateState = this.updateState.bind(this);

    }


    componentDidMount() {
        this._isMounted = true;

        this._windowScrollListener = addEventListener(
            ownerWindow(this), 'scroll', () => this.onWindowScroll()
        );

        this._windowResizeListener = addEventListener(
            ownerWindow(this), 'resize', () => this.onWindowResize()
        );

        this._documentClickListener = addEventListener(
            ownerDocument(this), 'click', () => this.onDocumentClick()
        );

        this.onUpdate();
    }

    UNSAFE_componentWillReceiveProps() {
        this._needPositionUpdate = true;
    }

    componentDidUpdate() {
        if (this._needPositionUpdate) {
            this._needPositionUpdate = false;
            this.onUpdate();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;

        if (this._windowScrollListener) {
            this._windowScrollListener.remove();
        }
        if (this._documentClickListener) {
            this._documentClickListener.remove();
        }
        if (this._windowResizeListener) {
            this._windowResizeListener.remove();
        }
    }

    onWindowScroll() {
        this.onUpdate();
    }

    onWindowResize() {
        if (this.props.autoWidth) {
            requestAnimationFrame(() => this.onUpdate());
        }
    }

    onDocumentClick() {
        requestAnimationFrame(() => this.onUpdate());
    }

    onUpdate() {
        if (!this._isMounted) {
            return;
        }

        const {top: offsetTop, width} = getOffset(this.positioner);

        const container = getContainer(this.props.container);
        let offsetBottom;
        if (container) {
            const documentHeight = getDocumentHeight(ownerDocument(this));
            const {top, height} = getOffset(container);
            offsetBottom = documentHeight - top - height;
        } else {
            offsetBottom = null;
        }

        this.updateState(offsetTop, offsetBottom, width);
    }

    updateState(offsetTop, offsetBottom, width) {
        if (
            offsetTop === this.state.offsetTop &&
			offsetBottom === this.state.offsetBottom &&
			width === this.state.width
        ) {
            return;
        }

        this.setState({offsetTop, offsetBottom, width});
    }

    render() {
        const {autoWidth, viewportOffsetTop, children, ...props} = this.props;
        const {offsetTop, offsetBottom, width} = this.state;

        delete props.container;

        const effectiveOffsetTop = Math.max(offsetTop, viewportOffsetTop || 0);

        let {affixStyle, bottomStyle} = this.props;
        if (autoWidth) {
            affixStyle = {width, ...affixStyle};
            bottomStyle = {width, ...bottomStyle};
        }

        return (
            <div>
                <div ref={(el) => this.positioner = el}/>

                <Affix
                    {...props}
                    offsetTop={effectiveOffsetTop}
                    viewportOffsetTop={viewportOffsetTop}
                    offsetBottom={offsetBottom}
                    affixStyle={affixStyle}
                    bottomStyle={bottomStyle}
                >
                    {children}
                </Affix>
            </div>
        );
    }
}

AutoAffix.propTypes = propTypes;

AutoAffix.defaultProps = defaultProps;

export default AutoAffix;
