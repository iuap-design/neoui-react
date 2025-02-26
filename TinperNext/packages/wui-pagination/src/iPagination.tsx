import * as React from 'react';
import { BaseHtmlProps, BaseProps } from '../../wui-core/src/iCore';
import { SelectProps } from '../../wui-select/src/iSelect';

export type Align = {
    points?: [string, string];
    offset?: [number, number];
    targetOffset?: [number, number];
    overflow?: {
      adjustX?: boolean;
      adjustY?: boolean;
    };
};

export type PageSizeInputObject = {
    max: number
}

export interface PaginationProps extends BaseProps {
     /**
	 * 当前激活状态页
	 */
      current?: number;
      /**
       * 指定分页数量
       */
      pageSize?: number | string;
      /**
       * 默认分页数量
       */
      defaultPageSize: number | string;
      /**
       * 当前激活状态页（旧）
       */
      activePage?: number;
      /**
       * 总页数
       */
      items?: number;
      /**
       * 显示按钮从1到maxButton的按钮数
       */
      maxButtons: number;

      /**
       * 当为true,不管切换到多少页都显示第一页和最后一页的按钮
       */
      boundaryLinks: boolean;

      /**
       * 当为true,显示省略号，否则
       *
       */
      ellipsis: boolean;

      /**
       *  当为true,显示点击到第一页的按钮
       */
      first: boolean;

      /**
       *  当为true,显示点击到最后一页的按钮
       */
      last: boolean;

      /**
       * 当为true,显示前一页按钮
       */
      prev: boolean;

      /**
       * 当为true,显示下一页按钮
       */
      next: boolean;

      /**
       * 暴露给用户的切换页的方法
       * onChange（新 antd）
       * onSelect（旧）
       */
      onSelect?: (eventKey: number, pageSize: number, event?: React.MouseEvent<HTMLElement>) => void;
      onChange?: (eventKey: number, pageSize: number, event?: React.MouseEvent<HTMLElement>) => void;
      /**
       * You can use a custom element for the buttons
       */
      buttonComponentClass?: React.ElementType;
      /**
       * 每页多少条的选择
       * dataNumSelect 旧
       * pageSizeOptions（新 antd）
       */
      dataNumSelect?: (number | string)[];
      pageSizeOptions: (number | string)[];
      /**
       * 每页多少条选择哪一个
       */
      dataNum?: number;
      /**
       * 页大小切换
       * onPageSizeChange(antd)
       * onDataNumSelect(旧)
       */
      onDataNumSelect?: (activePage: number, pageSize: number) => void;
      onPageSizeChange?: (activePage: number, pageSize: number) => void;
      onShowSizeChange?: (activePage: number, pageSize: number) => void;
      onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
      /**
       * 显示跳页
       * showQuickJumper(antd)
       * showJump(旧)
       */
      showQuickJumper: boolean;
      showJump?: boolean;
      /**
       * 显示总共条数
       */
      total: number;
      /**
       *  pagiantion不可点
       */
      disabled: boolean;
      /**
       *  渲染确认按钮的dom
       */
      confirmBtn?: (props: PaginationProps) => React.ReactNode;

      /**
       * 通过cookie来确定分页的size,需设定唯一的key值
       */
      // sizeWithCookie?: PropTypes.string,

      /**
       * 默认的当前页数
       * 新 defaultActivePage
       * 旧 defaultCurrent
       */
      defaultActivePage: number;
      defaultCurrent?: number;
      /**
       * 默认的每页条数
       */
      defaultDataNum?: number;
      /**
       * 只有一页时是否隐藏分页器
       */
      hideOnSinglePage: boolean;
      /**
       * 当 size 未指定时，根据屏幕宽度自动调整尺寸
       */
      // responsive?: PropTypes.bool,
      /**
       * 通是否展示pageSize切换器
       */
      showSizeChanger: boolean;
      /**
       * 用于自定义页码的结构
       */
      itemRender?: (eventKey: number | undefined, type: string, ComponentWrap: React.ReactNode) => React.ReactNode;
      /**
       * 是否显示原生 tooltip 页码提示
       */
      showTitle: boolean;
      /**
       * 用于自定义页码的结构 -- 不再对外开放
       */
      showTotal?: (total: number, arry: number[]) => React.ReactNode;
      /**
       * 用于自定义页码的结构
       */
      simple?: boolean | {showSizeChanger?: boolean; showQuickJumper?: boolean;};
      /**
       * 分页按钮大小
       */
      size: string;
      locale: string;
      noBorder: boolean;
      gap: boolean;
      /**
       * sizeChange 下拉框下拉方向控制
       * 设置align 对象,具体参考dropdown placement.js
       * */
      dropdownAlign?: Align;
      id?: string;
      pageSizeInput: boolean | PageSizeInputObject;
      sizeChangerProps?: SelectProps;
      cacheId?: string;
      dir?: 'ltr' | 'rtl';
}

export interface PaginationState {
    activePage: number; // 当前的页码
    pageSize: number;
    items: number;
    jumpPageState: number | null;
    // 分页大小下拉框是否展开，兼容select enter 操作影响其展开收起
    selectOpen: boolean;
    listHeight: number;
    selectFocus: boolean;
    loading: boolean;
    blurIsValid?: boolean;
}


export interface PaginationButtonAdapterPublic {
    onChange?: (eventKey: number, pageSize: number, event: React.MouseEvent<HTMLElement>) => void;
    pageSize?: number;
    itemRender?: PaginationProps['itemRender'];
    componentClass: PaginationProps['buttonComponentClass'];
    iconBtn: boolean;
    showTitle?: PaginationProps['showTitle'];
}

export type PaginationButtonType = 'ellipsis' | 'first' | 'prev' | 'next' | 'last' | 'page' | 'center' | 'loading';

export interface PaginationButtonAdapter extends PaginationButtonAdapterPublic, Omit<BaseHtmlProps<HTMLElement>, 'onChange'>{
    children?: React.ReactNode;
    type: PaginationButtonType;
    display?: boolean;
    disabled?: boolean;
    simple?: PaginationProps['simple'];
    key?: React.Key;
    title?: string;
    id?: string;
    eventKey?: number;
    pagenumber?: number;
    active?: boolean;
}

// export interface PaginationButtonProps extends PaginationButtonAdapter {


// }