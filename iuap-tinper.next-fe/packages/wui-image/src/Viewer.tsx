import React, { Component } from 'react';
import ViewerJs from 'viewerjs';
import { ImageProps, ToolbarOptions } from './iImage';
import { getNid, Warning, WebUI } from "../../wui-core/src";
import { OrNull } from '../../wui-core/src/utils/type';
import cx from 'classnames';
import Icon from '../../wui-icon/src';
import i18n from './i18n.js';
import { getLangInfo } from '../../wui-locale/src/tool';
import { WithConfigConsumer } from '../../wui-provider/src/context';

const { isShouldUpdate } = Warning;
// const propTypes = {
//     ready: PropTypes.func,
//     show: PropTypes.func,
//     shown: PropTypes.func,
//     hide: PropTypes.func,
//     hidden: PropTypes.func,
//     view: PropTypes.func,
//     viewed: PropTypes.func,
//     zoom: PropTypes.func,
//     zoomed: PropTypes.func,
//     getPopupContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
//     asyncLoad: PropTypes.bool,
// };
const defaultProps: Partial<ImageProps> = {
    ready: () => {
    },
    show: () => {
    },
    shown: () => {
    },
    hide: () => {
    },
    hidden: () => {
    },
    view: () => {
    },
    viewed: () => {
    },
    zoom: () => {
    },
    zoomed: () => {
    },
    asyncLoad: false,
    toolbar: true,
};
@WithConfigConsumer()
@WebUI({ name: "image", defaultProps })
class Viewer extends Component<ImageProps, { toolbar?: boolean | ToolbarOptions; }> {
    viewerCase?: ViewerJs;
    views: OrNull<HTMLDivElement> = null;
    static defaultProps = defaultProps;
    langMap: Record<string, any>;
    constructor(props: ImageProps) {
        super(props)
        this.langMap = getLangInfo(props.locale, i18n, 'image').langMap;
        this.state = {
            toolbar: {
                prev: { show: true, title: this.langMap.prev },
                prevLeft: { show: true, title: this.langMap.prev },
                number: { show: true },
                next: { show: true, title: this.langMap.next },
                nextRight: { show: true, title: this.langMap.next },
                zoomOut: { show: true, title: this.langMap.zoomOut },
                zoomIn: { show: true, title: this.langMap.zoomIn },
                fullscreen: { show: true, title: this.langMap.fullscreen },
                rotateLeft: { show: props.showAllToolbar || false, title: this.langMap.rotateLeft },
                rotateRight: { show: true, title: this.langMap.rotateRight },
                flipHorizontal: { show: true, title: this.langMap.flipHorizontal },
                flipVertical: { show: props.showAllToolbar || false, title: this.langMap.flipVertical },
                reset: { show: true, title: this.langMap.reset },
                play: { show: true, title: this.langMap.play },
            }
        }
    }

    componentDidMount() {
        if (!this.props.asyncLoad) {
            const { container, getPopupContainer, viewed, toolbar, dir, ...other } = this.props
            let containerDom = getPopupContainer || container
            const className = cx({
                [`viewer-rtl`]: dir === 'rtl',
            }, this.props.className);
            this.viewerCase = new ViewerJs(this.views as HTMLDivElement, {
                url: 'data-original',
                className,
                container: containerDom,
                rtl: dir === 'rtl',
                viewed: (arg) => {
                    if (arg?.detail?.originalImage?.getAttribute('fieldid')) {
                        arg?.detail?.image?.setAttribute('fieldid', arg?.detail?.originalImage?.getAttribute('fieldid') + '_max');
                    }
                    viewed && viewed()
                },
                toolbar: toolbar === true ? this.state.toolbar : toolbar,
                ...other
            })
            this.addHandlers();
        }
    }

    componentDidUpdate() {
        if (this.props.asyncLoad) {
            if (this.viewerCase) {
                this.viewerCase.update()
            } else {
                const { container, getPopupContainer, viewed, toolbar, dir, ...other } = this.props
                let containerDom = getPopupContainer || container
                const className = cx({
                    [`viewer-rtl`]: dir === 'rtl',
                }, this.props.className);
                this.viewerCase = new ViewerJs(this.views as HTMLDivElement, {
                    url: 'data-original',
                    className,
                    container: containerDom,
                    viewed: (arg) => {
                        if (arg?.detail?.originalImage?.getAttribute('fieldid')) {
                            arg?.detail?.image?.setAttribute('fieldid', arg?.detail?.originalImage?.getAttribute('fieldid') + '_max');
                        }
                        viewed && viewed();
                    },
                    toolbar: toolbar === true ? this.state.toolbar : toolbar,
                    ...other
                })
            }
            this.addHandlers();
        }
    }

    componentWillUnmount() {
        this.removeHandlers();
        this.viewerCase?.destroy?.();
    }

    onMouseEnter = (event: MouseEvent) => {
        const {dir} = this.props;
        const mask = this.views?.querySelector(`.${this.props.clsPrefix}-mask`) as HTMLDivElement;
        const image = event.target as HTMLImageElement;
        if (mask) {
            mask.style[dir === 'rtl' ? "right" : "left"] = dir === 'rtl' ? Number(this.views?.offsetWidth) - image.offsetLeft - image.offsetWidth + 'px' : image.offsetLeft + image.offsetWidth / 2 + 'px';
            mask.style.top = image.offsetTop + image.offsetHeight / 2 + 'px';
            mask.style.display = 'block';
        }
    }

    onMouseLeave = () => {
        const mask = this.views?.querySelector(`.${this.props.clsPrefix}-mask`) as HTMLDivElement;
        if (mask) {
            mask.style.display = 'none';
        }
    }

    addHandlers = () => {
        this.views?.querySelectorAll('img')?.forEach((img) => {
            img?.addEventListener('mouseenter', this.onMouseEnter);
            img?.addEventListener('mouseleave', this.onMouseLeave);
        })
    }

    removeHandlers = () => {
        this.views?.querySelectorAll('img')?.forEach((img) => {
            img?.removeEventListener('mouseenter', this.onMouseEnter);
            img?.removeEventListener('mouseleave', this.onMouseLeave);
        })
    }

    render() {
        const {
            getPopupContainer,
            container,
            ready,
            show,
            shown,
            hide,
            hidden,
            view,
            viewed,
            zoom,
            zoomed,
            asyncLoad,
            clsPrefix,
            className,
            inline,
            button,
            title,
            navbar,
            toolbar,
            tooltip,
            movable,
            zoomable,
            rotatable,
            scalable,
            transition,
            fullscreen,
            keyboard,
            interval,
            zoomRatio,
            minZoomRatio,
            maxZoomRatio,
            zIndex,
            zIndexInline,
            url,
            dir,
            ...other
        } = this.props
        isShouldUpdate("Image", this.props);
        let adapterNid = getNid(this.props) // 适配nid、uitype
        const wrapClassNames = cx({
            [`${clsPrefix}`]: true,
            [`${clsPrefix}-rtl`]: dir === 'rtl',
        }, className);
        return (
            <div {...other} className={wrapClassNames} ref={(el) => {
                this.views = el
            }} {...adapterNid}>
                {this.props.children}
                <div className={`${clsPrefix}-mask`}>
                    <Icon type="uf-eye" />
                    <span>{this.langMap.preview}</span>
                </div>
            </div>
        )
    }
}

// Viewer.propTypes = propTypes;
// Viewer.defaultProps = defaultProps;

export default Viewer as React.ComponentClass<Partial<ImageProps>>;
