import { useRouteMeta, useSidebarData, useSiteData } from 'dumi';
import React, { type FC, type ReactNode } from 'react';
import './heti.scss';
import './index.less';
import PositionIcon from '../PositionIcon';

const Content: FC<{ children: ReactNode }> = (props) => {
  const sidebar = useSidebarData();
  const { themeConfig } = useSiteData();
  const { frontmatter } = useRouteMeta();
  // console.log(frontmatter)


  return (
    <div
      className="dumi-default-content"
      data-no-sidebar={!sidebar || frontmatter.sidebar === false || undefined}
      data-no-footer={themeConfig.footer === false || undefined}
    >
      <PositionIcon person={frontmatter.person} email={frontmatter.email} />
      {props.children}
    </div>
  );
};

export default Content;
