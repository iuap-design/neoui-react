/** Anchor.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React, {Component} from 'react';
import {testStyle} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix'
import Anchor from '../src/index';
import Menu from '../../wui-menu/src';
import { sleep } from '../../../next-ui-library/test/common/utils';
import {fireEvent, render, screen} from '@testing-library/react';
import AnchorHorizontal from '../src/AnchorHorizontal';

const prefixAnchor = `${prefix}-anchor`;
const {Link} = Anchor

function mockRect(element) {
    const mock = jest.spyOn(element, 'getBoundingClientRect');
    mock.mockReturnValue({
        top: 0,
        bottom: 100,
        left: 0,
        right: 100,
        width: 100,
        height: 100,
        y: 0
    });
}

// var newDiv = document.createElement("div");
// newDiv.innerHTML = `
//   <div id="target">
//     <div id="container">
//     </div>
//   </div>
// `;
// document.body.appendChild(newDiv);

// beforeEach(() => {
//     var target = document.querySelector("#target");
//     var container = document.querySelector("#container");
//     target.style.overflowY = "scroll";
//     target.top = 0;
//     target.bottom = 100;
//     container.top = 0;
//     container.bottom = 500;
//     var top = 0, bottom = 0;
//     target.onscroll = function() {
//         container.top -= 100;
//         container.bottom -= 100;
//         top -= 100;
//         bottom -= 100
//     };
//     const myMock = jest.spyOn(
//         Element.prototype,
//         'getBoundingClientRect',
//     );

//     myMock.mockImplementation(function() {
//         return {
//             top: this.top ?? top,
//             bottom: this.bottom ?? bottom,
//         }
//     });
// })

describe('Anchor', function() {
    let anthors = [
        {
            href: "one",
            name: "国内要闻",
            content: " 戏曲进高校玩快闪 “圈粉”大学生 \n "
				+ "长春年近六旬男子上演花样自行车绝技 \n "
				+ "民众成都博物馆里享“餐桌上的文化之旅 \n "
				+ "更大更好吃的海蛎子有望端上青岛市民餐桌！ \n "
				+ "人民铁道“中央厨房”今日上线 \n "
				+ "住宅小区的大件垃圾有望得到回收利用 \n "
				+ "地上忽现大坑 瞬间吞掉两幢房子 \n ",
        },
        {
            href: "two",
            name: "国际新闻",
            content: " 一只好莱坞的 巨星猪 是怎么诞生的 \n "
				+ "追剧听相声玩手游 “歪果仁”为了学汉语也是拼了 \n "
				+ "一等奖得主齐现身 领奖不忘捐款献爱心 \n "
				+ "他或是安倍唯一不敢反对的男人！ \n "
				+ "美男摔落悬崖掉进活火山，躲过摄氏超过1000度 \n "
				+ "苏格兰媒体：凯尔特人没有向穆里尼奥开出邀约 \n "
				+ "青少年手机成瘾危害大 各国政府纷纷出招应对 \n ",
        }
    ]
    let anthors2 = [
        {
            href: "one31",
            name: "国内要闻3",
            content: " 戏曲进高校玩快闪 “圈粉”大学生 \n "
                + "长春年近六旬男子上演花样自行车绝技 \n "
                + "民众成都博物馆里享“餐桌上的文化之旅 \n "
                + "更大更好吃的海蛎子有望端上青岛市民餐桌！ \n "
                + "人民铁道“中央厨房”今日上线 \n "
                + "住宅小区的大件垃圾有望得到回收利用 \n "
                + "地上忽现大坑 瞬间吞掉两幢房子 \n ",
        },
        {
            href: "two31",
            name: "国际新闻3",
            content: " 一只好莱坞的 巨星猪 是怎么诞生的 \n "
                + "追剧听相声玩手游 “歪果仁”为了学汉语也是拼了 \n "
                + "一等奖得主齐现身 领奖不忘捐款献爱心 \n "
                + "他或是安倍唯一不敢反对的男人！ \n "
                + "美男摔落悬崖掉进活火山，躲过摄氏超过1000度 \n "
                + "苏格兰媒体：凯尔特人没有向穆里尼奥开出邀约 \n "
                + "青少年手机成瘾危害大 各国政府纷纷出招应对 \n ",
        },
        {
            href: "three31",
            name: "财经3",
            content: " 最低工资标准上调窗口开启 京鲁冀等多个省市 \n "
                + "「重磅发布」2019年欧洲十大海上风电场排行榜！ \n "
                + "又一80后上市公司实控人被刑拘！ \n "
                + "五月种菜大全来了，这些蔬菜您种了没有？ \n "
                + "记住这个落井之人 \n "
                + "测绘准入放宽在即，新玩家新规则倒逼产业转型 \n "
                + "回顾20年前A股那场轰轰烈烈的“519行情”"
        },
        {
            href: "four31",
            name: "互联网3",
            content: " 光明日报头版：读懂中国经济的巨大韧性 \n "
                + "那些还在发朋友圈的朋友们，才是人间珍品 \n "
                + "电商平台不该为“代吵架服务”设摊 \n "
                + "《从0到1》序二——读书笔记 \n "
                + "投资2000万美元狂赚7000倍 \n "
                + "五一消费账单来了！这个小长假，你的钱花哪了？ \n "
                + "让数字经济更好助力高质量发展 \n "
                + "「评论」“小降准”的大意义"
        },
        {
            href: "five31",
            name: "房产3",
            content: " 智慧城市建设莫一哄而上 \n "
                + "二手房产权纠纷有哪些？ \n "
                + "如何降低购房风险？ \n "
                + "哪些城市亮瞎眼，哪些城市很失落 \n "
                + "北京项目近况一览 \n "
                + "当初没好好装卫生间 现在后悔死了 \n "
                + "小户型榻榻米的制作流程 这样准没错 \n "
                + "如何解决室内干燥 一个加湿器是不行的 \n "
                + "新风系统有没有用 到底要不要装呢"
        },
        {
            href: "six31",
            name: "汽车3",
            content: " 15万预算，适合年轻人的2台运动轿车，颜值高实力强 \n "
                + "牌子大口碑好销量还高，12万左右的自动挡合资轿车 \n "
                + "大众系SUV多到脸盲？一招教你如何选 \n "
                + "一季度轿车市场分析 \n "
                + "网友偶遇贴特大号“实习”标志的豪车 \n "
                + "要想涡轮坏得快，这四个错误天天犯！ \n "
                + "汽车保养只换机油，4个零件要是不换的 \n "
                + "去4S店“首保”，这3个细节要注意 \n "
                + "最均衡国产10万元SUV推荐"
        },
    ]
    let items = [
        {
              key: 'one',
              href: 'one',
              title: '国内要闻',
        },
        {
              key: 'two',
              href: 'two',
              title: '国际新闻',
        },
        {
            key: 'three',
            href: 'three',
              title: '财经',
        },
        {
            key: 'four',
            href: 'four',
            title: '互联网',
        },
        {
            key: 'five',
            href: 'five',
            title: '房产',
        },
        {
            key: 'six',
            href: 'six',
            title: '汽车',
        },
    ]
    let flag = ''
    let chageFlage = ''
    let onClick = (val) => {
        flag = val.title
    }
    let onChange = (val) => {
        chageFlage = val
    }

    class Demo1 extends Component {
        render() {
            return (
                <div className="content">
                    <Anchor fieldid="fieldid-id" antd offsetTop={100} style={{color: 'red'}} affix={true} showInkInFixed={false}
                        onClick={onClick}
                        onChange={onChange}
                        getContainer={() => {
                            return document.querySelector('body')
                        }}
                        {...this.props}
                    >
                        {
                            anthors.map(item => {
                                return (
                                    <Link key={item.href} href={`${item.href}`} title={item.name}></Link>
                                )
                            })
                        }
                    </Anchor>
                    <div>
                        {
                            anthors.map(item => {
                                return (
                                    <p key={item.href + 'content'} style={{'paddingTop': '100px'}} id={item.href}>
                                        {item.content}
                                    </p>
                                )
                            })
                        }
                    </div>

                </div>
            )
        }
    }

    class Demo2 extends Component {
        render() {
            return (
                <div className="demo2">
                    <Anchor antd offsetTop={250} style={{width: '400px'}} direction="horizontal" {...this.props}>
                        {
                            anthors2.map(item => {
                                return (
                                //  <li key={item.href}><a href={`#${item.href}`} onClick={this.clickFn.bind(this, item.href)}>{item.name}</a></li>
                                    <Link href={`${item.href}`} title={item.name} key={item.name}></Link>
                                )
                            })
                        }
                    </Anchor>
                    <div className="content">
                        {
                            anthors2.map(item => {
                                return (
                                    <div className="demo-con" style={{'paddingTop': '150px'}} id={item.href}
                                        key={item.href}>
                                        <pre>
                                            {item.content}
                                        </pre>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            )
        }
    }
    class Demo3 extends Component {
        render() {
            return (
                <div className="content">
                    <Anchor antd offsetTop={100} style={{color: 'red'}} affix={true}
                        {...this.props}
                    >
                        {
                            anthors.map(item => {
                                return (
                                    <Link key={item.href} href={`${item.href}`} title={item.name}></Link>
                                )
                            })
                        }
                    </Anchor>
                    <div>
                        {
                            anthors.map(item => {
                                return (
                                    <p key={item.href + 'content'} style={{'paddingTop': '100px'}} id={item.href}>
                                        {item.content}
                                    </p>
                                )
                            })
                        }
                    </div>

                </div>
            )
        }
    }
    class Demo4 extends Component {
        render() {
            return (
                <div className="demo1">  
                    <div className="content">
                        {
                            anthors.map(item=>{
                                return (
                                    <p style={{'paddingTop':'100px'}} id={item.href}> 
                                        <pre >
                                            {item.content}
                                        </pre>
                                    </p>
                                )
                            })
                        }
                    </div>
                    <Anchor offset='100px' {...this.props}>
                        <ul id="my-awesome-nav" >
                        {
                            anthors.map(item=>{
                                return (
                                    <li><a href={`#${item.href}`}>{item.name}</a></li>
                                )
                            })
                        }
                        </ul>
                    </Anchor>
                </div>
            )
        }
    }
    class Demo5 extends Component {
        render() {
            return (
                <div className="demo5">
                    <Anchor antd {...this.props}>
                        {
                            anthors2.map(item => {
                                return (
                                //  <li key={item.href}><a href={`#${item.href}`} onClick={this.clickFn.bind(this, item.href)}>{item.name}</a></li>
                                    <Link href={`${item.href}`} title={item.name} key={item.name}></Link>
                                )
                            })
                        }
                    </Anchor>
                    <div className="content">
                        {
                            anthors2.map(item => {
                                return (
                                    <div className="demo-con" style={{'paddingTop': '150px'}} id={item.href}
                                        key={item.href}>
                                        <pre>
                                            {item.content}
                                        </pre>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            )
        }
    }
    let items6 = [
        {
              key: 'one31',
              href: 'one31',
              title: '国内要闻3',
        },
        {
              key: 'two31',
              href: 'two31',
              title: '国际新闻3',
        },
        {
            key: 'three31',
            href: 'three31',
              title: '财经3',
        },
        {
            key: 'four31',
            href: 'four31',
            title: '互联网3',
        },
        {
            key: 'five31',
            href: 'five31',
            title: '房产3',
        },
        {
            key: 'six31',
            href: 'six31',
            title: '汽车3',
        },
    ]
    class Demo6 extends Component {
        render() {
            return (
                <div className="demo5">
                    <Anchor antd items={items6} {...this.props}>
                    </Anchor>
                    <div className="content">
                        {
                            anthors2.map(item => {
                                return (
                                    <div className="demo-con" style={{'paddingTop': '150px'}} id={item.href}
                                        key={item.href}>
                                        <pre>
                                            {item.content}
                                        </pre>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            )
        }
    }

    class Demo7 extends Component {
        render() {
            return (
                <div className="demo7">
                    <Anchor antd offsetTop={0} style={{width: '400px'}} direction="horizontal" activeKey="five31" {...this.props}>
                        {
                            anthors2.map(item => {
                                return (
                                //  <li key={item.href}><a href={`#${item.href}`} onClick={this.clickFn.bind(this, item.href)}>{item.name}</a></li>
                                    <Link href={`${item.href}`} title={item.name} key={item.name}></Link>
                                )
                            })
                        }
                    </Anchor>
                    <div className="content">
                        {
                            anthors2.map(item => {
                                return (
                                    <div className="demo-con" style={{'paddingTop': '150px'}} id={item.href}
                                        key={item.href}>
                                        <pre>
                                            {item.content}
                                        </pre>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            )
        }
    }

    it('component: Anchor, <test prop:: affix>anchor affix', function() {
        let anchorNode = mount(<Demo1/>);
        expect(anchorNode.find(`.${prefix}-affix-container`).length).toEqual(1);
    })
    it('component: Anchor, <test prop:: offsetTop>anchor offsetTop', function() {
        let anchorNode = mount(<div id="target" role="test"><Demo2 getContainer={() => document.querySelector('#target')} /></div>);
        // document.getElementsByTagName('body').setAttribute('role','test');
        // expect(anchorNode.find('Affix').props().offsetTop).toEqual(100);
        anchorNode.find('.wui-anchor-link-title').at(3).simulate('click')
        fireEvent.scroll(screen.getByRole('test'))
        // console.log('****', screen.getByText('国内要闻3').parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement)
        // expect(anchorNode.find('.wui-affix-content').props().style.top).toEqual(100)
    })
    it('component: Anchor, <test prop:: getContainer>anchor getContainer', function() {
        let anchorNode = mount(<Demo1/>);
        // expect(anchorNode.find('Affix').props().target().tagName).toEqual('BODY');
        expect(anchorNode.find('.wui-affix-container').length).toEqual(1)
    })
    it('component: Anchor, <test prop:: showInkInFixed> anchor showInkInFixed', function() {
        let anchorNode = mount(<Demo1/>);
        expect(anchorNode.find(`.${prefixAnchor}`).hasClass('fixed')).toEqual(false);
    })
    it('component: Anchor, <test prop:: onClick>anchor onClick', function() {
        let anchorNode = mount(<Demo1/>);
        anchorNode.find(`.${prefixAnchor}-link-title`).at(0).simulate('click');
        expect(flag).toEqual('国内要闻');
    })
    it('component: Anchor, <test prop:: onChange>anchor onChange', function() {
        let anchorNode = mount(<Demo1/>);
        anchorNode.find(`.${prefixAnchor}-link-title`).at(1).simulate('click');
        expect(chageFlage).toEqual('two');
    })
    testStyle({
        title: 'component: Anchor, <test prop:: style>',
        Component: Demo1,
        selector: `.${prefixAnchor}-wrapper`,
        style: {
            color: 'red'
        }
    })
    it('fieldid, <test prop:: fieldid>', () => {
        let wrapper = mount(<Demo1/>, {attachTo: document.body});
        expect(wrapper.find(`.${prefixAnchor}`).find('a').at(0).prop('fieldid')).toEqual('fieldid-id-anchorLink-one');
        expect(wrapper.find(`.${prefixAnchor}`).find('a').at(1).prop('fieldid')).toEqual('fieldid-id-anchorLink-two');
    })
    it('baseAnchor, <test prop:: onChange>', async () => {
        let wrapper = mount(<Demo2 />);
        const {Item} = Menu
        let menuArr = [
            <Item key='3'>Tab 6</Item>,
            <Item key='4'>Tab 7</Item>,
            <Item key='5'>Tab 8</Item>
        ]
        // wrapper.find('AntdAnchor').setState({ prev: true, next: true, menuArr: menuArr })
        // wrapper.find(`.uf-listwithdots`).simulate('click')
        // wrapper.find('.uf-anglearrowpointingtoright').simulate('click');
        // wrapper.find('.uf-anglearrowpointingtoright').simulate('click');
        // wrapper.find('.uf-anglearrowpointingtoright').simulate('click');
        expect(wrapper.find('.wui-anchor-prev-arrow').hasClass('wui-anchor-disabled')).toEqual(true)
        // wrapper.update()
        // wrapper.find(`.wui-dropdown-menu-item`).at(0).simulate('click')
        // document.getElementsByClassName
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(0).simulate('click')
    })
    it('baseAnchor, <test prop:: base>', async () => {
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let wrapper = mount(<Demo2 />, { attachTo: container });
        wrapper.find(`.${prefixAnchor}-link-title`).at(1).simulate('click');
        wrapper.find('.uf-anglearrowpointingtoright').simulate('click');
        wrapper.find('.uf-anglepointingtoleft').simulate('click')
        // document.body.dispatchEvent(new Event('scroll', {bubbles: true}))
        // await sleep(10)
        // mockRect(document.getElementById('one31'))
        // document.body.dispatchEvent(new Event('scroll', {bubbles: true}))
        wrapper.unmount()
    })
    it('baseAnchor, <test prop:: getContainer >', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let wrapper = mount(<Demo2 />, { attachTo: container });
        wrapper.find(`.${prefixAnchor}-link-title`).at(1).simulate('click');
        // wrapper.find('AntdAnchor').setState({anchorItems: [
        //     {
        //         key: 'one31', width: 100, left: 12, href: 'one31'
        //     },
        //     {
        //         key: 'two31', width: 100, left: 112, href: 'two31'
        //     },
        //     {
        //         key: 'three31', width: 100, left: 212, href: 'three31'
        //     }
        // ], wrapperW: 78})
        // wrapper.find('AntdAnchor').instance().startIndex = 0
        wrapper.find('.uf-anglearrowpointingtoright').simulate('click');
        wrapper.find('.uf-anglearrowpointingtoright').simulate('click');
        wrapper.find('.uf-anglepointingtoleft').simulate('click')
        // document.body.dispatchEvent(new Event('scroll', {bubbles: true}))
        // await sleep(10)
        // mockRect(document.getElementById('one31'))
        // document.body.dispatchEvent(new Event('scroll', {bubbles: true}))
        // wrapper.find('AntdAnchor').instance().onSelect({key: '1'});
        // wrapper.find('AntdAnchor').instance().onSelect({key: '0'});
    })
    it('baseAnchor, <test prop:: hx >', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let wrapper = mount(<Demo2 />, { attachTo: container });
        // wrapper.find('AntdAnchor').instance().getStartIndex(3)
        // wrapper.find('AntdAnchor').instance().scrollItem(3)
        // await sleep(10)
        // wrapper.find('AntdAnchor').instance().scrollItem(0)
        // wrapper.find('AntdAnchor').instance().scrollHand()
        wrapper.find(`.${prefixAnchor}-link-title`).at(2).simulate('click')
        expect(wrapper.find(`.${prefixAnchor}-link-title`).at(2).hasClass(`${prefixAnchor}-link-title-active`)).toEqual(true)
    })
    it('baseAnchor, <test prop:: scrollHand >', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let wrapper = mount(<Demo2 getContainer={() => {return document.getElementById('container')}} />, { attachTo: container });
        // wrapper.find('AntdAnchor').instance().scrollHand()
        wrapper.find(`.${prefixAnchor}-link-title`).at(3).simulate('click')
        expect(wrapper.find(`.${prefixAnchor}-link-title`).at(3).hasClass(`${prefixAnchor}-link-title-active`)).toEqual(true)
    })
    it('baseAnchor, <test prop:: into item >', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let wrapper = mount(<Demo2 />, { attachTo: container });
        wrapper.find(`.${prefixAnchor}-link-title`).at(1).simulate('click');
        // wrapper.find('AntdAnchor').setState({anchorItems: [
        //     {
        //         key: 'one31', width: 100, left: 12, href: 'one31'
        //     },
        //     {
        //         key: 'two31', width: 100, left: 112, href: 'two31'
        //     },
        //     {
        //         key: 'three31', width: 100, left: 212, href: 'three31'
        //     }
        // ], wrapperW: 200})
        // wrapper.find('AntdAnchor').instance().startIndex = 0
        wrapper.find('.uf-anglearrowpointingtoright').simulate('click');
        wrapper.find('.uf-anglearrowpointingtoright').simulate('click');
        wrapper.find('.uf-anglepointingtoleft').simulate('click')
        // wrapper.find('AntdAnchor').instance().onSelect({key: '1'});
        // wrapper.find('AntdAnchor').instance().getMenuItem('0');
    })
    it('test shuxiang items', async () => {
        let wrapper = mount(<Demo2 items={items} />)
        wrapper.find('.wui-anchor-link').at(0)
        expect(wrapper.find('.wui-anchor-link').at(0).hasClass('wui-anchor-link-active')).toEqual(true)
    })
    it('test hengxiang items', function() {
        let anchorNode = mount(<Demo1 items={items} />);
        expect(anchorNode.find('.wui-anchor-link').at(0).hasClass('wui-anchor-link-active')).toEqual(true)
        // await sleep(10)
        anchorNode.unmount()
    })
    it('test hengxiang getContainer', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let anchorNode = mount(<Demo3 getContainer={() => {return document.getElementById('container')}} />, { attachTo: container });
        // anchorNode.find('AntdAnchor').instance().scrollHand()
        // await sleep(10)
        anchorNode.find(`.${prefixAnchor}-link`).simulate('click')
        expect(anchorNode.find(`.${prefixAnchor}-link`).hasClass(`${prefixAnchor}-link-active`)).toEqual(true)
        anchorNode.unmount()
    })
    it('test hengxiang getContainer is null', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let anchorNode = mount(<Demo3 />, { attachTo: container });
        // anchorNode.find('AntdAnchor').instance().scrollHand()
        // await sleep(10)
        anchorNode.find(`.${prefixAnchor}-link`).simulate('click')
        expect(anchorNode.find(`.${prefixAnchor}-link`).hasClass(`${prefixAnchor}-link-active`)).toEqual(true)
        anchorNode.unmount()
    })
    // it('test before anchor', async () => {
    //     document.body.innerHTML = ''
    //     const container = document.createElement('div');
    //     container.setAttribute('id', 'container');
    //     document.body.appendChild(container);
    //     let anchorNode = mount(<Demo4  selector="container" concent={() => {return document.getElementById('container')}} />, { attachTo: container });
    //     anchorNode.find('AntdAnchor').instance().scrollHand()
    //     expect(anchorNode.find('.my-awesome-nav').length).toBe(1)
    //     // await sleep(10)
    //     anchorNode.unmount()
    // })
    it('baseAnchor, <test prop:: scrollItem  >', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let wrapper = mount(<Demo2 />, { attachTo: container });
        // wrapper.find('AntdAnchor').instance().getStartIndex(3)
        // wrapper.find('AntdAnchor').instance().scrollItem(3)
        // wrapper.find('AntdAnchor').setState({anchorItems: [
        //     {
        //         key: 'one31', width: 100, left: 12, href: 'one31'
        //     },
        //     {
        //         key: 'two31', width: 100, left: 112, href: 'two31'
        //     },
        //     {
        //         key: 'three31', width: 100, left: 212, href: 'three31'
        //     },
        //     {
        //         key: 'four31', width: 100, left: 312, href: 'four31'
        //     },
        //     {
        //         key: 'five31', width: 100, left: 412, href: 'five31'
        //     }
        // ], wrapperW: 200, prevScreenItem: [0, 1, 2]})
        // // await sleep(10)
        // wrapper.update()
        // wrapper.find('AntdAnchor').instance().scrollItem(1)
        // wrapper.update()
        // wrapper.find('AntdAnchor').instance().scrollItem(-1)
        // wrapper.update()
        // wrapper.find('AntdAnchor').instance().scrollItem(4)
        // wrapper.update()
        // wrapper.find('AntdAnchor').instance().scrollItem(0)
        // wrapper.update()
        new Array(6).map((item, index) => {
            // wrapper.find(`.${prefix}-tabs-tab`).at(index).simulate('click');
            wrapper.find(`.${prefixAnchor}-link-title`).at(index).simulate('click')
            expect(wrapper.find(`.${prefixAnchor}-link-title`).at(index).hasClass(`${prefixAnchor}-link-title-active`)).toEqual(true)
        })
    })
    it('baseAnchor, <test prop:: onSelect fn test >', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        window.HTMLElement.prototype.scrollIntoView = jest.fn()
        let wrapper = mount(<Demo2 />, { attachTo: container });
        await sleep(1000)
        // wrapper.find('AntdAnchor').instance().onSelect({key: '3'})
        // wrapper.update()
        // wrapper.find('AntdAnchor').setState({startIndex: 2})
        // wrapper.find('AntdAnchor').instance().onSelect({key: '1'})
        wrapper.find(`.${prefixAnchor}-link-title`).at(3).simulate('click')
        expect(wrapper.find(`.${prefixAnchor}-link-title`).at(3).hasClass(`${prefixAnchor}-link-title-active`)).toEqual(true)
        wrapper.find(`.${prefixAnchor}-link-title`).at(1).simulate('click')
        expect(wrapper.find(`.${prefixAnchor}-link-title`).at(1).hasClass(`${prefixAnchor}-link-title-active`)).toEqual(true)
    })
    it('baseAnchor, <test prop:: onSelect fn test other>', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        window.HTMLElement.prototype.scrollIntoView = jest.fn()
        let wrapper = mount(<Demo2 />, { attachTo: container });
        await sleep(1000)
        // wrapper.find('AntdAnchor').setState({anchorItems: [
        //     {
        //         key: 'one31', width: 100, left: 12, href: 'one31'
        //     },
        //     {
        //         key: 'two31', width: 100, left: 112, href: 'two31'
        //     },
        //     {
        //         key: 'three31', width: 100, left: 212, href: 'three31'
        //     },
        //     {
        //         key: 'four31', width: 100, left: 312, href: 'four31'
        //     }
        // ]})
        // wrapper.find('AntdAnchor').instance().onSelect({key: '3'})
        wrapper.find(`.${prefixAnchor}-link-title`).at(2).simulate('click')
        expect(wrapper.find(`.${prefixAnchor}-link-title`).at(2).hasClass(`${prefixAnchor}-link-title-active`)).toEqual(true)
    })
    it('baseAnchor, <test prop:: onSelect fn test itemWidth>', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        window.HTMLElement.prototype.scrollIntoView = jest.fn()
        let wrapper = mount(<Demo2 />, { attachTo: container });
        await sleep(1000)
        // wrapper.find('AntdAnchor').setState({anchorItems: [
        //     {
        //         key: 'one31', width: 10, left: 12, href: 'one31'
        //     },
        //     {
        //         key: 'two31', width: 10, left: 112, href: 'two31'
        //     },
        //     {
        //         key: 'three31', width: 10, left: 212, href: 'three31'
        //     },
        //     {
        //         key: 'four31', width: 10, left: 312, href: 'four31'
        //     }
        // ]})
        // wrapper.find('AntdAnchor').instance().onSelect({key: '3'})
        wrapper.find(`.${prefixAnchor}-link-title`).at(2).simulate('click')
        wrapper.update()
        const content = document.querySelector(`.wui-anchor-horizontal`);
        jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(500);
        // wrapper.find('AntdAnchor').setState({startIndex: 2})
        // wrapper.find('AntdAnchor').instance().onSelect({key: '1'})
        wrapper.find(`.${prefixAnchor}-link-title`).at(0).simulate('click')
        expect(wrapper.find(`.${prefixAnchor}-link-title`).at(0).hasClass(`${prefixAnchor}-link-title-active`)).toEqual(true)
    })
    it('baseAnchor, <test prop:: next page >', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let wrapper = mount(<Demo2 />, { attachTo: container });
        
        const content = document.querySelector(`.wui-anchor`);
        jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(0);
        // wrapper.find('AntdAnchor').setState({wrapperW: 10})
        // wrapper.find('AntdAnchor').instance().setNextPrev()
    })
    
    it('baseAnchor, <test prop:: handleSelect fn >', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let onClick = jest.fn()
        let wrapper = mount(<Demo2 onClick={onClick} />, { attachTo: container });
        
        // wrapper.find('AntdAnchor').setState({anchorItems: [
        //     {
        //         key: 'one31', width: 10, left: 12, href: 'one31'
        //     },
        //     {
        //         key: 'two31', width: 10, left: 112, href: 'two31'
        //     },
        //     {
        //         key: 'three31', width: 10, left: 212, href: 'three31'
        //     },
        //     {
        //         key: 'four31', width: 10, left: 312, href: 'four31'
        //     }
        // ], wrapperW: 100})
        // wrapper.find('AntdAnchor').instance().handleSelect({href: 'three31', title: '财经3'})
        // wrapper.update()
        // wrapper.find('AntdAnchor').instance().handleSelect({href: 'four31', title: '互联网3'})
        wrapper.find(`.${prefixAnchor}-link-title`).at(1).simulate('click')
        await sleep(1000)
        expect(onClick).toHaveBeenCalledWith({"href": "two31", "title": "国际新闻3"})
    })
    it('baseAnchor, <test prop:: startIndex > 0 >', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let onClick = jest.fn()
        let wrapper = mount(<Demo2 onClick={onClick} />, { attachTo: container });
        
        // wrapper.find('AntdAnchor').setState({anchorItems: [
        //     {
        //         key: 'one31', width: 10, left: 12, href: 'one31'
        //     },
        //     {
        //         key: 'two31', width: 10, left: 112, href: 'two31'
        //     },
        //     {
        //         key: 'three31', width: 10, left: 212, href: 'three31'
        //     },
        //     {
        //         key: 'four31', width: 10, left: 312, href: 'four31'
        //     }
        // ], wrapperW: 100})
        // wrapper.find('AntdAnchor').instance().startIndex = 1
        // wrapper.find('AntdAnchor').instance().handleSelect({href: 'one31', title: '国内要闻3'})
        // wrapper.update()
        // wrapper.find('AntdAnchor').instance().handleSelect({href: 'four31', title: '财经3'})
        wrapper.find(`.${prefixAnchor}-link`).simulate('click')
        expect(wrapper.find(`.${prefixAnchor}-link`).hasClass(`${prefixAnchor}-link-active`)).toEqual(true)
    })
    it('component: Anchor, <test prop:: selector>', async () => {
        let anchorNode = mount(<Demo1 selector="test" />);
        expect(anchorNode.find(`.${prefix}-affix-container`).length).toEqual(1);
    })
    it('component: Anchor, <test prop:: navClass>', async () => {
        let anchorNode = mount(<Demo1 navClass="test" />);
        // expect(anchorNode.find(`.${prefix}-anchor`).hasClass('test')).toEqual(false);
    })
    it('component: Anchor, <test prop:: contentClass>', async () => {
        let anchorNode = mount(<Demo1 contentClass="content" />);
        // expect(anchorNode.find(`.${prefix}-anchor`).hasClass('content')).toEqual(false);
    })
    it('component: Anchor, <test prop:: nested>', async () => {
        let anchorNode = mount(<Demo1 nested={true} />);
        // expect(anchorNode.find(`.${prefix}-anchor`).hasClass('content')).toEqual(false);
    })
    it('component: Anchor, <test prop:: nestedClass>', async () => {
        let anchorNode = mount(<Demo1 nestedClass="content" />);
        // expect(anchorNode.find(`.${prefix}-anchor`).hasClass('content')).toEqual(false);
    })
    it('component: Anchor, <test prop:: reflow>', async () => {
        let anchorNode = mount(<Demo1 reflow={true} />);
        // expect(anchorNode.find(`.${prefix}-anchor`).hasClass('content')).toEqual(false);
    })
    it('component: Anchor, <test prop:: event>', async () => {
        let anchorNode = mount(<Demo1 event={true} />);
        // expect(anchorNode.find(`.${prefix}-anchor`).hasClass('content')).toEqual(false);
    })
    it('component: Anchor, <test prop:: activeHandle>', async () => {
        let activeHandle = jest.fn()
        let anchorNode = mount(<Demo1 activeHandle={activeHandle} />);
        // expect(anchorNode.find(`.${prefix}-anchor`).hasClass('content')).toEqual(false);
    })
    it('component: Anchor, <test prop:: deactiveHandle>', async () => {
        let deactiveHandle = jest.fn()
        let anchorNode = mount(<Demo1 deactiveHandle={deactiveHandle} />);
        // expect(anchorNode.find(`.${prefix}-anchor`).hasClass('content')).toEqual(false);
    })
    it('component: Anchor, <test prop:: events>', async () => {
        let anchorNode = mount(<Demo1 events={true} />);
        // expect(anchorNode.find(`.${prefix}-anchor`).hasClass('content')).toEqual(false);
    })
    it('component: Anchor, <test prop:: collapsable>', async () => {
        let anchorNode = mount(<Demo5 collapsable={true} />);
        expect(anchorNode.find(`.${prefix}-anchor-collapsable`).length).toEqual(1);
        // document.getElementById('mytab').dispatchEvent(new MouseEvent('mouseenter'))
        anchorNode.find(`.${prefix}-anchor-collapsable`).simulate('mouseenter')
        expect(anchorNode.find(`.uf-top-up`).length).toEqual(1)
        expect(anchorNode.find(`.uf-dingzhu_xiao`).length).toEqual(0)
        anchorNode.find(`.uf-budingzhu_xiao`).simulate('click')
        expect(anchorNode.find(`.uf-dingzhu_xiao`).length).toEqual(1)
        expect(anchorNode.find(`.${prefix}-anchor-collapsable`).hasClass(`${prefix}-anchor-collapsabled`)).toEqual(true)
        // anchorNode.find(`.${prefix}-anchor-collapsable`).simulate('click')
        anchorNode.find('.wui-anchor-link-title').at(3).simulate('click')
        await sleep(150)
        anchorNode.find('.wui-anchor-link-title').at(2).simulate('click')
        anchorNode.find(`.uf-top-up`).simulate('click')
    })
    it('component: Anchor, <test prop:: collapsable items>', async () => {
        let anchorNode = mount(<Demo6 collapsable={true} />);
        expect(anchorNode.find(`.${prefix}-anchor-collapsable`).length).toEqual(1);
        // document.getElementById('mytab').dispatchEvent(new MouseEvent('mouseenter'))
        anchorNode.find(`.${prefix}-anchor-collapsable`).simulate('mouseenter')
        expect(anchorNode.find(`.uf-top-up`).length).toEqual(1)
        expect(anchorNode.find(`.uf-dingzhu_xiao`).length).toEqual(0)
        anchorNode.find(`.uf-budingzhu_xiao`).simulate('click')
        expect(anchorNode.find(`.uf-dingzhu_xiao`).length).toEqual(1)
        expect(anchorNode.find(`.${prefix}-anchor-collapsable`).hasClass(`${prefix}-anchor-collapsabled`)).toEqual(true)
        // anchorNode.find(`.${prefix}-anchor-collapsable`).simulate('click')
        anchorNode.find('.wui-anchor-link-title').at(3).simulate('click')
        await sleep(150)
        anchorNode.find('.wui-anchor-link-title').at(2).simulate('click')
        anchorNode.find(`.uf-top-up`).simulate('click')
    })
    it('component: Anchor, <test:: scroll>', async () => {
        let anchorNode = <div id="target" role="test"><Demo2 getContainer={() => document.querySelector('#target')} /></div>;
        let {container} = render(anchorNode)
        let scrollContainer = container.querySelector('#target')
        scrollContainer.addEventListener('scroll', () => {})
        fireEvent.scroll(scrollContainer, {target: {scrollY: 300}})
        fireEvent.scroll(scrollContainer, {target: {scrollY: 200}})
        fireEvent.click(screen.getByTitle('国内要闻3'))
    })
    it('component: Anchor, <test:: more anchor>', async () => {
        let anchorNode = <div id="target" role="test"><Demo2 activeKey="five31" style={{width: '600px'}} getContainer={() => document.querySelector('#target')} /></div>;
        let {container} = render(anchorNode)
        let scrollContainer = container.querySelector('.uf-listwithdots')
        // expect(scrollContainer).toEqual(true)
        fireEvent.mouseEnter(scrollContainer)
        await sleep(1000)
        fireEvent.click(screen.getByTitle('互联网3'))
        await sleep(1000)
        // fireEvent.click(screen.getAllByRole('menuitem')[4])
        fireEvent.click(container.querySelector('.uf-anglepointingtoleft'))
        fireEvent.click(container.querySelector('.uf-anglearrowpointingtoright'))
        // await sleep(1000)
        // fireEvent.mouseEnter(scrollContainer)
        // fireEvent.click(screen.getAllByRole('menuitem')[2])
    })
    it('component: Anchor, <test:: container is undefined>', async () => {
        let anchorNode = <div id="target" role="test"><Demo2 /></div>;
        let {container} = render(anchorNode)
        let scrollContainer = container.querySelector('#target')
        scrollContainer.addEventListener('scroll', () => {})
        fireEvent.scroll(scrollContainer, {target: {scrollY: 300}})
        fireEvent.scroll(scrollContainer, {target: {scrollY: 200}})
    })
    it('component: Anchor, <test:: activeKey>', async () => {
        let wrapper = mount(<Demo2 activeKey="two31"></Demo2>)
        expect(wrapper.find('.wui-anchor-link-title').at(1).hasClass(`wui-anchor-link-title-active`)).toEqual(true);
        wrapper.setProps({ activeKey: 'five31' })
        expect(wrapper.find('.wui-anchor-link-title').at(4).hasClass(`wui-anchor-link-title-active`)).toEqual(true);
    })
    it('moreType moreTabsSelect', async () => {
        let methodCopy = AnchorHorizontal.prototype.componentDidMount;
        let anchorItems = [
            {
                key: 0,
                width: 105,
                left: 2,
                href: "one31"
            },
            {
                key: 1,
                width: 145,
                left: 107,
                href: "two31"
            },
            {
                key: 2,
                width: 113,
                left: 252,
                href: "three31"
            },
            {
                key: 3,
                width: 129,
                left: 365,
                href: "four31"
            },
            {
                key: 4,
                width: 113,
                left: 494,
                href: "five31"
            },
            {
                key: 5,
                width: 113,
                left: 607,
                href: "six31"
            }
        ]
        AnchorHorizontal.prototype.componentDidMount = function (...methodArgs) {
            const result = methodCopy.bind(this)(...methodArgs);
            this.setState({ anchorItems: [...anchorItems] })
            // this.offset = 200;
            this.start = 0
            this.startIndex = 0
            this.scrollHand()
            // this.wrapperRef = document.getElementsByTagName('body')
            this.debouncedResize()
            this.onSelect({key: 3})
            this.endIndex = 5
            this.prev() 
            return result;
        };
        const container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(container);
        let wrapper = mount(
            <Demo2 activeKey="two31"></Demo2>
        );
        // const box = document.querySelector(`.wui-tabs-nav-container`);
        // wrapper.find(`.${prefix}-tabs-tab`).at(4).simulate('click')
        // jest.spyOn(box, 'offsetWidth', 'get').mockReturnValue(200)
        // // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
        // // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true })
        // expect(wrapper.exists(`span.${prefix}-tabs-tab-more-select`)).toBe(true)
        // // expect(wrapper.exists(`span.${prefix}-tabs-tab-prev`)).toBe(true)
        // wrapper.find(`span.${prefix}-tabs-tab-more-select`).simulate('mouseEnter')
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(0).simulate('click')
        // wrapper.find(`span.${prefix}-tabs-tab-more-select`).simulate('mouseEnter')
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(1).simulate('mouseEnter')
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(1).find('.uf-close').simulate('click')
        AnchorHorizontal.prototype.componentDidMount = methodCopy; // 恢复方法原本的实现
    })
    it('moreType moreTabsSelect another', async () => {
        let methodCopy = AnchorHorizontal.prototype.componentDidMount;
        let anchorItems = [
            {
                key: 0,
                width: 105,
                left: 2,
                href: "one31"
            },
            {
                key: 1,
                width: 145,
                left: 107,
                href: "two31"
            },
            {
                key: 2,
                width: 113,
                left: 252,
                href: "three31"
            },
            {
                key: 3,
                width: 129,
                left: 365,
                href: "four31"
            },
            {
                key: 4,
                width: 113,
                left: 494,
                href: "five31"
            },
            {
                key: 5,
                width: 113,
                left: 607,
                href: "six31"
            }
        ]
        AnchorHorizontal.prototype.componentDidMount = function (...methodArgs) {
            const result = methodCopy.bind(this)(...methodArgs);
            this.setState({ prev: true, next: true, wrapperW: 200, anchorItems: [...anchorItems] })
            // this.offset = 200;
            this.start = 0
            this.rightNumber = 0
            // this.onSelect({key: 3})
            // this.endIndex = 5
            // this.prev() 
            this.next()
            return result;
        };
        const container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(container);
        let wrapper = mount(
            <Demo2 activeKey="two31"></Demo2>
        );
        const box = document.querySelector(`.wui-anchor`);
        const box2 = document.querySelector(`.wui-anchor-wrapper`);
        wrapper.find(`.wui-anchor-link-title`).at(1).simulate('click')
        jest.spyOn(box, 'offsetWidth', 'get').mockReturnValue(200)
        jest.spyOn(box2, 'offsetWidth', 'get').mockReturnValue(800)
        wrapper.find(`.wui-anchor-link-title`).at(4).simulate('click')
        AnchorHorizontal.prototype.componentDidMount = methodCopy; // 恢复方法原本的实现
    })
    it('component: Anchor, <test:: more anchor to Right>', async () => {
        document.body.innerHTML = ''
        const container1 = document.createElement('div');
        container1.setAttribute('id', 'container');
        let anchorNode = <div id="target" role="test"><Demo2 activeKey="five31" style={{width: '600px'}} getContainer={() => document.querySelector('#target')} /></div>;
        let {container} = render(anchorNode)
        let scrollContainer = container.querySelector('.uf-listwithdots')
        let box = document.querySelector('.wui-anchor-wrapper')
        jest.spyOn(box, 'offsetWidth', 'get').mockReturnValue(200)
        // expect(scrollContainer).toEqual(true)
        fireEvent.mouseEnter(scrollContainer)
        await sleep(1000)
        fireEvent.click(screen.getByTitle('互联网3'))
        await sleep(1000)
        // fireEvent.click(screen.getAllByRole('menuitem')[4])
        fireEvent.click(container.querySelector('.uf-anglepointingtoleft'))
        fireEvent.click(container.querySelector('.uf-anglearrowpointingtoright'))
        // await sleep(1000)
        // fireEvent.mouseEnter(scrollContainer)
        // fireEvent.click(screen.getAllByRole('menuitem')[2])
    })
    it('component: Anchor, <test:: getContainer is undefined>', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        let wrapper = mount(<Demo7 />, { attachTo: container });
        const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
            window.scrollY = y;
            window.pageYOffset = y;
            document.documentElement.scrollTop = y;
        });
        await sleep(1000);
        window.scrollTo(0, 400);
        await sleep(600);
        expect(document.documentElement.scrollTop).toBe(400);
        wrapper.find(`.${prefixAnchor}-link-title`).at(2).simulate('click')
        window.scrollTo(0, 400);
        // scrollToSpy.mockRestore();
    })
    it('component: Anchor, <test:: scroll is not horizontal>', async () => {
        let anchorNode = <div id="target" role="test"><Demo5 getContainer={() => document.querySelector('#target')} /></div>;
        let {container} = render(anchorNode)
        let scrollContainer = container.querySelector('#target')
        scrollContainer.addEventListener('scroll', () => {})
        fireEvent.scroll(scrollContainer, {target: {scrollY: 300}})
        fireEvent.scroll(scrollContainer, {target: {scrollY: 200}})
        fireEvent.click(screen.getByTitle('国内要闻3'))
    })
    it('component: Anchor, <test:: scroll is not horizontal getContainer is undefined>', async () => {
        let anchorNode = <div id="target" role="test"><Demo5 /></div>;
        let {container} = render(anchorNode)
        let scrollContainer = container.querySelector('#target')
        scrollContainer.addEventListener('scroll', () => {})
        fireEvent.scroll(scrollContainer, {target: {scrollY: 300}})
        fireEvent.scroll(scrollContainer, {target: {scrollY: 200}})
        fireEvent.click(screen.getByTitle('国内要闻3'))
    })
})
describe('Anchor test', () => {
    let anthors = [
        {
            href: "one",
            name: "国内要闻",
            content: " 戏曲进高校玩快闪 “圈粉”大学生 \n "
             + "长春年近六旬男子上演花样自行车绝技 \n "
             + "民众成都博物馆里享“餐桌上的文化之旅 \n "
             + "更大更好吃的海蛎子有望端上青岛市民餐桌！ \n "
             + "人民铁道“中央厨房”今日上线 \n "
             + "住宅小区的大件垃圾有望得到回收利用 \n "
             + "地上忽现大坑 瞬间吞掉两幢房子 \n ",
        },
        {
            href: "two",
            name: "国际新闻",
            content: " 一只好莱坞的 巨星猪 是怎么诞生的 \n "
             + "追剧听相声玩手游 “歪果仁”为了学汉语也是拼了 \n "
             + "一等奖得主齐现身 领奖不忘捐款献爱心 \n "
             + "他或是安倍唯一不敢反对的男人！ \n "
             + "美男摔落悬崖掉进活火山，躲过摄氏超过1000度 \n "
             + "苏格兰媒体：凯尔特人没有向穆里尼奥开出邀约 \n "
             + "青少年手机成瘾危害大 各国政府纷纷出招应对 \n ",
        },
        {
            href: "three",
            name: "财经",
            content: " 最低工资标准上调窗口开启 京鲁冀等多个省市 \n "
             + "「重磅发布」2019年欧洲十大海上风电场排行榜！ \n "
             + "又一80后上市公司实控人被刑拘！ \n "
             + "五月种菜大全来了，这些蔬菜您种了没有？ \n "
             + "记住这个落井之人 \n "
             + "测绘准入放宽在即，新玩家新规则倒逼产业转型 \n "
             + "回顾20年前A股那场轰轰烈烈的“519行情”"
        },
        {
            href: "four",
            name: "互联网",
            content: " 光明日报头版：读懂中国经济的巨大韧性 \n "
             + "那些还在发朋友圈的朋友们，才是人间珍品 \n "
             + "电商平台不该为“代吵架服务”设摊 \n "
             + "《从0到1》序二——读书笔记 \n "
             + "投资2000万美元狂赚7000倍 \n "
             + "五一消费账单来了！这个小长假，你的钱花哪了？ \n "
             + "让数字经济更好助力高质量发展 \n "
             + "「评论」“小降准”的大意义"
        },
        {
            href: "five",
            name: "房产",
            content: " 智慧城市建设莫一哄而上 \n "
             + "二手房产权纠纷有哪些？ \n "
             + "如何降低购房风险？ \n "
             + "哪些城市亮瞎眼，哪些城市很失落 \n "
             + "北京项目近况一览 \n "
             + "当初没好好装卫生间 现在后悔死了 \n "
             + "小户型榻榻米的制作流程 这样准没错 \n "
             + "如何解决室内干燥 一个加湿器是不行的 \n "
             + "新风系统有没有用 到底要不要装呢"
        },
        {
            href: "six",
            name: "汽车",
            content: " 15万预算，适合年轻人的2台运动轿车，颜值高实力强 \n "
             + "牌子大口碑好销量还高，12万左右的自动挡合资轿车 \n "
             + "大众系SUV多到脸盲？一招教你如何选 \n "
             + "一季度轿车市场分析 \n "
             + "网友偶遇贴特大号“实习”标志的豪车 \n "
             + "要想涡轮坏得快，这四个错误天天犯！ \n "
             + "汽车保养只换机油，4个零件要是不换的 \n "
             + "去4S店“首保”，这3个细节要注意 \n "
             + "最均衡国产10万元SUV推荐"
        },
    ]
    class Demo5 extends Component {
        render() {
            return (
                <div className="demo1">
                    <div className="content">
                        {
                            anthors.map(item=>{
                                return (
                                    <p style={{'paddingTop': '100px'}} id={item.href}>
                                        <pre >
                                            {item.content}
                                        </pre>
                                    </p>
                                )
                            })
                        }
                    </div>
                    <Anchor selector="#my-awesome-nav a" offset='100px'>
                        <ul id="my-awesome-nav" >
                            <em></em>
                            {
                                anthors.map(item=>{
                                    return (
                                        <li><a href={`#${item.href}`}>{item.name}</a></li>
                                    )
                                })
                            }
                        </ul>
                    </Anchor>
                </div>
   
            )
        }
    }
    it('component: Anchor, <test prop:: selector>', async () => {
        let anchorNode = mount(<Demo5 />);
        expect(anchorNode.find(`#my-awesome-nav`).length).toEqual(1);
    })
})
