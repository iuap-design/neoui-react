// import PropTypes from 'prop-types';
import React from 'react'
import Drawer from './Drawer';
import {Warning} from "../../wui-core/src";

import { EntranceProps } from './iDrawer'
import DrawerFooter from './DrawerFooter';
const {isShouldUpdate} = Warning;
// const propTypes = {
//     show: PropTypes.bool,
//     visible: PropTypes.bool,
//     showMask: PropTypes.bool,
//     mask: PropTypes.bool,
//     showClose: PropTypes.bool,
//     closable: PropTypes.bool,
//     getContainer: PropTypes.func,
//     container: PropTypes.string
// }

class DrawerWrapper extends React.Component<EntranceProps> {
    constructor(props: EntranceProps) {
        super(props);
    }
    static Footer = DrawerFooter;
    render() {
        const {
            show,
            visible,
            showMask,
            mask,
            showClose,
            closable,
            getContainer,
            container,
            ...others
        } = this.props
        isShouldUpdate("Drawer", this.props);
        const extral = {
            show: visible ? visible : show,
            showMask: mask != undefined ? mask : showMask,
            showClose: closable ? closable : showClose,
            container: getContainer ? getContainer : container
        }
        return <Drawer {...extral} {...others} />
    }
}

export default DrawerWrapper;
