import type { SocialTypes } from '@/client/theme-api/types';
import { ReactComponent as IconClose } from '@ant-design/icons-svg/inline-svg/outlined/close.svg';
import { ReactComponent as IconMore } from '@ant-design/icons-svg/inline-svg/outlined/more.svg';
import { ReactComponent as IconMenu } from '@ant-design/icons-svg/inline-svg/outlined/menu.svg';
import ColorSwitch from 'dumi/theme/slots/ColorSwitch';
import HeaderExtra from 'dumi/theme/slots/HeaderExtra';
import LangSwitch from 'dumi/theme/slots/LangSwitch';
import Logo from 'dumi/theme/slots/Logo';
import Navbar from 'dumi/theme/slots/Navbar';
import RtlSwitch from 'dumi/theme/slots/RtlSwitch';
import SearchBar from 'dumi/theme/slots/SearchBar';
import SocialIcon from 'dumi/theme/slots/SocialIcon';
import Close from '@tinper/m-icons/lib/cjs/Close'
import React, { useMemo, useState, type FC, ReactEventHandler, useEffect } from 'react';
import { useRouteMeta, useSiteData } from 'dumi';
import { handleReportFunctionClick } from '../../utils'
import './index.less';
import YonDesignLogo from '../../../../public/resource/YonDesign.png'
import tinperLogo from '../../../../public/resource/tinpernext.png'
import tinperMLogo from '../../../../public/resource/tinperm.png'
import avmLogo from '../../../../public/resource/AVM.png'
import arrowRight from '../../../../public/resource/arrowRight.png'
import arrowDown from '../../../../public/resource/ArrowDown.svg'
import Theme from "../../../../public/resource/主题.svg";
import LoginOut from "../../../../public/resource/退出登录.svg";
import SelectedTheme from "../../../../public/resource/选中主题.svg";
import Alert from "../../../../public/updatelog/喇叭.png";
import axios from 'axios';
import { themesData } from './themes'

const Header: FC = () => {
  const { frontmatter } = useRouteMeta();
  const [showMenu, setShowMenu] = useState(false);
  const defShowUpgrade = (localStorage.getItem('showUpgrade') !== 'false')
  const [showUpgrade, setShowUpgrade] = useState(defShowUpgrade)
  const [activeTheme, setActiveTheme] = useState(null);
  const { themeConfig } = useSiteData();
  const [isLogin, setLogin] = useState(localStorage.getItem('isLogin') && JSON.parse(localStorage.getItem('isLogin')));
  const [upgradeInfo, setUpgradeInfo] = useState('')
  const [version, setVersion] = useState('')
  const [themeType, setThemeType] = useState('light')

  useEffect(() => {
    //请求版本信息
    axios.get("/iuap-tec-ynpm/other/notice/list?title=tinper-m").then(res => {
      setUpgradeInfo(res?.data.data[0])
      setVersion(res?.data.data[0].version)
      //存储的版本信息和请求的不同
      if (localStorage.getItem('version') !== res?.data.data[0].version) {
        //展示升级内容
        localStorage.setItem('showUpgrade', 'true')
      }
    })
  }, [])

  const socialIcons = useMemo(() =>
    themeConfig.socialLinks
      ? Object.keys(themeConfig.socialLinks)
        .slice(0, 5)
        .map((key) => ({
          icon: key as SocialTypes,
          link: themeConfig.socialLinks[key as SocialTypes],
        }))
      : [],
    [themeConfig.socialLinks],
  );

  const url = ''
  const arr = ['0000L6YQ8AVLFUZPXD0000/1742193190950141960/tokens1742194908937060363.css',
    '0000L6YQ8AVLFUZPXD0000/1742193843785170953/tokens1742194573929611270.css']
  let tinperLink = document.createElement("link");
  tinperLink.rel = "stylesheet"
  tinperLink.id = "theme-style-link"
  tinperLink.href = url + arr[0]

  // setTimeout(() => {
  //   console.log(document.querySelectorAll('iframe'), 111)
  //   // document.querySelectorAll('iframe')?.forEach(ifm => {
  //   //   ifm?.contentWindow?.document?.head?.appendChild(tinperLink)
  //   //   // console.log(ifm,333)
  //   // })
  //   const a = document.querySelectorAll('iframe')
  //   for (let i = 0; i < 3; i++) {
  //     a[i]?.contentWindow?.document?.head?.appendChild(tinperLink)
  //   }
  //   console.log(document.querySelectorAll('#theme-style-link'), 222)
  // }, 500)

  // if (!document.querySelector('#theme-style-link')) {
  //   document.body.appendChild(tinperLink);
  // }

  const changeTheme = (index, themeType) => {
    setActiveTheme(index)
    localStorage.setItem('tinper-m-active-theme-index', index)
    const event = new CustomEvent("changetheme", { detail: { index, themeType } });
    // 分派该事件。
    document.querySelectorAll('iframe')?.forEach(ifm => {
      ifm?.contentWindow?.document.dispatchEvent(event);
    })
  }

  useEffect(() => {
    localStorage.setItem('theme-config-themeType', themeType)
  }, [themeType])

  //自己的下拉菜单组件
  const DropDown = ({ overlay, catalog, position }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleMouseEnter = () => {
      setIsOpen(true);
    };
    const handleMouseLeave = () => {
      setIsOpen(false);
    };

    return (
      <div className="dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='catalog' >
          {/* 外显部分 */}
          {catalog}
        </div>
        {/* 下拉部分 */}
        <div className={`dropdown-container ${position} ${isOpen ? 'open' : ''}`}
          style={{ visibility: 'hidden' }}
        >
          {overlay}
        </div>
      </div>
    );
  };
  // 点击跳转菜单
  const Menu = () => {
    return (
      <ul className="catalog-menu" >
        <li key="0" style={{ background: '#fff' }} onClick={() => handleMenuClick('0')}>
          <div className='yondesign-item'>
            <img src={YonDesignLogo}></img>
            {/* <span>YonDesign</span> */}
            <div className='goto' >
              <img src={arrowRight} />
            </div>
            <div className='divider'></div>
          </div>
        </li>
        <li key="1" onClick={() => handleMenuClick('1')}>
          <div className="catalog-menu-item">
            <img src={tinperLogo}></img>
            <div className='name'>TinperNext</div>
            <div className='desc'>基于YonDesign的web端组件库</div>
          </div>
        </li>
        <li key="2" onClick={() => handleMenuClick('2')} className='selected-tinperM'>
          <div className="catalog-menu-item">
            <img src={tinperMLogo}></img>
            <div className='name'>TinperM</div>
            <div className='desc'>基于YonDesign的移动端组件库</div>
          </div>
        </li>
        <li key="3" onClick={() => handleMenuClick('3')}>
          <div className="catalog-menu-item">
            <img src={avmLogo}></img>
            <div className='name'>AVM UI</div>
            <div className='desc'>基于 YonDesign 的多端组件库</div>
          </div>
        </li>
      </ul>
    )
  }
  const handleMenuClick = (index: any) => {
    const urlList = [
      /*yondesign*/
      `${window.location.host.startsWith('bip-test.yyuap.com')
        || window.location.host.startsWith('bip-pre.diwork.com')
        || window.location.host.startsWith('bip-daily.yyuap.com') ?
        window.location.origin + '/iuap-yondesign/ucf-wh/homepage/index.html#/' :
        'https://yondesign.yonyou.com'
      }`,

      /*tinperNext*/
      `${window.location.host.startsWith('bip-test.yyuap.com')
        || window.location.host.startsWith('bip-pre.diwork.com')
        || window.location.host.startsWith('bip-daily.yyuap.com') ?
        window.location.origin + '/iuap-yondesign/ucf-wh/website/index.html#/tinpernext' :
        'https://yondesign.yonyou.com/website/index.html#/'
      }`,

      /*tinperM*/
      `${window.location.host.startsWith('localhost:8000')
        || window.location.host.startsWith('bip-test.yyuap.com')
        || window.location.host.startsWith('bip-pre.diwork.com')
        || window.location.host.startsWith('bip-daily.yyuap.com') ?
        window.location.origin + window.location.pathname :
        'https://yondesign.yonyou.com/tinperm/index.html'
      }`,

      /*AVM*/
      'https://developer.yonyou.com/docs/avm/',
    ]
    const linkNameList = ['Yondesign', 'TinperNext', 'TinperM', 'AVM']
    handleReportFunctionClick({
      function_id: `tm_link_${linkNameList[index]}`,
      function_name: `${linkNameList[index]}官网链接`,
      entry_mode: 'tinperm_menu_top',
    });
    window.location.href = urlList[index];
  }
  const menu = (
    <Menu>
    </Menu>
  );


  const themeColor = themesData.map(theme => theme.color)
  const IconDark = () => (
    <svg viewBox="0 0 16 16">
      <path d="M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z" />
    </svg>
  );

  const IconLight = () => (
    <svg viewBox="0 0 16 16">
      <path d="M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
  //登录下拉菜单
  const LoginMenu = () => {
    return (<div style={{ width: 260, height: 'fit-content' }}>
      <div className="config-content">
        <div className="theme-config">
          <span className='theme-config-title'>
            <span><img className="config-img" src={Theme} />组件主题颜色设置</span>
            <span>
              <input
                type='radio'
                id='theme-config-radio-light'
                onClick={() => {
                  setThemeType('light')
                  changeTheme(activeTheme, 'light')
                }}
                checked={themeType === 'light'}
              />
              <label for='theme-config-radio-light'><IconLight /></label>

              <input
                type='radio'
                id='theme-config-radio-dark'
                onClick={() => {
                  setThemeType('dark')
                  changeTheme(activeTheme, 'dark')
                }}
                checked={themeType === 'dark'}
              />
              <label for='theme-config-radio-dark'><IconDark /></label>
            </span>
          </span>
          <div className="theme-content">
            {themeColor.map((color, index) => (
              <div style={{ marginLeft: 8 }}>
                <img className={`active-theme ${activeTheme === index ? 'active' : ''}`}
                  src={SelectedTheme}
                  onClick={() => changeTheme(index, themeType)}
                />
                <div id={`theme-${index}`} className="themes"
                  style={{ background: color }}>
                  {/* {index == 0 ? <div className="test0"></div> : ''}
                    {index == 1 ? <div className="test1"></div> : ''} */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="login-out" onClick={handleLogoutClick}>
          <img className="config-img" src={LoginOut} />
          退出登录
        </div>
      </div>
    </div>
    )
  }
  const login = (
    <LoginMenu>
    </LoginMenu>
  )

  //AnalysysAgent
  if (!document.getElementById('AnalysysAgent-script')) {
    let tinperScript = document.createElement("script");
    tinperScript.src = window.location.href.includes('yondesign.yonyou') || window.location.href.includes('bip-pre') ?
      "//design.yonyoucloud.com/static/analytics/yiguan/latest/AnalysysAgent_JSSDK_INIT.js" :
      "//design.yonyoucloud.com/static/analytics/yiguan/latest/AnalysysAgent_JSSDK_INIT.dev.js";
    tinperScript.id = "AnalysysAgent-script"
    document.body.appendChild(tinperScript);
  }


  //登录
  if (!document.getElementById('login-script')) {
    [
      'https://euc.diwork.com/cas/js/login.highlycheck.nost.return.js',
      "https://euc.yonyoucloud.com/cas/js/login.highlycheck.nost.return.js"
    ].forEach(src => {
      let tinperScript = document.createElement("script");
      tinperScript.src = src;
      tinperScript.id = "login-script"
      document.body.appendChild(tinperScript);
    })
  }
  const successLogin = (respon) => {
    console.log('登录');
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('userName', respon.userName ? respon.userName : '未知');
    setLogin(localStorage.getItem('isLogin') && JSON.parse(localStorage.getItem('isLogin')));
  }
  const failLogin = () => {
    console.log('登出');
    localStorage.setItem('isLogin', 'false');
    localStorage.setItem('userName', '');
  }
  const addressMap = {
    'pro': 'https://euc.diwork.com/',
    'daily': 'https://bip-daily.yyuap.com/',
    // 'pre': 'https://bip-pre.diwork.com/',
    'pre': 'https://euc.diwork.com/',
  }
  const getLoginCom = (isLogin: string) => {
    return (window.localStorage.getItem('isLogin') == 'true' ? (
      <>
        <DropDown overlay={login} catalog={
          <div className='textButton' style={{ marginRight: 20 }} >
            {window.localStorage.getItem('userName')}
            <img className={`menu-drop-trigger-img`} src={arrowDown} />
          </div>}
          position={'bottomLeft'}
        />
      </>
    ) : (
      <a className='button' id='login-button'
        href={''}
      >登录
      </a >
    ))
  }
  const handleLogoutClick = () => {
    localStorage.setItem('isLogin', 'false');
    localStorage.setItem('userName', '');
    localStorage.removeItem('tinper-m-active-theme-index')
    window.location.href = `?service=${window.location.origin}${window.location.pathname}`;
  }
  if (document.querySelector('#login-script') !== null) {
    let timer = setInterval(() => {
      if (window.checkYhtHighIsLogin) {
        window.checkYhtHighIsLogin(``, successLogin, failLogin);
        clearInterval(timer);
      }
    }, 100);
  }
  const LoginCom = getLoginCom(isLogin);


  const str = '<a href="#/basic-components/updatelog">发现新精彩！TinperM组件库新版本现已上线，点击TinperM更新日志&nbsp;探索更多创新功能和改进</a>'

  return (
    <div
      className="dumi-default-header"
      style={{ display: "inline-table" }}
      // data-static={Boolean(frontmatter.hero) || undefined}
      data-mobile-active={showMenu || undefined}
      onClick={() => setShowMenu(false)}
    >
      {showUpgrade && <div className='header-upgrade' style={{ height: 40 }}>
        <div className='header-upgrade-content'>
          <img src={Alert} />
          <div dangerouslySetInnerHTML={{ __html: upgradeInfo?.text }}></div>
          <Close onClick={() => {
            localStorage.setItem('version', version)
            localStorage.setItem('showUpgrade', 'false')
            setShowUpgrade(false)
          }}
          />
        </div>
      </div>}
      <div className="dumi-default-header-content">
        <DropDown overlay={menu}
          catalog={<img className='dumi-default-header-menu' src='./menu.png' />}
          position={'bottomRight'}
        />
        <section className="dumi-default-header-left">
          <Logo />
        </section>
        <SearchBar />
        <section className="dumi-default-header-right">
          <Navbar />
          <div className="dumi-default-header-right-aside">
            <LangSwitch />
            <RtlSwitch />
            {themeConfig.prefersColor.switch && <ColorSwitch />}
            {socialIcons.map((item) => (
              <SocialIcon icon={item.icon} link={item.link} key={item.link} />
            ))}
            <HeaderExtra />
          </div>
          {LoginCom}
        </section>
        <button
          type="button"
          className="dumi-default-header-menu-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            setShowMenu((v) => !v);
          }}
        >
          {showMenu ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </div>
  );
};

export default Header;
