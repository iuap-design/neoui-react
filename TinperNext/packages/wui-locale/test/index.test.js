import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import TLocale from '../../wui-provider/test/testLocale';
import {Button, ConfigProvider, Modal} from '../../index';
import {formatSpecially, getLangInfo, globalLangs, mapLangFn} from '../src/tool';
import { prefix } from '../../wui-core/src/updatePrefix';
import Timepicker from '../../wui-timepicker/src';
const prefixTime = `${prefix}-time-picker`
import {fr} from '../src/local.map'
import i18n from '../../wui-empty/src/i18n';

describe('component: Provider, <test prop:: locale>', () => {
    it('should init showing English and it should be toggled', () => {
        const dom = render(
            <TLocale />
        );
        // 此处 可填写更多的 断言
        expect(dom.container.querySelector('.wui-pagination-total').innerHTML).toContain('Total');
    });
});
const MyModal = (options) => (
    <div id="root">
        <Button>
            打开模态框
        </Button>
        <Modal
            getPopupContainer={() => document.getElementById('root')}
            containerClassName='my-class-v'
            visible={true}
            {...options}
        >
            <Modal.Header>
                <Modal.Title>标题</Modal.Title>
            </Modal.Header>
            <Modal.Body tabIndex='-1'>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal.Body>
            <Modal.Footer>
                <Button colors="secondary" style={{marginRight: 8}}>取消</Button>
                <Button colors='primary'>确定</Button>
            </Modal.Footer>
        </Modal>
    </div>
);
describe('component: Provider, <test prop:: locale>', () => {
    it('should init showing English and it should be toggled', () => {
        const dom = render(
            <MyModal />
        );
        // 此处 可填写更多的 断言
        // dom.container.setProps({visible: false})
        // expect(dom.container.querySelector('.wui-pagination-total').innerHTML).toContain('Total');
        // expect(dom.container.querySelector('.wui-pagination-total').clientHeight).toMatchSnapshot();
        // expect(dom.container.querySelector('.wui-pagination-total')).toMatchSnapshot();
    });
});
const formatMap = {
    yearFormat: {
        'YYYY年': ['zh', 'ja'],
        'YYYY년': ['ko', 'kr'],
        'YYYY-يىلى': ['ug'],
        'YYYY': ['其他']
    },
    dayFormat: {
        'D日': ['zh', 'ja'],
        'DD': ['fr', 'hu'],
        'D-كۈنى':['ug'],
        'D': ['其他']
    },
    quarter: {
        '[Q]Q': ['en'],
        'Q[其他]': ['其他']
    },
    dateTimeFormat: {
        'YYYY/M/D HH:mm:ss': ['eu', 'si'],
        'D.M.YYYY HH:mm:ss': ['az', 'de', 'et', 'cs', 'fi', 'hr', 'lv', 'mk', 'sk'],
        'D M YYYY HH:mm:ss': ['bg'],
        'M/D/YYYY HH:mm:ss': ['ar', 'en', 'fa', 'he', 'hi', 'ka', 'kn', 'ml', 'mm', 'ms', 'ta', 'tr', 'ur', 'uz'],
        'DD/MM/YYYY HH:mm:ss': ['fr'],
        'YYYY/MM/DD HH:mm:ss': ['mn', 'hu'],
        'D-M-YYYY HH:mm:ss': ['by', 'kk', 'nl', 'ru', 'uk'],
        'YYYY年M月D日 HH時mm分ss秒': ['ja', 'tw'],
        'YYYY年M月D日 HH时mm分ss秒': ['zh'],
        'YYYY-M-D HH:mm:ss': ['km'],
        'DD.MM.YYYY HH:mm:ss': ['nb', 'sl', 'sr'],
        'YYYY-MM-DD H:mm:ss': ['sv'],
        'YYYY-يىلىM—ئاينىڭD-كۈنى، HH:mm:ss': ['ug'],
        'D/M/YYYY HH:mm:ss': ['其他']
    },
}
describe('test utils', () => {
    describe('test util formatSpecially', () => {
        Object.entries(formatMap).forEach(([formatName, mapValue]) => {
            Object.entries(mapValue).forEach(([format, locales]) => {
                locales.forEach(locale => {
                    it(`lang ${locale} return ${formatName || formatName + 'Format'} should be ${format}`, () => {
                        const value = formatSpecially(locale, {[formatName]: locale})
                        expect([value[formatName] || value[formatName + 'Format'], locale]).toEqual([format, locale])
                    })
                })

            })
        })
    })
    describe('test util mapLangFn', () => {
        const value = mapLangFn(fr);
        expect(value.calendar).toBeDefined()
    })
    describe('test util getLangInfo {}', () => {
        ['locale', 'lang'].forEach(v => {
            it(``, () => {
                const value = getLangInfo({
                    [v]: 'zh',
                    'noCollectImg': 'bbbb~',
                    'noDataImg': 'cccc~',
                    'noSearchImg': 'dddd~',
                    'noNetworkImg': 'eeee~',
                }, i18n)
                if (value.langMap.lang) {
                    delete value.langMap.lang
                }
                expect(value).toStrictEqual({
                    lang: 'zh-cn',
                    langMap: {
                        locale: 'zh-cn',
                        'noFound': '404',
                        'noVisualizeDataImg': '暂时没有数据哦~',
                        'noCollectImg': 'bbbb~',
                        'noDataImg': 'cccc~',
                        'noSearchImg': 'dddd~',
                        'noNetworkImg': 'eeee~',
                    }
                })
                
            })
        })
    })
    describe('test util getLangInfo global', () => {
        
        it(``, () => {
            // globalLangs = {globalLangs,...mapLangFn(fr)};
            fr["UID:P_TINPERNEXT-FE_184FD33005600047"] = 'aaaa',
            expect(ConfigProvider.hasRegisterLang('zh-cn')).toBe(false)
            ConfigProvider.registerLang('zh-cn', fr);
            expect(ConfigProvider.hasRegisterLang('zh-cn')).toBe(true)
            const value = getLangInfo('zh-cn', i18n, 'empty');
            console.log(value, global.globalLangs, window?.globalLangs)
            expect(value.langMap.noVisualizeDataImg).toBe('aaaa')
        })

    })

})

