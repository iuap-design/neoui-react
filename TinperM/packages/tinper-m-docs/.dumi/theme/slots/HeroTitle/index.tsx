import React, { type FC, type ReactNode } from 'react';
import './index.less';

const HeroTitle: FC<{ children: ReactNode }> = (props) => (
  <div className="dumi-default-hero-title">
    <span>{props.children}</span>
  </div>
);

export default HeroTitle;
