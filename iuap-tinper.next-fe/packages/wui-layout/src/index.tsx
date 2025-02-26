import React from 'react'
import Col from './Col';
import Container from './Container';
import Spliter from './Spliter';
import InternalLayout, {Content, Footer, Header} from './Layout';
import Row from './Row';
import Sider from './Sider';
import { AdapterPropTypes } from './Layout';

export {
    Col, Row
}

interface LayoutType extends React.ForwardRefExoticComponent<AdapterPropTypes & React.RefAttributes<HTMLElement>> {
    Header: typeof Header;
    Footer: typeof Footer;
    Content: typeof Content;
    Sider: typeof Sider;
    Spliter: typeof Spliter;
    Container: typeof Container;
}

const Layout = InternalLayout as LayoutType;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;
Layout.Spliter = Spliter;
Layout.Container = Container;

export default Layout;
