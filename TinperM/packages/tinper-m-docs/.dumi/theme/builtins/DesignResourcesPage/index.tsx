import CustomToc from '.dumi/theme/slots/CustomToc'
import Sidebar from '.dumi/theme/slots/Sidebar'
import React, { useEffect, useRef, useState } from 'react'
// import { getBasicResour, getExtraResour } from './loadMenue'
import { handleReportButtonClick } from '../../utils'
import './index.less'
import title from '../../../../public/移动端设计资源.png'
import iconPath from '../../../../public/resource/iconPath.svg'
import icon1 from '../../../../public/resource/icon1.png'
import icon2 from '../../../../public/resource/icon2.png'
import Download from '@tinper/m-icons/lib/cjs/Download'
import InforCircle from '@tinper/m-icons/lib/cjs/InforCircle'
import { random } from 'lodash'
import axios from 'axios'
import MobileDemoLayout from '.dumi/theme/layouts/DemoLayout'

const data1 = [
  {
    title: 'TinperM 基础组件库',
    updatePerson: '滕俊哲',
    updateTime: '2024-01-25',
    cardInfo: [
      {
        title: '原子组件',
        info: '单一的不可再拆分的底层组件'
      },
      {
        title: '应用场景广泛',
        info: '适用于用友各类业务场景'
      },
    ]
  },
]
const bgColors = ['#FFF9EE', '#FFF4F5', '#F1F5FF', '#EEF8FF', '#FFF4F5'];


function DesignResourcesPage(props: any) {
  const { params } = props
  const [resource, setResource] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    let mobileResource = ''
    const getResourceList = async () => {
      const URL = window.location.href.includes('test') ?
        `` :
        ''
      const res = await axios(URL)
      if (res && res.data && res.data.status === 1) {
        mobileResource = res.data.data
        console.log(mobileResource)
        setResource(mobileResource[0])
      }
    }
    getResourceList()
  }, []);

  const getResourceDownload = () => {
    // console.log(resource)
    window.open(``)
  }
  const getFileSize = (fileSize: number) => {
    const test = (fileSize / 1000000).toFixed(1) + 'MB'
    return test
  }
  return <div className='design-resources-page'>
    <div className='banner-mobile'>
      <img className='page-title-mobile' title='设计资源中心' src={title} />
      <div className='subtitle-mobile'>汇集移动端所有共享资源，可自行下载或预览所需文件</div>
    </div>
    {showMessage ?
      <div className='login-message'>
        <InforCircle className='login-message-info'></InforCircle>
        <div className='login-message-content'>请登录后下载</div>
      </div> : ''}
    <div className='resource-content'>
      <div className='resource-title'>资源分类</div>
      <ul className='resource-body lg-size'>
        {
          data1.map((item, index) => (
            <li className='resource-item'
              style={{ background: bgColors[index] }}

            >
              <div className='resource-item-title'>
                <img src={
                  // window.location.href.includes('bip-test') ?
                  //   iconPath :
                  ``} />
                <h4 onClick={() => { window.location.hash = '#/basic-components/introduce' }}
                  title={resource?.resourceName}>
                  {item.title}
                </h4>
                <button className='download-button'
                  onClick={() => {
                    if (localStorage.getItem('isLogin') == 'true')
                      getResourceDownload()
                    else {
                      setShowMessage(true);
                      setTimeout(() => {
                        setShowMessage(false)
                      }, 2000);
                    }
                    handleReportButtonClick({
                      entry_mode: 'tinperm_menu_top',
                      button_id: 'tm_resource_btn_tinperM',
                      button_name: 'TinperM 基础组件库',
                    }
                    );
                    // console.log(localStorage.getItem('isLogin'))
                  }}
                >
                  <Download className='download' />立即下载
                </button>
              </div>
              <div className='file-info'>
                <span>文件大小：{
                  // window.location.href.includes('bip-test')
                  // ? 5061109 :
                  getFileSize(resource?.fileSize)}</span>
                <span>更新时间：{
                  // window.location.href.includes('bip-test')
                  // ? '2024-03-18 16:34:12' :
                  resource?.modifiedtime}</span>
              </div>
              <div className='detail'>
                {
                  item.cardInfo.map((item, index) => {
                    return (
                      <div className={'detail-item'}>
                        <img width="36" id={`img_${index + 1}`} src={icon1} />
                        <h4 className={'name'}>{item.title}</h4>
                        <div title={item.info} className={'desc'}>{item.info}</div>
                      </div>
                    )
                  })
                }
              </div>
            </li>
          ))
        }
      </ul>
      {/* <ul className='resource-body'>
        {
          data2.map((item, index) => (
            <li className='resource-item' style={{ background: bgColors[index] }}>
              <div className='resource-item-title'>
                <img src={icon} />
                <h4 title={item.title}>{item.title}</h4>
                <Download className='download2'></Download>
              </div>
              <span style={{ display: 'block' }}>上传者：{item.updatePerson}</span>
              <span style={{ display: 'block' }}>更新时间：{item.updateTime}</span>
            </li>
          ))
        }
      </ul> */}
    </div>
  </div>
}

export default DesignResourcesPage
