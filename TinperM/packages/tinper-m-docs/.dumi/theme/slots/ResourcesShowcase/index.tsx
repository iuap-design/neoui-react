import { useRouteMeta } from 'dumi';
import React, { type FC } from "react";

import decoration from '../../../../public/装饰元素-点.png'

import './index.less';

const ResourcesShowcase: FC = () => {
    const { frontmatter } = useRouteMeta();
    // 
    return Boolean(frontmatter.resourceshowcase?.length) ? (
        <div className='showcase-background'>
            
            <img src={decoration} className='point-decoration'/>
            <h2 className='dumi-default-resources-title'>我们的资源</h2>
            <p className='dumi-default-resources-description'>为了全面提升用户体验，设计赋能业务，我们提供了更多维的设计规范，帮助用户打造更好的产品</p>
            <div className="dumi-default-resources">
                <div className='case-content'>
                    {frontmatter.resourceshowcase!.map(
                        ({ quantity, kind }) => {
                            return (
                                <div key={kind} className='case-item'>
                                    <h3>{quantity}</h3>
                                    <p>{kind}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    ) : null
};

export default ResourcesShowcase;