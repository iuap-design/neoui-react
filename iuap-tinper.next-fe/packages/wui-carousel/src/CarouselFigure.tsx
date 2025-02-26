/**
 * The source code is quoted from antd.
 * homepage: https://github.com/ant-design/ant-design/tree/master/components/carousel
 */
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SlickCarousel from 'react-slick';
import { getNid, WebUI } from "../../wui-core/src/index"
import debounce from './utils.js';
import { CarouselProps, SlickObj } from './iCarousel';
import Icon from '../../wui-icon/src';
import { WithConfigConsumer } from '../../wui-provider/src/context';


// const propTypes = {
//     autoplay: PropTypes.bool,
//     clsPrefix: PropTypes.string,
//     dotPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
//     dots: PropTypes.bool,
//     easing: PropTypes.string,
//     arrows: PropTypes.bool,
//     draggable: PropTypes.bool,
//     effect: PropTypes.oneOf(['scrollx', 'fade']),
//     speed: PropTypes.number,
//     initialSlide: PropTypes.any,
//     vertical: PropTypes.any,
//     fieldid: PropTypes.string,
// };
const defaultProps = {
    autoplay: false,
    dotPosition: 'bottom',
    dots: true,
    easing: 'linear',
    effect: 'scrollx',
    arrows: false,
    draggable: false,
    speed: 500,
};
@WithConfigConsumer()
@WebUI({ name: "carousel", defaultProps })
class CarouselFigure extends Component<CarouselProps> {
    innerSlider: SlickObj | undefined;
    slick: SlickObj | undefined;
    constructor(props: CarouselProps) {
        super(props);
        this.onWindowResized = debounce(this.onWindowResized, 500, {
            leading: false,
        });
    }

    componentDidMount() {
        const { autoplay } = this.props;
        if (autoplay) {
            window.addEventListener('resize', this.onWindowResized);
        }
        // https://github.com/ant-design/ant-design/issues/7191
        this.innerSlider = this.slick && this.slick.innerSlider;
    }

    componentDidUpdate(prevProps: CarouselProps) {
        if (React.Children.count(this.props.children) !== React.Children.count(prevProps.children)) {
            this.goTo(this.props.initialSlide || 0, false);
        }
    }

    componentWillUnmount() {
        const { autoplay } = this.props;
        if (autoplay) {
            window.removeEventListener('resize', this.onWindowResized);
            // (this.onWindowResized).cancel();
        }
    }

    getDotPosition() {
        if (this.props.dotPosition) {
            return this.props.dotPosition;
        }
        if ('vertical' in this.props) {
            return this.props.vertical ? 'right' : 'bottom';
        }
        return 'bottom';
    }

    saveSlick = (node: SlickObj) => {
        this.slick = node;
    };

    onWindowResized = () => {
        // Fix https://github.com/ant-design/ant-design/issues/2550
        const { autoplay } = this.props;
        if (autoplay && this.slick && this.slick.innerSlider && this.slick.innerSlider.autoPlay) {
            this.slick.innerSlider.autoPlay();
        }
    };

    next = () => {
        this.slick && this.slick.slickNext();
    }

    prev = () => {
        this.slick && this.slick.slickPrev();
    }

    goTo(slide: number, dontAnimate = false) {
        this.slick && this.slick.slickGoTo(slide, dontAnimate);
    }

    render() {
        const props = {
            initialSlide: this.props.initialSlide || 0,
            ...this.props,
        };

        const { fieldid, arrows, clsPrefix, prevArrow, nextArrow, dir } = props;
        const dotsClass = 'slick-dots';
        const dotPosition = this.getDotPosition();
        const mergeCls = `${dotsClass} ${dotsClass}-${dotPosition || 'bottom'}`
        props.dotsClass = props.dotsClass ? `${props.dotsClass} ${mergeCls}` : mergeCls;
        props.fade = props.effect === 'fade';
        const className = classNames(props.clsPrefix, {
            [`${props.clsPrefix}-vertical`]: dotPosition === 'left' || dotPosition === 'right',
            // [`${props.clsPrefix}-rtl`]: dir === 'rtl'
        });
        let adapterNid = getNid(this.props) // 适配nid、uitype
        if (arrows && prevArrow === undefined && nextArrow === undefined) {
            props.prevArrow = <span><Icon type="uf-xiangzuo" className={`${clsPrefix}-arrow-prev`} /></span>
            props.nextArrow = <span><Icon type="uf-xiangyou" className={`${clsPrefix}-arrow-next`} /></span>
        }
        delete props.dir;

        return (
            <div className={className} {...adapterNid} fieldid={fieldid}>
                <SlickCarousel ref={this.saveSlick} {...props} rtl={dir === 'rtl'}/>
            </div>
        );
    }
}

// CarouselFigure.propTypes = propTypes;
export default CarouselFigure;
