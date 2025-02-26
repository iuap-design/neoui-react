import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {getNid, WebUI} from "../../wui-core/src/index"
import DefaultEmptyImg from './defaultEmpty';
import {WithConfigConsumer} from "../../wui-provider/src/context";
import {getLangInfo} from "../../wui-locale/src/tool";
import i18n from './i18n';
import {EmptyProps} from './iEmpty';
import {prefix} from "../../wui-core/src/index";
import { Locale } from '../../wui-locale/src/iLocale';

// const propTypes = {
//     description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     imageStyle: PropTypes.object,
//     fieldid: PropTypes.string,
//     locale: PropTypes.string,
// }
const defaultProps = {
    clsPrefix: "u-empty",
    image: <DefaultEmptyImg className={`${prefix}-empty-no-data`} />,
    description: undefined,
    locale: "zh-cn",
    imageStyle: {}
}
@WithConfigConsumer()
@WebUI({name: "empty", defaultProps})
class Empty extends Component<EmptyProps> {
    static defaultProps = defaultProps;
    emptyClassMapFc = (local: {lang: Locale | string, langMap: Record<string, any>}): Map<any, string> => new Map([
        ["not-found", local.langMap.noFound],
        ["no-visualize-data", local.langMap.noDataImg],
        ["no-collect", local.langMap.noCollectImg],
        ["no-data", local.langMap.noDataImg],
        ["no-search", local.langMap.noSearchImg],
        ["no-network", local.langMap.noNetworkImg],
        ["no-data-easy", local.langMap.noDataImg],
    ])
    render() {
        const {
            clsPrefix,
            description,
            image,
            imageStyle,
            children,
            fieldid,
            className,
            locale
        } = this.props;
	    let local = getLangInfo(locale, i18n, 'empty');
        const alt = typeof description === 'string' ? description : 'empty';
        const emptyClassMap = this.emptyClassMapFc(local);
        const imageNode = typeof image === 'string' ? emptyClassMap.get(image) ? <DefaultEmptyImg fieldid={fieldid ? `${fieldid}_${image}` : undefined} className={`${clsPrefix}-${image}`}></DefaultEmptyImg>
            : <img fieldid={fieldid ? `${fieldid}_empty_img` : undefined} alt={alt} src={image}/> : image;
        let adapterNid = getNid(this.props) // 适配nid、uitype
        return (
            <div role="emnpty" fieldid={fieldid ? `${fieldid}_empty` : undefined} className={classNames(`${clsPrefix}`, {[`${clsPrefix}-easy`]: image === 'no-data-easy'}, className)} {...adapterNid}>
                <div className={`${clsPrefix}-image`} style={imageStyle}>
                    {imageNode}
                </div>
                {description !== "" && description !== null && <div fieldid={fieldid ? `${fieldid}_empty_data` : undefined} className={`${clsPrefix}-description`}>{description || emptyClassMap.get(image) || local.langMap.noDataImg}</div>}
                {children && <div fieldid={fieldid ? `${fieldid}_empty_footer` : undefined} className={`${clsPrefix}-footer`}>{children}</div>}
            </div>
        )
    }
}
// Empty.propTypes = propTypes;
export default Empty;
