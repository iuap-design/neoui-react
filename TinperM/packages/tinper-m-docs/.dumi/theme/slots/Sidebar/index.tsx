import { NavLink, useLocation, useRouteMeta, useSidebarData } from 'dumi';
import Toc from 'dumi/theme/slots/Toc';
import ArrowIosUp from '@tinper/m-icons/lib/cjs/ArrowIosUp'
import ArrowIosDown from '@tinper/m-icons/lib/cjs/ArrowIosDown'
import React, { useState, type FC, useEffect } from 'react';
import { handleReportFunctionClick } from '../../utils'
import './index.less';
// import { is } from 'date-fns/locale';


const Sidebar: FC = () => {
  const { pathname } = useLocation();
  const meta = useRouteMeta();
  const sidebar = useSidebarData();
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});
  const toggleExpand = (childKey: string) => {
    setIsExpanded((prevState) => (
      {
        ...prevState,
        [childKey]: !prevState[childKey] || false,
      }
    ));
  };
  if (!sidebar) return null;
  const getImage = (name: string) => {
    let test = name.replace(name, name.match(/^[\u4e00-\u9fa5]{2,4}/))
    const imageNameList = ['开发指南', '基础', '数据录入', '视图', '导航', '反馈', '其他'];
    const imgName = imageNameList.includes(test) ? test : '业务规则';
    return require(`../../../../public/design/${imgName}.svg`);
  }
  sidebar.map((item, i) => {
    isExpanded[i] = true
  }
  )
  return (
    <div className="dumi-default-sidebar">
      {sidebar.map((item, i) => (
        <dl className="dumi-default-sidebar-group" key={String(i)} >
          {item.title &&
            <dt className='basic-dt'
              onClick={() => {
                handleReportFunctionClick({
                  function_id: `tm_basic_components_${item.menu}`,
                  function_name: `${item.title}`,
                  entry_mode: "tinperm_menu_left",
                  first_parent_name: `TinperM基础组件`,
                });
                toggleExpand(item.title)
              }}
            >
              <img className="design-menu-img basic" src={getImage(item.title)} />
              {item.title}
              {isExpanded[item.title] ? <ArrowIosUp /> : <ArrowIosDown />}
            </dt>
          }
          {
            (isExpanded[item.title] !== true) ? item.children.map((child) => (
              <dd
                key={child.link}
                className={`custom-dd ${window.location.hash.includes(child.link) ? 'active' : ''}`}
                onClick={() => {
                  handleReportFunctionClick({
                    function_id: `tm_basic_components_${child.link.slice(18,child.link.length)}`,
                    function_name: `${child.title}`,
                    entry_mode: "tinperm_menu_left",
                    first_parent_name: `${item.title}`,
                    second_parent_name: `TinperM基础组件`,
                  });
                }}
              >
                <NavLink to={child.link} title={child.title} end>
                  {child.title}
                </NavLink>
                {
                  child.link === pathname && meta.frontmatter.toc === 'menu' && (
                    <Toc />
                  )
                }
              </dd>
            )) : ''
          }
        </dl>
      ))
      }
    </div >
  );
};

export default Sidebar;
