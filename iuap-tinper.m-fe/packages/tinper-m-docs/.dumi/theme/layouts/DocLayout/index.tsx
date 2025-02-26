import { ReactComponent as IconSidebar } from '@ant-design/icons-svg/inline-svg/outlined/align-left.svg';
import { ReactComponent as RightOutlined } from '@ant-design/icons-svg/inline-svg/outlined/right.svg';
import { ReactComponent as LeftOutlined } from '@ant-design/icons-svg/inline-svg/outlined/left.svg';
import animateScrollTo from 'animated-scroll-to';
import {
  Helmet,
  useIntl,
  useLocation,
  useOutlet,
  useRouteMeta,
  useSidebarData,
  useSiteData,
} from 'dumi';
import Content from 'dumi/theme/slots/Content';
import ContentFooter from 'dumi/theme/slots/ContentFooter';
import Features from 'dumi/theme/slots/Features';
import ResourcesShowcase from 'dumi/theme/slots/ResourcesShowcase';
import CustomizeTheme from 'dumi/theme/slots/CustomizeTheme';
import Hero from 'dumi/theme/slots/Hero';
import ProductIntroduce from 'dumi/theme/slots/ProductIntroduce';
import BaseDownload from 'dumi/theme/slots/BaseDownload';
import Footer from 'dumi/theme/slots/Footer';
import Header from 'dumi/theme/slots/Header';
import Sidebar from 'dumi/theme/slots/Sidebar';
import Toc from 'dumi/theme/slots/Toc';
import UpdateLog from 'dumi/theme/slots/UpdateLog';
import React, { useEffect, useState, type FC } from 'react';
import './index.less';
import CompTempPreview from 'dumi/theme/slots/CompTempPreview';

const DocLayout: FC = () => {
  const intl = useIntl();
  const outlet = useOutlet();
  const sidebar = useSidebarData();
  const { hash, pathname } = useLocation();
  const { loading, hostname } = useSiteData();
  const [activateSidebar, updateActivateSidebar] = useState(false);
  const [tocShow, setTocShow] = useState(true);
  const [width, setWidth] = useState(0);
  const { frontmatter: fm } = useRouteMeta();

  const showSidebar = fm.sidebar !== false && sidebar?.length > 0;

  // handle hash change or visit page hash after async chunk loaded
  useEffect(() => {
    const id = hash.replace('#', '');

    if (id) {
      setTimeout(() => {
        const elm = document.getElementById(decodeURIComponent(id));

        if (elm) {
          // animated-scroll-to instead of native scroll
          animateScrollTo(elm.offsetTop - 80, {
            maxDuration: 300,
          });
        }
      }, 1);
    }
  }, [loading, hash]);

  const resizeUpdate = (e) => {
    let h = e.target.innerWidth;
    setWidth(h);
    // console.log(width)
  };
  useEffect(() => {
    const width = window.innerWidth
    window.addEventListener('resize', resizeUpdate)
    width < 1400 ? setTocShow(false) : setTocShow(true)
    // console.log(tocShow)
    return () => {
      window.removeEventListener('resize', resizeUpdate);
    }
  }, [window.innerWidth])

  return (
    <div
      className="dumi-default-doc-layout"
      data-mobile-sidebar-active={activateSidebar || undefined}
      onClick={() => updateActivateSidebar(false)}
    >
      <Helmet>
        <html lang={intl.locale.replace(/-.+$/, '')} />
        {fm.title && <title>{fm.title}</title>}
        {fm.title && <meta property="og:title" content={fm.title} />}
        {fm.description && <meta name="description" content={fm.description} />}
        {fm.description && (
          <meta property="og:description" content={fm.description} />
        )}
        {fm.keywords && (
          <meta name="keywords" content={fm.keywords.join(',')} />
        )}
        {fm.keywords &&
          fm.keywords.map((keyword) => (
            <meta key={keyword} property="article:tag" content={keyword}></meta>
          ))}
        {hostname && <link rel="canonical" href={hostname + pathname} />}
      </Helmet>
      <Header />
      <Hero />
      <ProductIntroduce />
      <Features />
      <ResourcesShowcase />
      <CustomizeTheme />
      <CompTempPreview />
      <BaseDownload />

      {showSidebar && (
        <div className="dumi-default-doc-layout-mobile-bar">
          <button
            type="button"
            className="dumi-default-sidebar-btn"
            onClick={(ev) => {
              ev.stopPropagation();
              updateActivateSidebar((v) => !v);
            }}
          >
            <IconSidebar />
            {intl.formatMessage({ id: 'layout.sidebar.btn' })}
          </button>
        </div>
      )}

      <main style={fm.fullScreen ? { padding: 0 } : undefined}>
        {showSidebar && <Sidebar />}
        <Content>
          {/* {console.log(outlet.props.children.props.children.props.value.route.meta.texts)} */}
          {
            window.location.href.includes('updatelog') ?
              <UpdateLog outlet={outlet} /> :
              <article>{outlet}</article>
          }
          <ContentFooter />
          {fm.footer !== false && <Footer />}
        </Content>

        {/* 基础组件 */}
        {fm.toc === 'content' &&
          (tocShow ?
            <div className="dumi-default-doc-layout-toc-wrapper">
              <div className="dumi-default-doc-layout-toc-wrapper-header" >
                <h4>本页目录</h4>
                <span className='toc-icon' onClick={() => setTocShow(false)}>
                  <RightOutlined style={{ width: '12px', height: '12px', color: '#4B5563' }} />
                </span>
              </div>
              <Toc />
            </div> : <div className='dumi-default-doc-layout-toc-hidden'>
              <span className='toc-icon' onClick={() => setTocShow(true)}>
                <LeftOutlined style={{ width: '12px', height: '12px', color: '#4B5563' }} />
              </span>
            </div>
          )
        }

      </main>

    </div>
  );
};

export default DocLayout;
