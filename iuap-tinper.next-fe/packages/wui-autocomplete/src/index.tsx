

// import PropTypes from 'prop-types';
import React from 'react';
import {Warning} from "../../wui-core/src/index";
import AutoComplete from './AutoCompleteX';
import {
    AutoCompletePropsSub
} from './iAutoComplete';

const {isShouldUpdate} = Warning;

class AutoCompleteWrapper extends React.Component<AutoCompletePropsSub> {

    render() {
        const {
            show,
            open,
            onSelectOption,
            onSelect,
            ...others
        } = this.props;
        isShouldUpdate("AutoComplete", this.props);
        const extral = {
            open: open ?? show,
            onSelect: onSelect ?? onSelectOption,
        }
        return (
            <AutoComplete {...extral} {...others} />
        )
    }
}

export default AutoCompleteWrapper;
