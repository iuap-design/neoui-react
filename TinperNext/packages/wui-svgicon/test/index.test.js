/** SvgIcon.tsx */
import {mount, shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, sleep} from '../../../next-ui-library/test/common/index';
import {prefix} from '../../wui-core/src/updatePrefix';
import SvgIcon from '../src/index';

const prefixSvgIcon = `${prefix}-svgicon`;
describe('SvgIcon', () => {
    it('SvgIcon should be exist', () => {
        let svgIcon = shallow(<SvgIcon type="audio"/>);
        expect(svgIcon.find('svg').props().class).toEqual(`${prefixSvgIcon}`)
    });
    it('className test, <test prop:: className>', () => {
        let svgIcon = shallow(<SvgIcon type="audio" className='my-class'/>);
        expect(svgIcon.find('svg').props().class).toEqual(`my-class ${prefixSvgIcon}`)
    });
    describe('component: SvgIcon, <test prop:: type>', () => {
        it('type should be audio', function() {
            const typeList = [
                "audio", "excel", "ai", "gdoc", "flash", "gform", "html", "csv",
                "slide", "box_notes", "webex", "eps", "psd", "pack", "gpres", "exe",
                "txt", "unknown", "attachment", "pages", "video", "gdocs", "ppt", "word",
                "pdf", "image", "stypi", "keynote", "gsheet", "visio", "zip", "xml", "rtf"
            ]
            typeList.forEach(typeName => {
                let svgIcon = mount(<SvgIcon type={`${typeName}`}/>);
                expect(svgIcon.find("use").props()).toEqual({"xlink:href": `#uftype-${typeName}`})
                svgIcon.unmount()
            })
        })
        it('wrong type cannot be render', function() {
            let svgIcon = mount(<SvgIcon type="mytype"/>);
            expect(svgIcon.find("use").props()).toEqual({"xlink:href": `#uftype-mytype`})
            // 错误的也不会报错，只是显示空白，而且无法获取图标的样式内容，不能和正确情况区分
        })
    });
    describe('component: SvgIcon, <test prop:: viewBox>', () => {
        let viewbox = "0 0 2048 2048"
        it('viewBox should be `${viewbox}`', function() {
            let svgIcon = mount(<SvgIcon type="audio" viewBox={`${viewbox}`}/>);
            expect(svgIcon.find("svg").prop("viewBox")).toEqual(`${viewbox}`)
        })
    });
    describe('component: SvgIcon, <test prop:: component>', () => {
        const HeartSvg = () => (
            <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
                <path
                    d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"/>
            </svg>
        );
        it('SvgIcon defined by component has path', function() {
            let svgIcon = mount(<SvgIcon component={HeartSvg}/>);
            expect(svgIcon.find("path")).toBeTruthy();
        })
    });
    describe('component: SvgIcon', () => {
        it('iconfont.js', async () => {
            var element = document.createElement("script");
            document.body.appendChild(element);
            expect(document.getElementsByTagName('svg').length).toBe(0)
            expect(document.getElementsByTagName('symbol').length).toBe(0)
            const iconfont = require("../src/iconfont.js");
            await sleep(100)
            expect(document.getElementsByTagName('svg').length).toBe(1)
            expect(document.getElementsByTagName('symbol').length).toBe(35)
            const iconlist = [
                'uftype-guanbi', 'uftype-kaiqi', 'uftype-audio', 'uftype-excel', 'uftype-ai', 
                'uftype-gdoc', 'uftype-flash', 'uftype-gform', 'uftype-html', 'uftype-csv', 
                'uftype-slide', 'uftype-box_notes', 'uftype-webex', 'uftype-eps', 'uftype-psd', 
                'uftype-pack', 'uftype-gpres', 'uftype-exe', 'uftype-txt', 'uftype-unknown', 
                'uftype-attachment', 'uftype-pages', 'uftype-video', 'uftype-gdocs', 'uftype-ppt', 
                'uftype-word', 'uftype-pdf', 'uftype-image', 'uftype-stypi', 'uftype-keynote', 
                'uftype-gsheet', 'uftype-visio', 'uftype-zip', 'uftype-xml', 'uftype-rtf'
            ]
            const list = [];
            Array.from(document.getElementsByTagName('symbol')).forEach(item => list.push(item.id))
            expect(list).toEqual(iconlist)
        })
    });
});
