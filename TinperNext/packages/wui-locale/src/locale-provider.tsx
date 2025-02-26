// import PropTypes from 'prop-types';
import * as React from 'react';
// import { ValidateMessages } from 'rc-field-form/lib/interface';
import {devWarning} from '../../wui-core/src/warning';
import { LocaleProviderProps } from './iLocale';

// import { ModalLocale, changeConfirmLocale } from '../modal/locale';
// import { TransferLocale as TransferLocaleForEmpty } from '../empty';
// import { PaginationLocale } from '../pagination/Pagination';
// import { TableLocale } from '../table/interface';
// import { PopconfirmLocale } from '../popconfirm';
// import { UploadLocale } from '../upload/interface';
// import { TransferLocale } from '../transfer';
// import { PickerLocale as DatePickerLocale } from '../date-picker/generatePicker';
import LocaleContext from './locale-context';

export const ANT_MARK = 'internalMark';

// export interface Locale {
//   locale: string;
//   Pagination?: PaginationLocale;
//   DatePicker?: DatePickerLocale;
//   TimePicker?: Object;
//   Calendar?: Object;
//   Table?: TableLocale;
//   Modal?: ModalLocale;
//   Popconfirm?: PopconfirmLocale;
//   Transfer?: Partial<TransferLocale>;
//   Select?: Object;
//   Upload?: UploadLocale;
//   Empty?: TransferLocaleForEmpty;
//   global?: Object;
//   PageHeader?: Object;
//   Icon?: Object;
//   Text?: Object;
//   Form?: {
//     optional?: string;
//     defaultValidateMessages: ValidateMessages;
//   };
//   Image?: {
//     preview: string;
//   };
// }
export const Locale = {
    locale: "zh-CN",
}
// export interface LocaleProviderProps {
//   locale: Locale;
//   children?: React.ReactNode;
//   _ANT_MARK__?: string;
// }
// const propTypes = {
//     _ANT_MARK__: PropTypes.string,
//     locale: PropTypes.string
// }

export default class LocaleProvider extends React.Component<Partial<LocaleProviderProps>> {
	static defaultProps = {
	    locale: {},
	};

	// TODO:// modal机制需要了解一下，暂时不处理Modal中confirm中changeConfirmLocale
	constructor(props: LocaleProviderProps) {
	    super(props);
	    // changeConfirmLocale(props.locale && props.locale.Modal);

	    devWarning(
	        props._ANT_MARK__ === ANT_MARK,
	        'LocaleProvider',
	        '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead',
	    );
	}

	componentDidMount() {
	    // changeConfirmLocale(this.props.locale && this.props.locale.Modal);
	}

	componentDidUpdate(prevProps: LocaleProviderProps) {
	    const {locale} = this.props;
	    if (prevProps.locale !== locale) {
	        // changeConfirmLocale(locale && locale.Modal);
	    }
	}

	componentWillUnmount() {
	    // changeConfirmLocale();
	}

	render() {
	    const {locale, children} = this.props;
	    const __locale = typeof locale === 'string' ? {locale} : locale || {}; // fix: [Locale]QDJCJS-23624修复provider多层嵌套时，locale解构错误问题

	    return (
	        <LocaleContext.Provider value={{ ...__locale, exist: true}}>{children}</LocaleContext.Provider>
	    );
	}
}
// LocaleProvider.propTypes = propTypes;
