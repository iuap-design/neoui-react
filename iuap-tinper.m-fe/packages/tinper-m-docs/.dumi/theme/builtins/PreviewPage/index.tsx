import React from 'react'
import { withRouter } from 'dumi';
import './index.less'
import QRCode from 'qrcode.react';
import Phone from './Phone'

function PreviewPage(props) {
  const appUrl = location.href.search('index.html#/preview/') !== -1 ? location.href.replace(/\/index\.html#\/preview\/.*/, '/tinper-m-app/index.html#/home/Home') : '/tinper-m-app/index.html#/home/Home'
  return <div className='preview-page'>
    <div className='preview-page-content'>
      {/* <Phone />
      <div className='preview-page-qrcode'>
        <QRCode
          id="tinper-m-qrcode"
          value={location.href}
          size={129} // 二维码的大小
          fgColor="#000000" // 二维码的颜色
        />
      </div> */}
      <Phone>
        <iframe src={appUrl}/>
      </Phone>
      <div className='preview-page-qrcode'>
        <QRCode
          id="tinper-m-app-qrcode"
          value={appUrl}
          size={129} // 二维码的大小
          fgColor="#000000" // 二维码的颜色
        />
      </div>
    </div>
  </div>
}

export default withRouter(PreviewPage)
