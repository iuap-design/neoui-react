/**
 * 过滤行功能内的下拉条件
 */

// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Button from '../../wui-button/src';
import {prefix} from "../../wui-core/src/index";
import Dropdown from '../../wui-dropdown/src';
import Icon from '../../wui-icon/src';
// import {getComponentLocale} from '../../wui-locale/src/tool';
import Menu from '../../wui-menu/src';
import i18n from './lib/i18n';
import {getLangInfo} from "../../wui-locale/src/tool";
import { IFilterDropDownProps, IFilterDropDownState } from './iTable';
import { FilterDropdownKeysStrType, FilterDropdownKeysNumType } from './interface';

const {Item} = Menu;

const defaultProps = {
    isShowCondition: 'show',
    filterDropdownType: 'string'
}
class FilterDropDown extends Component<IFilterDropDownProps, IFilterDropDownState> {
	static defaultProps = {...defaultProps}
	constructor(props:IFilterDropDownProps) {
	    super(props);
	    this.state = {
	        selectValue: [props.conditionValue || 'LIKE'],
	        selectNumberValue: [props.conditionValue || 'EQ']
	    }
	}

	UNSAFE_componentWillReceiveProps(nextProps: Readonly<IFilterDropDownProps>): void {
	    if (nextProps.conditionValue != this.props.conditionValue) {
	        this.setState({
	            selectValue: [nextProps.conditionValue || 'LIKE'],
	            selectNumberValue: [nextProps.conditionValue || 'EQ']
	        });
	    }
	}

	/**
	 * 点击下拉菜单
	 *
	 * @param {*} s 选中的selectRecord
	 */
	onSelectDropdown = (item: Record<string, any>) => {
	    let {onSelectDropdown, filterDropdownType} = this.props;
	    if (onSelectDropdown) {
	        if (filterDropdownType == 'string') {
	            this.setState({
	                selectValue: [item.key]
	            }, () => {
	                onSelectDropdown && onSelectDropdown(item);
	            });
	        }
	        if (filterDropdownType == 'number') {
	            this.setState({
	                selectNumberValue: [item.key]
	            }, () => {
	                onSelectDropdown(item);
	            });
	        }
	    }
	}

	/**
	 * 清除事件
	 *
	 */
	onClickClear = () => {
	    let {onClickClear} = this.props;
	    if (onClickClear) {
	        this.setState({
	            // selectValue: [],
	            // selectNumberValue: []
	        }, () => {
	            onClickClear && onClickClear();
	        });
	    }
	}

	/**
	 * 根据props来获得指定的Menu,分为String和Number
	 *
	 * @returns JSX Menu
	 */
	getMenu = () => {
	    let {selectValue, selectNumberValue} = this.state;
	    let {filterDropdownType, filterDropdownIncludeKeys, dir: direction} = this.props;
	    // let locale = getComponentLocale(this.props, this.context, 'Table', () => i18n);
	    let locale = getLangInfo(this.props.locale, i18n, 'table')
	    let stringEnum = {
	        LIKE: 'include',
	        ULIKE: 'exclusive',
	        EQ: 'equal',
	        UEQ: 'unequal',
	        START: 'begin',
	        END: 'end'
	    };
	    let numberEnum = {
	        GT: 'greaterThan',
	        GTEQ: 'greatThanEqualTo',
	        LT: 'lessThan',
	        LTEQ: 'lessThanEqualTo',
	        EQ: 'beEqualTo',
	        UEQ: 'notEqualTo'
	    };
	    let _local = Object.keys(locale.langMap).length ? locale.langMap : i18n
	    if (filterDropdownIncludeKeys != undefined) {
	        switch (filterDropdownType) {
	        case 'string':
	            return <Menu
	                onClick={this.onSelectDropdown}
	                selectedKeys={selectValue}
	                    dir={direction}
	            >
	                {
	                    (filterDropdownIncludeKeys as FilterDropdownKeysStrType[]).map((item:string) => {
	                        return <Item key={item}>{_local[stringEnum[item]]}</Item>
	                    })
	                }
	            </Menu>
	        case 'number':
	            return <Menu
	                onClick={this.onSelectDropdown}
	                selectedKeys={selectNumberValue}
	                    dir={direction}
	            >
	                {
	                    (filterDropdownIncludeKeys as FilterDropdownKeysNumType[]).map((item:string) => {
	                        return <Item key={item}>{_local[numberEnum[item]]}</Item>
	                    })
	                }
	            </Menu>
	        default:
	            return <div></div>;
	        }
	    } else {
	        switch (filterDropdownType) {
	        case 'string':
	            return <Menu
	                onClick={this.onSelectDropdown}
	                selectedKeys={selectValue}
	                    dir={direction}
	            >
	                <Item key="LIKE">{locale.langMap.include || '包含'}</Item>
	                <Item key="ULIKE">{locale.langMap.exclusive || '不包含'}</Item>
	                <Item key="EQ">{locale.langMap.equal || '等于'}</Item>
	                <Item key="UEQ">{locale.langMap.unequal || '不等于'}</Item>
	                <Item key="RLIKE">{locale.langMap.begin || '以开始'}</Item>
	                <Item key="LLIKE">{locale.langMap.end || '以结尾'}</Item>
	            </Menu>
	        case 'number':
	            return <Menu
	                onClick={this.onSelectDropdown}
	                selectedKeys={selectNumberValue}
	                    dir={direction}
	            >
	                <Item key="GT">{locale.langMap.greaterThan || '大于'}</Item>
	                <Item key="GTEQ">{locale.langMap.greatThanEqualTo || '大于等于'}</Item>
	                <Item key="LT">{locale.langMap.lessThan || '小于'}</Item>
	                <Item key="LTEQ">{locale.langMap.lessThanEqualTo || '小于等于'}</Item>
	                <Item key="EQ">{locale.langMap.beEqualTo || '等于'}</Item>
	                <Item key="UEQ">{locale.langMap.notEqualTo || '不等于'}</Item>
	            </Menu>
	        default:
	            return <div></div>;
	        }
	    }
	}

	render() {
	    let {isShowCondition, fieldid, dir: direction} = this.props;
	    let fieldidDropdownAttr = fieldid ? {fieldid: `${fieldid}-filter`} : {};
	    let fieldidClearAttr = fieldid ? {fieldid: `${fieldid}-clear`} : {};
	    return (<div className="filter-btns">
	        {isShowCondition == 'show' && <Dropdown
	            overlayClassName={`${prefix}-filter-dropdown-menu-wrap`}
	            trigger={['click']}
	            overlay={this.getMenu()}
	            animation="slide-up"
	            dir={direction}
	        >
	            <Button
	                shape="border"
	                dir={direction}
	                style={{marginLeft: "2px", minWidth: "0px", width: "26px", lineHeight: "24px", padding: 0}}
	                {...fieldidDropdownAttr}
	            >
	                <Icon style={{padding: 0, color: '#585858'}} type="uf-filter" />
	            </Button>
	        </Dropdown>}
	        <Button
	            onClick={this.onClickClear}
	            shape="border"
	            dir={direction}
	            style={{
	                marginLeft: "2px",
	                minWidth: "0px",
	                width: "26px",
	                lineHeight: "24px",
	                padding: 0,
	                "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden"
	            }}
	            {...fieldidClearAttr}
	        >
	            <Icon style={{
	                padding: 0,
	                color: '#585858',
	                "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden"
	            }} type="uf-filterno" />
	        </Button>
	    </div>
	    );
	}
}

// FilterDropDown.propTypes = {
//     isShowCondition: PropTypes.string,
//     onSelectDropdown: PropTypes.func,
//     onClickClear: PropTypes.func,
//     filterDropdownIncludeKeys: PropTypes.string,
//     isShowClear: PropTypes.bool,
//     filterDropdownType: PropTypes.oneOf(['string', 'number']),
//     locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
// }

export default FilterDropDown;
