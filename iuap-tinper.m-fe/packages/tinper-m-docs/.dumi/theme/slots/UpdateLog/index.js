import React, { useEffect } from 'react';
import axios from 'axios'
import Log from '../../../../docs/develop-guide/updatelog.md'
import './index.less'
import StarFill from '../../../../public/updatelog/star-Fill.svg'
import AlertCircle from '../../../../public/updatelog/infor-circle.svg'

function UpdateLog(props) {
    let test = []
    useEffect(() => {
        test = Array.from(document.getElementsByTagName('li'))
        for (let i of test) {
            if (i.innerHTML.slice(0, 4).includes('[新增]') || i.innerHTML.slice(0, 4).includes('[优化]')) {
                // console.log(i.innerHTML);
                i.innerHTML = `<div>
                        <img src=${StarFill} style="width:16px;height:16px;"></img> 
                        ${i.innerHTML}
                    </div>`
            } else if (i.innerHTML.slice(0, 4).includes('[修复]') || i.innerHTML.slice(0, 4).includes('[修改]')) {
                i.innerHTML = `<div>
                    <img src=${AlertCircle} style="width:15px;height:15px;"></img> 
                    ${i.innerHTML}
                </div>`
            }
        }
    }, [test])

    return (<>
        <div className='update-log-content'>
            {props.outlet}
        </div>
    </>
    )
}
export default UpdateLog;