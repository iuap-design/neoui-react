/**
 * @jest-environment jest-puppeteer-react/environment
 */
import React from 'react';
import Modal from '../src/index';
import {render} from 'jest-puppeteer-react';
import IsMaximizeDemo from './isMaximizeDemo';
const modalDom = <Modal
    show={true}
    getPopupContainer={() => document.getElementById('main')}
    closable={true}
    >
        {/* style={{'padding-left': '1px'}} */}
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
</Modal>
describe('modal', () => {
    jest.setTimeout(60000);
    test('should render a modal', async () => {
        await render(
            modalDom,
            { viewport: { width: 1900, height: 1000, deviceScaleFactor: 1 } }
            );

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
    });
    test('should render a modal close', async () => {
        await render(
            modalDom,
            { viewport: { width: 1900, height: 1000, deviceScaleFactor: 1 } }
            );
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
        await page.click('.close');
        const screenshot1 = await page.screenshot();
        expect(screenshot1).toMatchImageSnapshot();
    });

    test('isMaximize position', async () => {
        await render(
            <IsMaximizeDemo />,
            { viewport: { width: 800, height: 600, deviceScaleFactor: 1 } }
        );
        await page.click('.open1');
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();

        //缩小时会居中
        await page.click('.modal1 .maximize');
        const screenshot1 = await page.screenshot();
        expect(screenshot1).toMatchImageSnapshot();

        //第二个modal在指定范围最大化
        await page.click('.close');
        await page.click('.open2');
        const screenshot2 = await page.screenshot();
        expect(screenshot2).toMatchImageSnapshot();

        //缩小时会居中
        await page.click('.modal2 .maximize');
        const screenshot3 = await page.screenshot();
        expect(screenshot3).toMatchImageSnapshot();

        // 拖拽之后
        await page.hover('.modal2 .wui-modal-header-dnd-handle') 
        await page.mouse.down();
        await page.mouse.move(100, 100);
        await page.mouse.up();
        const screenshot4 = await page.screenshot();
        expect(screenshot4).toMatchImageSnapshot();

        //拖拽之后，放大再缩小，不会重新居中
        await page.click('.modal2 .maximize');
        await page.click('.modal2 .maximize');
        const screenshot5 = await page.screenshot();
        expect(screenshot5).toMatchImageSnapshot();
    });
});
