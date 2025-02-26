import { Link, useRouteMeta } from 'dumi';
import HeroTitle from 'dumi/theme/slots/HeroTitle';
import React, { type FC } from 'react';
import './index.less';

const Hero: FC = () => {
  const { frontmatter } = useRouteMeta();

  if (!('hero' in frontmatter)) return null;

  return (
    <div className="dumi-default-hero">
      <HeroTitle><img src={frontmatter.hero!.logo}></img></HeroTitle>
      {frontmatter.hero!.description && (
        <p
          className='dumi-default-hero-description'
          dangerouslySetInnerHTML={{ __html: frontmatter.hero!.description }}
        />
      )}
      {frontmatter.hero!.subDescription && (
        <p
          className='dumi-default-hero-sub-description'
          dangerouslySetInnerHTML={{ __html: frontmatter.hero!.subDescription }}
        />
      )}
      {Boolean(frontmatter.hero!.actions?.length) && (
        <div className="dumi-default-hero-actions">
          {frontmatter.hero!.actions!.map(
            ({ text, link }) => (
              /^(\w+:)\/\/|^(mailto|tel):/.test(link) ?
                (
                  <a href={link} target="_blank" rel="noreferrer" key={text}>
                    {text}
                  </a>
                ) : (
                  <Link key={text} to={link}>
                    {text}
                  </Link>
                )
            )
          )}
          {window.location.origin.includes('yondesign') || window.location.origin.includes('8000') ?
            <a href={`https://yondesign.yonyou.com/experience/index.html#/tinper-m`} target="_blank">
              体验度量看板
            </a> :
            <a href={`${window.location.origin}/iuap-yondesign/ucf-wh/experience/index.html#/tinper-m`} target="_blank">
              体验度量看板
            </a>
          }
        </div>
      )}
    </div>
  );
};

export default Hero;
