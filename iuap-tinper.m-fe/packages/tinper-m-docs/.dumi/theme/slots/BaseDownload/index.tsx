import { useRouteMeta } from 'dumi';
import React, { type FC } from 'react';
import './index.less';
import warn from '../../../../public/basedownload/常规提示i.png'
import bottom from '../../../../public/basedownload/底部.png'


const BaseDownload: FC = () => {
    const { frontmatter } = useRouteMeta();
    return Boolean(frontmatter.basedownload?.length) ? (
        <>
            <div className='dumi-default-base-download'>
                <div className="dumi-default-downloads">
                    <h2 className='dumi-default-download-title'>ADS设计系统</h2>
                    <p className='dumi-default-download-description'>为了全面提升用户体验，设计赋能业务，我们提供了更多维的设计规范，帮助用户打造更好的产品</p>
                    <div className='download-content'>
                        {frontmatter.basedownload!.map(
                            ({ bg, title, description, download, waiting }) => {
                                // console.log("bg:", bg, "background:", bgList[bg]);
                                return (
                                    <div
                                        key={title}
                                        className='download-item'
                                        style={{
                                            // background:  bgList[bg],
                                            // backgroundRepeat: 'no-repeat'
                                        }}
                                    >
                                        {bg && <img src={bg} />}
                                        <div className='item-info'>
                                            <h3>{title}</h3>
                                            <p>{description}</p>
                                            <button>{download}</button>
                                            <div>
                                                <p><img src={warn} />{waiting}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='dumi-default-bottom'>
                <img src={bottom} />
            </div>
        </>
    ) : null
}
export default BaseDownload;