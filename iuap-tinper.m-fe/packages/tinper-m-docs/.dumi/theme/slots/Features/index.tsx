import { Link, useRouteMeta } from 'dumi';
import React, { type FC } from 'react';
import './index.less';
import decoration from '../../../../public/装饰元素-点.png'

const Features: FC = () => {
  const { frontmatter } = useRouteMeta();

  return Boolean(frontmatter.features?.length) ? (
  <>
    <h2 className='dumi-default-features-title'>功能特性</h2>
    <p className='dumi-default-features-description'>为了全面提升用户体验，设计赋能业务，我们提供了更多维的设计规范，帮助用户打造更好的产品</p>
    <div
      className="dumi-default-features"
      // auto render 2 or 3 cols by feature count
      data-cols={
        [3, 2].find((n) => frontmatter.features!.length % n === 0) || 3
      }
    >
      {frontmatter.features!.map(
        ({ title, description, bg, link }) => {
        let titleWithLink: React.ReactNode;
        if (link) {
          titleWithLink = /^(\w+:)\/\/|^(mailto|tel):/.test(link) ? (
            <a href={link} target="_blank" rel="noreferrer">
              {title}
            </a>
          ) : (
            <Link to={link}>{title}</Link>
          );
        }
        return (
          <div key={title} className="dumi-default-features-item">
            {bg && <img src={bg} />}
            {title && <h3>{titleWithLink || title}</h3>}
            {description && (
              <p dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        );
      })}
    </div>
  </>
  ) : null;
};

export default Features;
