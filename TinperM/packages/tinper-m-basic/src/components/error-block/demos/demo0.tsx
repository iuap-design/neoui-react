/**
 * @title 基础用法
 * @description: 基础用法
 */
import React from 'react'
import { ErrorBlock } from '@tinper/m'


export default () => {
  return (
    <>
      <h3>五种状态</h3>
      <div>
        <ErrorBlock status='default' fieldid='errorblock1'/>
        <div style={{ height: '1.6rem' }}></div>
        <ErrorBlock status='disconnected' fieldid='errorblock2'/>
        <div style={{ height: '1.6rem' }}></div>
        <ErrorBlock status='failed' fieldid='errorblock3'/>
        <div style={{ height: '1.6rem' }}></div>
        <ErrorBlock status='denied' fieldid='errorblock4'/>
        <div style={{ height: '1.6rem' }}></div>
        <ErrorBlock status='error' fieldid='errorblock5'/>
      </div>
    </>
  )
}
