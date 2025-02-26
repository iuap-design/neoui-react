/**
 * This source code is quoted from rc-slider.
 * homepage: https://github.com/react-component/slider
 */
// import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';
import createSlider from './common/createSlider';
import Track from './common/Track';
import * as utils from './utils';
import type {SliderProps, SliderState} from './iSlider'

class Slider extends React.Component<SliderProps, SliderState> {
    /* static propTypes = {
	    ...sliderPropTypes,
	    defaultValue: PropTypes.number,
	    value: PropTypes.number,
	    disabled: PropTypes.bool,
	}; */
    calcValueByPos(_value: number) {
        return 0;
    }
    calcOffset(_value: number) {
        return 0;
    }
    saveHandle(_index: number, _h: any) {}
    removeDocumentEvents() {}

	startValue?: number;
	startPosition?: number;

	constructor(props: SliderProps) {
	    super(props);

	    const defaultValue = props.defaultValue !== undefined ?
	        props.defaultValue : props.min;
	    const value = props.value !== undefined ?
	        props.value : defaultValue;

	    this.state = {
	        value: this.trimAlignValue(value),
	        dragging: false,
	    };

	    // @ts-ignore Node环境变量
	    if (process.env.NODE_ENV !== 'production') {
	        warning(
	            !('minimumTrackStyle' in props),
	            'minimumTrackStyle will be deprecate, please use trackStyle instead.'
	        );
	        warning(
	            !('maximumTrackStyle' in props),
	            'maximumTrackStyle will be deprecate, please use railStyle instead.'
	        );
	    }
	}

	// eslint-disable-next-line
	UNSAFE_componentWillReceiveProps(nextProps: SliderProps) {
	    // 只有改变value或者min或者max的时候才会再次渲染
	    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

	    const prevValue = this.state.value;
	    const value = nextProps.value !== undefined ?
	        nextProps.value : prevValue;
	    const nextValue = this.trimAlignValue(value, nextProps);
	    if (nextValue === prevValue) return;

	    this.setState({value: nextValue});
	    if (utils.isValueOutOfRange(value, nextProps)) {
	        this.props.onChange?.(nextValue);
	    }
	}

	onChange(state: { value: number }) {
	    const props = this.props;
	    const isNotControlled = !('value' in props);
	    if (isNotControlled) {
	        this.setState(state);
	    }
	    // console.log("改变之后的："+state.value);
	    const changedValue = state.value;
	    props.onChange?.(changedValue);
	}

	onStart(position: number) {
	    // position = getMousePosition 或者 handlePosition
	    // 1.getValue:return this.state.value
	    // 2.onBeforeChange:输出开始变化之前的状态
	    // 3.calcValueByPos：这个是在createSlider.jsx，超级多的方法混合在一起
	    // 3.1 getSliderStart:slider的top或者left（主持或者水平）， pixelOffset = position - this.getSliderStart()得到mouseposition 或者 handlePosition - slider的top（或者left）
	    // 3.2 this.calcValue(pixelOffset)：目的得到value，跟ratio有关
	    // 3.3 this.trimAlignValue(this.calcValue(pixelOffset)):在slider.jsx中1.ensureValueInRange 先算出是否可取 v 或者 min 或者 max 2.ensureValuePrecision：来获取真的前进数值closest数值
	    // 4.onChange：得到改变之后的值，setState{value}的值并且调用props.onChange
	    this.setState({dragging: true});
	    const props = this.props;
	    const prevValue = this.getValue();

	    props.onBeforeChange?.(prevValue);

	    const value = this.calcValueByPos(position);
	    this.startValue = value;
	    this.startPosition = position;

	    if (value === prevValue) return;

	    this.onChange({value});
	}

	onEnd = () => {
	    this.setState({dragging: false});
	    this.removeDocumentEvents();
	    this.props.onAfterChange?.(this.getValue());
	}

	onMove(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, position: number) {
	    utils.pauseEvent(e);
	    const {value: oldValue} = this.state;
	    const value = this.calcValueByPos(position);
	    if (value === oldValue) return;
	    this.onChange({value});
	}

	onKeyboard(e: React.KeyboardEvent<HTMLDivElement>) {
	    const valueMutator = utils.getKeyboardValueMutator(e);

	    if (valueMutator) {
	        utils.pauseEvent(e);
	        const state = this.state;
	        const oldValue = state.value;
	        const mutatedValue = valueMutator(oldValue, this.props);
	        const value = this.trimAlignValue(mutatedValue);
	        if (value === oldValue) return;

	        this.onChange({value});
	    }
	}

	getValue() {
	    return this.state.value;
	}

	getLowerBound() {
	    return this.props.min;
	}

	getUpperBound() {
	    return this.state.value;
	}

	trimAlignValue(v: number, nextProps: Partial<SliderProps> = {}) {
	    const mergedProps = {...this.props, ...nextProps};
	    const val = utils.ensureValueInRange(v, mergedProps);
	    return utils.ensureValuePrecision(val, mergedProps);
	}

	clearSliderValue() {
	    this.setState({
	        value: 0
	    })
	    this.onChange({value: 0});
	    this.props.onAfterChange?.(0);
	}

	render() {
	    const {
	        prefixCls,
	        vertical,
	        included,
	        disabled,
	        minimumTrackStyle,
	        trackStyle,
	        handleStyle,
	        min,
	        max,
	        reverse,
	        handle: handleGenerator,
	        fieldid,
	        dir: direction
	    } = this.props;
	    const {value, dragging} = this.state;
	    const offset = this.calcOffset(value);// 按照百分制
	    // hanleGenerator:进入的是createSlider.jsx的 handle({ index, ...restProps })
	    // {delete restProps.dragging; return <Handle {...restProps} key={index} />;},
	    const handle = handleGenerator({
	        className: `${prefixCls}-handle`,
	        vertical,
	        offset,
	        value,
	        dragging,
	        disabled,
	        dir: direction,
	        min,
	        max,
	        reverse,
	        fieldid,
	        style: (handleStyle as React.CSSProperties[])[0] || handleStyle,
	        ref: h => this.saveHandle(0, h), // 当 WrappedComponent 被渲染后，ref 上的回调函数将会执行
	    });

	    const _trackStyle = (trackStyle as React.CSSProperties[])[0] || trackStyle;
	    const track = (
	        <Track
	            className={`${prefixCls}-track`}
	            vertical={vertical}
	            reverse={reverse}
	            included={included}
	            offset={0}
	            length={offset}
	            fieldid={fieldid}
	            dir={direction}
	            style={{
	                ...minimumTrackStyle,
	                ..._trackStyle,
	            }}
	        />
	    );

	    return {tracks: track, handles: handle} as unknown as React.ReactNode;
	}
}

export default createSlider(Slider);
