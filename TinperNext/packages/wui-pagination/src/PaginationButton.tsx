import classNames from "classnames";
import omit from "omit.js";
// import PropTypes from "prop-types";
import React, { cloneElement, isValidElement } from "react";
// import {propTypes as paginationPropTypes} from "./Pagination";
import { PaginationButtonAdapter } from './iPagination';

// const propTypes = {
//     ...paginationPropTypes,
//     className: PropTypes.string,
//     eventKey: PropTypes.any,
//     onChange: PropTypes.func,
//     disabled: PropTypes.bool,
//     active: PropTypes.bool,
//     onClick: PropTypes.func,
//     componentClass: PropTypes.string,
//     style: PropTypes.object,
//     iconBtn: PropTypes.bool,
// };

class PaginationButton extends React.Component<PaginationButtonAdapter> {
    // constructor(props, context) {
    //   super(props, context);

    //   this.handleClick = this.handleClick.bind(this);
    // }

	static defaultProps = {
	    componentClass: "a",
	    active: false,
	    disabled: false,
	};

	handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
	    const {disabled, onChange, eventKey, pageSize, active} = this.props;
	    if (active) {
	        return;
	    }
	    if (disabled) {
	        return;
	    }
	    if (onChange) {
	        onChange(eventKey as number, Number(pageSize), event);
	    }
	}
	getItemRender = () => {
	    const {
	        componentClass,
	        disabled,
	        eventKey,
	        type,
	        itemRender,
	        ...props
	    } = this.props;
	    let Component = componentClass || 'a';
	    const ComponentWrap =
			<Component
			    {...omit(props, ["pageSize", "simple", "iconBtn", "showTitle", "active", "className", "style", "title", "id"])}
			    disabled={disabled}
			    onClick={this.handleClick}
			/>

	    if (itemRender) {
	        const render = itemRender(
	            eventKey,
	            type,
	            ComponentWrap
	        );
	        if (render) {
	            const renderProps: Partial<PaginationButtonAdapter> = {
	                disabled,
	                onClick: this.handleClick
	            };
	            return isValidElement(render) ? cloneElement(render, renderProps) : render;
	        }
	    }
	    return ComponentWrap;
	}

	render() {
	    const {
	        active,
	        disabled,
	        className,
	        style,
	        iconBtn,
	        showTitle,
	        title,
	        id,
	        fieldid,
	        ...props
	    } = this.props;

	    delete props.onChange;
	    return (
	        <li
	            title={showTitle ? title : undefined}
	            className={classNames(className, {active, disabled, iconBtn})}
	            style={style}
	            id={id}
	            fieldid={fieldid}
	        >
	            {this.getItemRender()}
	        </li>
	    );
	}
}

// PaginationButton.propTypes = propTypes;
// PaginationButton.defaultProps = defaultProps;

export default PaginationButton;
