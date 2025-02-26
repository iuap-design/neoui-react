import React, { useReducer } from "react";
import { Button } from "@tinper/m";
/**
 * 排序模式切换
 */
enum ORDER_MODE {
  ASC = 'asc',
  DESC = 'desc',
  UNSET = 'unset'
}

const reducer = (state: ORDER_MODE) => {
  switch (state) {
  case ORDER_MODE.ASC:
    return ORDER_MODE.DESC
  case ORDER_MODE.DESC:
    return ORDER_MODE.UNSET
  case ORDER_MODE.UNSET:
    return ORDER_MODE.ASC
  }
}

function SwitchOrderBtn () {
  const [orderMode, dispatch] = useReducer(reducer, ORDER_MODE.UNSET)
  return <Button onClick={dispatch}>{orderMode}</Button>
}
