// import PropTypes from 'prop-types';
import React from 'react';
import Input from '../../wui-input/src';
import { SearchProps, SearchState } from './iTransfer';

// const propTypes = {
//     prefixCls: PropTypes.string,
//     placeholder: PropTypes.string,
//     onChange: PropTypes.func,
//     value: PropTypes.any,
//     handleClear: PropTypes.func,
//     fieldid: PropTypes.string
// }

const defaultProps = {
    placeholder: '',
    fieldid: ''
};

class Search extends React.Component<SearchProps, SearchState> {

	static defaultProps = {...defaultProps}

	handleChange = (e: string) => {
	    const onChange = this.props.onChange;
	    if (onChange) {
	        onChange(e);
	    }
	}

	// handleClear = (e: React.MouseEvent) => {
	//     e.preventDefault();

	//     const handleClear = this.props.handleClear;
	//     if (handleClear) {
	//         handleClear(e);
	//     }
	// }

	render() {
	    const {placeholder, value, prefixCls, fieldid, disabled} = this.props;
	    // const icon = (value && value.length > 0) ? (
	    //     <a href="#" className={`${prefixCls}-action`} onClick={this.handleClear}>
	    //         <Icon type="uf-close-c"/>
	    //     </a>
	    // ) : (
	    //     <span className={`${prefixCls}-action`}><Icon type="uf-search"/></span>
	    // );
	    const fieldidProp = fieldid ? { fieldid } : {}
	    return (
	        <div>
	            <Input
	                size="sm"
	                placeholder={placeholder}
	                className={prefixCls}
	                value={value}
	                type='search'
	                showClose
	                disabled={disabled}
	                // ref="input"
	                onChange={this.handleChange}
	                {...fieldidProp}
	            />
	        </div>
	    );
	}
}

// Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
