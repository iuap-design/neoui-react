import React from 'react';
import ButtonGroup from '../../../../packages/wui-button-group/src';
// import {Button, Dropdown, Menu} from '../../index';
import {Button} from '../../../../packages/index';

Cypress.config({
  viewportWidth: 600,
  viewportHeight: 400,
})

// const {Item} = Menu;
// const {Button: DropdownButton} = Dropdown

function BaseButtonGroup(props: any) {
  return (
    <ButtonGroup {...props}>
        <Button shape='border'>按钮1</Button>
        <Button shape='border'>按钮2</Button>
        <Button shape='border'>按钮3</Button>
        <Button shape='border'>按钮4</Button>
    </ButtonGroup>
  )
}

// function DropDownDemo(props: any) {
//   const menu1 = (
//       <Menu>
//           <Item key="1">借款合同</Item>
//           <Item key="2">抵/质押合同</Item>
//           <Item key="3">担保合同</Item>
//           <Item key="4">联保合同</Item>
//           <Item key="5">合同审批</Item>
//           <Item key="6">抵/质押合同跟踪</Item>
//       </Menu>
//   );
//   return (
//         <ButtonGroup {...props}>
//             <Button className="no-right-radius">其他</Button>
//             <DropdownButton
//                 overlay={menu1}
//                 transitionName="slide-up"
//                 triggerType="icon"
//                 className="no-radius"
//             >
//       打印
//               </DropdownButton>
//               <Button className="no-right-radius">其他</Button>
//               <DropdownButton
//                   overlay={menu1}
//                   transitionName="slide-up"
//                   triggerType="icon"
//                   className="no-radius"
//               >
//       导入
//               </DropdownButton>
//               <DropdownButton
//                   overlay={menu1}
//                   transitionName="slide-up"
//                   className="no-left-radius"
//               >
//       导出
//               </DropdownButton>
//           </ButtonGroup>
//   );
// }

describe('ButtonGroup.cy.tsx-default', () => {
  it('should mount default', () => {
    cy.mount((<BaseButtonGroup />));
    cy.compareSnapshot('default');
  });
})

describe('ButtonGroup.cy.tsx-separated-vertical', () => {
  it('should mount separated-vertical', () => {

    cy.mount((<>
      <BaseButtonGroup /><br /><br />
      <BaseButtonGroup separated /><br /><br />
      <BaseButtonGroup vertical />
    </>));
    cy.compareSnapshot('separated-vertical');
    
  });
})

// describe('ButtonGroup.cy.tsx-dropdown', () => {
//   it('should mount dropdown', () => {

//     cy.mount((<DropDownDemo />));
//     cy.compareSnapshot('dropdown');  

//   });
// })