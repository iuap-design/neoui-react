import React from "react";
import SvgIcon from "../../../../packages/wui-svgicon/src";

describe("icon.cy.tsx", () => {
  it("icon other demo view test", () => {
    cy.mount(
      <div>
        <SvgIcon type="audio" />
        <SvgIcon type="excel" />
        <SvgIcon type="ai" />
        <SvgIcon type="gdoc" />
        <SvgIcon type="flash" />
        <SvgIcon type="gform" />
        <SvgIcon type="html" />
        <SvgIcon type="csv" />
        <SvgIcon type="slide" />
        <SvgIcon type="box_notes" />
        <SvgIcon type="webex" />
        <SvgIcon type="eps" />
        <SvgIcon type="psd" />
        <SvgIcon type="pack" />
        <SvgIcon type="gpres" />
        <SvgIcon type="exe" />
        <SvgIcon type="txt" />
        <SvgIcon type="unknown" />
        <SvgIcon type="attachment" />
        <SvgIcon type="pages" />
        <SvgIcon type="video" />
        <SvgIcon type="gdocs" />
        <SvgIcon type="ppt" />
        <SvgIcon type="word" />
        <SvgIcon type="pdf" />
        <SvgIcon type="image" />
        <SvgIcon type="stypi" />
        <SvgIcon type="keynote" />
        <SvgIcon type="gsheet" />
        <SvgIcon type="visio" />
        <SvgIcon type="zip" />
        <SvgIcon type="xml" />
        <SvgIcon type="rtf" />
      </div>
    );
    cy.viewport(600, 50)
    cy.compareSnapshot("svgIcon-demo");
  });
});
