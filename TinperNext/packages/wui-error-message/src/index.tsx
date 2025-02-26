

import React, { useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import omit from 'omit.js';
import {getChildrenText, prefix} from "../../wui-core/src/index"
import Button from '../../wui-button/src';
import Clipboard from '../../wui-clipboard/src';
import Message from '../../wui-message/src';
import Icon from '../../wui-icon/src';
import { ErrorMessageProps } from './iErrorMessage';
import { Color } from '../../wui-notification/src/iNotification';
import { useWindowHeight } from './ErrorMessageHook';
import i18n from './i18n';
import {getLangInfo} from "../../wui-locale/src/tool";
import { globalConfig } from '../../wui-provider/src';
// import { WithConfigConsumer } from '../../wui-provider/src/context';
// import { ConfigContext } from '../../wui-provider/src';

interface ConfigProps {
    top?: number;
    defaultBottom?: number;
    bottom?: number;
    width?: number;
}

const colorMap: { [key: number]: string } = {
    0: 'danger',
    1: 'warning'
}

let timer: any = null;
const debounce = (fn: any, delay = 100) => {
    return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(), delay);
    }
}

/**
 * 错误信息弹框内容
 * @description 包含errorInfo，title，content，footer
 *
 */
const clsPrefix = `${prefix}-error-message`;
const ErrorContent = (props: ErrorMessageProps & ConfigProps) => {
    const {
        title,
        content,
        isCopy,
        defaultShowContent,
        errorInfo = {
            code: '999-999-999'
        },
        traceId,
        isReport,
        level,
        locale = 'zh-cn',
        fieldid,
    } = props;
    const isErrorcode = level === 0;
    const isFooter = level === 0;
    let copyTimer: any = null;
    let reportTimer: any = null;
    const [windowHeight] = useWindowHeight();
    const [show, setShow] = React.useState(defaultShowContent);
    // const [contentWidth, setContentWidth] = React.useState(0);
    const [contentHeight, setContentHeight] = React.useState(560);
    const [copyShow, setCopyShow] = React.useState(false);
    const [copyText, setCopyText] = React.useState('');
    const [successReported, setSuccessReported] = React.useState(false);
    const [reportshow, setReportshow] = React.useState(false);
    const [isReporting, setIsReporting] = React.useState(false);
    const titleRef = useRef(null);
    const local = getLangInfo(locale, i18n, 'pagination');

    const onReportClick = debounce(() => {
        if (props.onReportClick) {
            setIsReporting(true);
            props.onReportClick().then((res: any) => {
                setIsReporting(false);
                setSuccessReported(res?.status ?? false);
                res?.callback && res.callback();
                // 显示提示
                setReportshow(true);
                if (reportTimer) {
                    clearTimeout(reportTimer)
                }
                reportTimer = setTimeout(() => setReportshow(false), 1500);
            }).catch((err) => {
                setIsReporting(false);
                setSuccessReported(false);
                // 显示提示
                setReportshow(true);
                if (reportTimer) {
                    clearTimeout(reportTimer)
                }
                reportTimer = setTimeout(() => setReportshow(false), 1500);
                console.log(err);
            });
        }
    }, 600)

    const hanldeCopy = () => {
        if (copyTimer) {
            clearTimeout(copyTimer)
        }
        setCopyShow(true);
        copyTimer = setTimeout(() => setCopyShow(false), 1500);
    }

    const handleClickErrorCode = useCallback(() => {
        if (errorInfo && errorInfo.href) {
            window.open(errorInfo.href);
        }
    }, [errorInfo]);

    useEffect(() => {
        if (isCopy) {
            const text = getChildrenText(content).join('\n');
            setCopyText(text);
        }
    }, [content, isCopy])

    useEffect(() => {
        if (content && show) {
            const num = (props?.top ?? 180) + (props?.bottom ?? 90) + 130; // 130 为提示头部和底部的高度
            setContentHeight(document.body.clientHeight - num)
        }
    }, [content, show, windowHeight])

    const getFooterDom = useCallback(() => {
        if (!isFooter) {
            return null;
        }
        const defaultFooter = (
            <>
                {traceId
                    ? <div className={`${clsPrefix}-content-footer-traceid`}>
                        {local.langMap.link || '链路ID'}:{traceId}
                        <Clipboard fieldid={fieldid ? `${fieldid}_message_link_copy` : undefined} action="copy" text={traceId} success={hanldeCopy} />
                    </div>
                    : null}
                <div className={classnames(`${clsPrefix}-content-footer-operate`)}>
                    { content
                        ? <Button fieldid={fieldid ? `${fieldid}_message_error_detail` : undefined} className={`${clsPrefix}-btn-show`} ghost type="text" onClick={() => setShow(!show)}>
                            {local.langMap.errorDetails || '错误详情'}
                            { show ? <Icon type="uf-arrow-up" /> : <Icon type="uf-arrow-down" /> }
                        </Button>
                        : null }
                    { isCopy && content ? <Clipboard action="copy" fieldid={fieldid ? `${fieldid}_message_detail_copy` : undefined} text={copyText} success={hanldeCopy}><Button className={`${clsPrefix}-btn-copy`} ghost type="text">{local.langMap.copy || '复制'}</Button></Clipboard> : null }
                    { isReport ? <Button loading={isReporting} fieldid={fieldid ? `${fieldid}_message_report` : undefined} ghost onClick={onReportClick} className={`${clsPrefix}-btn-report`} type="text">{local.langMap.report || '上报'}</Button> : null }
                </div>
            </>
        );
        if ('footer' in props) {
            if (typeof props.footer === 'function') {
                return props.footer(defaultFooter);
            }
            return props.footer;
        }
        return defaultFooter;
    }, [props.footer, isCopy, show, content, isReport, fieldid, traceId, isReporting, onReportClick]);

    const getReportMsgDom = useCallback(() => {
        if (successReported) {
            return <span className="successReport"><Icon type="uf-chenggongtishi" />{local.langMap.reportSuccess ?? '上报成功'}</span>;
        }
        if (!successReported) {
            return <span className="errorReport"><Icon type="uf-exc-c-2" />{local.langMap.reportFail ?? '上报失败'}</span>;
        }
    }, [successReported]);

    const footerDom = getFooterDom();
    const cls = classnames(
        `${clsPrefix}-content`,
        { [`${clsPrefix}-content-no-error`]: !isErrorcode }
    )

    return (
        <div className={cls}>
            { isErrorcode
                ? <div className={classnames(`${clsPrefix}-content-errorcode`, { [`${clsPrefix}-content-errorcode-no-href`]: !errorInfo.href })}>{local.langMap.statuscode || '状态码' }:&nbsp;
                    { errorInfo.href ? <Button fieldid={fieldid ? `${fieldid}_message_errorcode` : undefined} ghost type="text" onClick={handleClickErrorCode}>{errorInfo.code ?? errorInfo.displayCode }</Button> : (errorInfo.code ?? errorInfo.displayCode)}</div>
                : null
            }
            <div ref={titleRef} className={`${clsPrefix}-content-title`} fieldid={fieldid ? `${fieldid}` : undefined}>
                <pre>{title}</pre>
            </div>

            {content ? <div style={{ maxHeight: content && show ? `${contentHeight}px` : 0 }} className={`${clsPrefix}-content-description`}><pre>{content}</pre></div> : null}

            {footerDom ? <div className={classnames(`${clsPrefix}-content-footer`, { [`${clsPrefix}-content-footer-no-traceid`]: !traceId, [`${clsPrefix}-content-no-description`]: !(content && show) })}>{footerDom}</div> : null}
            {copyShow ? <span className="successCopy">{local.langMap.copySuccess || '复制成功'}</span> : null}
            {reportshow ? getReportMsgDom() : null}
        </div>
    );
};

const uploadableMap = {
    0: false,
    1: true
}

// 全局config配置
let configRef: ErrorMessageProps = {
    uploadable: 1,
    defaultShowContent: false,
    isCopy: true
};
// 默认duration
let duration: number | null = null;

// 获取全局的多语对象
const getLocaleProps = () => {
    const globalLocale = globalConfig().getGlobalLocale() || 'zh-cn';
    const localeProps = globalLocale && typeof globalLocale === 'object' ? globalLocale : { locale: globalLocale };
    return localeProps;
}


const ErrorMessage = {
    ...Message,
    create: (props: ErrorMessageProps & ConfigProps) => {
        const localeProps = getLocaleProps();
        const { level = 0, content, detailMsg, title, message, uploadable = configRef.uploadable, isReport, onUploadClick, onReportClick, ...otherProps } = props;
        const extral = {
            content: detailMsg ?? content,
            title: message ?? title,
            isReport: uploadableMap[uploadable as keyof typeof uploadableMap],
            onReportClick: onUploadClick ?? onReportClick
        };
        const omitProps: any = [
            'level',
            'content',
            'detailMsg',
            'title',
            'message',
            'uploadable',
            'isReport',
            'onUploadClick',
            'onReportClick',
            'footer',
            'content',
            'isCopy',
            'showDetail',
        ];
        const params = {...otherProps, ...extral };
        Message.create({
            duration: duration,
            ...omit(params, omitProps),
            content: <ErrorContent {...localeProps} {...configRef} {...params} level={level} />,
            className: classnames(
                params.wrapperClassName,
                clsPrefix
            ),
            color: colorMap[level ?? 0] as Color // 只使用两种颜色，0为红色，1为黄色warning
        });
    },
    config: (config: ErrorMessageProps) => {
        // 获取全局的多语对象，支持config 配置
        const localeProps = getLocaleProps();
        configRef = {...configRef, ...localeProps, ...config};
        // @ts-ignore
        Message.config({
            ...config,
        });
    }
};

export default ErrorMessage;