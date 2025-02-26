import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'dumi'
import { ReactComponent as LeftOutlined } from '@ant-design/icons-svg/inline-svg/outlined/left.svg';
import { ReactComponent as RightOutlined } from '@ant-design/icons-svg/inline-svg/outlined/right.svg';
const compConfig = require('../../../../comp.config.json')
const demoConfig = require('../../demoInfo.json')

const renderChildList = (list) => {
  return list.map(({ title, code, debug }) => {
      if (debug === true) return null
      return (
        <Link to={`/preview/${code}`}>
          <div className="demo-item-wrapper" key={code}>
            <div className='demo-item-title'>
                <span>{title}</span>
            </div>
            <div className='demo-item-detail-icon'>
              <RightOutlined style={{width: '10px', height: '10px'}} />
            </div>
          </div>
        </Link>
        )
    })
}

function Phone (props) {
  const { params } = props
  const curComp = params?.component
  const [curDemoIndex, setCurDemoIndex] = useState(0)
  const [curDemos, setCurDemos] = useState([])

  useEffect(() => {
    const demos = demoConfig?.[curComp]
    const curDemos = []
    demos && Object.keys(demos).forEach(demoFile => {
      const { mobile = true, title } = demos[demoFile]
      mobile && curDemos.push({
        title,
        demoFileName: demoFile.replace('.tsx', '')
      })
    })

    setCurDemos(curDemos)
  }, [curDemoIndex, curComp])

  const getDemoUrl = () => {
    const { demoFileName } = curDemos[curDemoIndex] || {}
    const demoUrl = `#/~demos/docs-basic-components-${curComp}-demo-${demoFileName}?locale=zh-CN`
    return demoUrl
  }

  const switchDemo = (mode: string) => {
    if (mode === 'next') {
      setCurDemoIndex(Math.min(curDemoIndex + 1, curDemos.length - 1))
    } else if(mode === 'prev') {
      setCurDemoIndex(Math.max(curDemoIndex - 1, 0))
    }
  }

  return <>
  <div className='preview-page-phone'>
    {
      props.children
      ? props.children
      : (
        !curComp ? (<>
          <h1><img className='logo' src='./logo.png' /></h1>
          <div className='demo-list'>
            {compConfig.map(({code, title, children}) => {
                const childList = renderChildList(children)?.filter(child => child !== null)
                return childList.length ? (<div key={code} className="component-wrapper">
                    <div className='demo-nav-title'>{title}</div>
                    {childList}
                </div>) : null
            })}
          </div>
        </>)
        : (<>
          <div className='header'>
            <Link to={`/preview/`}>
              <LeftOutlined style={{width: '20px'}}/>
            </Link>
            <div className='demo-title'>{curDemos[curDemoIndex]?.title}</div>
            <div className='demo-switch'>
              <LeftOutlined className={curDemoIndex === 0 ? 'demo-switch-btn disabled' : 'demo-switch-btn'} onClick={() => switchDemo('prev')} ondblclick={(event: { preventDefault: () => void; }) => {event.preventDefault();}} />
              <RightOutlined className={curDemoIndex === curDemos.length - 1 ? 'demo-switch-btn disabled' : 'demo-switch-btn'} onClick={() => switchDemo('next')} ondblclick={(event: { preventDefault: () => void; }) => {event.preventDefault();}} /></div>
            </div>
          <iframe src={getDemoUrl()} />
        </>)
      )
    }
  </div>
  </>
}

export default withRouter(Phone)
