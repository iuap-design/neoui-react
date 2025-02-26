/**
 * This source code is quoted from rc-steps.
 * homepage: https://github.com/react-component/steps
 */
import classNames from 'classnames';
import React, {Children, cloneElement, MouseEvent, ReactNode} from 'react';
import {findDOMNode} from 'react-dom';
import {WebUI, debounce, getNid} from "../../wui-core/src/index"
import Dropdown from '../../wui-dropdown/src';
import Icon from "../../wui-icon/src";
import Menu from '../../wui-menu/src';
import {isFlexSupported} from './utils';
import {prefix} from "../../wui-core/src/index"
import Step from './Step';
import i18n from './i18n';
import {getLangInfo} from '../../wui-locale/src/tool';
import {WithConfigConsumer} from "../../wui-provider/src/context";
import {setComponentSize} from "../../wui-core/src/componentStyle"
import ResizeObserver from 'resize-observer-polyfill';
import {StepsProps, StepsState, ChangePosition} from './iSteps';
// import events from 'dom-helpers/events';

const {Item} = Menu

// const propTypes = {
//     clsPrefix: PropTypes.string,
//     className: PropTypes.string,
//     iconPrefix: PropTypes.string,
//     direction: PropTypes.string,
//     labelPlacement: PropTypes.string,
//     children: PropTypes.any,
//     status: PropTypes.string,
//     size: PropTypes.string,
//     progressDot: PropTypes.oneOfType([
//         PropTypes.bool,
//         PropTypes.func,
//     ]),
//     style: PropTypes.object,
//     initial: PropTypes.number,
//     current: PropTypes.number,
//     icons: PropTypes.shape({
//         finish: PropTypes.node,
//         error: PropTypes.node,
//     }),
//     onChange: PropTypes.func,
//     more: PropTypes.bool,
//     type: PropTypes.oneOf(['default', 'number', 'dot', 'arrow']),
//     fieldid: PropTypes.string
// };

const defaultProps = {
    iconPrefix: 'u',
    direction: 'horizontal',
    labelPlacement: 'horizontal',
    current: 0,
    initial: 0,
    status: 'process',
    size: 'default',
    progressDot: false,
    className: "",
    style: {},
    icons: undefined,
    more: false,
    type: 'default',
    locale: 'zh-cn',
    fieldid: undefined,
    items: []
};
const typeMap = {
    arrow: 'arrow',
    number: 'number',
    dot: 'dot',
    default: undefined
}

@WithConfigConsumer({name: 'steps'})
@WebUI({name: "steps", defaultProps})
class Steps extends React.Component<StepsProps, StepsState> {
    constructor(props: StepsProps) {
        super(props);
        this.state = {
            flexSupported: true,
            lastStepOffsetWidth: 0,
            menuFrontArr: [],
            menuAfterArr: [],
            activeNum: props.current || -1
        };
        this.calcStepOffsetWidth = debounce(this.calcStepOffsetWidth, 150);

    }

    static Step: typeof Step;

    // eslint-disable-next-line no-undef
    calcTimeout: number | null = null;
    clientWidth!: number;
    itemAllWidth!: number;
    currentFrontWidth!: number;
    currentAfterWidth!: number;
    itemLen!: number;
    transformNum!: number;
    frontNum!: number;
    afterNum!: number;
    itemClientWidth!: number;
    // activeNum!: number;
    stepWrapper: HTMLDivElement | null = null;
    itemWidthArr: number[] = [];
    stepDomArr: HTMLElement[] = [];
    observerObject: any = null; // ResizeObserve对象
    observerWidth: number = -1; // 监听的宽度

    componentDidMount() {
        const {more} = this.props;
        if (more) {
            this.calcOverWith();
            // events.on(window, 'resize', this.calcOverWith); // 浏览器窗口大小变化时重置

            this.domResizeObserver()
        }
        this.calcStepOffsetWidth();
        if (!isFlexSupported()) {
            this.setState({
                flexSupported: false,
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: StepsProps) {
        try {
            if (nextProps.more) {
                let {children, more, items = []} = this.props;
                let propsChildLen = React.Children.toArray(children).length;
                let nextChildLen = React.Children.toArray(nextProps.children).length;
                let propsItemLen = items.length;
                let nextItemLen = nextProps.items?.length;

                if (propsChildLen !== nextChildLen || propsItemLen !== nextItemLen || more !== nextProps.more) { // item条目数量更新时重新计算宽度
                    this.setState({}, () => { // more属性的 Dom结构与原来不一样，需先更新下Dom结构再操作
                        this.calcOverWith();
                        // events.off(window, 'resize', this.calcOverWith);
                        // events.on(window, 'resize', this.calcOverWith); // 浏览器窗口大小变化时重置

                        if (this.observerObject === null) {
                            this.domResizeObserver()
                        }
                    })
                }
            } else {
                if (this.observerObject) {
                    const stepParentDom = findDOMNode(this.stepWrapper)!.parentElement;
                    this.observerObject.disconnect(stepParentDom)
                    this.observerObject = null;
                }
            }
        } catch (e) {}
    }

    componentDidUpdate() {
        this.calcStepOffsetWidth();
    }

    componentWillUnmount() {
        if (this.calcTimeout) {
            clearTimeout(this.calcTimeout);
        }
        if (this.calcStepOffsetWidth && (this.calcStepOffsetWidth as any).cancel) {
            (this.calcStepOffsetWidth as any).cancel();
        }
        // events.off(window, 'resize', this.calcOverWith);
        if (this.observerObject) {
            this.observerObject.disconnect() // 关闭监听宽度
        }
    }

    domResizeObserver = () => {
        try {
            const stepParentDom = findDOMNode(this.stepWrapper)!.parentElement;
            this.observerObject = new ResizeObserver((entries) => {
                // entries 是一个数组 里面有5个属性能用到的只有两个contentRect, target
                // contentRect 是dom的几何信息
                // target 和点击事件里面的target一样的 dom对象
                entries.forEach((item, _index) =>{
                    if (this.observerWidth === -1) { // 初始化宽度
                        this.observerWidth = item.contentRect.width
                    }
                    if (this.observerWidth !== item.contentRect.width) { // 宽度变化时，重新计算
                        this.observerWidth = item.contentRect.width
                        if (this.observerWidth !== 0) { // display: none 时不重新计算
                            this.calcOverWith()
                        }
                    }
                    // console.log('item.enyries', item.contentRect)
                })
            })
            this.observerObject.observe(stepParentDom)
        } catch (e) {}
    }

    calcStepOffsetWidth = () => {
        if (isFlexSupported()) {
            return;
        }
        // Just for IE9
        const domNode = findDOMNode(this) as HTMLElement;
        if (domNode.children.length > 0) {
            if (this.calcTimeout) {
                clearTimeout(this.calcTimeout);
            }
            // @ts-ignore NodeJS.Timeout类型错误忽略
            this.calcTimeout = setTimeout(() => {
                // +1 for fit edge bug of digit width, like 35.4px
                const lastStepOffsetWidth = ((domNode.lastChild as HTMLElement).offsetWidth || 0) + 1;
                // Reduce shake bug
                if (this.state.lastStepOffsetWidth === lastStepOffsetWidth ||
                    Math.abs(this.state.lastStepOffsetWidth - lastStepOffsetWidth) <= 3) {
                    return;
                }
                this.setState({lastStepOffsetWidth});
            });
        }
    }

    updateDomData() { // 更新dom信息
        if (this.props.more && this.props.direction !== "vertical") {
            const {current = 0, type, size} = this.props
            const rootDom = findDOMNode(this) as HTMLElement;
            const stepDom = findDOMNode(this.stepWrapper) as HTMLElement;
            this.clientWidth = rootDom.clientWidth; // 当前可视宽度
            this.stepDomArr = Array.prototype.slice.call(stepDom.children) // step 数组
            this.itemWidthArr = []; // step 长度的数组
            this.itemAllWidth = 0; // step 整体宽度
            this.currentFrontWidth = 0; // 已完成状态宽度
            this.currentAfterWidth = 0; // 未完成状态宽度
            this.itemLen = this.stepDomArr.length;
            for (let i = 0; i < this.itemLen; i++) {
                let itemWidth = this.stepDomArr[i].clientWidth;
                let itemWidthTemp = itemWidth;
                if (type === 'arrow') {
                    const marginRight = setComponentSize(size) === 'sm' ? 18 : 24; // 箭头步骤条marginRight
                    itemWidthTemp += marginRight;
                }
                (i === this.itemLen - 1) && (itemWidthTemp = itemWidth); // 最后一个步骤条没有margin
                this.itemWidthArr.push(itemWidthTemp);
                this.itemAllWidth += itemWidthTemp;
                if (i <= current) {
                    this.currentFrontWidth += itemWidthTemp;
                }

                if (i >= current) {
                    this.currentAfterWidth += itemWidthTemp;
                }
            }
        }
    }

    isOverWidth() { // 判断有没有超出屏幕范围， 没有超出的话step全部显示
        if (this.clientWidth >= this.itemAllWidth) {
            // this.frontNum = 0;
            // this.afterNum = this.itemLen;
            // this.transformNum = 0;
            // this.setState({
            //     menuAfterArr: [],
            //     menuFrontArr: []
            // })
            this.resetState()
            return false;
        }
        return true
    }

    resetState = () => {
        this.frontNum = 0;
        this.afterNum = this.itemLen;
        this.transformNum = 0;
        this.setState({
            menuAfterArr: [],
            menuFrontArr: []
        })
    }

    calcOverWith() { // 初始化计算显示
        if (this.props.more && this.props.direction !== "vertical") {
            this.updateDomData();
            const {clientWidth, itemAllWidth, currentFrontWidth, currentAfterWidth, itemLen} = this;
            // let { type } = this.props
            if (clientWidth < itemAllWidth) { // 父元素小于子元素之和的宽度
                if (currentFrontWidth <= clientWidth) { // 已完成状态可完全展示
                    this.frontNum = 0;
                    this.setMenuArr('left');
                } else if (currentAfterWidth <= clientWidth) { // 未完成状态可完全展示
                    this.afterNum = itemLen;
                    this.setMenuArr('right');
                } else {
                    this.frontNum = this.props.current!;
                    this.setMenuArr('left');
                }
            } else {
                this.resetState()
                // this.setState({
                //     menuAfterArr: [],
                //     menuFrontArr: []
                // })
            }
            // if (type === 'arrow') {
            //     if (clientWidth < itemAllWidth && (184 * itemLen - 24) > clientWidth) { // 父元素小于子元素之和的宽度
            //         if (currentFrontWidth <= clientWidth) { // 已完成状态可完全展示
            //             this.frontNum = 0;
            //             this.setMenuArr('left');
            //         } else if (currentAfterWidth <= clientWidth) { // 未完成状态可完全展示
            //             this.afterNum = itemLen;
            //             this.setMenuArr('right');
            //         } else {
            //             this.frontNum = this.props.current!;
            //             this.setMenuArr('left');
            //         }
            //     } else {
            //         this.resetState()
            //         // this.setState({
            //         //     menuAfterArr: [],
            //         //     menuFrontArr: []
            //         // })
            //     }
            // } else {
            //     if (clientWidth < itemAllWidth) { // 父元素小于子元素之和的宽度
            //         if (currentFrontWidth <= clientWidth) { // 已完成状态可完全展示
            //             this.frontNum = 0;
            //             this.setMenuArr('left');
            //         } else if (currentAfterWidth <= clientWidth) { // 未完成状态可完全展示
            //             this.afterNum = itemLen;
            //             this.setMenuArr('right');
            //         } else {
            //             this.frontNum = this.props.current!;
            //             this.setMenuArr('left');
            //         }
            //     } else {
            //         this.resetState()
            //         // this.setState({
            //         //     menuAfterArr: [],
            //         //     menuFrontArr: []
            //         // })
            //     }
            // }
        }
    }

    setMenuArr(d: string) {

        if (!this.isOverWidth()) return;

        const {size, type} = this.props;
        let {itemWidthArr, clientWidth, stepDomArr, itemLen} = this
        let num = 0;
        let frontWidth = setComponentSize(size) === 'sm' ? 62 : 54; // front dom 宽度
        let afterWidth = setComponentSize(size) === 'sm' ? 22 : 14; // after dom 宽度
        if (type === 'arrow') { // arrow步骤条front、after dom宽度不同
            const marginRight = setComponentSize(size) === 'sm' ? 18 : 24;
            frontWidth = 160 + marginRight;
            afterWidth = 160;
            this.afterNum = this.afterNum === itemLen - 1 ? itemLen : this.afterNum;
            this.frontNum = this.frontNum === 1 ? 0 : this.frontNum;
        }
        if (type === 'dot') {
            frontWidth = 80;
            afterWidth = 85;
        }
        if (type === 'number') {
            frontWidth = 80;
            afterWidth = 55;
        }
        if (d === 'right') {
            if (this.afterNum === itemLen) {
                clientWidth = clientWidth - frontWidth;
            } else {
                clientWidth = clientWidth - frontWidth - afterWidth;
            }
            for (let i = this.afterNum - 1; i >= 0; i--) { // this.afterNum - 1 获取当前元素索引宽度
                num += itemWidthArr[i];
                if (num >= clientWidth) {
                    this.frontNum = i + 1; // slice 截取的时候会包含第一个，所有 + 1 排除第一个
                    break;
                }
            }
        } else {
            if (this.frontNum === 0) {
                clientWidth = clientWidth - afterWidth;
            } else {
                clientWidth = clientWidth - frontWidth - afterWidth;
            }
            for (let i = this.frontNum; i < itemLen; i++) {
                num += itemWidthArr[i];
                if (num > clientWidth) {
                    this.afterNum = i;
                    break;
                }
            }
        }

        // 设置transform的偏移量和 右 更多按钮偏移量
        this.transformNum = 0;
        this.itemClientWidth = itemWidthArr.slice(this.frontNum, this.afterNum).reduce((t, v) => {
            return t + v
        }, 0); // 添加 reduce initialValue, 避免极值报错
        if (this.frontNum !== 0) {
            this.transformNum = itemWidthArr.slice(0, this.frontNum).reduce((t, v) => {
                return t + v
            }, 0) - frontWidth;
            this.itemClientWidth += frontWidth;
        }

        /* if (this.frontNum === 0) {
          this.transformNum = 0;
          this.itemClientWidth = itemWidthArr.slice(this.frontNum, this.afterNum).reduce((t,v) => {return t + v});
        } else {
          this.transformNum = itemWidthArr.slice(0, this.frontNum).reduce((t,v) => {return t + v}) - frontWidth;
          this.itemClientWidth = itemWidthArr.slice(this.frontNum, this.afterNum).reduce((t,v) => {return t + v}) + frontWidth;
        }*/

        const isValidNode = (node: HTMLElement) => {
            if (node && node.dataset.text) {
                return node.dataset.text
            }
            const titleNode = node.querySelector(`.${prefix}-steps-item-title`);
            return titleNode?.textContent;
        }

        let dropDownAfterArr = stepDomArr.slice(this.afterNum);
        let dropDownFrontArr = stepDomArr.slice(0, this.frontNum);
        let menuAfterArr = (
            dropDownAfterArr.map((item) =>
                item && <Item key={item.dataset.num} data-status={item.dataset.status}>{isValidNode(item)}</Item>
            )
        )
        let menuFrontArr = (
            dropDownFrontArr.map((item) =>
                item && <Item key={item.dataset.num} data-status={item.dataset.status}>{isValidNode(item)}</Item>
            )
        )
        this.setState({
            menuAfterArr,
            menuFrontArr
        })
    }

    dropDownChange = (val: { key: string, domEvent: MouseEvent}, position: ChangePosition) => {
        const {key, domEvent} = val;
        const {onChange} = this.props;
        if (position === 'left') {
            this.frontNum = parseInt(key);
        } else {
            this.afterNum = parseInt(key) + 1;
        }
        this.updateDomData();
        this.setMenuArr(position);
        if (onChange && (domEvent.target as HTMLLIElement).dataset.status !== 'true') { // 判断 step 是否可点击
            this.onStepClick(parseInt(key), position);
        }
    }

    prev = (val: { key: string, domEvent: MouseEvent}) => {
        // const {key} = val;
        // this.frontNum = parseInt(key);
        // this.updateDomData();
        // this.setMenuArr('left');
        this.dropDownChange(val, 'left')
    }

    next = (val: { key: string, domEvent: MouseEvent}) => {
        // const {key} = val;
        // this.afterNum = parseInt(key) + 1;
        // this.updateDomData();
        // this.setMenuArr('right');
        this.dropDownChange(val, 'right')
    }

    onStepClick = (next: number, position: ChangePosition = 'center') => {
        const {onChange, current} = this.props;
        // this.activeNum = next;
        this.setState({
            activeNum: next
        })
        if (onChange && current !== next) {
            onChange(next, position);
        }
    };

    render() {
        const {
            clsPrefix, style = {}, className, children, direction,
            labelPlacement, iconPrefix, status, size, current, progressDot, initial,
            icons, more, onChange, type, locale, items, percent, dir,
            ...restProps
        } = this.props;

        const itemsChildren = items?.map((items, i) => <Step {...items} key={i} />);

        const {lastStepOffsetWidth, flexSupported, activeNum} = this.state;
        const filteredChildren = itemsChildren!.length !== 0 ? React.Children.toArray(itemsChildren).filter(c => !!c) : React.Children.toArray(children).filter(c => !!c);
        const lastIndex = filteredChildren.length - 1;
        const dot = !!progressDot || type === 'dot';
        const typeTemp = dot ? 'dot' : type;
        const adjustedlabelPlacement = dot ? 'vertical' : labelPlacement;
        const classString = classNames(clsPrefix, `${clsPrefix}-${direction}`, `${clsPrefix}-${direction}-${dir}`, className, {
            [`${clsPrefix}-${setComponentSize(size) == 'sm' ? 'small' : ''}`]: setComponentSize(size) == 'default' ? false : setComponentSize(size),
            [`${clsPrefix}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
            [`${clsPrefix}-more`]: more,
            [`${clsPrefix}-${typeTemp}`]: typeTemp && typeMap[typeTemp]
        });
        const localeText = getLangInfo(locale!, i18n, 'steps').langMap.text;

        const stepChild = Children.map(filteredChildren, (child: React.ReactElement, index: number) => {
            if (!child) {
                return null;
            }

            let out = false;
            if (more && (this.afterNum <= index || this.frontNum > index)) {
                out = true;
            }

            const stepNumber = initial! + index;
            const childProps = {
                stepNumber: `${stepNumber + 1}`,
                stepIndex: index,
                active: activeNum === stepNumber,
                clsPrefix,
                iconPrefix,
                wrapperStyle: style,
                progressDot,
                icons,
                more,
                out,
                onStepClick: onChange && this.onStepClick,
                type,
                stepFieldId: this.props.fieldid,
                percent,
                size,
                direction,
                ...child.props,
            };
            if (!flexSupported && direction !== 'vertical' && index !== lastIndex) {
                childProps.itemWidth = `${100 / lastIndex}%`;
                childProps.adjustMarginRight = -Math.round(lastStepOffsetWidth / lastIndex + 1);
            }
            // fix tail color
            if (status === 'error' && index === current! - 1) {
                childProps.className = `${clsPrefix}-next-error`;
            }
            if (!child.props.status) {
                if (stepNumber === current) {
                    childProps.status = status;
                } else if (stepNumber < current!) {
                    childProps.status = 'finish';
                } else {
                    childProps.status = 'wait';
                }
            }
            return cloneElement(child, childProps);
        })
        let adapterNid = getNid(this.props)

        if (more && direction !== 'vertical') {
            const {menuFrontArr, menuAfterArr} = this.state;

            const menu = (menuArr?: ReactNode[], fn?:(v?:{key?: string}) => void) => {
                return (
                    <Menu onClick={fn}>
                        {menuArr}
                    </Menu>
                )
            }

            const frontDropdown = (
                <div className={`${clsPrefix}-more-front-dropdown`}>
                    <Dropdown
                        trigger={['hover']}
                        overlay={menu(menuFrontArr, this.prev)}
                        animation="slide-up"
                    >
	                    <span className={`${clsPrefix}-tab-more-select`}>
	                        <Icon type="uf-gengduo"/>
                            {(type === 'arrow') && (<><span className={`${clsPrefix}-tab-more-select-title`}>{localeText}</span><Icon type="uf-correct-2"/></>)}
	                    </span>
                    </Dropdown>
                    <div className={`${clsPrefix}-more-front-line`}></div>
                </div>
            )

            const afterDropdown = (
                <div className={`${clsPrefix}-more-after-dropdown`} style={{[dir === 'rtl' ? "right" : 'left']: this.itemClientWidth}}>
                    <Dropdown
                        trigger={['hover']}
                        overlay={menu(menuAfterArr, this.next)}
                        animation="slide-up"
                    >
	                    <span className={`${clsPrefix}-tab-more-select`}>
	                        {(type !== 'arrow') && (<Icon type="uf-gengduo"/>)}
                            {(type === 'arrow') && (<div className={`${clsPrefix}-tab-more-select-section`}><Icon type="uf-gengduo"/><span className={`${clsPrefix}-tab-more-select-title`}>{localeText}</span></div>)}
	                    </span>
                    </Dropdown>
                </div>
            )

            return (
                <div className={classString} style={style} {...restProps} {...adapterNid}>
                    {menuFrontArr.length !== 0 && frontDropdown}
                    {menuAfterArr.length !== 0 && afterDropdown}
                    <div className={`${clsPrefix}-step-wrapper`} ref={ref => this.stepWrapper = ref}
                        style={{transform: `translate3d(${dir === 'rtl' ? this.transformNum : -this.transformNum}px,0,0)`}}>
                        {stepChild}
                    </div>
                </div>
            );
        }
        return (
            <div className={classString} style={style} {...restProps} {...adapterNid}>
                {stepChild}
            </div>
        );
    }
}

// Steps.propTypes = propTypes;

export default Steps;
