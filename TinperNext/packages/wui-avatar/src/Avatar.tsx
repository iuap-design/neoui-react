import classNames from 'classnames';
// import PropTypes from 'prop-types';
import ResizeObserver from 'rc-resize-observer';
import {composeRef} from 'rc-util/lib/ref';
import * as React from 'react';
import {responsiveArray, responsiveObserve, ScreenMap, Breakpoint} from "../../wui-core/src/LayoutUtils";
import {ConfigContext} from "../../wui-provider/src/context";
import SizeContext from './SizeContext';
import { AvatarProps } from './iAvatar';
import { getChildrenText, getNid } from '../../wui-core/src';

// const propTypes = {
//     shape: PropTypes.oneOf(['circle', 'square']),
//     size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'small', 'default']), PropTypes.number]),
//     gap: PropTypes.number,
//     src: PropTypes.node,
//     srcSet: PropTypes.string,
//     draggable: PropTypes.bool,
//     icon: PropTypes.element,
//     style: PropTypes.object,
//     prefixCls: PropTypes.string,
//     className: PropTypes.string,
//     children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
//     alt: PropTypes.string,
//     onError: PropTypes.func,
//     fieldid: PropTypes.string,
// }

const InternalAvatar: React.ForwardRefRenderFunction<HTMLElement, AvatarProps> = (props, ref) => {
    const groupSize = React.useContext(SizeContext);

    const [scale, setScale] = React.useState(1);
    const [mounted, setMounted] = React.useState(false);
    const [isImgExist, setIsImgExist] = React.useState(true);
    const [screens, setScreens] = React.useState<ScreenMap>({});

    const avatarNodeRef = React.useRef<HTMLElement>(null);
    const avatarChildrenRef = React.useRef<HTMLElement>();

    const avatarNodeMergeRef = composeRef(ref, avatarNodeRef);

    const {getPrefixCls} = React.useContext(ConfigContext);

    const setScaleParam = () => {
        if (!avatarChildrenRef.current || !avatarNodeRef.current) {
            return;
        }
        const childrenWidth = avatarChildrenRef.current.offsetWidth; // offsetWidth avoid affecting be transform scale
        const nodeWidth = avatarNodeRef.current.offsetWidth;
        // denominator is 0 is no meaning
        if (childrenWidth !== 0 && nodeWidth !== 0) {
            const {gap = 4} = props;
            if (gap * 2 < nodeWidth) {
                setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
            }
        }
    };

    React.useEffect(() => {
        setMounted(true);
        const token = responsiveObserve.subscribe((supportScreens: React.SetStateAction<ScreenMap>) => {
            setScreens(supportScreens);
        });

        return () => responsiveObserve.unsubscribe(token);
    }, []);

    React.useEffect(() => {
        setIsImgExist(true);
        setScale(1);
    }, [props.src]);

    React.useEffect(() => {
        setScaleParam();
    }, [props.gap]);

    const handleImgLoadError = () => {
        const {onError} = props;
        const errorFlag = onError ? onError() : undefined;
        if (errorFlag !== false) {
            setIsImgExist(false);
        }
    };

    const {
        shape,
        size: customSize,
        src,
        srcSet,
        icon,
        className,
        alt,
        draggable,
        children,
        ...others
    } = props;

    const size = customSize === 'default' ? groupSize : customSize;

    const responsiveSizeStyle: React.CSSProperties = React.useMemo(() => {
        if (typeof size !== 'object') {
            return {};
        }
        const currentBreakpoint: Breakpoint = responsiveArray.find((screen: Breakpoint) => screens[screen])!;
        const currentSize = size[currentBreakpoint];

        return currentSize
            ? {
                width: currentSize,
                height: currentSize,
                lineHeight: `${currentSize}px`,
                fontSize: icon ? currentSize / 2 : 18,
            }
            : {};
    }, [screens, size]);

    const prefixCls = getPrefixCls('avatar');

    const sizeCls = classNames({
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
    });

    const hasImageElement = React.isValidElement(src);

    const classString = classNames(
        prefixCls,
        sizeCls,
        {
            [`${prefixCls}-${shape}`]: !!shape,
            [`${prefixCls}-image`]: hasImageElement || (src && isImgExist),
            [`${prefixCls}-icon`]: !!icon,
        },
        className,
    );

    const sizeStyle =
		typeof size === 'number'
		    ? {
		        width: size,
		        height: size,
		        lineHeight: `${size}px`,
		        fontSize: icon ? size / 2 : 18,
		    }
		    : {};

    let childrenToRender;
    if (typeof src === 'string' && isImgExist) {
        childrenToRender = (
            <img src={src} draggable={draggable} srcSet={srcSet} onError={handleImgLoadError} alt={getChildrenText(alt).join('')}/>
        );
    } else if (hasImageElement) {
        childrenToRender = src;
    } else if (icon) {
        childrenToRender = icon;
    } else if (mounted || scale !== 1) {
        const transformString = `scale(${scale}) translateX(-50%)`;
        const childrenStyle = {
            msTransform: transformString,
            WebkitTransform: transformString,
            transform: transformString,
        };

        const sizeChildrenStyle: React.CSSProperties =
			typeof size === 'number'
			    ? {
			        lineHeight: `${size}px`,
			    }
			    : {};

        childrenToRender = (
            <ResizeObserver onResize={setScaleParam}>
                <span
                    className={`${prefixCls}-string`}
                    ref={(node: HTMLElement) => {
                        avatarChildrenRef.current = node;
                    }}
                    style={{...sizeChildrenStyle, ...childrenStyle}}
                >
                    {children}
                </span>
            </ResizeObserver>
        );
    } else {
        childrenToRender = (
            <span
                className={`${prefixCls}-string`}
                style={{opacity: 0}}
                ref={(node: HTMLElement) => {
                    avatarChildrenRef.current = node;
                }}
            >
                {children}
            </span>
        );
    }

    // The event is triggered twice from bubbling up the DOM tree.
    // see https://codesandbox.io/s/kind-snow-9lidz
    delete others.onError;
    delete others.gap;
    let adapterNid = getNid(props)

    return (
        <span
            {...others}
            style={{...sizeStyle, ...responsiveSizeStyle, ...others.style}}
            className={classString}
            ref={avatarNodeMergeRef}
            tabIndex={0}
            {...adapterNid}
        >
            {childrenToRender}
        </span>
    );
};

const Avatar = React.forwardRef<HTMLElement, AvatarProps>(InternalAvatar);
Avatar.displayName = 'Avatar';

Avatar.defaultProps = {
    shape: 'circle',
    size: 'default',
};


export default Avatar;
