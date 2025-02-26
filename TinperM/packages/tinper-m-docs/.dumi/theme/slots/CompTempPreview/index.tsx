import { useRouteMeta } from 'dumi';
import React, { type FC } from 'react';
import './index.less';
import group from '../../../../public/编组图.png'

const CompTempPreview: FC = () => {
    const { frontmatter } = useRouteMeta();
    if (!('customtheme' in frontmatter)) return null;

    return (
        <div className='ct-background'>
            <div className='title-inline-block'>
                <h2 className='theme-title'>丰富的可视化组件模板</h2>
                {/* <div className='use-button'>
                    <p>浏览模板</p>
                </div> */}
            </div>
            <div className='group-content'>
                <img className='group' src={group}></img>
            </div>
        </div>
    )
}
export default CompTempPreview;