import { IPreviewerProps, useLocale, useRouteMeta, useSiteData } from 'dumi';
import Previewer from './DefaultPreviewer';
import Device from 'dumi/theme/slots/Device';
import React, { useCallback, useEffect, useState, type FC } from 'react';
import './index.less';

const MobilePreviewer: FC<IPreviewerProps> = (props) => {
  /* const {
    frontmatter: { mobile = true },
  } = useRouteMeta(); */
  let { mobile = true } = props
  mobile = (typeof mobile === 'string') ? (mobile === 'true') : mobile
  const { themeConfig } = useSiteData();
  const locale = useLocale();
  const generateUrl = useCallback((p: typeof props) => {
    const [pathname, search] = p.demoUrl.split('?');
    const params = new URLSearchParams(search);

    if (p.compact) params.set('compact', '');
    if (p.background) params.set('background', p.background);
    if (locale.id) params.set('locale', locale.id);

    return `${pathname}?${params.toString()}`.replace(/\?$/, '');
  }, []);
  const [demoUrl, setDemoUrl] = useState(() => generateUrl(props));

  useEffect(() => {
    setDemoUrl(generateUrl(props));
  }, [props.compact, props.background]);

  return (
    <Previewer
      {...props}
      demoUrl={demoUrl}
      iframe={mobile ? false : props?.iframe}
      className={mobile ? 'dumi-default-previewer' : 'dumi-pc-previewer'}
      forceShowCode={mobile}
      style={{
        '--device-width': themeConfig.deviceWidth
          ? `${themeConfig.deviceWidth}px`
          : undefined,
      }}
    >
      {mobile && (
        <Device
          url={demoUrl}
          inlineHeight={
            typeof props.iframe === 'number' ? props.iframe : undefined
          }
        />
      )}
      {!mobile && props?.children}
    </Previewer>
  );
};

export default MobilePreviewer;
