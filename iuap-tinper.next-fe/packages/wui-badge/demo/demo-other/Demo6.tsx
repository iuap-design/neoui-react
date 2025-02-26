/**
 * @title Badge.Ribbon
 * @description 使用缎带型的徽标
 */

import React, { Component } from 'react';
import { Badge, Card } from "@tinper/next-ui";

class Demo5 extends Component {
    render() {
        return (
            <>
                <div style={{width: 300, marginLeft: 50}}>
                    <Badge.Ribbon text="Hippies">
                        <Card title="Pushes open the window">
                        and raises the spyglass.
                        </Card>
                    </Badge.Ribbon><br/><br />
                    <Badge.Ribbon text="Hippies" color="success">
                        <Card title="Pushes open the window">
                        and raises the spyglass.
                        </Card>
                    </Badge.Ribbon><br/><br />
                    <Badge.Ribbon text="Hippies" color="info">
                        <Card title="Pushes open the window">
                        and raises the spyglass.
                        </Card>
                    </Badge.Ribbon><br/><br />
                    <Badge.Ribbon text="Hippies" color="warning">
                        <Card title="Pushes open the window">
                        and raises the spyglass.
                        </Card>
                    </Badge.Ribbon><br/><br />
                    <Badge.Ribbon text="Hippies" color="blue">
                        <Card title="Pushes open the window">
                        and raises the spyglass.
                        </Card>
                    </Badge.Ribbon><br/><br />
                    <Badge.Ribbon text="Hippies" color="#666">
                        <Card title="Pushes open the window">
                        and raises the spyglass.
                        </Card>
                    </Badge.Ribbon><br/><br />
                    <Badge.Ribbon text="Hippies" placement="start">
                        <Card title="Pushes open the window">
                        and raises the spyglass.
                        </Card>
                    </Badge.Ribbon><br/><br />
                </div>
            </>
        )
    }
}
export default Demo5;
