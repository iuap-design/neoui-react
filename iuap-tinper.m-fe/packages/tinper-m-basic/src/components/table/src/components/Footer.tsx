import React, { useEffect, useMemo } from 'react'
import { flexRender } from '@tanstack/react-table'

function Footer (props: any) {
  const { table } = props
  return (
    <div className='tfoot'>
      {table.getFooterGroups().map(footerGroup => (
        <div className='tr' key={footerGroup.id}>
          {footerGroup.headers.map(header => (
            <div className='td' key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.footer,
                  header.getContext()
                )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Footer
