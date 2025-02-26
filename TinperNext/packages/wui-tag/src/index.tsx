import React from 'react';
import {Warning} from "../../wui-core/src/index";
import Tag from './Tag';
import { TagProps } from './iTag';


const {isShouldUpdate} = Warning;

class TagWrapper extends React.Component<TagProps> {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const {
            color,
            colors,
            closable,
            deleted,
            onClick,
            tagClick,
            onChange,
            selected,
            checked,
            ...others
        } = this.props;
        isShouldUpdate("Tag", this.props);
        const extral = {
            colors: color ? color : colors,
            deleted: closable ? closable : deleted,
            tagClick: onChange ?? (onClick ? onClick : tagClick),
            selected: checked ?? selected,
        }
        return (
            <Tag {...extral} {...others} />
        )
    }
}

export default TagWrapper;
