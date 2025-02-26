import * as React from 'react';
import { BaseHtmlProps } from '../../wui-core/src/iCore';


export interface TagProps extends Omit<BaseHtmlProps<HTMLElement>, 'size'> {
    /**
	 * @title 形状
	 */
    bordered?: boolean;

    /**
	 * @title 类型
	 * 旧 colors
	 * 新 color
	 */
    colors?: string;
	color?: string;
	/**
	 * @title 选中颜色
	 */
	 activeColor?: string;
    /**
	 * @title 是否禁用
	 * @veIgnore
	 */
    disabled?: boolean;

    /**
	 * @title 是否删除
	 * @veIgnore
	 * 旧 deleted
	 * 新 closable
	 */
    deleted?: boolean;
	closable?: boolean;

    /**
	 * @title 是否可以选择
	 * @veIgnore
	 */
    select?: boolean;
    /**
	 * @title 是否选中
	 * @veIgnore
	 */
    selected?: boolean;
    checked?: boolean;
    /**
	 * @title 标签是否显示关闭图标
	 * @veIgnore
	 */
    visible?: boolean;

    /**
	 * @title 类名
	 * @veIgnore
	 */
    className?: string;
    /**
	 * @title 标签点击事件 已兼容onClick
	 * @veIgnore
	 * 旧 tagClick
	 * 新 onClick
	 * 新 onChange
	 */
    tagClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
	onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
	onChange?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    /**
	 * @title 标签关闭回调函数
	 * @veIgnore
	 */
    onClose?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    /**
	 * @title 标签关闭自定义按钮
	 * @veIgnore
	 */
    closeIcon?: React.ReactNode;
    /**
	 * @title 设置图标
	 * @veIgnore
	 */
    icon?: React.ReactNode;
    /**
	 * @title 标签大小 lg&md&sm
	 * @veIgnore
	 */
    size?: 'lg' | 'md' | 'sm';
	type?: 'default' | 'filled' | 'bordered';
}

export interface TagState {
    selected: boolean;
    visible: boolean;
}
