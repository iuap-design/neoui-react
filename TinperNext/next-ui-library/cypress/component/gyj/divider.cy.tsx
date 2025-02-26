import React from "react";
import Divider from "../../../../packages/wui-divider/src";

describe('divider.cy.tsx', () => {
    it("divider test dashed horizontal orientation", () => {
        cy.mount(
            <div>
                <Divider dashed type="horizontal" />
                <br />
                <Divider type="vertical" />
                <br />
                <Divider orientation="left">Left Text</Divider>
                <br />
                <Divider orientation="right">Left Text</Divider>
                <br />
                <Divider orientation="center">Left Text</Divider>
            </div>);
            cy.viewport(200, 100);
            cy.compareSnapshot("divider-demo");
    });
})