import React, { Children, useContext, useEffect, useMemo } from 'react'
import { flexRender } from '@tanstack/react-table'
import TableContext from '../TableContext'
import WebUI from '@utils/UpdatePrefixs'
import Cell from './Cell'


function Header (props: any) {
  const { fieldid, children } = props
  return (<div className='thead' fieldid={`${fieldid}_table_header`}>
    {children}
  </div>)
}

export default WebUI({})(Header)
