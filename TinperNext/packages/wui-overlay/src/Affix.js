import classNames from 'classnames';
import getHeight from 'dom-helpers/query/height';
import getOffset from 'dom-helpers/query/offset';
import getOffsetParent from 'dom-helpers/query/offsetParent';
import getScrollTop from 'dom-helpers/query/scrollTop';
import requestAnimationFrame from 'dom-helpers/util/requestAnimationFrame';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import addEventListener from './utils/addEventListener';
import getDocumentHeight from './utils/getDocumentHeight';
import ownerDocument from './utils/ownerDocument';
import ownerWindow from './utils/ownerWindow';


const propTypes = {
    /**
	 * 到屏幕顶部偏移的像素
	 */
    offsetTop: PropTypes.number,

    /**
	 * 添加时,到窗口的偏移像素
	 */
    viewportOffsetTop: PropTypes.number,

    /**
	 * 到屏幕的底部的偏移像素
	 */
    offsetBottom: PropTypes.number,

    /**
	 * 在顶部时添加的class
	 */
    topClassName: PropTypes.string,

    /**
	 * 在顶部添加的style
	 */
    topStyle: PropTypes.object,

    /**
	 * 当固定定位时，添加的class
	 */
    affixClassName: PropTypes.string,
    /**
	 * 当固定定位时，添加的style
	 */
    affixStyle: PropTypes.object,

    /**
	 * 在底部时添加的class
	 */
    bottomClassName: PropTypes.string,

    /**
	 * 在底部时添加的style
	 */
    bottomStyle: PropTypes.object,

    /**
	 * 在affixstyle和affixClassName添加之前的钩子函数
	 */
    onAffix: PropTypes.func,
    /**
	 * 在affixstyle和affixClassName添加之后的钩子函数
	 */
    onAffixed: PropTypes.func,

    /**
	 * 在topStyle和topClassName添加之前的钩子函数
	 */
    onAffixTop: PropTypes.func,

    /**
	 * 在topStyle和topClassName添加之后的钩子函数
	 */
    onAffixedTop: PropTypes.func,

    /**
	 * 在bottomStyle和bottomClassName添加之前的钩子函数
	 */
    onAffixBottom: PropTypes.func,

    /**
	 * 在bottomStyle和bottomClassName添加之后的钩子函数
	 */
    onAffixedBottom: PropTypes.func
};

const defaultProps = {
    offsetTop: 0,
    viewportOffsetTop: null,
    offsetBottom: 0
};

/**
 * Affix组件是用来提供fixed定位,并在顶部和顶部将定位转化为absoluted
 */
class Affix extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            affixed: 'top',
            position: null,
            top: null
        };

        this._needPositionUpdate = false;

        this.onWindowScroll = this.onWindowScroll.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.getPositionTopMax = this.getPositionTopMax.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateStateAtBottom = this.updateStateAtBottom.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        this._windowScrollListener = addEventListener(
            ownerWindow(this), 'scroll', () => this.onWindowScroll()
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
    }

    /**
	 * 屏幕滑动时更新
	 **/
    onWindowScroll() {
        this.onUpdate();
    }

    /**
	 * 屏幕点击时更新
	 **/
    onDocumentClick() {
        requestAnimationFrame(() => this.onUpdate());
    }

    // 更新位置时状态的更新
    onUpdate() {
        if (!this._isMounted) {
            return;
        }

        const {offsetTop, viewportOffsetTop} = this.props;
        const scrollTop = getScrollTop(ownerWindow(this));
        const positionTopMin = scrollTop + (viewportOffsetTop || 0);

        if (positionTopMin <= offsetTop) {
            this.updateState('top', null, null);
            return;
        }

        if (positionTopMin > this.getPositionTopMax()) {
            if (this.state.affixed === 'bottom') {
                this.updateStateAtBottom();
            } else {
                // 设置位置远离“fixed”可以更改affix的偏移父对象，所以我们不能在更新其位置之后计算正确的位置。
                this.setState({
                    affixed: 'bottom',
                    position: 'absolute',
                    top: null
                }, () => {
                    if (!this._isMounted) {
                        return;
                    }

                    this.updateStateAtBottom();
                });
            }
            return;
        }

        this.updateState('affix', 'fixed', viewportOffsetTop);
    }

    getPositionTopMax() {
        const documentHeight = getDocumentHeight(ownerDocument(this));
        const height = getHeight(ReactDOM.findDOMNode(this));

        return documentHeight - height - this.props.offsetBottom;
    }

    updateState(affixed, position, top) {
        if (
            affixed === this.state.affixed &&
			position === this.state.position &&
			top === this.state.top
        ) {
            return;
        }

        let upperName = affixed === 'affix'
            ? '' : affixed.charAt(0).toUpperCase() + affixed.substr(1);

        if (this.props['onAffix' + upperName]) {
            this.props['onAffix' + upperName]();
        }

        this.setState({affixed, position, top}, () => {
            if (this.props['onAffixed' + upperName]) {
                this.props['onAffixed' + upperName]();
            }
        });
    }

    // 在底部时的更新函数
    updateStateAtBottom() {
        const positionTopMax = this.getPositionTopMax();
        const offsetParent = getOffsetParent(ReactDOM.findDOMNode(this));
        const parentTop = getOffset(offsetParent).top;

        this.updateState('bottom', 'absolute', positionTopMax - parentTop);
    }

    render() {
        const child = React.Children.only(this.props.children);
        const {className, style} = child.props;

        const {affixed, position, top} = this.state;
        const positionStyle = {position, top};

        let affixClassName;
        let affixStyle;
        if (affixed === 'top') {
            affixClassName = this.props.topClassName;
            affixStyle = this.props.topStyle;
        } else if (affixed === 'bottom') {
            affixClassName = this.props.bottomClassName;
            affixStyle = this.props.bottomStyle;
        } else {
            affixClassName = this.props.affixClassName;
            affixStyle = this.props.affixStyle;
        }

        return React.cloneElement(child, {
            className: classNames(affixClassName, className),
            style: {...positionStyle, ...affixStyle, ...style}
        });
    }
}

Affix.propTypes = propTypes;

Affix.defaultProps = defaultProps;

export default Affix;
