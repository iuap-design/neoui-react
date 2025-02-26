import { useMemo } from 'react';
import { EllipsisConfig } from '../iTypography';

const supportCss = (key: string, value: string) => {
    if (typeof window !== 'undefined' && window.CSS && window.CSS.supports) {
        if (value) {
            return window.CSS.supports(key, value);
        }
        return window.CSS.supports(key);
    }
    if (typeof document !== 'undefined' && document.createElement) {
        const elem = document.createElement('div');
        elem.setAttribute(`style`, `${key}:${value};`);
        return typeof elem.style[key] !== 'undefined';
    }
    return false;
};

const mutiEllipsisAttr = {
    display: ' -webkit-box',
    '-webkit-line-clamp': 2,
};

const isSupportMuti = () =>
    Object.entries(mutiEllipsisAttr).every(([key, value]) => supportCss(key, value as string));

function useCssEllipsis(props: EllipsisConfig) {
    const { cssEllipsis, ellipsisStr = '...', suffix, rows } = props;

    const simpleEllipsis = useMemo(() => {
        if (!cssEllipsis || (rows && rows > 1 && !isSupportMuti())) {
            return false;
        }
        return ellipsisStr === '...' && !suffix;
    }, [ellipsisStr, cssEllipsis, rows, suffix]);
    // 单行省略
    const singleRowStyle = {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    };
    // 多行省略
    const mutiRowsStyle = {
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        overflow: 'hidden',
        WebkitLineClamp: `${props.rows}`,
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
    };

    return {
        simpleEllipsis,
        ellipsisStyle: simpleEllipsis ? (props.rows && props.rows > 1 ? mutiRowsStyle : singleRowStyle) : {},
    };
}

export default useCssEllipsis;
