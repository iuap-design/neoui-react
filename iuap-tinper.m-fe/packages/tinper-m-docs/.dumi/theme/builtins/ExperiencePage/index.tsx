import React, { PureComponent } from 'react';
// import * as echarts from 'echarts';
// import Header from "../../component/Header";
// import BeVisited from '@static/website/experience/实时访问量.svg'
// import Downloaded from '@static/website/experience/下载量.svg'
// import CompBasic from '@static/website/experience/基础组件.svg'
// import CompPro from '@static/website/experience/高级组件.svg'
// import Increase from '@static/website/experience/增长.svg'
// import ArrowRight from '@static/website/experience/右箭头.svg'
// import './index.less'
// import EchartsCard1 from './Cards/echartsCard1';
// import EchartsCard2 from './Cards/echartsCard2';
// import EchartsCard4 from './Cards/echartsCard4';
import { withRouter } from 'dumi';

class ExperiencePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // componentDidMount() {
    //     this.getRowWidth()
    //     window.onresize = () => {
    //         // console.log('resize')
    //         this.getRowWidth()
    //     }
    // }
    // componentWillUnmount() {
    //     window.onresize = null;
    // }
    // getRowWidth = () => {
    //     const FirstRowWidth = document.getElementById('row-1-height-card').clientWidth * 0.5
    //     const SecondRowWidth = document.getElementById('row-2-height-card').clientWidth * 0.6
    //     const ThirdRowWidth = document.getElementById('row-3-height-card').clientWidth * 0.3
    //     const FourthRowWidth = document.getElementById('row-4-height-card').clientWidth * 0.23
    //     this.setState({ FirstRowWidth, SecondRowWidth, ThirdRowWidth, FourthRowWidth })
    // }

    render() {
        // const cardInfoList = [
        //     [
        //         {
        //             img: BeVisited,
        //             title: '实时访问量',
        //             description: 'TinperNext CDN资源累计访问总量',
        //             count1: '总数量',
        //             count2: '较上月'
        //         },
        //         {
        //             img: Downloaded,
        //             title: '下载量',
        //             description: 'TinperNext 资源包累计下载总量',
        //             count1: '总数量',
        //             count2: '较上月'
        //         },
        //         {
        //             img: CompBasic,
        //             title: '基础组件',
        //             description: '单一不可拆分的原子组件',
        //             count1: '组件数量',
        //             count2: 'API数量'
        //         },
        //         {
        //             img: CompPro,
        //             title: '高级组件',
        //             description: '复合型的区块组件，具有业务属性',
        //             count1: '组件数量',
        //             count2: 'API数量'
        //         }
        //     ],
        //     [
        //         {
        //             title: '属性覆盖率',
        //             description: '总覆盖率'
        //         },
        //         {
        //             title: '代码覆盖率',
        //             description: [
        //                 '行覆盖率',
        //                 '函数覆盖率',
        //                 '分支覆盖率',
        //                 '语句覆盖率',
        //             ]
        //         },
        //         {
        //             title: '测试报告',
        //             description:
        //                 [
        //                     {
        //                         title: '性能测试报告',
        //                         description: '评估系统性能，确保稳定性'
        //                     },
        //                     {
        //                         title: '属性覆盖测试',
        //                         description: '强调对软件属性的全面覆盖'
        //                     },
        //                     {
        //                         title: 'UI基准测试报告',
        //                         description: '关注界面可用性和用户体验'
        //                     },
        //                     {
        //                         title: '多语测试报告',
        //                         description: '测试软件的多语言支持能力'
        //                     },
        //                 ],
        //         }
        //     ],
        //     [
        //         {
        //             title: '组件引用趋势'
        //         },
        //         {
        //             title: '组件引用次数'
        //         },
        //     ],
        //     [{
        //         title: '领域&行业引用规模统计数据'
        //     }],
        // ];
        // // console.log(cardInfoList[0].map(item => (item))[0])
        // const getImage = (title) => {
        //     let name = title.substring(0, 4)
        //     const imageNamelist = ['UI基准', '多语测试', '性能测试', '属性覆盖'];
        //     const imgName = imageNamelist.includes(name) ? name : '多语测试';
        //     console.log(name)
        //     return require(`@static/website/experience/${imgName}.svg`);
        // }
        return (
            <div className='experience-page'>
            </div>
        )

    }

}

export default withRouter(ExperiencePage);