/**
 * This source code is quoted from rc-tabs.
 * homepage: https://github.com/react-component/tabs
 */
// import PropTypes from 'prop-types';
import React from 'react';
import { SaveRefProps } from './iTabs'

const defaultProps = {
    children: () => null,
};
export default class SaveRef extends React.Component<SaveRefProps> {
	static defaultProps = defaultProps
	getRef = (name: string) => {
	    return this[name];
	}

	saveRef = (name: string) => {
	    return ((node?: HTMLElement) => {
	        if (node) {
	            this[name] = node;
	        }
	    }) as React.LegacyRef<HTMLDivElement>;
	}

	render() {
	    return this.props.children?.(this.saveRef, this.getRef);
	}
}

// SaveRef.propTypes = {
//     children: PropTypes.func,
// };

// SaveRef.defaultProps = {
//     children: () => null,
// };
