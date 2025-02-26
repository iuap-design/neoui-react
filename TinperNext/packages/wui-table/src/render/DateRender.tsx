// @ts-nocheck
import moment from "moment";
import PropTypes from "prop-types";
import React, {Component} from "react";


export default function renderDate(DatePicker, Icon) {
    const {MonthPicker, WeekPicker} = DatePicker;
    return class DateRender extends Component {
		static propTypes = {
		    value: PropTypes.any,
		    onChange: PropTypes.func,
		    isclickTrigger: PropTypes.bool,
		    type: PropTypes.string
		};
		static defaultProps = {
		    type: "DatePicker"
		};
		state = {
		    value: this.props.value,
		    editable: false
		};
		handleChange = e => {
		    let {format} = this.props || "YYYY-MM-DD";
		    const value = e ? e.format(format) : "";
		    this.setState({value, editable: false});
		    if (this.props.onChange) {
		        this.props.onChange(value);
		    }
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
		    let {isclickTrigger, type} = this.props;
		    let cellContent = "";
		    let TComponent;
		    switch (type.toLowerCase()) {
		    case "monthpicker":
		        TComponent = MonthPicker;
		        break;
		        // case "rangepicker":
		        //   TComponent = RangePicker;
		        //   break;
		    case "weekpicker":
		        TComponent = WeekPicker;
		        break;
		    default:
		        TComponent = DatePicker;
		        break;
		    }

		    let dateValue = value ? moment(value) : value;
		    if (editable) {
		        cellContent = isclickTrigger ? (
		            <div className="editable-cell-input-wrapper">
		                <TComponent
		                    {...this.props}
		                    value={dateValue}
		                    onChange={this.handleChange}
		                />
		                <Icon
		                    type="uf-correct"
		                    className="editable-cell-icon-check"
		                    onClick={this.check}
		                />
		            </div>
		        ) : (
		            <div className="editable-cell-input-wrapper">
		                <TComponent
		                    {...this.props}
		                    value={dateValue}
		                    onChange={this.handleChange}
		                />
		                <Icon
		                    type="uf-correct"
		                    className="editable-cell-icon-check"
		                    onClick={this.check}
		                />
		            </div>
		        );
		    } else {
		        cellContent = isclickTrigger ? (
		            <div className="editable-cell-text-wrapper" onClick={this.edit}>
		                {value || " "}
		            </div>
		        ) : (
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
