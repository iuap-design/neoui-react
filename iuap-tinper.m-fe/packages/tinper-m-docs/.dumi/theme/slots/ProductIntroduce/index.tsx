import { Link, useRouteMeta } from 'dumi';
import React, { type FC } from 'react';
import './index.less';

const ProductIntroduce: FC = () => {
  const { frontmatter } = useRouteMeta();

  return Boolean(frontmatter.productintroduce?.length) ? (
    <div
      className="dumi-default-productintroduce"
      // auto render 2 or 3 cols by feature count
      data-cols={
        [3, 2].find((n) => frontmatter.productintroduce!.length % n === 0) || 3
      }
    >
      <div className="dumi-default-productintroduce-background" />
      {frontmatter.productintroduce!.map(({ title, description, icon, link }) => {
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
          <div key={title} className="dumi-default-productintroduce-item">
            {icon && <img src={icon} />}
            {title && <h3>{titleWithLink || title}</h3>}
            {description && (
              <p dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default ProductIntroduce;
