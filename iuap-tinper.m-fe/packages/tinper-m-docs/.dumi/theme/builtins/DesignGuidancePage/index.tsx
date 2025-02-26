import React, { Children, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { useLocation, withRouter } from 'dumi';
import CustomSidebar from 'dumi/theme/slots/CustomSidebar';
import CustomToc from 'dumi/theme/slots/CustomToc';
import './index.less'
import { getMenuTree, getYonDesignDocByMenuTree, getHtmlContent } from './loadMenue'
import { ReactComponent as RightOutlined } from '@ant-design/icons-svg/inline-svg/outlined/right.svg';
import { ReactComponent as LeftOutlined } from '@ant-design/icons-svg/inline-svg/outlined/left.svg';
import { readvSync } from 'fs-extra';
import marked from 'marked'
import classNames from 'classnames';

function adaptSidebarData(item, cb) {
  return Array.isArray(item) && item.map((child) => {
    cb?.(child)
    return {
      title: child.menuName,
      order: child.sequence,
      link: child.menu,
      menu: child.menu,
      childLen: Array.isArray(child.children) ? child.children.length : 0,
      children: adaptSidebarData(child.children, cb)
    }
  })
}

function DesignGuidancePage(props) {
  const [sidebar, setSidebar] = useState([])
  const [tocs, setTocs] = useState([])
  const [contentUrl, setContentUrl] = useState('')
  const [tocShow, setTocShow] = useState(true)
  const { params } = props
  const menu = params?.menu

  const firstMenu = useRef('')
  // 请求侧边栏
  useEffect(() => {
    getMenuTree((res) => {
      const sidebar = adaptSidebarData(res?.data?.data || [],
        (child: { menu }) => {
          if (child.menu && !firstMenu.current)
            firstMenu.current = child.menu
        })
      setSidebar(sidebar)
      // console.log(sidebar[0].children[0].link)
      // location.href = `#/design-guidance/${firstMenu.current}`
      location.href = `#/design-guidance/${sidebar[0].children[0].link}`
    })
  }, [])

  useEffect(() => {
    setTocs([])
    getYonDesignDocByMenuTree(menu, (res) => {
      const { htmlFilePath, mdFilePath } = res?.data?.data[0] || {}
      if (!mdFilePath) {
        ReactDOM.render(
          <div
            className='md-content'
            dangerouslySetInnerHTML={{ __html: '<h2>请稍等</h2>' }}>
          </div>,
          document.getElementById('design-guidance-page-content')
        );
        return null
      }
      else {
        setContentUrl(mdFilePath)
      }
    })
  }, [menu])

  useEffect(() => {
    if (contentUrl) {
      getHtmlContent(`/${contentUrl}`, (res) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(res.data, "text/html");
        let tocs = []
        const content = doc?.getElementsByTagName("body")[0];
        ReactDOM.render(
          <div
            className='md-content markdown'
            dangerouslySetInnerHTML={{ __html: marked(content.innerHTML) }}>
          </div>,
          document.getElementById('design-guidance-page-content')
        );

        const List = Array.prototype.slice.call(document.querySelectorAll('.md-content h1'), 0) || [];
        const subEle = Array.prototype.slice.call(document.querySelectorAll('.md-content h2'), 0) || [];
        Array.prototype.slice.call(List, 0).forEach((element, index) => {
          let obj = {};
          obj.id = element.getAttribute('id');
          obj.title = element.innerText;
          obj.depth = 2
          let children = index !== 0 ? subEle.filter(item => item.innerText.indexOf((index + 1).toString()) === 0) || [] : subEle.filter(item => item.innerText.indexOf((index + 1).toString()) === 0 && item.innerText.indexOf('.') === 1) || [];
          obj.children = children.map(item => {
            return {
              title: item.innerText,
              id: item.getAttribute('id'),
              depth: 3
            }
          })
          tocs.push(obj)
        });
        setTocs(tocs)
      })
    } else {
      setTocs(null)
    }
  }, [contentUrl])

  return <div className='design-guidance-page'>
    <CustomSidebar sidebar={sidebar} />
    <div id='design-guidance-page-content'>
    </div>
    {tocShow ?
      <div className="dumi-default-doc-layout-toc-wrapper">
        <div className="dumi-default-doc-layout-toc-wrapper-header" >
          <h4>本页目录</h4>
          <span className='toc-icon' onClick={() => setTocShow(false)}>
            <RightOutlined style={{ width: '12px', height: '12px', color: '#4B5563' }} />
          </span>
        </div>
        <div>
          <CustomToc memoToc={tocs} />
        </div>
      </div> : <div className='dumi-default-doc-layout-toc-hidden'>
        <span className='toc-icon' onClick={() => setTocShow(true)}>
          <LeftOutlined style={{ width: '12px', height: '12px', color: '#4B5563' }} />
        </span>
      </div>

    }
  </div>
}

export default withRouter(DesignGuidancePage)