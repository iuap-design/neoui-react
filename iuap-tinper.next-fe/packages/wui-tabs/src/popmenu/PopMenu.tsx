import React from 'react'
import {findDOMNode} from 'react-dom'
import Menu from '../../../wui-menu/src'
// import PropTypes from 'prop-types';
import { PopMenuProps, PopMenuState } from '../iTabs'
import { MenuProps } from '../../../wui-menu/src/iMenu'

let {Item} = Menu

// const propTypes = {
//     items: PropTypes.any,
//     onMenuClick: PropTypes.func
// }

class PopMenu extends React.Component<PopMenuProps, PopMenuState> {
    constructor(props: PopMenuProps) {
        super(props)
        this.state = {
            visible: false,
            activeKey: '',
            position: {}
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
	    let {items, clsPrefix} = this.props
	    let menu = (
	        items!.map(item => {
	            return (item && <Item key={item.key}>{item.text}</Item>)
	        })
	    )

	    return (<Menu onSelect={this.onSelect} className={`${clsPrefix}-close-menu`}>{menu}</Menu>)
	}
	onSelect: MenuProps['onSelect'] = (val) => {
	    let {onMenuClick} = this.props
	    onMenuClick!(val?.key, this.state.activeKey as string)
	    this.hide()
	}
	// 显示右键菜单
	show = (event: React.MouseEvent, activeKey: string, showX: number, showY: number) => {
	    let position = {
	        left: showX !== undefined ? showX : event.clientX,
	        top: showY !== undefined ? showY : event.clientY,
	        position: 'absolute',
	        zIndex: '1400',
	    };
	    let { onPopMenuIsShow } = this.props
	    let leftNum = showX !== undefined ? showX : event.clientX
	    this.setState({
	        visible: leftNum > -2,
	        activeKey,
	        position
	    })
	    onPopMenuIsShow(true)
	}
	// 隐藏右键菜单
	hide = () => {
	    let { onPopMenuIsShow } = this.props
	    this.setState({
	        visible: false
	    })
	    onPopMenuIsShow(false)
	}

	render() {
	    return (this.state.visible ? (<div style={this.state.position} onMouseLeave={()=>this.hide()}>
	        {this.renderMenus()}
	    </div>) : null)
	}
}

// PopMenu.propTypes = propTypes
export default PopMenu
