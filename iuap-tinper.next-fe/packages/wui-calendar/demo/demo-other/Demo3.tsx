/**
 *
 * @title 多语示例
 * @description 多语示例
 *
 */

import {Calendar, Button} from "@tinper/next-ui";
import React, {Component} from 'react';
import {Moment} from "moment"

function onSelect(value: Moment) {
    console.log(value);
}

class Demo2 extends Component<{}, {type: string; locale: string}> {

    constructor(props: {}, context: {}) {
        super(props, context);

        this.state = {
            type: 'month',
            locale: 'zh-cn'
        }
    }

    onTypeChange(type: string) {
        this.setState({
            type,
        });
    }
    changeLang = (locale: string) => {
        this.setState({
            locale
        })
    }
    render() {
        const {locale} = this.state;
        return (
            <div>
                <Button
                    bordered
                    colors={locale === 'zh-cn' ? "primary" : undefined}
                    className="demo-margin"
                    onClick={()=>this.changeLang('zh-cn')}>
                    汉 语
                </Button>
                <Button
                    bordered
                    colors={locale === 'en-us' ? "primary" : undefined}
                    className="demo-margin"
                    onClick={()=>this.changeLang('en-us')}>
                    英 语
                </Button>
                <Button
                    bordered
                    colors={locale === 'vi-vn' ? "primary" : undefined}
                    className="demo-margin"
                    onClick={()=>this.changeLang('vi-vn')}>
                    越南语
                </Button>
                <Calendar
                    style={{margin: 10}}
                    fullscreen
                    onSelect={onSelect}
                    type={this.state.type}
                    onPanelChange={this.onTypeChange.bind(this)}
                    locale={locale} // 2、设置 locale语言包
                />
            </div>
        )
    }
}

export default Demo2
