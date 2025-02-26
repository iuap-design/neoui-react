// import PropTypes from 'prop-types';
import {Component} from 'react';
import { ColumnType } from './iTable';
import { DefaultRecordType } from './interface';

// const propTypes = {
//     className: PropTypes.string,
//     colSpan: PropTypes.number,
//     title: PropTypes.node,
//     dataIndex: PropTypes.string,
//     key: PropTypes.string,
//     width: PropTypes.oneOfType([
//         PropTypes.number,
//         PropTypes.string,
//     ]),
//     fixed: PropTypes.oneOf([
//         true,
//         'left',
//         'right',
//     ]),
//     render: PropTypes.func,
//     onCellClick: PropTypes.func,
//     ifshow: PropTypes.bool,
//     isShow: PropTypes.bool,
//     fieldType: PropTypes.string, // 类型
//     singleFind: PropTypes.bool, // 单列定位
//     columnType: PropTypes.string, // 列类型
// }

class Column extends Component<ColumnType<DefaultRecordType>> {
	static defaultProps = {
	    ifshow: true,
	    isShow: true
	}
}

// Column.propTypes = propTypes;

export default Column;
