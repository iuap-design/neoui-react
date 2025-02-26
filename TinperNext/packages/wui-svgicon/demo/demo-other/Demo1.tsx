/**
 *
 * @title 基本用法
 * @description 使用 <SvgIcon /> 标签声明组件，指定图标对应的 type 属性。
 *
 */
import {Clipboard, Message, SvgIcon} from '@tinper/next-ui';
// 注意需要手动引入svg图标文件
import React, {Component} from 'react';
// 不能删除
import '@tinper/next-ui/lib/wui-svgicon/src/iconfont.js';

// import('@tinper/next-ui/lib/wui-svgicon/src/iconfont.js'); // 不推荐写法
// require('@tinper/next-ui/lib/wui-svgicon/src/iconfont.js'); // 不推荐写法

function success(content: string) {
    Message.destroy();
    Message.create({content: content, color: "successlight"});
}

function SvgIconItem(props: any) {
    let {type, classString, fieldid} = props;
    let content = `<SvgIcon type="${type}" />  copied `;
    let id = classString.replace("-", "_");
    return (
        <li>
            <SvgIcon fieldid={fieldid} type={type}/>
            <div className="name">{type}</div>
            <div className="usage" id={id}>{`<SvgIcon type="${type}" />`}</div>
            <Clipboard action="copy" target={`#${id}`} success={() => success(content)}/>
        </li>
    )
}

class Demo1 extends Component {
    render() {
        return (
            <div className="tinper-icon-demo">
                <ul className="icon_lists">
                    <SvgIconItem fieldid="demo" type="audio" classString="uftype-audio"/>
                    <SvgIconItem type="excel" classString="uftype-excel"/>
                    <SvgIconItem type="ai" classString="uftype-ai"/>
                    <SvgIconItem type="gdoc" classString="uftype-gdoc"/>
                    <SvgIconItem type="flash" classString="uftype-flash"/>
                    <SvgIconItem type="gform" classString="uftype-gform"/>
                    <SvgIconItem type="html" classString="uftype-html"/>
                    <SvgIconItem type="csv" classString="uftype-csv"/>
                    <SvgIconItem type="slide" classString="uftype-slide"/>
                    <SvgIconItem type="box_notes" classString="uftype-box_notes"/>
                    <SvgIconItem type="webex" classString="uftype-webex"/>
                    <SvgIconItem type="eps" classString="uftype-eps"/>
                    <SvgIconItem type="psd" classString="uftype-psd"/>
                    <SvgIconItem type="pack" classString="uftype-pack"/>
                    <SvgIconItem type="gpres" classString="uftype-gpres"/>
                    <SvgIconItem type="exe" classString="uftype-exe"/>
                    <SvgIconItem type="txt" classString="uftype-txt"/>
                    <SvgIconItem type="unknown" classString="uftype-unknown"/>
                    <SvgIconItem type="attachment" classString="uftype-attachment"/>
                    <SvgIconItem type="pages" classString="uftype-pages"/>
                    <SvgIconItem type="video" classString="uftype-video"/>
                    <SvgIconItem type="gdocs" classString="uftype-gdocs"/>
                    <SvgIconItem type="ppt" classString="uftype-ppt"/>
                    <SvgIconItem type="word" classString="uftype-word"/>
                    <SvgIconItem type="pdf" classString="uftype-pdf"/>
                    <SvgIconItem type="image" classString="uftype-image"/>
                    <SvgIconItem type="stypi" classString="uftype-stypi"/>
                    <SvgIconItem type="keynote" classString="uftype-keynote"/>
                    <SvgIconItem type="gsheet" classString="uftype-gsheet"/>
                    <SvgIconItem type="visio" classString="uftype-visio"/>
                    <SvgIconItem type="zip" classString="uftype-zip"/>
                    <SvgIconItem type="xml" classString="uftype-xml"/>
                    <SvgIconItem type="rtf" classString="uftype-rtf"/>
                </ul>
            </div>
        )
    }
}

export default Demo1
