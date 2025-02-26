/* eslint-disable react/prop-types */
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import CSSMotion from 'rc-motion';
import useMemo from 'rc-util/lib/hooks/useMemo';
import * as React from 'react';
import {ConfigContext} from '../../wui-provider/src/context';
import {FormItemPrefixContext} from './context';
import useCacheErrors from './hooks/useCacheErrors';
import {useForceUpdate} from './util';

const EMPTY_LIST: React.ReactNode[] = [];
/* const propTypes = {
    errors: PropTypes.any,
    help: PropTypes.any,
    onDomErrorVisibleChange: PropTypes.func
}; */
export interface ErrorListProps {
  errors?: React.ReactNode[];
  /** @private Internal Usage. Do not use in your production */
  help?: React.ReactNode;
  /** @private Internal Usage. Do not use in your production */
  onDomErrorVisibleChange?: (visible: boolean) => void;
}

export default function ErrorList({errors = EMPTY_LIST, help, onDomErrorVisibleChange}: ErrorListProps) {
    const forceUpdate = useForceUpdate();
    const {prefixCls, status} = React.useContext(FormItemPrefixContext);
    const {getPrefixCls} = React.useContext(ConfigContext);

    const [visible, cacheErrors] = useCacheErrors(
        errors,
        (changedVisible: boolean) => {
            if (changedVisible) {
                Promise.resolve().then(() => {
                    onDomErrorVisibleChange?.(true);
                });
            }
            forceUpdate();
        },
        !!help
    );

    const memoErrors = useMemo(
        () => cacheErrors,
        visible,
        (_: any, nextVisible: boolean) => nextVisible
    );

    // Memo status in same visible
    const [innerStatus, setInnerStatus] = React.useState(status);
    React.useEffect(() => {
        if (visible && status) {
            setInnerStatus(status);
        }
    }, [visible, status]);

    const baseClassName = `${prefixCls}-item-explain`;
    const rootPrefixCls = getPrefixCls();

    return (
        <CSSMotion
            motionDeadline={500}
            visible={visible}
            motionName={`${rootPrefixCls}-show-help`}
            onLeaveEnd={() => {
                onDomErrorVisibleChange?.(false);
            }}
            motionAppear
            removeOnLeave
        >
            {({className: motionClassName}: { className?: string }) => (
                <div
                    className={classNames(
                        baseClassName,
                        {
                            [`${baseClassName}-${innerStatus}`]: innerStatus
                        },
                        motionClassName
                    )}
                    key='help'
                >
                    {memoErrors.map((error: any, index: number) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={index} role='alert'>
                            {error}
                        </div>
                    ))}
                </div>
            )}
        </CSSMotion>
    );
}
// ErrorList.propTypes = propTypes;
