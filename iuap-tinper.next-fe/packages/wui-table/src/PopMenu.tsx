import React from 'react'
import {findDOMNode} from 'react-dom'
import Menu from '../../wui-menu/src'
import Divider from '../../wui-divider/src'
import { MenuProps } from '../../wui-menu/src/iMenu';
import { Key } from './iTable';
import { ConfigConsumerProps } from "../../wui-provider/src/iProvider";
import { getLangInfo } from '../../wui-locale/src/tool';
import i18n from './lib/i18n';

let {Item} = Menu

interface PopMenuProps {
    clsPrefix?: string;
    popMenu?: (rowKeys: Key[], colKeys?: Key[]) => {key: Key, text: Key}[];
    onPopMenuIsShow?: (open: boolean) => void;
    onMenuClick?: (type: Key, rowKeys: Key[], colKeys: Key[]) => void;
	onCopyCell?:(e: any, type: string) => void;
	locale?: any;
	dir?: 'ltr' | 'rtl';
}

interface PopMenuState {
    visible?: boolean;
    contextMenuKey: Key[];
    contextMenuDataIndex: Key[];
    position?: any
}

class PopMenu extends React.Component<PopMenuProps, PopMenuState> {
	context!: ConfigConsumerProps;
	constructor(props: PopMenuProps) {
	    super(props)
	    this.state = {
	        visible: false,
	        contextMenuKey: [],
	        contextMenuDataIndex: [],
	        position: {},
	    }
	}

	mounted: any;
	componentDidMount() {
	    this.mounted = true;
	    document.addEventListener('click', this.onDocumentClick)
	}

	componentWillUnmount() {
	    this.mounted = false;
	    document.removeEventListener('click', this.onDocumentClick)
	}

	// 判断n是否在root内
	contains(root: any, n: any) {
	    let node: any = n;
	    while (node) {
	        if (node === root) return true;
	        node = node.parentNode
	    }
	    return false;
	}

	// 点击contextmenu以外的地方将其关闭
	onDocumentClick = (event: any) => {
	    if (this.mounted === false) return;// 解决IE下报错findDOMNode
	    let target = event.target;
	    let contextDom = findDOMNode(this);
	    if (!this.contains(contextDom, target)) {
	        this.hide();
	    }
	}

	renderMenus = () => {
	    let {clsPrefix, popMenu, locale, dir: direction} = this.props;
	    if (!popMenu) return;
	    const {contextMenuKey, contextMenuDataIndex} = this.state;
	    let _locale = getLangInfo(locale, i18n, 'table');
	    let items = popMenu(contextMenuKey, contextMenuDataIndex);
	    const defaultItems = [
	        {
	            key: '_copyText',
	            text: `${_locale.langMap.copyText || '复制文本'}`
	        },
	        {
	            key: '_copyRows',
	            text: `${_locale.langMap.copyRows || '复制整行'}`
	        },
	        {
	            key: '_copyCells',
	            text: `${_locale.langMap.copyCols || '复制整列'}`
	        }
	    ]
	    let defaultMenuItems = defaultItems.map((item: any) => {
	        return <Item key={item.key}>{item.text}</Item>
	    });

	    let customMenuItems = Array.isArray(items) && items.length ? items.map((item: any) => {
	        return <Item key={item.key}>{item.text}</Item>
	    }) : null;

	    let dividerLine = Array.isArray(items) && items.length ? <Divider style={{ margin: 0 }}/> : null;

	    return (
	        <div className={`${clsPrefix}-cell-selected-menu`}>
	            <Menu onSelect={this.onSelect} mode={'dropdown'} className={`${clsPrefix}-close-menu`} dir={direction}>{defaultMenuItems}</Menu>
	            {dividerLine}
	            { customMenuItems ? <Menu onSelect={this.onSelect} mode={'dropdown'} className={`${clsPrefix}-close-menu`} dir={direction}>{customMenuItems}</Menu> : null }
	        </div>
	    )
	}
	onSelect: MenuProps['onSelect'] = (val) => {
	    let {onMenuClick, onCopyCell} = this.props;
	    const { contextMenuKey, contextMenuDataIndex } = this.state;
	    const { key, domEvent } = val;
	    if (key === '_copyText') {
	        onCopyCell && onCopyCell(domEvent, '_all');
	    } else if (key === '_copyRows') {
	        onCopyCell && onCopyCell(domEvent, '_row');
	    } else if (key === '_copyCells') {
	        onCopyCell && onCopyCell(domEvent, '_cell');
	    } else {
	        onMenuClick && onMenuClick!(val?.key, contextMenuKey, contextMenuDataIndex)
	    }
	    this.hide()
	}
	// 显示右键菜单
	show = (event: React.MouseEvent, contextMenuKey: Key[], contextMenuDataIndex:Key[], showX: number, showY: number) => {
	    let position = {
	        left: showX !== undefined ? showX : event.clientX,
	        top: (showY !== undefined ? showY : event.clientY),
	        position: 'fixed',
	        zIndex: '1400',
	    };
	    let { onPopMenuIsShow } = this.props
	    this.setState({
	        visible: true,
	        contextMenuKey,
	        contextMenuDataIndex,
	        position,
	        // event
	    })
	    onPopMenuIsShow && onPopMenuIsShow(true)
	}
	// 隐藏右键菜单
	hide = () => {
	    let { onPopMenuIsShow } = this.props
	    if (this.state.visible) {
	        this.setState({
	            visible: false
	        })
	    }
	    onPopMenuIsShow && onPopMenuIsShow(false)
	}

	render() {
	    // return (this.state.visible ? (<div style={this.state.position} onMouseLeave={()=>this.hide()}>
	    //     {this.renderMenus()}
	    // </div>) : null)
	    return (this.state.visible ? (<div style={this.state.position}>
	        {this.renderMenus()}
	    </div>) : null)
	}
}

// PopMenu.propTypes = propTypes
export default PopMenu
