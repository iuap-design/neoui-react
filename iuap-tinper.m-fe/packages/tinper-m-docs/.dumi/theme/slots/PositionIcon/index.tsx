import React, { type FC, type ReactNode } from 'react';
import web_erweima from '../../../../public/positionicon/web-erweima.png';
import ue_erweima from '../../../../public/positionicon/ue-erweima.png';

import './index.less';

const PositionIcon: FC = (props) => {
    // console.log(props)

    const onFeedMouseEnter = () => {
        document.querySelector('#feed-back')?.setAttribute('style', 'display: block');
    }

    const onFeedMouseLeave = () => {
        document.querySelector('#feed-back')?.setAttribute('style', 'display: none')
    }

    const onContactMouseEnter = () => {
        document.querySelector('#contact-info')?.setAttribute('style', 'display: block');
    }

    const onContactMouseLeave = () => {
        document.querySelector('#contact-info')?.setAttribute('style', 'display: none')
    }

    return (
        <div className='position-icon'>
            {
                props.person && (
                    <div className='contact-info icon-box' onMouseLeave={() => onContactMouseLeave()}>
                        {/* <img src={InfoImg} /> */}
                        <div className='icon' onMouseEnter={() => onContactMouseEnter()}><i /><span>支持人员</span></div>
                        <div className='popover' id="contact-info" onMouseEnter={() => onContactMouseEnter()} onMouseLeave={onContactMouseLeave}>
                            <ul className='popover-content'>
                                <li><span>负责人：</span>{props.person}</li>
                                {/* <li><span>电&nbsp;&nbsp;&nbsp;话：</span>{props.personPhone}</li> */}
                                <li><span>邮&nbsp;&nbsp;&nbsp;箱：</span>{props.email}</li>
                            </ul>
                        </div>

                    </div>
                )
            }

            <div className='feed-back icon-box'>
                <div className='icon' onMouseEnter={() => onFeedMouseEnter()} onMouseLeave={() => onFeedMouseLeave()}>
                    <i /><span>加群咨询</span>
                </div>
                <div className='popover' id="feed-back">
                    <h4 className='popover-title'><i />Yon Design 友空间交流群</h4>
                    <ul className='popover-img'>
                        <li><img src={web_erweima} /><span>前端开发</span></li>
                        <li><img src={ue_erweima} /><span>设计体验</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PositionIcon;