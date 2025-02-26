import PropTypes from 'prop-types';
import React, {Component, ReactNode} from 'react';
import zhCN from './zh_CN';
import {Locale as TypeLocale} from './iLocale';
import { getLangInfo } from './tool';

// const propTypes = {
//     locale: PropTypes.object
// };
const defaultProps = {
    locale: zhCN
};

const childContextTypes = {
    beeLocale: PropTypes.object
};

class Locale extends Component<{locale: TypeLocale; children: ReactNode}> {
    static defaultProps = defaultProps;
    static childContextTypes = childContextTypes;
    static getLangInfo: <T extends Record<string, any>>(localeVal?: string | TypeLocale | undefined, i18n?: TypeLocale, componentName?: string) => { lang: string; langMap: T; };
    getChildContext() {
        return {
            beeLocale: {
                ...this.props.locale,
                exist: true,
            },
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

Locale.defaultProps = defaultProps;
Locale.childContextTypes = childContextTypes;
Locale.getLangInfo = getLangInfo;

export default Locale;
