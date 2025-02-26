import React, { useState } from 'react'
import classNames from 'classnames'
import { mergeProps } from '@utils/WithDefaultProps'
import { ErrorMessageProps } from './iErrorMessage'
import Dialog from '@components/dialog/src'
import Popup from '@components/popup/src'
import Toast from '@components/toast/src'
import WebUI from '@utils/UpdatePrefixs'
import CloseCircleFill from '@tinper/m-icons/lib/cjs/CloseCircleFill'
import Copy from '@tinper/m-icons/lib/cjs/Copy'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useConfig } from '@components/config-provider/src/index';

const defaultProps = {
}

const ErrorMessage: React.FC<ErrorMessageProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { clsPrefix, fieldid, errorInfo = '999-999-999', uploadable = false, detailMsg = '' } = props
  const classPrefix = `${clsPrefix}-error-message`;
  const { locale } = useConfig()

  const [visible, setVisible] = useState(false);

  const action0 = detailMsg ?  {
    key: 'description',
    text: locale.ErrorMessage.exceptionDetails,
    onClick: () => {
      setVisible(true)
    },
    className: `${classPrefix}-actions`
  } : null;

  const action1 = uploadable ?  {
    key: 'report',
    text: locale.ErrorMessage.escalation,
    onClick: () => {
      props.onUploadClick?.()
    },
    className: `${classPrefix}-actions`
  } : null;

  const action2 = {
    key: 'close',
    text: locale.ErrorMessage.close,
    onClick: () => {
      props.onClose?.()
    },
    className: `${classPrefix}-actions`
  };

  let actions: any = [];
  [action0, action1, action2].forEach((item: any) => item && actions.push(item));

  const handleCopyDetail = () => {
    Toast.show({
      content: locale.ErrorMessage.replicatingSuccess
    })
  }

  const popupTitle = (
    <div className={`${classPrefix}-detail-title-wrap`}>
      <div className={`${classPrefix}-detail-title`}>{locale.ErrorMessage.exceptionDetails}</div>
      <CopyToClipboard text={props.detailMsg} onCopy={handleCopyDetail}>
        <div className={`${classPrefix}-detail-copy`} fieldid={fieldid ? fieldid + '_error_message_detail_copy' : undefined}>{locale.ErrorMessage.copy}</div>
      </CopyToClipboard>
    </div>
  )

  const handleCopyTraceId = () => {
    Toast.show({
      content: locale.ErrorMessage.replicatingSuccess
    })
  }

  const content = (
    <div className={`${classPrefix}-content`}>
      <div className={`${classPrefix}-code-wrap`}>
        <span className={`${classPrefix}-code-left`}>{locale.ErrorMessage.status}：</span>
        <span className={`${classPrefix}-code-right`} onClick={props.onCodeClick}>{errorInfo}</span>
      </div>
      {props.traceId && (
        <div className={`${classPrefix}-id-wrap`}>
          <span className={`${classPrefix}-id-left`}>{locale.ErrorMessage.linkID}：</span>
          <span className={`${classPrefix}-id-right`}>{props.traceId}</span>
          <CopyToClipboard text={props.traceId} onCopy={handleCopyTraceId}>
            <Copy className={`${classPrefix}-id-icon`} fieldid={fieldid ? fieldid + '_error_message_id_copy' : undefined}/>
          </CopyToClipboard>
        </div>
      )}
    </div>
  )


  return (
    <div className={classNames(classPrefix, props.className)} style={props.style} fieldid={fieldid ? fieldid + '_error_message' : undefined}>
      <Dialog
        fieldid={fieldid ? fieldid + '_error_message' : undefined}
        visible={props.visible}
        actions={actions}
        onClose={props.onClose}
        closeOnMaskClick={props.closeOnMaskClick}
        header={<CloseCircleFill className={`${classPrefix}-header-icon`} />}
        title={<div className={`${classPrefix}-msg`}><pre>{props.message}</pre></div>}
        content={content}
        className={`${classPrefix}-dialog`}
        getContainer={props.getContainer}
        afterClose={props.afterClose}
      />
      <Popup
        fieldid={fieldid ? fieldid + '_error_message' : undefined}
        visible={visible}
        closeOnMaskClick
        className={`${classPrefix}-popup`}
        bodyStyle={{ height: '50vh' }}
        popupTitle={popupTitle}
        onClose={() => setVisible(false)}
        showCloseButton
        safeAreaBottom
      >
        <div className={`${classPrefix}-detail-msg-wrap`}>
          <div className={`${classPrefix}-detail-msg`}><pre>{props.detailMsg}</pre></div>
        </div>
      </Popup>
    </div>

  )
}

export default WebUI({ defaultProps })(ErrorMessage)