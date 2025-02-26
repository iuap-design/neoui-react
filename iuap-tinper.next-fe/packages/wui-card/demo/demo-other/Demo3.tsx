/**
 *
 * @title 网格型内嵌卡片
 * @description 一种常见的卡片内容区隔模式
 *
 */

import {Card} from "@tinper/next-ui";
import React, {Component} from "react";


const gridStyle: React.CSSProperties = {
    width: "25%",
    textAlign: "center",
};


class Demo3 extends Component {

    render() {
        return (
            <Card title="Card Title">
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid hoverable={true} style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
        );
    }
}

export default Demo3;
