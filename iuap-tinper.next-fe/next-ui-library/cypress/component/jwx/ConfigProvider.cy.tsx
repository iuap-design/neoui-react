import { ConfigProvider, Clipboard, Pagination, Popconfirm, Button, Spin, Empty, Calendar, Transfer, Cascader, Row, Select, Steps, ColorPicker, TimePicker, Upload, Icon, DatePicker } from '@tinper/next-ui'
import React from 'react'
import moment from 'moment';
const { Step } = Steps;
const timePickerStyle = { marginLeft: 20, marginTop: 10, marginBottom: 400, width: 300 };
const time = moment().set({ hour: 10, minute: 20, second: 30 });
const demoUploadProps = {
    action: '/upload.do',
    defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
        thumbUrl: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
    }, {
        uid: -2,
        name: 'zzz.png',
        status: 'done',
        url: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
        thumbUrl: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
    }],
    showUploadList: {
        showDownloadIcon: true,
        showRemoveIcon: true,
    }
}

describe('Locale Test', () => {
    ["zh-cn", "zh-tw", "en-us", "vi-vn", "id-id"].forEach(lang => {
        it(`locale ${lang} shoud render correctly`, () => {
            cy.mount(<ConfigProvider locale={lang}>
                <div style={{ display: "flex" }}>
                    <div style={{ width: 200, height: 300, display: "block" }} className="cascader-container">
                        <Cascader popupVisible placeholder='cascader'></Cascader>
                    </div>
                    <Transfer dataSource={[]} showSearch locale={lang} /> {/* 只有设置locale才生效 */}
                    <Popconfirm placement='right' content='Popconfirm' visible>
                        <Button colors='primary' style={{ margin: 'auto 10px' }}>
                            Popconfirm
                        </Button>
                    </Popconfirm>
                </div>
                <Clipboard action="copy" text="默认复制-我将被复制到剪切板" locale={lang}></Clipboard> {/* 只有设置locale才生效 */}
                <Pagination current={1} defaultPageSize={10} total={200} showSizeChanger />
                <div style={{ display: 'flex' }}>
                    <Empty />
                    <Empty image="not-found" />
                    <Empty image="no-visualize-data" />
                    <Empty image="no-collect" />
                    <Empty image="no-data" />
                    <Empty image="no-search" />
                    <Empty image="no-network" />
                </div>
                <Steps type={'arrow'} more current={10}>
                    {
                        (new Array(20)).fill(0).map((item, i) => {
                            return <Step key={i} title={`${i + 1}`} />
                        })
                    }
                </Steps>
                <div style={{ display: "flex" }}>
                    <Calendar value={moment('2023-09-10')} />
                    <Calendar type="year" value={moment('2023-09-10')} markWeekend />
                    <Calendar value={moment('2023-09-10')} markWeekend fullscreen />
                    <Calendar mutiple fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]} scrollIntoValue={moment('2021-04-09')} />
                </div>
                <div className="locale-test" style={{ marginTop: 20 }}>
                    <Spin getPopupContainer={() => document.querySelector(`.locale-test`)} spinning />
                </div>
                <div style={{ display: "flex" }}>
                    <Select open style={{ width: '200px', marginLeft: '200px' }} placeholder="select"></Select>
                </div>
                <Upload {...demoUploadProps}>
                    <Button type="primary" shape="border">
                        <Icon type="uf-upload" />Upload
                    </Button>
                </Upload>
                <Upload {...demoUploadProps} listType='picture-card'>
                    <Button type="primary" shape="border">
                        <Icon type="uf-upload" />Upload
                    </Button>
                </Upload>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <TimePicker open style={timePickerStyle} value={time} use12Hours format='h:mm:ss a' />
                    <DatePicker open style={{ ...timePickerStyle, width: 500 }} value={moment('2023-09-10')} showTime placeholder='date.showTime' />
                    <DatePicker open style={timePickerStyle} value={moment('2023-09-10')} showToday placeholder='date.showToday' />
                    {['date', 'week', 'month', 'quarter', 'halfYear', 'year'].map(picker => (
                        <DatePicker open style={timePickerStyle} value={moment('2023-09-10')} picker={picker} placeholder={picker} />
                    ))}
                </div>
            </ConfigProvider>).then(() => {
                cy.wait(500);
                cy.get('.wui-clipboard').eq(0).trigger('mouseover')
                cy.wait(500);
                cy.compareSnapshot(`lang-${lang}`);
            })
        });
    })
})