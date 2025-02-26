import React, { Component } from 'react';
import Calendar from '../../../../packages/wui-calendar/src/index';
import moment, {Moment} from 'moment';
import { prefix } from '../../../../packages/wui-core/src/updatePrefix'
const prefixCalendar = `${prefix}-calendar`;
const prefixList = `${prefix}-list`;

// 单选场景
describe('calendar.cy.tsx', () => {
    it('value test', () => {
        cy.mount(<Calendar value={moment('2022-10-10')}/>);
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(280, 250);
        cy.compareSnapshot('value');
    });
    it('fullscreen test', () => {
        cy.mount(<Calendar value={moment('2022-10-10')} fullscreen/>);
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(600, 600);
        cy.compareSnapshot('fullscreen');
    });
    it('disabledDate test', () => {
        const disabledDate = (current: any) => {
            return current < moment('2022-10-15').subtract(1, "day")
          };
        cy.mount(<Calendar value={moment('2022-10-10')} disabledDate={disabledDate}/>);
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(280, 250);
        cy.compareSnapshot('disabledDate');
    });
    it('locale test', {
        viewportWidth: 300,
    }, () => {
        cy.mount(
            <>
                <Calendar value={moment('2022-10-10')} locale='zh-cn'/>
                <Calendar value={moment('2022-10-10')} locale='en-us'/>
                <Calendar value={moment('2022-10-10')} locale='vi-vn'/>
            </>
        );
        cy.compareSnapshot('locale');
    });
    it('type test', {
        viewportWidth: 300,
    }, () => {
        cy.mount(
            <>
                <Calendar value={moment('2022-10-10')} type='date'/>
                <Calendar value={moment('2022-10-10')} type='month'/>
            </>
        );
        cy.get('.uf-arrow-down').should('be.visible');
        cy.compareSnapshot('type');
    });
    it('type test when click normal switcher', () => {
        cy.mount(<Calendar value={moment('2022-10-10')} defaultType='date'/>);
        cy.get(`.${prefixCalendar}-full-header-switcher-normal`).click();
        cy.viewport(280, 280);
        cy.compareSnapshot('click_switcher');
    });
    it('defaultType test', {
        viewportWidth: 300,
    }, () => {
        cy.mount(
            <>
                <Calendar value={moment('2022-10-10')} defaultType='date'/>
                <Calendar value={moment('2022-10-10')} defaultType='month'/>
            </>
        );
        cy.get('.uf-arrow-down').should('be.visible');
        cy.compareSnapshot('defaultType')
    });
    it('headerRender test', () => {
        cy.mount(<Calendar value={moment('2022-10-10')} headerRender={() => {return (<div>自定义头部</div>)}}/>);
        cy.viewport(280, 240);
        cy.compareSnapshot('headerRender');
    });
    it('monthCellContentRender test', () => {
        cy.mount(<Calendar value={moment('2022-10-10')} type="month" monthCellContentRender={() => {return (<div>month</div>)}}/>);
        cy.viewport(280, 290);
        cy.compareSnapshot('monthCellContentRender');
    });
    it('monthCellRender test', () => {
        cy.mount(<Calendar value={moment('2022-10-10')} type="month" monthCellRender={() => {return (<div>render</div>)}}/>);
        cy.viewport(280, 290);
        cy.compareSnapshot('monthCellRender');
    });
    it('dateCellRender test', () => {
        cy.mount(<Calendar value={moment('2022-10-10')} dateCellRender={() => {return (<div>render</div>)}}/>);
        cy.viewport(280, 230);
        cy.compareSnapshot('dateCellRender');
    });
    it('dateCellContentRender test', () => {
        cy.mount(<Calendar value={moment('2022-10-10')} dateCellContentRender={() => {return (<div>date</div>)}}/>);
        cy.viewport(280, 250);
        cy.compareSnapshot('dateCellContentRender');
    });
    it('markWeekend test when fullscreen is false', () => {
        cy.mount(
            <>
                <Calendar value={moment('2022-10-10')} markWeekend locale="en-us"/>
                <Calendar value={moment('2022-10-10')} markWeekend locale="zh-cn"/>
                <Calendar value={moment('2022-10-10')} markWeekend  locale="vi-vn"/>
                <Calendar value={moment('2022-10-10')} markWeekend  locale="zh-tw"/>
            </>
        );
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(350,800);
        cy.compareSnapshot('markWeekend1');
    });
    it('markWeekend test when fullscreen is true', () => {
        cy.mount(
            <>
                <Calendar value={moment('2022-10-10')} markWeekend locale="en-us" fullscreen/>
                <Calendar value={moment('2022-10-10')} markWeekend locale="zh-cn" fullscreen/>
                <Calendar value={moment('2022-10-10')} markWeekend  locale="vi-vn" fullscreen/>
                <Calendar value={moment('2022-10-10')} markWeekend  locale="zh-tw" fullscreen/>
            </>
        );
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(280,1000);
        cy.compareSnapshot('markWeekend2');
    });
    it('fillSpace test when fullscreen is true', () => {
        cy.mount(
            <div style={{ height: "900px" }}>
                <Calendar fullscreen fillSpace value={moment('2022-10-10')}/>
            </div>
        );
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(600,600);
        cy.compareSnapshot('fillSpace');
    });
    it('weekStartsOn test', () => {
        cy.mount(<Calendar value={moment('2022-10-10')} weekStartsOn={4}/>);
        cy.viewport(280, 250);
        cy.compareSnapshot('weekStartsOn');
    });
})
// 多选场景 mutiple
describe('calendar.cy.tsx when mutiple is true', () => {
    const dateCellHeaderReader = (_current: Moment, _values: Moment[], headerChilds: (React.ReactElement)[]) => {
        headerChilds.shift();
        return headerChilds
    };
    it('value, scrollIntoValue, dateCellHeaderReader, dateCellContentRender test', () => {
        const dateCellContentRender = (_current: Moment, _values: Moment[]) => {
            return <div>content</div>
        }
        cy.mount(<Calendar mutiple fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]} dateCellContentRender={dateCellContentRender}
                        scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader}/>);
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(600, 600);
        cy.compareSnapshot('mutiple1');
    });
    it('fillSpace, defaultScrollIntoValue, defaultValue test', () => {
        cy.mount(
            <div style={{height: '600px', width: '100%'}}>
                <Calendar fillSpace mutiple fullscreen type='date' defaultValue={[moment('2021-04-02'), moment('2021-04-05')]} 
                        defaultScrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader}/>
            </div>);
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(600, 600);
        cy.compareSnapshot('mutiple2');

        cy.get(`.${prefixList}-item`).first().click();
        cy.compareSnapshot('mutiple3_click_sider');

        cy.get(`.${prefixCalendar}-date`).first().click();
        cy.compareSnapshot('mutiple3_click_date');
    });
    it('monthCellContentRender, type test', () => {
        cy.mount(<Calendar mutiple fullscreen scrollIntoValue={moment('2021-04-09')} type="month" monthCellContentRender={() => {return (<div>month</div>)}}/>);
        cy.viewport(600, 460);
        cy.compareSnapshot('mulMonthCellContentRender');
    });
    it('monthCellRender, type test', () => {
        cy.mount(<Calendar mutiple fullscreen scrollIntoValue={moment('2021-04-09')} type="month" monthCellRender={() => {return (<div>render</div>)}}/>);
        cy.viewport(600, 460);
        cy.compareSnapshot('mulMonthCellRender');
    });
    it('dateCellRender, type test', () => {
        cy.mount(<Calendar mutiple fullscreen scrollIntoValue={moment('2021-04-09')} type="date" dateCellRender={() => {return (<div>render</div>)}}/>);
        cy.viewport(600, 600);
        cy.compareSnapshot('mulDateCellRender')
    });
    it('dateCellContentRender, type test', () => {
        cy.mount(<Calendar mutiple fullscreen scrollIntoValue={moment('2021-04-09')} type="date" dateCellContentRender={() => {return (<div>date</div>)}}/>);
        cy.viewport(600, 600);
        cy.compareSnapshot('mulDateCellContentRender')
    });
    it('renderDateHeaderCell test', () => {
        cy.mount(<Calendar mutiple fullscreen scrollIntoValue={moment('2021-04-09')} type="date" 
                    dateCellHeaderReader={dateCellHeaderReader} renderDateHeaderCell={() => {return (<div>header</div>)}}/>);
        cy.viewport(600, 600);
        cy.compareSnapshot('mulRenderDateHeaderCell')
    });
    it('headerRender test', () => {
        const renderHeader = () => {
            return <div style={{background: '#f0f0f0', float: 'left', height: '28px', lineHeight: '28px'}}>自定义headerRender</div>
        }
        cy.mount(<Calendar mutiple fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]} defaultScrollIntoValue={moment('2021-04-09')}
                        dateCellHeaderReader={dateCellHeaderReader} headerRender={() => renderHeader()}/>);
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(600, 600);
        cy.compareSnapshot('mulHeaderRender');
    });
    it('locale test', () => {
        cy.mount(
            <>
                <Calendar mutiple locale='zh-cn' fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader}/>
                <Calendar mutiple locale='en-us' fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader}/>
                <Calendar mutiple locale='vi-vn' fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader}/>
            </>
        );
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(600, 460);
        cy.compareSnapshot('mulLocale');
    });
    it('defaultType test', () => {
        cy.mount(
            <>
                <Calendar mutiple fullscreen defaultType='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    defaultScrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader}/>
                <Calendar mutiple fullscreen defaultType='month' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    defaultScrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader}/>
            </>
        );
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(800, 800);
        cy.compareSnapshot('mulDefaultType');
    });
    it('quickSelect test', () => {
        interface DemoState {
            selectType: string;
            selectValues: Map<string, string>;
        }
        class Demo10 extends Component <{}, DemoState> {
            constructor(props: {}, context: {}) {
                super(props, context);
                this.state = { selectType: '', selectValues: new Map() }
            }
            onQuickSelect = ({changeValues, isChecked}: {
                changeValues: string[];
                isChecked: boolean;
            }) => {
                const {selectValues, selectType} = this.state;
                let changeValues1 = changeValues;
                changeValues1.forEach(date => {
                    isChecked || selectValues.get(date) !== selectType ? selectValues.set(date, selectType) : selectValues.delete(date);
                })
                return this.setState({selectValues: selectValues})
            }
            dateCellHeaderReader = (_current: Moment, _values: Moment[], headerChilds: (React.ReactElement)[]) => {
                return headerChilds
            }
            render() {
                return (<Calendar fullscreen mutiple type='date' quickSelect={true} onQuickSelect={this.onQuickSelect} defaultScrollIntoValue={moment('2021-04-09')}
                            value={[...this.state.selectValues.keys()].map(key => moment(key))} dateCellHeaderReader={this.dateCellHeaderReader}/>)
            }
        };
        cy.mount(<Demo10 />);
        cy.get(`.${prefixCalendar}-column-select-header`).first().click();
        cy.get(`.${prefix}-checkbox-label`).should('be.visible');
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(700, 700);
        cy.compareSnapshot('mulQuickSelect')

        cy.get(`.${prefixCalendar}-column-select-header`).first().trigger('mouseover');
        cy.get(`.${prefix}-checkbox-label`).should('be.visible');
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(700, 700);
        cy.compareSnapshot('mulQuickSelect_hover')

        cy.get(`.${prefixList}-item`).first().click();
        cy.get(`.${prefixCalendar}-row-select`).eq(1).trigger('mouseover');
        cy.get(`.${prefix}-checkbox-label`).should('be.visible');
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(700, 700);
        cy.compareSnapshot('mulQuickSelect_hover_row')

        cy.get(`.${prefixList}-item`).first().click();
        cy.get(`.${prefixCalendar}-row-select`).eq(1).click();
        cy.get(`.${prefix}-checkbox-label`).should('be.visible');
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(700, 700);
        cy.compareSnapshot('mulQuickSelect_click_row')
    });
    it('operations test', () => {
        cy.mount(<Calendar mutiple locale='en-us' fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                        scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader}
                        operations={['lastMonth', 'nextMonth', 'today', 'headerSwitcher']}/>);
        cy.viewport(600, 600);
        cy.compareSnapshot('mulOperations');
    });
    it('layout test', () => {
        cy.mount(
            <>
                <Calendar mutiple locale='zh-cn' fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader}/>
                <Calendar mutiple locale='zh-cn' fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader} layout="left"/>
            </>
        )
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(800, 800);
        cy.compareSnapshot('mulLayout');
    });
    it('markWeekend test', () => {
        cy.mount(
            <>
                <Calendar mutiple locale='zh-cn' fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader} markWeekend/>
                <Calendar mutiple locale='en-us' fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader} markWeekend/>
                <Calendar mutiple locale='vi-vn' fullscreen type='date' value={[moment('2021-04-02'), moment('2021-04-05')]}
                    scrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader} markWeekend/>
            </>
        );
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(600, 800);
        cy.compareSnapshot('mulMarkWeekend');
    });
    it('weekStartsOn test', () => {
        cy.mount(
            <div>
                <Calendar mutiple fullscreen type='date' defaultValue={[moment('2021-04-02'), moment('2021-04-05')]} 
                        defaultScrollIntoValue={moment('2021-04-09')} dateCellHeaderReader={dateCellHeaderReader} weekStartsOn={5}/>
            </div>);
        cy.get('.uf-arrow-down').should('be.visible');
        cy.viewport(600, 600);
        cy.compareSnapshot('mulWeekStartsOn');
    })
})