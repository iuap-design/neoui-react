import React from "react";
import { Button } from '@tinper/m';
import WebUI from '@utils/UpdatePrefixs'
import ArrowIosRight from '@tinper/m-icons/lib/cjs/ArrowIosRight'
import ArrowIosLeft from '@tinper/m-icons/lib/cjs/ArrowIosLeft'

import './Pagination.less'

function Pagination (props) {
  const { clsPrefix } = props;
  return <div className={`${clsPrefix}-table-pagination ${clsPrefix}-table-basic-pagination`} >
    <Button
      clasName={`${clsPrefix}-table-pagination-button`}
      mode='text'
      icon={<div className={`${clsPrefix}-table-pagination-button-icon`}><ArrowIosLeft /></div>}
      iconPosition='left'
      onClick={props.previousPage}
      disabled={!props.canPreviousPage}
    >
      上一页
    </Button>
    <span>
      <strong>
        {props.pagination.pageIndex + 1} / {props.pageCount}
      </strong>
    </span>
    <Button
      clasName={`${clsPrefix}-table-pagination-button`}
      mode='text'
      icon={<ArrowIosRight />}
      iconPosition='right'
      onClick={props.nextPage}
      disabled={!props.canNextPage}
    >
      下一页
    </Button>
  </div>
}

export default WebUI({})(Pagination)
