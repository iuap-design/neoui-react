// @ts-nocheck
import PropTypes from "prop-types";
import React, {Component} from "react";

/**
 * 渲染checkbox
 * @param Checkbox
 * @param Icon
 * @returns {CheckboxRender}
 */
export default function renderCheckbox(Checkbox, Icon) {
    return class CheckboxRender extends Component {
		static propTypes = {
		    value: PropTypes.any,
		    onChange: PropTypes.func
		};
		state = {
		    value: this.props.value,
		    editable: false
		};
		handleChange = e => {
		    const value = e.target.value;
		    this.setState({value});
		};
		check = () => {
		    this.setState({editable: false});
		    if (this.props.onChange) {
		        this.props.onChange(this.state.value);
		    }
		};
		edit = () => {
		    this.setState({editable: true});
		};
		handleKeydown = event => {
		    if (event.keyCode == 13) {
		        this.check();
		    }
		};

		render() {
		    const {value, editable} = this.state;
		    let cellContent = "";
		    if (editable) {
		        cellContent = (
		            <div className="editable-cell-input-wrapper">
		                <Checkbox
		                    onChange={this.handleChange}
		                    onKeyDown={this.handleKeydown}
		                    onBlur={this.check}
		                    autoFocus
		                    value={value}
		                />
		            </div>
		        );
		    } else {
		        cellContent = (
		            <div className="editable-cell-text-wrapper">
		                {value || " "}
		                <Icon
		                    type="uf-pencil"
		                    className="editable-cell-icon"
		                    onClick={this.edit}
		                />
		            </div>
		        );
		    }
		    return <div className="editable-cell">{cellContent}</div>;
		}
    }

}
