/**
 * This source code is quoted from rc-slider.
 * homepage: https://github.com/react-component/slider
 */
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';
import {addEventListener, prefix, getNid} from "../../../wui-core/src/index"
import ResizeObserver from 'resize-observer-polyfill';
import Icon from '../../../wui-icon/src';
import Handle from '../Handle';
import * as utils from '../utils';
// import addEventListener from './addEventListener';
import Marks from './Marks';
import Steps from './Steps';
import type { GenericSliderProps, GenericSliderState, GenericSlider, FieldidClearProps, HandleProps, AddEventListenerType} from '../iSlider';

function noop() {
}

/* export const sliderPropTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    marks: PropTypes.object,
    included: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.any,
    onBeforeChange: PropTypes.func,
    onChange: PropTypes.func,
    onAfterChange: PropTypes.func,
    handle: PropTypes.func,
    dots: PropTypes.bool,
    vertical: PropTypes.bool,
    reverse: PropTypes.bool,
    allowClear: PropTypes.bool,
    style: PropTypes.object,
    handleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    trackStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    // minimumTrackStyle: PropTypes.object, // just for compatibility, will be deperecate
    // maximumTrackStyle: PropTypes.object, // just for compatibility, will be deperecate
    railStyle: PropTypes.object,
    dotStyle: PropTypes.object,
    activeDotStyle: PropTypes.object,
    tooltipVisible: PropTypes.bool,
    tooltipPlacement: PropTypes.string,
    getTooltipPopupContainer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
} */

export default function createSlider<
Props extends GenericSliderProps,
State extends GenericSliderState
>(Component: GenericSlider<Props, State>): React.ComponentClass<Props, State> {
    return class ComponentEnhancer extends Component {
		// 这里是超级关键的：采用高阶组件的写法
		static displayName = `ComponentEnhancer(${Component.displayName})`;

		/* static propTypes = {
		    ...Component.propTypes,
		    ...sliderPropTypes
		}; */
		static defaultProps = {
		    ...Component.defaultProps!,
		    prefixCls: `${prefix}-slider`,
		    className: '',
		    min: 0,
		    max: 100,
		    step: 1,
		    marks: {},
		    handle({index, ...restProps}: HandleProps) {
		        delete restProps.dragging;
		        return <Handle {...restProps} key={index}/>;
		    },
		    onBeforeChange: noop,
		    onChange: noop,
		    onAfterChange: noop,
		    included: true,
		    disabled: false,
		    dots: false,
		    vertical: false,
		    reverse: false,
		    allowClear: false,
		    trackStyle: [{}],
		    handleStyle: [{}],
		    railStyle: {},
		    dotStyle: {},
		    activeDotStyle: {},
		};

		handlesRefs: {[key: string]: HTMLDivElement};

		sliderRef?: HTMLDivElement;

		document?: Document;

		dragOffset!: number;

		onTouchMoveListener!: AddEventListenerType;

		onTouchUpListener!: AddEventListenerType;

		onMouseMoveListener!: AddEventListenerType;

		onMouseUpListener!: AddEventListenerType;

		onMouseLeaveListener!: AddEventListenerType;
		sliderResizeObserver!: ResizeObserver;

		constructor(props: Props) {
		    super(props);

		    // @ts-ignore Node环境变量
		    if (process.env.NODE_ENV !== 'production') {
		        const {step, max, min} = props;
		        warning(
		            step && Math.floor(step) === step ? (max - min) % step === 0 : true,
		            'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)',
		            max - min,
		            step
		        );
		    }
		    this.handlesRefs = {};
		}

		componentDidMount() {
		    if (this.sliderRef) {
		        this.sliderResizeObserver = new ResizeObserver(() => {
		            this.getZoom();
		        });
		        this.sliderResizeObserver.observe(this.sliderRef);
		    }
		}

		componentWillUnmount() {
		    if (super.componentWillUnmount) super.componentWillUnmount();
		    this.removeDocumentEvents();
		    if (this.sliderResizeObserver) {
		        this.sliderResizeObserver.disconnect();
		    }
		}

		getZoom = () => {
		    let winodwThis;
		    try {
		        winodwThis = window; //  兼容 window globalThis（window 兼容IE）
		    } catch (error) {
		        winodwThis = globalThis;
		    }
		    if ((winodwThis as any).jDiwork) {
		        (winodwThis as any).jDiwork.getContext((data: any) => {
		            this.setState({
		                zoom: data._SCALE
		            })
		        })
		    }
		}

		onMouseDown = (e: React.MouseEvent) => {
		    // 鼠标落下的操作
		    // 指示当事件被触发时哪个鼠标按键被点击
		    // 参数  描述
		    // 0     规定鼠标左键。
		    // 1     规定鼠标中键。
		    // 2     规定鼠标右键。
		    if (e.button !== 0) {
		        return;
		    }
		    // 1.getMousePosition：获得鼠标的位置 clientY或者pageX
		    // 2.isEventFromHandle：是直接落下还是拖动handle
		    // 3.getHandleCenterPosition:获得handle的中点位置
		    // 4.onStart：在slider.jsx中
		    const isVertical = this.props.vertical;
		    let position = utils.getMousePosition(isVertical, e, this.state.zoom as number);
		    if (!utils.isEventFromHandle(e, this.handlesRefs)) {
		        this.dragOffset = 0;
		    } else {
		        const handlePosition = utils.getHandleCenterPosition(isVertical, e.target as HTMLElement);// handle的位置
		        this.dragOffset = position - handlePosition;// 鼠标落下的位置-handle的中间位置，这是偏差
		        position = handlePosition;// position是
		    }
		    this.onStart(position);
		    this.addDocumentMouseEvents();
		    utils.pauseEvent(e);
		}

		onTouchStart = (e: React.TouchEvent) => {
		    // touch事件
		    // event.touches，多点触碰时的位置数组，比如缩放手势必须要用两指的触摸点，就是一个数组
		    // 多点触碰不算
		    if (utils.isNotTouchEvent(e)) return;
		    // 1.getMousePosition：获得鼠标的位置 clientY或者pageX
		    // 2.isEventFromHandle：是直接落下还是拖动handle
		    // 3.getHandleCenterPosition:获得handle的中点位置
		    // 4.onStart：在slider.jsx中
		    const isVertical = this.props.vertical;
		    let position = utils.getTouchPosition(isVertical, e);
		    if (!utils.isEventFromHandle(e, this.handlesRefs)) {
		        this.dragOffset = 0;
		    } else {
		        const handlePosition = utils.getHandleCenterPosition(isVertical, e.target as HTMLElement);
		        this.dragOffset = position - handlePosition;
		        position = handlePosition;
		    }
		    this.onStart(position);
		    this.addDocumentTouchEvents();
		    utils.pauseEvent(e);
		}

		onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		    if (!this.sliderRef) {
		        this.onEnd();
		        return;
		    }
		    const position = utils.getMousePosition(this.props.vertical, e, this.state.zoom as number);
		    this.onMove(e, position - this.dragOffset);
		}

		onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		    // 1.isNotTouchEvent：是不是touch事件
		    // 2.getTouchPosition：return vertical ? e.touches[0].clientY : e.touches[0].pageX;
		    if (utils.isNotTouchEvent(e) || !this.sliderRef) {
		        this.onEnd();
		        return;
		    }
		    const position = utils.getTouchPosition(this.props.vertical, e);
		    this.onMove(e, position - this.dragOffset);
		}

		onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		    // 对应不同的keycode
		    if (this.sliderRef && utils.isEventFromHandle(e, this.handlesRefs)) {
		        this.onKeyboard(e);
		    }
		}

		onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
		    // Focus事件
		    // 1.isEventFromHandle：是直接落下还是拖动handle
		    // 2.getHandleCenterPosition:获得handle的中点位置
		    // 3.onStart：在slider.jsx中
		    const isVertical = this.props.vertical;

		    if (utils.isEventFromHandle(e, this.handlesRefs)) {
		        const handlePosition = utils.getHandleCenterPosition(isVertical, e.target);

		        this.dragOffset = 0;
		        this.onStart(handlePosition);
		        utils.pauseEvent(e);
		    }
		}

		onBlur = (_e: React.FocusEvent<HTMLDivElement>) => {
		    this.onEnd();
		};

		addDocumentTouchEvents() {
		    // just work for Chrome iOS Safari and Android Browser
		    this.onTouchMoveListener = addEventListener(document, 'touchmove', this.onTouchMove);
		    this.onTouchUpListener = addEventListener(document, 'touchend', this.onEnd);
		}

		addDocumentMouseEvents() {
		    this.onMouseMoveListener = addEventListener(document, 'mousemove', this.onMouseMove);
		    this.onMouseUpListener = addEventListener(document, 'mouseup', this.onEnd);
		    this.onMouseLeaveListener = addEventListener(document, 'mouseleave', this.leave); // iframe嵌套的情况，脱离iframe后onmousedown依然生效bug修复（更多设置-->图片设置）
		}

		removeDocumentEvents() {
		    /* eslint-disable no-unused-expressions */
		    this.onTouchMoveListener && this.onTouchMoveListener.remove();
		    this.onTouchUpListener && this.onTouchUpListener.remove();

		    this.onMouseMoveListener && this.onMouseMoveListener.remove();
		    this.onMouseUpListener && this.onMouseUpListener.remove();
		    this.onMouseLeaveListener && this.onMouseLeaveListener.remove();
		    /* eslint-enable no-unused-expressions */
		}

		leave = (_e: React.MouseEvent) => {
		    this.onEnd();
		}


		// slider的开始位置
		getSliderStart() {
		    const slider = this.sliderRef as HTMLDivElement;
		    const rect = slider.getBoundingClientRect();
		    const {dir: direction} = this.props;
		    return this.props.vertical ? (this.props.reverse ? rect.bottom : rect.top) : (this.props.reverse ? (direction === "rtl" ? rect.left : rect.right) : (direction === "rtl" ? rect.right : rect.left));
		}

		// slider的高度
		getSliderLength() {
		    const slider = this.sliderRef;
		    if (!slider) {
		        return 0;
		    }

		    const coords = slider.getBoundingClientRect();
		    return this.props.vertical ? coords.height : coords.width;
		}

		// 计算实际的value值
		calcValue(offset: number) {
		    const {vertical, min, max} = this.props;
		    const ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
		    const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
		    return value;
		}

		// 这里才是最终的value
		calcValueByPos(position: number) {
		    // mouseposition 或者 handlePosition - slider的top（或者left）；
		    const pixelOffset = this.props.reverse ? this.getSliderStart() - position : position - this.getSliderStart();
		    // calValue()：radio来算出真正的value
		    // trimAlignValue()：在slider.jsx中1.ensureValueInRange 先算出是否可取 v 或者 min 或者 max 2.ensureValuePrecision：来获取真的前进数值closest数值
		    const nextValue = this.trimAlignValue(this.calcValue(this.props.dir === 'rtl' ? -pixelOffset : pixelOffset));
		    return nextValue;
		}

		calcOffset(value: number) {
		    const {min, max} = this.props;
		    const ratio = (value - min) / (max - min);
		    return ratio * 100;
		}

		saveSlider = (slider: HTMLDivElement) => {
		    this.sliderRef = slider;
		}

		saveHandle(index: number, handle: HTMLDivElement) {
		    this.handlesRefs[index] = handle;
		}

		clearValue(_e: React.MouseEvent<HTMLDivElement>) {
		    const {disabled} = this.props;
		    if (disabled) return;
		    this.clearSliderValue?.();
		}

		render() {
		    const {
		        prefixCls,
		        className,
		        marks,
		        dots,
		        step,
		        included,
		        disabled,
		        vertical,
		        reverse,
		        min,
		        max,
		        children,
		        // maximumTrackStyle,
		        style,
		        railStyle,
		        dotStyle,
		        allowClear,
		        range,
		        activeDotStyle,
		        dir: direction,
		        fieldid,
		    } = this.props;

		    const {tracks, handles} = super.render() as unknown as {tracks: React.ReactNode, handles: React.ReactNode};

		    const showClear = !!allowClear && !range;

		    const sliderClassName = classNames(prefixCls, {
		        [`${prefixCls}-with-marks`]: Object.keys(marks).length,
		        [`${prefixCls}-disabled`]: disabled,
		        [`${prefixCls}-vertical`]: vertical,
		        [`${prefixCls}-clear`]: showClear,
		        [className]: className,
		    });

		    const sliderWrapperClassName = classNames(
		        `${prefixCls}-wrapper`,
		        {
		            [`${prefixCls}-wrapper-vertical`]: vertical
		        }
		    )

		    const sliderIconClassName = classNames(
		        `${prefixCls}-clear-icon`,
		        {
		            [`${prefixCls}-clear-disabled`]: disabled,
		            [`${prefixCls}-clear-vertical`]: vertical
		        }
		    )
		    const fieldidObj:FieldidClearProps = {}
		    if (fieldid || fieldid === 0) {
		        fieldidObj.rail = `${fieldid}_slider_rail`
		        fieldidObj.clear = `${fieldid}_slider_close`
		    }
		    let adapterNid = getNid(this.props)

		    const sliderDom = (
		        <div
		            ref={this.saveSlider}
		            className={sliderClassName}
		            onTouchStart={disabled ? noop : this.onTouchStart}
		            onMouseDown={disabled ? noop : this.onMouseDown}
		            onKeyDown={disabled ? noop : this.onKeyDown}
		            onFocus={disabled ? noop : this.onFocus}
		            onBlur={disabled ? noop : this.onBlur}
		            style={style}
		            fieldid={fieldid as string}
		            {...adapterNid}
		        >
		            <div
		                className={`${prefixCls}-rail`}
		                fieldid={fieldidObj.rail}
		                style={{
		                    // ...maximumTrackStyle,
		                    ...railStyle,
		                }}
		            />
		            {tracks}
		            <Steps
		                prefixCls={prefixCls}
		                vertical={vertical}
		                reverse={reverse}
		                marks={marks}
		                dots={dots}
		                step={step!}
		                included={included}
		                lowerBound={this.getLowerBound()}
		                upperBound={this.getUpperBound()}
		                max={max}
		                min={min}
		                dir={direction}
		                dotStyle={dotStyle}
		                activeDotStyle={activeDotStyle}
		                fieldid={fieldid}
		            />
		            {handles}
		            <Marks
		                className={`${prefixCls}-mark`}
		                vertical={vertical}
		                reverse={reverse}
		                marks={marks}
		                dir={direction}

		                included={included}
		                lowerBound={this.getLowerBound()}
		                upperBound={this.getUpperBound()}
		                max={max}
		                min={min}
		                fieldid={fieldid}
		            />
		            {children}
		        </div>
		    )

		    if (showClear) {
		        return (<div className={sliderWrapperClassName} {...adapterNid}>
		            {sliderDom}
		            <div className={sliderIconClassName} fieldid={fieldidObj.clear} onClick={e => this.clearValue(e)}><Icon type="uf-close-c"/>
		            </div>
		        </div>)
		    } else {
		        return sliderDom
		    }
		}
    };
}
