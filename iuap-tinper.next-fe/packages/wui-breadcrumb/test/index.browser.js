/**
 * @jest-environment jest-puppeteer-react/environment
 */
 import React from 'react';
 import { prefix } from '../../wui-core/src/updatePrefix';
 import Breadcrumb from '../src/index';
 import Menu from '../../wui-menu/src/index'
 import { render } from 'jest-puppeteer-react';
 const { Item } = Menu;
 
 describe('Breadcrumb', () => {
     jest.setTimeout(60000);
     [100, 300, 1000].forEach(w => {
         test(`fillspace when width: ${w}`, async () => {
             await render(
                 <div style={{ width: w }}>
                     <Breadcrumb fillSpace>
                         {Array(10).fill(null).map((da, i) => <Breadcrumb.Item >{'data_' + i}</Breadcrumb.Item>)}
                     </Breadcrumb>
                 </div>,
                 { viewport: { width: 800, height: 600, deviceScaleFactor: 1 } }
             );
 
             const screenshot = await page.screenshot();
             expect(screenshot).toMatchImageSnapshot();
             await page.hover(`li`);
             await page.waitFor(500);
             const screenshot1 = await page.screenshot();
             expect(screenshot1).toMatchImageSnapshot();
         });
     })
 
     const menu = (<Menu>
         <Item key="1">借款合同</Item>
         <Item key="2">抵/质押合同</Item>
         <Item key="3">担保合同</Item>
     </Menu>);
     let breadcrumb = <Breadcrumb >
         <Breadcrumb.Item overlay={menu}>Home</Breadcrumb.Item>
         <Breadcrumb.Item>Library</Breadcrumb.Item>
         <Breadcrumb.Item>Data</Breadcrumb.Item>
     </Breadcrumb>;
     test(`breadcrumb has overlay`, async () => {
         await render(breadcrumb,
             { viewport: { width: 800, height: 600, deviceScaleFactor: 1 } }
         );
         const screenshot = await page.screenshot();
         expect(screenshot).toMatchImageSnapshot();
 
         await page.hover('li span');
         // await page.waitForSelector(`.${prefix}-dropdown`); //hover之后等待下拉框出现
         await page.waitFor(500);
         const screenshot1 = await page.screenshot();
         expect(screenshot1).toMatchImageSnapshot();
     });
 
     test('Breadcrumb.Item has href', async () => {
         await render(
             <Breadcrumb>
                 <Breadcrumb.Item active href="https://yondesign.yonyou.com/homepage/#/">Home</Breadcrumb.Item>
             </Breadcrumb>,
             { viewport: { width: 800, height: 600, deviceScaleFactor: 1 } }
         );
 
         // window.location.href should change after click 
         await page.click('li a');
         await page.waitFor(500);
         const href = await page.evaluate(() => window.location.href);
         expect(href).toEqual("https://yondesign.yonyou.com/homepage/#/");
     })
 });
 