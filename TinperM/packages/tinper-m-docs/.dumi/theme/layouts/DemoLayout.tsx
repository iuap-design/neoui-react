import axios from 'axios'
import { useOutlet, useSearchParams, useSiteData } from 'dumi';
import TouchEmulator from 'f2-touchemulator';
import React, { useEffect, useRef, useState } from 'react';
import VConsole from 'vconsole';

import vl from 'umi-hd';
import flex from 'umi-hd/lib/flex';
import vh from 'umi-hd/lib/vh';
import vw from 'umi-hd/lib/vw';
import './DemoLayout.less';
import { themesData } from '../slots/Header/themes'

export const ROUTE_MSG_TYPE = 'dumi:update-iframe-route';

// available HD modes
const HD_MODES: any = {
  vl,
  flex,
  vw,
  vh,
};

const MobileDemoLayout: React.FC = ({ }) => {
  const target = useRef<HTMLDivElement>(null);
  const {
    themeConfig: { hd: { rules = [{ mode: 'vw', options: [100, 750] }] } = {} },
  } = useSiteData();
  const outlet = useOutlet();
  const [params] = useSearchParams();
  const compact = params.get('compact');
  const background = params.get('background');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const mobileKeywords = ['Mobi', 'Android', 'iPhone', 'iPad', 'Windows Phone'];

    const checkIsMobile = () => {
      for (let i = 0; i < mobileKeywords.length; i++) {
        if (userAgent.indexOf(mobileKeywords[i]) !== -1) {
          setIsMobile(true);
          break;
        }
      }
    };

    checkIsMobile();
  }, []);

  // 页面挂载时获取preferscolor
  useEffect(() => {
    var cache = typeof navigator !== 'undefined' && navigator.cookieEnabled && typeof window.localStorage !== 'undefined' && localStorage.getItem('dumi:prefers-color') || 'light';
    var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var enums = ['light', 'dark', 'auto'];

    document.documentElement.setAttribute(
      'data-prefers-color-scheme',
      cache === enums[2]
        ? (isDark ? enums[1] : enums[0])
        : (enums.indexOf(cache) > -1 ? cache : enums[0])
    );
  }, [])

  useEffect(() => {
    if (isMobile) {
      const vConsole = new VConsole();
      return () => vConsole.destroy();
    }
  }, [isMobile])

  useEffect(() => {
    // Simulate the touch event of mobile terminal
    if (target.current && !('ontouchstart' in window)) {
      // fix https://github.com/umijs/dumi/issues/996
      TouchEmulator(document.documentElement);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const { clientWidth } = document.documentElement;

      rules
        // discard invalid rules
        .filter((rule: any) => HD_MODES[rule.mode])
        // match first valid rule
        .some((rule: any) => {
          if (
            // without min & max width
            (Number.isNaN(rule.minWidth * 1) &&
              Number.isNaN(rule.maxWidth * 1)) ||
            // min width only
            (Number.isNaN(rule.maxWidth * 1) && clientWidth > rule.minWidth) ||
            // max width only
            (Number.isNaN(rule.minWidth * 1) && clientWidth < rule.maxWidth) ||
            // both min & max width
            (clientWidth > rule.minWidth && clientWidth < rule.maxWidth)
          ) {
            HD_MODES[rule.mode](...[].concat(rule.options));
            document.documentElement.setAttribute('data-scale', 'true');
          }
          return true;
        });
    };

    handler();
    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, [rules]);

  const appendLinkTag = (id: string, url: string) => {
    let tinperLink = document.createElement("link");
    tinperLink.rel = "stylesheet"
    tinperLink.id = id
    tinperLink.href = url
    document.getElementsByTagName("head")[0].appendChild(tinperLink);
  }

  useEffect(() => {
    const themesLight = themesData.map(theme => `./theme/${theme.light}`)
    const themesDark = themesData.map(theme => `./theme/${theme.dark}`)
    const activeThemeIndex = localStorage.getItem('tinper-m-active-theme-index')
    const isLogin = localStorage.getItem('isLogin');
    const themeType = localStorage.getItem('theme-config-themeType')
    let themes = themeType === 'dark' ? themesDark : themesLight
    if (activeThemeIndex !== null && isLogin === 'true') {
      appendLinkTag( "theme-style-link", themes[Number(activeThemeIndex)])
    }

    document.addEventListener("changetheme",
      (e) => {
        themes = e.detail.themeType === 'dark' ? themesDark : themesLight
        if (document.querySelector('#theme-style-link')) {
          document.querySelectorAll('#theme-style-link').forEach(link => {
            link.href = themes[e.detail.index]
          })
        }
      },
      false,
    );
  }, []);

  const componentId = window.location?.hash?.match(/([^/]+)\?+/)?.[1];

  return (
    <div
      className={`dumi-default-demo-layout ${window.location.hash.includes('#/basic-components/') ? 'test1' : ''}`}
      id={componentId}
      ref={target}
      style={{
        paddingLeft: compact !== null ? 0 : compact,
        paddingRight: compact !== null ? 0 : compact,
        background,
      }}
      data-html2sketch-container
    >
      {outlet}
    </div>
  );
};

export default MobileDemoLayout;
