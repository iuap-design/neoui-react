import React, { useState } from 'react';
import './demo.less'
import * as icons from '@tinper/m-icons'
import allIcons from '@tinper/m-icons/lib/cjs/icons.js'

function copyToClipboard(text) {
  // 创建一个临时 textarea 元素
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // 将 textarea 添加到 DOM 中
  document.body.appendChild(textarea);

  // 选中 textarea 内容
  textarea.select();

  // 执行复制操作
  document.execCommand('copy');

  // 移除 textarea
  document.body.removeChild(textarea);
  showToast('已复制', 1000);
}

function showToast(message: string, duration = 2000) {
  const toastContainer = document.getElementById('icon-copy-toast');
  if (!toastContainer) return
  toastContainer.textContent = message;
  toastContainer.style.display = 'block';

  setTimeout(() => {
    toastContainer.style.display = 'none';
  }, duration);
}

enum COPY_TYPE {
  M_ICONS = 1,
  ICON = 2
}

export default function IconBoard () {
  const [copyType, setCopyType] = useState(COPY_TYPE.M_ICONS)
  return (
    <>
      <div className='select-icon-board' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '16px' }}>{'图标库(点击图标库复制代码)'}</h3>
        <div className="select-copy-type" style={{ display: 'flex', alignItems: 'center' }}>
          <input type="radio" checked={copyType === COPY_TYPE.M_ICONS} onClick={() => setCopyType(COPY_TYPE.M_ICONS)} id="copy-m-icons" /><label htmlFor="copy-m-icons">按需引用</label>
          <input type="radio" checked={copyType === COPY_TYPE.ICON} onClick={() => setCopyType(COPY_TYPE.ICON)} id="copy-icon" /><label htmlFor="copy-icon">复制Icon</label>
        </div>
      </div>
      <div className="icon_lists dib-box">
        {allIcons.map((iconInfo: any) => {
          const { name, id } = iconInfo
          const Icon = icons[name]
          const importCode = copyType === COPY_TYPE.M_ICONS ? `import ${name} from '@tinper/m-icons/lib/cjs/${name}'` : `<Icon type='${id}' />`
          return (
            <div className="dib" key={name} onClick={() => copyToClipboard(importCode)}>
              <Icon style={{ width: '36px', height: '36px' }} />
              <div className="id">#{id}</div>
              <div className="code-name">{name}</div>
            </div>)
        })
        }
      </div>
      <div id="icon-copy-toast"></div>
    </>
  )
}
