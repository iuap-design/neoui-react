import React, { useRef, useState, useEffect } from 'react'
import classnames from 'classnames'
import { Popover, ActionSheet, Button } from '@tinper/m'
import WebUI from '@utils/UpdatePrefixs'
import MoreHorizontal from '@tinper/m-icons/lib/cjs/MoreHorizontal'
import { ToolBarProps } from './iToolBar'

const defaultProps = {
  mode: 'popup'
}

function ToolBar(props: ToolBarProps) {
  const divRefs = useRef([])
  const {
    direction = props.buttonWidthAuto ? "left" : "right",
    className,
    style,
    fieldid,
    onDotClick,
    buttonWidthAuto,
    maxVisibleNum = 2, // maxVisibleNum 默认为 2 只在 buttonWidthAuto 下成立
    ...others
  } = props

  const timer = useRef<number>();
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [maxNum, setMaxNum] = useState(props.buttonWidthAuto ? maxVisibleNum : 200)
  const [maxWidthAuto, setMaxWidthAuto] = useState(0);
  const _clsPrefix = `${props.clsPrefix}-toolbar`

  const prevMaxVisibleNumRef = React.useRef<any[] | null>(null);
  const prevChildrenRef = React.useRef<any[] | null>(null);

  const getMaxNum = () => {
    setMaxNum(200)
    setTimeout(() => {
      // 整体父容器宽度,超出显示标识宽度,整体父容器的左右 padding,把左右padding获取到的px相加
      const parentWidth = divRefs.current[0]?.current?.parentNode?.offsetWidth;
      if (parentWidth) {
        // 三点的占位
        const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const paddingItemLeft = window.getComputedStyle(divRefs.current[0]?.current?.parentNode)?.getPropertyValue('--item-padding-left');
        const paddingItemRight = window.getComputedStyle(divRefs.current[0]?.current?.parentNode)?.getPropertyValue('--item-padding-right');
        const paddingItemLeftNum = (paddingItemLeft && paddingItemLeft.match(/\d+(\.\d+)?/)) ? paddingItemLeft.match(/\d+(\.\d+)?/) : "0.12";
        const paddingItemRightNum = (paddingItemRight && paddingItemRight.match(/\d+(\.\d+)?/)) ? paddingItemRight.match(/\d+(\.\d+)?/) : "0.12";
        const dotWidth = (0.44 + parseFloat(paddingItemLeftNum) + parseFloat(paddingItemRightNum)) * remToPx;
        const paddingStyle = window.getComputedStyle(divRefs.current[0].current.parentNode);
        // 父容器的padding
        const padding = parseInt(paddingStyle.paddingRight.match(/\d+/)[0], 10) + parseInt(paddingStyle.paddingRight.match(/\d+/)[0], 10);
        if (direction !== 'left') {
          let sum = 0;
          let num = 1; // 只显示num个
          for (let i = divRefs.current.length - 1; i > -1; i--) {
            sum = sum + divRefs.current[i].current.offsetWidth;
            if (i === 0 && sum < parentWidth - padding && props.maxVisibleNum) setMaxNum(props.maxVisibleNum)
            if (sum > parentWidth - padding) {
              num = divRefs.current.length - i - 1;
              if ((sum - divRefs.current[i].current.offsetWidth + dotWidth) > (parentWidth - padding)) num = num - 1;
              if (!props.maxVisibleNum || (props.maxVisibleNum && props.maxVisibleNum > num)) {
                setMaxNum(num)
              } else if (props.maxVisibleNum) {
                setMaxNum(props.maxVisibleNum)
              }
              break
            }
          }
        } else {
          let sum = 0;
          let num = 1; // 只显示num个
          for (let i = 0; i < divRefs.current.length; i++) {
            sum = sum + divRefs.current[i].current.offsetWidth;
            if (i === divRefs.current.length - 1 && sum < parentWidth - padding && props.maxVisibleNum) setMaxNum(props.maxVisibleNum)
            if (sum > parentWidth - padding) {
              num = i;
              if ((sum - divRefs.current[i].current.offsetWidth + dotWidth) > (parentWidth - padding)) num = i - 1;
              if (!props.maxVisibleNum || (props.maxVisibleNum && props.maxVisibleNum > num)) {
                setMaxNum(num)
              } else if (props.maxVisibleNum) {
                setMaxNum(props.maxVisibleNum)
              }
              break
            }
          }
        }
      } else {
        setMaxNum(props.maxVisibleNum || 3)
      }
    }, 0);
    getToolbarItem()
  }

  // 获取 buttonWidthAuto 下按钮数量超出最大显示数时，按钮最大宽度限制
  const getMaxWidth = () => {
    setTimeout(() => {
      const parentWidth = divRefs.current[0]?.current?.parentNode?.offsetWidth;
      if (parentWidth && Array.isArray(props.children) && props.children.length > maxVisibleNum) {
        const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const paddingStyle = window.getComputedStyle(divRefs.current[0].current.parentNode);
        // 父容器的padding
        const padding = parseInt(paddingStyle.paddingRight.match(/\d+/)[0], 10) + parseInt(paddingStyle.paddingRight.match(/\d+/)[0], 10);
        const moreWidth = document.getElementById("toolbar-auto-more-wrapper-id")?.offsetWidth || 72;
        let tempWidth = (parentWidth - padding - moreWidth) / (remToPx * maxVisibleNum)
        if (tempWidth) setMaxWidthAuto(tempWidth)
      }
    }, 0)
  }

  useEffect(() => {
    buttonWidthAuto && getMaxWidth();
  }, [props.maxVisibleNum, props.children, props.buttonWidthAuto])

  useEffect(() => {
    !buttonWidthAuto && getMaxNum();
    buttonWidthAuto && getMaxWidth();
  }, []);

  useEffect(() => {
    if (!buttonWidthAuto && prevMaxVisibleNumRef.current === null) prevMaxVisibleNumRef.current = props.maxVisibleNum;
    if (!buttonWidthAuto && prevMaxVisibleNumRef.current && (prevMaxVisibleNumRef.current !== props.maxVisibleNum)) {
      prevMaxVisibleNumRef.current = props.maxVisibleNum;
      getMaxNum()
    }
  }, [props.maxVisibleNum]);

  useEffect(() => {
    if (prevChildrenRef.current !== props.children && !buttonWidthAuto) {
      if (prevChildrenRef.current && props.children) {
        let qs1 = prevChildrenRef.current.length !== props.children.length && divRefs.current?.filter((item) => item?.current === null).length === 0;
        let qs2: any = prevChildrenRef.current.length === props.children.length;
        if (qs2) {
          for (let i = 0; i < prevChildrenRef.current.length; i++) {
            if (prevChildrenRef.current?.[i].props.size !== props.children?.[i].props.size) {
              qs2 = '1';
            }
          }
        }
        if (qs1 || qs2 === '1') {
          getMaxNum()
        }
      }
      prevChildrenRef.current = props.children;
    }
  }, [props.children]);

  // 点击popover弹出框中的按钮时触发的函数
  const onSelect = (node: any, index?: number) => {
    const { onSelect } = props;
    onSelect?.(node, index)
    setVisible(false)
    setVisible1(false)
  }

  const getToolbarItem = () => {
    const { children = [], mode = 'popup' } = props
    const toolbarItemCls = `${_clsPrefix}-item`
    if (Array.isArray(children)) {
      // 获取要隐藏在popover框中的元素
      const popoverBtnTemp = direction === 'left' ? children.slice(maxNum, children.length) : children.slice(0, children.length - maxNum)
      const popoverBtn = popoverBtnTemp.map(
        (item, index) => item && <div
          key={index}
          className={`${_clsPrefix}-item-more-item`}
          onClick={() => onSelect(item, index)}
          fieldid={fieldid ? fieldid + '_toolbar_item_more_item_' + index : undefined}
        >{item}</div>
      )
      let maxWidth = (buttonWidthAuto && !(maxNum < props.children?.length)) ? (100 / props.children?.length + "%") : (maxWidthAuto ? maxWidthAuto + "rem" : `calc((100% - 1.44rem)/${maxNum})`)
      const res = children.map(
        (item, index) => {
          const ref = divRefs.current[index] || React.createRef();
          divRefs.current[index] = ref;
          return <div
            key={index}
            ref={ref}
            className={toolbarItemCls}
            style={{ maxWidth: buttonWidthAuto && maxWidth }}
            fieldid={fieldid ? fieldid + '_toolbar_item_' + index : undefined}
          >{item}</div>
        }
      )
      if (onDotClick && children.length > maxNum) {
        // 截断超出dot点击事件
        const toolbarBtn = direction === 'left' ? res.slice(0, maxNum) : res.slice(res.length - maxNum)
        const final = (
          <div
            tabIndex={0}
            key={-1}
            className={classnames(toolbarItemCls, `${_clsPrefix}-item-more`)}
            fieldid={fieldid ? fieldid + '_toolbar_item_more' : undefined}
            onClick={(e) => {
              e.stopPropagation();
              onDotClick?.(popoverBtnTemp, children, e);
            }}
            id={buttonWidthAuto ? "toolbar-auto-more-wrapper-id" : undefined}
          >
            {
              buttonWidthAuto ? (
                <Button icon={<MoreHorizontal size='lg' />} className={`${_clsPrefix}-item-more-auto-button`}/>
              ) : <span><MoreHorizontal size='lg' className={`${_clsPrefix}-item-more-icon`} /></span>
            }
          </div>
        )
        direction !== 'left' ? toolbarBtn.unshift(final) : toolbarBtn.push(final)
        return toolbarBtn
      } else if (mode === 'popover' && children.length > maxNum) {
        const toolbarBtn = direction === 'left' ? res.slice(0, maxNum) : res.slice(res.length - maxNum)
        const popup =
          <div
            tabIndex={0}
            key={-1}
            className={classnames(toolbarItemCls, `${_clsPrefix}-item-more`)}
            fieldid={fieldid ? fieldid + '_toolbar_item_more' : undefined}
            onBlur={() => {
              clearTimeout(timer.current);
              timer.current = window.setTimeout(() => {
                setVisible(false)
              }, 100)
            }}
            onClick={(e) => {
              e.stopPropagation();
              setVisible(!visible)
            }}
            id={buttonWidthAuto ? "toolbar-auto-more-wrapper-id" : undefined}
          >
            <Popover
              content={popoverBtn}
              placement={props.placement || 'top'}
              getContainer={document.getElementById(`${_clsPrefix}-item-more`)}
              trigger='click'
              className={`${_clsPrefix}-item-more-popover`}
              visible={visible}
              fieldid={fieldid ? fieldid + '_toolbar_more_popover' : undefined}
            >
              {
                buttonWidthAuto ? (
                  <Button icon={<MoreHorizontal size='lg' />} className={`${_clsPrefix}-item-more-auto-button`}/>
                ) : <span><MoreHorizontal size='lg' className={`${_clsPrefix}-item-more-icon`} /></span>
              }
            </Popover>
          </div>
        direction !== 'left' ? toolbarBtn.unshift(popup) : toolbarBtn.push(popup)
        return toolbarBtn
      } else if (mode === 'popup' && children.length > maxNum && children.filter(item => item.type !== Button).length === 0) {
        // 获取要隐藏在popup中的元素
        let actions: any = [];
        children.forEach((item, index) => actions.push({ text: item.props.children, key: index, node: item }))
        const toolbarBtn = direction === 'left' ? res.slice(0, maxNum) : res.slice(res.length - maxNum)
        const popup =
          <div
            tabIndex={0}
            key={-1}
            className={classnames(toolbarItemCls, `${_clsPrefix}-item-more`)}
            fieldid={fieldid ? fieldid + '_toolbar_item_more' : undefined}
            id={buttonWidthAuto ? "toolbar-auto-more-wrapper-id" : undefined}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                setVisible1(!visible1)
              }}
              className={`${_clsPrefix}-item-more-span`}
            >
              {
                buttonWidthAuto ? (
                  <Button icon={<MoreHorizontal size='lg' />} className={`${_clsPrefix}-item-more-auto-button`}/>
                ) : <span><MoreHorizontal size='lg' className={`${_clsPrefix}-item-more-icon`} /></span>
              }
            </span>
            <ActionSheet
              actions={actions}
              cancelText={props.cancelText}
              getContainer={document.getElementById(`${_clsPrefix}-item-more`)}
              className={`${_clsPrefix}-item-more-popup`}
              visible={visible1}
              fieldid={fieldid ? fieldid + '_toolbar_more_popup' : undefined}
              onClose={() => setVisible1(false)}
              onAction={(action: any, index: number) => {
                onSelect(action.node, index)
              }}
            >
            </ActionSheet>
          </div>
        direction !== 'left' ? toolbarBtn.unshift(popup) : toolbarBtn.push(popup)
        return toolbarBtn
      } else {
        return res
      }
    } else if (children) {
      return <div className={toolbarItemCls} fieldid={fieldid ? fieldid + '_toolbar_children' : undefined}>
        {children}
      </div>
    }
  }

  const wrapperCls = classnames(
    `${_clsPrefix}`,
    `${_clsPrefix}-wrapper`,
    className,
    buttonWidthAuto && `${_clsPrefix}-wrapper-auto`,
    buttonWidthAuto && !Array.isArray(props.children) && props.children?.type === Button && `${_clsPrefix}-wrapper-auto-single`
  )
  return (
    <div
      className={wrapperCls}
      style={{ ...style, textAlign: direction === 'left' ? 'left' : 'right' }}
      fieldid={fieldid ? fieldid + '_toolbar' : undefined}
      {...others}
    >
      {getToolbarItem()}
    </div>
  )
}

export default WebUI({ defaultProps })(ToolBar)