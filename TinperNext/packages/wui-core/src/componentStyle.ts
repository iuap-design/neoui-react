import {AlignType, BorderType} from './iCore';

const sizeMap = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    xg: 'xg',
    lg: 'lg',
    nm: 'nm', // Input、InputNumber
    xlg: 'xlg', // Modal
    small: 'sm',
    middle: 'md',
    large: 'lg',
    default: 'default' // Badge、Card
};
function setComponentSize(val?: string | number, {defaultIsMd, customSizeMap}: {defaultIsMd?: boolean; customSizeMap?: Partial<typeof sizeMap>} = {defaultIsMd: false, customSizeMap: sizeMap}) {
    const sizMap = customSizeMap || sizeMap;
    if (typeof val === 'number') {
        return val;
    } else {
        if (defaultIsMd && val === 'default') {
            return 'md';
        }
        if (val) {
            return sizMap[val];
        }
        return;
    }
}

// 设置边框、对齐方式
function setComponentClass({clsPrefix, bordered, align, requiredStyle}: {clsPrefix?: string; bordered?: BorderType; align?: AlignType; requiredStyle?: boolean}) {
    return {
        [`${clsPrefix}-align-${align}`]: align && typeof align === 'string',
        [`${clsPrefix}-border-${bordered}`]: bordered && typeof bordered === 'string',
        [`${clsPrefix}-border-none`]: bordered === false,
        [`${clsPrefix}-required-style`]: requiredStyle
    };
}

export {setComponentClass, setComponentSize};
