// import PropTypes from 'prop-types';
import * as React from 'react';
import { LocaleReceiverProps } from './iLocale';
import LocaleContext from './locale-context';
import defaultLocaleData from './zh_CN';

export default class LocaleReceiver extends React.Component<LocaleReceiverProps> {
	static defaultProps = {
	    componentName: 'global',
	};

	static contextType = LocaleContext;

	getLocale() {
	    const {componentName, defaultLocale} = this.props;
	    const locale =
			defaultLocale || defaultLocaleData[componentName || 'global'];
	    const uLocale = this.context;
	    const localeFromContext = componentName && uLocale ? uLocale[componentName] : {};
	    return {
	        ...(typeof locale === 'function' ? locale() : locale),
	        ...(localeFromContext || {}),
	    };
	}

	getLocaleCode() {
	    const uLocale: any = this.context;
	    const localeCode = uLocale && uLocale.locale;
	    // Had use LocaleProvide but didn't set locale
	    if (uLocale && uLocale.exist && !localeCode) {
	        return defaultLocaleData.locale;
	    }
	    return localeCode;
	}

	render() {
	    return this.props.children(this.getLocale(), this.getLocaleCode(), this.context as any);
	}
}
