import { NavLink, useLocation, useRouteMeta, useSidebarData } from 'dumi';
// import Toc from 'dumi/theme/slots/Toc';
import React, { useState, type FC } from 'react';
import ArrowIosDown from '@tinper/m-icons/lib/cjs/ArrowIosDown'
import ArrowIosUp from '@tinper/m-icons/lib/cjs/ArrowIosUp'
import { handleReportFunctionClick } from '../../utils'
import './index.less';


const CustomSidebar: FC = ({ sidebar, onClick }) => {
  if (!sidebar) return null;

  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});
  const toggleExpand = (childKey: string) => {
    setIsExpanded((prevState) => (
      {
        ...prevState,
        [childKey]: !prevState[childKey] || false,
      }
    ));
  };
  // 递归方法
  function getExpand(child: any) {
    return (
      Array.isArray(child?.children) &&
      child.children.map((child2: any) => (
        <div
          key={child2.link}
          className={`custom-dd 
          ${window.location.hash.includes(child2.link) ? 'active' : ''}`}
          style={isExpanded[child.link] ? {} : { display: 'none' }}
        >
          {child2.childLen === 0 ?
            (<NavLink
              to={`/design-guidance/${child2.link}`}
              title={child2.title}
              end onClick={() => onClick?.(child2)}>
              <div className='title-content'>
                <i />
                {child2.title}
              </div>
            </NavLink>) :
            (<div className='navlinkLike'
              onClick={() => toggleExpand(child2.link)}
            >
              <i />
              {child2.title}
              {isExpanded[child2.link] ? <ArrowIosUp /> : <ArrowIosDown />}
            </div>)
          }
          {/* 递归获取子节点 */}
          {getExpand(child2)}
        </div>
      ))

    )
  }
  const getImage = (name: string) => {
    const imageNameList = ['设计指南', '全局框架', '界面模式', '通用交互', '业务规则', '业务组件', '基础组件', '智能化', '国际化'];
    const imgName = imageNameList.includes(name) ? name : '业务规则';
    return require(`../../../../public/design/${imgName}.svg`);
  }
  return (
    <div className="dumi-default-sidebar">
      {sidebar.map((item: any, i: any) => (
        <dl className="dumi-default-sidebar-group" key={String(i)}>
          {item.title &&
            <dt onClick={() => toggleExpand(item.title)}>
              <img className="design-menu-img" src={getImage(item.title)} />
              {item.title}
              {isExpanded[item.title] ? <ArrowIosUp /> : <ArrowIosDown />}
            </dt>
          }
          {
            isExpanded[item.title] ? Array.isArray(item?.children) &&
              item.children.map((child: any) => (
                <div
                  key={child.link}
                  className={`custom-dt guide ${child.childLen === 0 ? 'has-show' : 'has-expand'} ${window.location.hash.includes(child.link) ? 'active' : ''}`}
                  onClick={() => {
                    handleReportFunctionClick({
                      function_id: `tm_design_guidence_${child.menu}`,
                      function_name: `${child.title}`,
                      entry_mode: "tinperm_menu_left",
                      first_parent_name: `${item.title}`,
                      second_parent_name: `TinperM设计指导`,
                    });
                  }}
                >
                  {child.childLen === 0 ?
                    (<NavLink
                      to={`/design-guidance/${child.link}`}
                      title={child.title}
                      end onClick={() => onClick?.(child)}>
                      {/* <div className='title-content'> */}
                      {child.title}
                      {/* </div> */}
                    </NavLink>) :
                    (<div className='navlinkLike' onClick={() => toggleExpand(child.link)}>
                      {child.title}
                      {isExpanded[child.link] ? <ArrowIosUp /> : <ArrowIosDown />}
                    </div>)
                  }
                  {/* 用递归的方式获取子节点 */}
                  {getExpand(child)}
                </div>
              )) : ''
          }
        </dl>
      ))}
    </div>
  );
};

export default CustomSidebar;
