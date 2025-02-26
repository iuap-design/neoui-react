import React from 'react';
import Badge from '../../../../packages/wui-badge/src';
import Card from '../../../../packages/wui-card/src';
import type {BadgeColors, BadgeStatus} from '../../../../packages/wui-badge/src/iBadge'

Cypress.config({
  viewportWidth: 800,
  viewportHeight: 200,
})

const colorArr: Array<BadgeColors> = ['primary', 'success', 'info', 'warning', 'danger', 'dark', 'default'];
const statusArr: Array<BadgeStatus> = ['processing', 'error', 'success', 'warning', 'default', 'dark']
const childSpan = (<span style={{width: 42, height: 42, borderRadius: 2, backgroundColor: '#eee', display: 'inline-block'}}></span>)
const badgeStyle = {marginTop: 20, marginLeft: 20}

describe('Badge.cy.tsx-default', () => {
  it('should mount default', () => {
    cy.mount((
      <Badge style={badgeStyle}>
          {childSpan}
      </Badge>
    ));
    cy.compareSnapshot('Badge-default');
  });
})

describe('Badge.cy.tsx-dot', () => {
  it('should mount dot', () => {
    cy.mount((
      <Badge dot style={badgeStyle}>
          {childSpan}
      </Badge>
    ));
    cy.compareSnapshot('Badge-dot');
  });
})

describe('Badge.cy.tsx-count', () => {
  it('should mount count', () => {
    cy.mount((
      <>
      <Badge count={5} style={badgeStyle}>
          {childSpan}
      </Badge>
      <Badge count={0} style={badgeStyle}>
          {childSpan}
      </Badge>
      <Badge count={0} showZero style={badgeStyle}>
          {childSpan}
      </Badge>
      </>
    ));
    cy.compareSnapshot('Badge-count');
  });
})

describe('Badge.cy.tsx-offset', () => {
  it('should mount offset', () => {
    cy.mount((
      <Badge offset={[20, 0]} count={9} style={badgeStyle}>
          {childSpan}
      </Badge>
    ));
    cy.compareSnapshot('Badge-offset-[20, 0]');
  });
})

describe('Badge.cy.tsx-dataBadgePlacement', () => {
  it('should mount dataBadgePlacement', () => {
    cy.mount((
      <Badge dataBadgePlacement='bottom' dot style={badgeStyle}>
          {childSpan}
      </Badge>
    ));
    cy.compareSnapshot('Badge-dataBadgePlacement-bottom');
  });
})

describe('Badge.cy.tsx-colors', () => {
  it('should mount colors', () => {

    cy.mount((<div>
      {
        colorArr.map(item => {
          return (<Badge colors={item} dot style={badgeStyle}>
                    {childSpan}
                </Badge>)
        })
      }
    </div>))
    cy.compareSnapshot(`Badge-colors`);

  });
})

describe('Badge.cy.tsx-status', () => {
  it('should mount status', () => {

    cy.mount((<div>
      {
        statusArr.map(item => {
          return (<Badge status={item} style={{ marginRight: 20 }} text="status"/>)
        })
      }
    </div>))
    cy.compareSnapshot(`Badge-status`);

  });
})

describe('Badge.cy.tsx-ribbon', () => {
  it('should mount ribbon', () => {

    cy.mount((<div style={{width: 300, marginLeft: 50}}>
      <Badge.Ribbon text="Hippies">
          <Card title="Pushes open the window">
          and raises the spyglass.
          </Card>
      </Badge.Ribbon><br/><br />
      <Badge.Ribbon text="Hippies" placement="start">
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
  </div>))
    cy.viewport(400, 800)
    cy.compareSnapshot(`Badge-ribbon`);

  });
})