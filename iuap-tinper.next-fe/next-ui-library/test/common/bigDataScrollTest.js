import { render } from 'jest-puppeteer-react';

export default function testBigDataScroll(testName, component, scrollBody, waitSelector, derectToBottom = false) {
    describe(`bigData scroll`, () => {
        function scrollToBottom(scrollBody) {
            let container = document.querySelector(scrollBody);
            container.scrollTo(0, container.scrollHeight);
        }
        function scrollInterval(scrollBody) {
            let container = document.querySelector(scrollBody);
            let timer = setInterval(() => {
                container.scrollBy(0, 10000);
                if (timer && container.scrollTop + container.clientHeight >= container.scrollHeight) {
                    clearInterval(timer);
                };
            }, 100);
        }
        jest.setTimeout(60000);
        test(testName, async () => {
            await render(component,
                { viewport: { width: 600, height: 400, deviceScaleFactor: 1 } }
            );
            await page.waitForSelector(scrollBody)
            await page.waitFor(200); //解决偶尔出现截图时未加载完成的问题  
            const screenshot = await page.screenshot();
            expect(screenshot).toMatchImageSnapshot();

            let startTime = Date.now();
            if (derectToBottom) {
                await page.evaluate(scrollToBottom, scrollBody); //直接滚到底部
            } else {
                await page.evaluate(scrollInterval, scrollBody); //有间隔的慢慢滚动到底部
            }

            if (typeof waitSelector === 'number') {
                await page.waitFor(waitSelector); //等待一段时间
            } else {
                await page.waitForSelector(waitSelector, { timeout: 10000 }); //等待元素加载完成
            }
            let endTime = Date.now();

            let timeCost = endTime - startTime;
            console.log('timeCost:', timeCost + 'ms')

            const screenshot1 = await page.screenshot();
            // expect(screenshot1).toMatchImageSnapshot({
            //     failureThreshold: 0.01,
            //     failureThresholdType: 'percent'
            // });

            switch (testName) {
                // 单独运行时间没问题，全部测试一起运行时间会加长很多
                // tree 滚动测试5次会有3次左右出现白屏，不是时间慢
                case 'table': {
                    // 全部测试一起运行时间大大加长，甚至超过10s
                    // expect(timeCost).toBeLessThan(4500); //table三次测试结果: 3154ms 3328ms 3049ms 
                    break;
                }
                case 'treeselect': {
                    expect(timeCost).toBeLessThan(7000); //treeselect三次测试结果: 6136ms 6140ms 6137ms
                    break;
                }
                case 'select': {
                    expect(timeCost).toBeLessThan(3000); //select三次测试结果: 2529ms 2533ms 2527ms
                    break;
                }
                default:
                    break;
            };
        });
    });
}
