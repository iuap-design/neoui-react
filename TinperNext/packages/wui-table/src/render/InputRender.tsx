// @ts-nocheck
import PropTypes from "prop-types";
import React, {Component} from "react";

/**
 * 渲染输入框
 * @param Form
 * @param Input
 * @param Icon
 * @returns {InputRender}
 */
export default function renderInput(Form, Input, Icon) {
    return class InputRender extends Component {
		static propTypes = {
		    check: PropTypes.func,
		    value: PropTypes.any,
		    onChange: PropTypes.func,
		    name: PropTypes.string,
		    placeholder: PropTypes.string,
		    formItemClassName: PropTypes.string,
		    mesClassName: PropTypes.string,
		    isclickTrigger: PropTypes.bool,
		    format: PropTypes.func,
		};
		static defaultProps = {
		    check: () => ""
		};
		state = {
		    value: this.props.value,
		    editable: false
		};
		handleChange = e => {
		    const value = e;
		    this.setState({value});
		};
		check = () => {
		    if (typeof this.flag === "undefined" || this.flag) {
		        this.props.check(this.flag, this.obj);
		        this.setState({editable: false});
		        if (this.props.onChange) {
		            this.props.onChange(this.state.value);
		        }
		        this.flag = undefined;
		    }

		};
		checkValidate = (flag, obj) => {
		    this.flag = flag;
		    this.obj = obj;
		};
		edit = () => {
		    this.setState({editable: true});
		};
		handleKeydown = event => {
		    if (event.keyCode == 13) {
		        this.check();
		    }/* else if(event.keyCode == 9){
          }*/
		};
		// 货币的格式化方法
		formatCurrency = money => {
		    if (money && money != null && !!Number(money)) {
		        money = String(money);
		        let left = money.split(".")[0],
		            right = money.split(".")[1];
		        right = right
		            ? right.length >= 2 ? "." + right.slice(0, 2) : "." + right + "0"
		            : ".00";
		        let temp = left
		            .split("")
		            .reverse()
		            .join("")
		            .match(/(\d{1,3})/g);
		        return (
		            (Number(money) < 0 ? "-" : "") +
					temp
					    .join(",")
					    .split("")
					    .reverse()
					    .join("") +
					right
		        );
		    } else if (money === 0) {
		        // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
		        return "0.00";
		    } else {
		        return "";
		    }
		};

		render() {
		    let {value, editable} = this.state;
		    let {
		        name,
		        placeholder,
		        isclickTrigger,
		        format,
		        formItemClassName,
		        mesClassName,
		        // check,
		        ...other
		    } = this.props;
		    let cellContent = "";
		    if (editable) {
		        cellContent = isclickTrigger ? (
		            <div className="editable-cell-input-wrapper">
		                {/* <Input
            onChange={this.handleChange}
            onKeyDown={this.handleKeydown}
            onBlur={this.check}
            autoFocus
            value={value}
          />
           */}
		                <Form.FormItem
		                    className={"formItem-style " + formItemClassName}
		                    mesClassName={"errMessage-style " + mesClassName}
		                    change={this.handleChange}
		                    blur={this.check}
		                    check={this.checkValidate}
		                    {...other}
		                >
		                    <Input
		                        name={name}
		                        placeholder={placeholder}
		                        onKeyDown={this.handleKeydown}
		                        autoFocus
		                        value={value}
		                    />
		                </Form.FormItem>
		            </div>
		        ) : (
		            <div className="editable-cell-input-wrapper">
		                {/* <Input
            value={value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeydown}
          /> */}
		                <Form.FormItem
		                    className={"formItem-style " + formItemClassName}
		                    mesClassName={"errMessage-style " + mesClassName}
		                    change={this.handleChange}
		                    blur={this.check}
		                    check={this.checkValidate}
		                    {...other}
		                >
		                    <Input
		                        name={name}
		                        placeholder={placeholder}
		                        onKeyDown={this.handleKeydown}
		                        autoFocus
		                        value={value}
		                    />
		                </Form.FormItem>
		                <Icon
		                    type="uf-correct"
		                    className="editable-cell-icon-check"
		                    onClick={this.check}
		                />
		            </div>
		        );
		    } else {
		        if (format && format === "Currency") {
		            value = this.formatCurrency(value);
		        }
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


