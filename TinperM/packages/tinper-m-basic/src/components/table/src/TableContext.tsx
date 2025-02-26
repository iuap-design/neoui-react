import React from 'react';

interface TableContextProps {
  table: any
}

const TableContext: React.Context<TableContextProps | any> = React.createContext({})

export default TableContext
