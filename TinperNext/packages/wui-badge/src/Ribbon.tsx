import classNames from 'classnames';
import * as React from 'react';
import {prefix, getNid} from "../../wui-core/src/index"
import { RibbonProps } from './iBadge';

const isPresetColor = (color?: string) => {
    if (!color) return;
    const presetColor = ['primary', 'success', 'info', 'warning', 'danger', 'dark'];
    return presetColor.indexOf(color) !== -1;
}

const Ribbon: React.FC<RibbonProps> = function Ribbon({
    className,
    style,
    color,
    children,
    text,
    placement = 'end',
    ...other
}: RibbonProps) {
    const prefixCls = `${prefix}-ribbon`;
    const colorInPreset = isPresetColor(color);
    const ribbonCls = classNames(
        prefixCls,
        `${prefixCls}-placement-${placement}`,
        {
            [`${prefixCls}-color-${color}`]: colorInPreset,
        },
        className,
    );
    const colorStyle: React.CSSProperties = {};
    const cornerColorStyle: React.CSSProperties = {};
    if (color && !colorInPreset) {
        colorStyle.background = color;
        cornerColorStyle.color = color;
    }
    let adapterNid = getNid(other) // 适配nid、uitype
    return (
        <div className={`${prefixCls}-wrapper`} {...adapterNid}>
            {children}
            <div className={ribbonCls} style={{ ...colorStyle, ...style }}>
                <span className={`${prefixCls}-text`}>{text}</span>
                <div className={`${prefixCls}-corner`} style={cornerColorStyle} />
            </div>
        </div>
    );
};

export default Ribbon;
