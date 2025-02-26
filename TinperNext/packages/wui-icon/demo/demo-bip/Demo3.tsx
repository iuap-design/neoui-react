/**
 * @title bip示例图标
 * @description 使用 <Icon /> 标签声明组件，指定图标对应的 type 属性。
 */

import {Icon, Message} from "@tinper/next-ui";

import copy from "copy-to-clipboard";
import React, {Component} from "react";

class Demo1 extends Component {

    componentDidMount() {
        document.getElementById("icon_lists")?.addEventListener("click", this.copyCode);
    }

    componentWillUnmount() {
        document.getElementById("icon_lists")?.removeEventListener('click', this.copyCode);
    }

	copyCode = (e: MouseEvent) => {
	    let iconCls = e.target && this.findIconCls(e.target);
	    if (!iconCls) return;
	    let code = `<Icon type="${iconCls}" />`;
	    copy(code);
	    Message.destroy();
	    Message.success({
	        content: (
	            <div>
	                <span className="code-cont">{code}</span> copied
	            </div>
	        ),
	    });
	};
	findIconCls = (target: any) => {
	    target.nodeName.toLowerCase() == "li" ||
		target.parentNode!.nodeName.toLowerCase() == "li";
	    let iconCls = "";
	    if (target.nodeName.toLowerCase() == "li") {
	        iconCls = target.lastElementChild!.innerText;
	        return iconCls && iconCls.substr(1);
	    } else if (target.parentNode!.nodeName.toLowerCase() == "li") {
	        iconCls = target.parentNode!.lastElementChild.innerText;
	        return iconCls && iconCls.substr(1);
	    }
	    return iconCls;
	};

	render() {
	    return (
	        <div className="tinper-icon-demo">
	            <ul id="icon_lists" className="icon_lists">
	                <li>
	                    <Icon type="uf-jincou"></Icon>
	                    <div className="name">CJ-紧凑</div>
	                    <div className="fontclass">.uf-jincou</div>
	                </li>
	                <li>
	                    <Icon type="uf-biaozhun"></Icon>
	                    <div className="name">CJ-标准</div>
	                    <div className="fontclass">.uf-biaozhun</div>
	                </li>
	                <li>
	                    <Icon type="uf-kuansong"></Icon>
	                    <div className="name">CJ-宽松</div>
	                    <div className="fontclass">.uf-kuansong</div>
	                </li>
	                <li>
	                    <Icon type="uf-juzhong"></Icon>
	                    <div className="name">CJ-居中</div>
	                    <div className="fontclass">.uf-juzhong</div>
	                </li>
	                <li>
	                    <Icon type="uf-dangqian"></Icon>
	                    <div className="name">CJ-当前</div>
	                    <div className="fontclass">.uf-dangqian</div>
	                </li>
	                <li>
	                    <Icon type="uf-gaojichaxun"></Icon>
	                    <div className="name">高级查询</div>
	                    <div className="fontclass">.uf-gaojichaxun</div>
	                </li>
	                <li>
	                    <Icon type="uf-dingzhu"></Icon>
	                    <div className="name">钉住</div>
	                    <div className="fontclass">.uf-dingzhu</div>
	                </li>
	                <li>
	                    <Icon type="uf-qingchushaixuan"></Icon>
	                    <div className="name">清除筛选</div>
	                    <div className="fontclass">.uf-qingchushaixuan</div>
	                </li>
	                <li>
	                    <Icon type="uf-tingyong_line"></Icon>
	                    <div className="name">停用_line</div>
	                    <div className="fontclass">.uf-tingyong_line</div>
	                </li>
	                <li>
	                    <Icon type="uf-kapian"></Icon>
	                    <div className="name">卡片</div>
	                    <div className="fontclass">.uf-kapian</div>
	                </li>
	                <li>
	                    <Icon type="uf-shanchu"></Icon>
	                    <div className="name">删除</div>
	                    <div className="fontclass">.uf-shanchu</div>
	                </li>
	                <li>
	                    <Icon type="uf-tupianshibai"></Icon>
	                    <div className="name">图片上传失败</div>
	                    <div className="fontclass">.uf-tupianshibai</div>
	                </li>
	                <li>
	                    <Icon type="uf-mulu"></Icon>
	                    <div className="name">目录</div>
	                    <div className="fontclass">.uf-mulu</div>
	                </li>
	                <li>
	                    <Icon type="uf-shoucang"></Icon>
	                    <div className="name">收藏</div>
	                    <div className="fontclass">.uf-shoucang</div>
	                </li>
	                <li>
	                    <Icon type="uf-zhankai1"></Icon>
	                    <div className="name">展开</div>
	                    <div className="fontclass">.uf-zhankai1</div>
	                </li>
	                <li>
	                    <Icon type="uf-shouqi1"></Icon>
	                    <div className="name">收起</div>
	                    <div className="fontclass">.uf-shouqi1</div>
	                </li>
	                <li>
	                    <Icon type="uf-xuanzhong"></Icon>
	                    <div className="name">选中</div>
	                    <div className="fontclass">.uf-xuanzhong</div>
	                </li>
	                <li>
	                    <Icon type="uf-zhedie-shouqi"></Icon>
	                    <div className="name">折叠-收起</div>
	                    <div className="fontclass">.uf-zhedie-shouqi</div>
	                </li>
	                <li>
	                    <Icon type="uf-zhedie-zhankai"></Icon>
	                    <div className="name">折叠-展开</div>
	                    <div className="fontclass">.uf-zhedie-zhankai</div>
	                </li>
	                <li>
	                    <Icon type="uf-load"></Icon>
	                    <div className="name">load</div>
	                    <div className="fontclass">.uf-load</div>
	                </li>
	                <li>
	                    <Icon type="uf-zuzhixingbumen"></Icon>
	                    <div className="name">组织型部门</div>
	                    <div className="fontclass">.uf-zuzhixingbumen</div>
	                </li>
	                <li>
	                    <Icon type="uf-zuzhi"></Icon>
	                    <div className="name">组织</div>
	                    <div className="fontclass">.uf-zuzhi</div>
	                </li>
	                <li>
	                    <Icon type="uf-bumen"></Icon>
	                    <div className="name">部门</div>
	                    <div className="fontclass">.uf-bumen</div>
	                </li>
	                <li>
	                    <Icon type="uf-shoucangliebiao"></Icon>
	                    <div className="name">收藏列表</div>
	                    <div className="fontclass">.uf-shoucangliebiao</div>
	                </li>
	                <li>
	                    <Icon type="uf-new"></Icon>
	                    <div className="name">new</div>
	                    <div className="fontclass">.uf-new</div>
	                </li>
	                <li>
	                    <Icon type="uf-loadingstate"></Icon>
	                    <div className="name">loading</div>
	                    <div className="fontclass">.uf-loadingstate</div>
	                </li>
	                <li>
	                    <Icon type="uf-danju"></Icon>
	                    <div className="name">单据</div>
	                    <div className="fontclass">.uf-danju</div>
	                </li>
	                <li>
	                    <Icon type="uf-yuandian"></Icon>
	                    <div className="name">圆点</div>
	                    <div className="fontclass">.uf-yuandian</div>
	                </li>
	                <li>
	                    <Icon type="uf-danchuangtuozhuaijiaobiao"></Icon>
	                    <div className="name">弹窗拖拽角标</div>
	                    <div className="fontclass">.uf-danchuangtuozhuaijiaobiao</div>
	                </li>
	                <li>
	                    <Icon type="uf-star-3"></Icon>
	                    <div className="name">星_半选</div>
	                    <div className="fontclass">.uf-star-3</div>
	                </li>
	                <li>
	                    <Icon type="uf-star"></Icon>
	                    <div className="name">星</div>
	                    <div className="fontclass">.uf-star</div>
	                </li>
	                <li>
	                    <Icon type="uf-star-o"></Icon>
	                    <div className="name">星_描边</div>
	                    <div className="fontclass">.uf-star-o</div>
	                </li>
	                <li>
	                    <Icon type="uf-star-2"></Icon>
	                    <div className="name">星_半</div>
	                    <div className="fontclass">.uf-star-2</div>
	                </li>
	                <li>
	                    <Icon type="uf-jiantouxia_mianxing"></Icon>
	                    <div className="name">箭头下_面性</div>
	                    <div className="fontclass">.uf-jiantouxia_mianxing</div>
	                </li>
	                <li>
	                    <Icon type="uf-jiantoushang_mianxing"></Icon>
	                    <div className="name">箭头上_面性</div>
	                    <div className="fontclass">.uf-jiantoushang_mianxing</div>
	                </li>
	                <li>
	                    <Icon type="uf-yiwancheng"></Icon>
	                    <div className="name">步骤条_已完成</div>
	                    <div className="fontclass">.uf-yiwancheng</div>
	                </li>
	                <li>
	                    <Icon type="uf-zushouqi_huise"></Icon>
	                    <div className="name">组收起_灰色</div>
	                    <div className="fontclass">.uf-zushouqi_huise</div>
	                </li>
	                <li>
	                    <Icon type="uf-zuzhankai_huise"></Icon>
	                    <div className="name">组展开_灰色</div>
	                    <div className="fontclass">.uf-zuzhankai_huise</div>
	                </li>
	                <li>
	                    <Icon type="uf-yindao"></Icon>
	                    <div className="name">引导</div>
	                    <div className="fontclass">.uf-yindao</div>
	                </li>
	                <li>
	                    <Icon type="uf-bangzhuzhongxin"></Icon>
	                    <div className="name">帮助中心</div>
	                    <div className="fontclass">.uf-bangzhuzhongxin</div>
	                </li>
	                <li>
	                    <Icon type="uf-yybs"></Icon>
	                    <div className="name">用友企业云服务</div>
	                    <div className="fontclass">.uf-yybs</div>
	                </li>
	                <li>
	                    <Icon type="uf-xiaoxi"></Icon>
	                    <div className="name">消息</div>
	                    <div className="fontclass">.uf-xiaoxi</div>
	                </li>
	                <li>
	                    <Icon type="uf-location"></Icon>
	                    <div className="name">地图</div>
	                    <div className="fontclass">.uf-location</div>
	                </li>
	                <li>
	                    <Icon type="uf-zhenduan"></Icon>
	                    <div className="name">诊断</div>
	                    <div className="fontclass">.uf-zhenduan</div>
	                </li>
	                <li>
	                    <Icon type="uf-shangjia"></Icon>
	                    <div className="name">商家</div>
	                    <div className="fontclass">.uf-shangjia</div>
	                </li>
	                <li>
	                    <Icon type="uf-tupian"></Icon>
	                    <div className="name">图片</div>
	                    <div className="fontclass">.uf-tupian</div>
	                </li>
	                <li>
	                    <Icon type="uf-UImoban"></Icon>
	                    <div className="name">UI模板</div>
	                    <div className="fontclass">.uf-UImoban</div>
	                </li>
	                <li>
	                    <Icon type="uf-kuaijiejianbangzhu"></Icon>
	                    <div className="name">快捷键帮助</div>
	                    <div className="fontclass">.uf-kuaijiejianbangzhu</div>
	                </li>
	                <li>
	                    <Icon type="uf-pencil-s"></Icon>
	                    <div className="name">编辑</div>
	                    <div className="fontclass">.uf-pencil-s</div>
	                </li>
	                <li>
	                    <Icon type="uf-del"></Icon>
	                    <div className="name">删除</div>
	                    <div className="fontclass">.uf-del</div>
	                </li>
	                <li>
	                    <Icon type="uf-settings"></Icon>
	                    <div className="name">设置</div>
	                    <div className="fontclass">.uf-settings</div>
	                </li>
	                <li>
	                    <Icon type="uf-anglearrowdown"></Icon>
	                    <div className="name">下拉</div>
	                    <div className="fontclass">.uf-anglearrowdown</div>
	                </li>
	                <li>
	                    <Icon type="uf-xiangshang"></Icon>
	                    <div className="name">正序</div>
	                    <div className="fontclass">.uf-xiangshang</div>
	                </li>
	                <li>
	                    <Icon type="uf-xiangxia1"></Icon>
	                    <div className="name">倒序</div>
	                    <div className="fontclass">.uf-xiangxia1</div>
	                </li>
	                <li>
	                    <Icon type="uf-arrow-up"></Icon>
	                    <div className="name">收起</div>
	                    <div className="fontclass">.uf-arrow-up</div>
	                </li>
	                <li>
	                    <Icon type="uf-reject-2"></Icon>
	                    <div className="name">驳回</div>
	                    <div className="fontclass">.uf-reject-2</div>
	                </li>
	                <li>
	                    <Icon type="uf-search-light-2"></Icon>
	                    <div className="name">放大镜</div>
	                    <div className="fontclass">.uf-search-light-2</div>
	                </li>
	                <li>
	                    <Icon type="uf-export"></Icon>
	                    <div className="name">导出</div>
	                    <div className="fontclass">.uf-export</div>
	                </li>
	                <li>
	                    <Icon type="uf-import"></Icon>
	                    <div className="name">导入</div>
	                    <div className="fontclass">.uf-import</div>
	                </li>
	                <li>
	                    <Icon type="uf-print"></Icon>
	                    <div className="name">打印</div>
	                    <div className="fontclass">.uf-print</div>
	                </li>
	                <li>
	                    <Icon type="uf-jinhangzhong"></Icon>
	                    <div className="name">步骤条_进行中</div>
	                    <div className="fontclass">.uf-jinhangzhong</div>
	                </li>
	                <li>
	                    <Icon type="uf-hebingbumenxinxi"></Icon>
	                    <div className="name">步骤条_合并部门信息</div>
	                    <div className="fontclass">.uf-hebingbumenxinxi</div>
	                </li>
	                <li>
	                    <Icon type="uf-gengduo"></Icon>
	                    <div className="name">步骤条_更多</div>
	                    <div className="fontclass">.uf-gengduo</div>
	                </li>
	                <li>
	                    <Icon type="uf-weikaishi"></Icon>
	                    <div className="name">步骤条_未开始</div>
	                    <div className="fontclass">.uf-weikaishi</div>
	                </li>
	                <li>
	                    <Icon type="uf-hebingrenyuanxinxi"></Icon>
	                    <div className="name">步骤条_合并人员信息</div>
	                    <div className="fontclass">.uf-hebingrenyuanxinxi</div>
	                </li>
	                <li>
	                    <Icon type="uf-shujian"></Icon>
	                    <div className="name">减号</div>
	                    <div className="fontclass">.uf-shujian</div>
	                </li>
	                <li>
	                    <Icon type="uf-mi"></Icon>
	                    <div className="name">必输</div>
	                    <div className="fontclass">.uf-mi</div>
	                </li>
	                <li>
	                    <Icon type="uf-liebiaoshezhi"></Icon>
	                    <div className="name">调整</div>
	                    <div className="fontclass">.uf-liebiaoshezhi</div>
	                </li>
	                <li>
	                    <Icon type="uf-lianwang"></Icon>
	                    <div className="name">网络</div>
	                    <div className="fontclass">.uf-lianwang</div>
	                </li>
	                <li>
	                    <Icon type="uf-gantanhao"></Icon>
	                    <div className="name">常规提示_线</div>
	                    <div className="fontclass">.uf-gantanhao</div>
	                </li>
	                <li>
	                    <Icon type="uf-zhankai"></Icon>
	                    <div className="name">展开_双</div>
	                    <div className="fontclass">.uf-zhankai</div>
	                </li>
	                <li>
	                    <Icon type="uf-shouqi"></Icon>
	                    <div className="name">收起_双</div>
	                    <div className="fontclass">.uf-shouqi</div>
	                </li>
	                <li>
	                    <Icon type="uf-xiangzuo"></Icon>
	                    <div className="name">左箭头_单</div>
	                    <div className="fontclass">.uf-xiangzuo</div>
	                </li>
	                <li>
	                    <Icon type="uf-xiangyou"></Icon>
	                    <div className="name">右箭头_单</div>
	                    <div className="fontclass">.uf-xiangyou</div>
	                </li>
	                <li>
	                    <Icon type="uf-daoshouye"></Icon>
	                    <div className="name">左箭头_双</div>
	                    <div className="fontclass">.uf-daoshouye</div>
	                </li>
	                <li>
	                    <Icon type="uf-a-wenhaomoren"></Icon>
	                    <div className="name">问号</div>
	                    <div className="fontclass">.uf-a-wenhaomoren</div>
	                </li>
	                <li>
	                    <Icon type="uf-qingfenxi"></Icon>
	                    <div className="name">数据分析</div>
	                    <div className="fontclass">.uf-qingfenxi</div>
	                </li>
	                <li>
	                    <Icon type="uf-cloud-o-up"></Icon>
	                    <div className="name">云_上传</div>
	                    <div className="fontclass">.uf-cloud-o-up</div>
	                </li>
	                <li>
	                    <Icon type="uf-datu"></Icon>
	                    <div className="name">放大</div>
	                    <div className="fontclass">.uf-datu</div>
	                </li>
	                <li>
	                    <Icon type="uf-heart"></Icon>
	                    <div className="name">心_面</div>
	                    <div className="fontclass">.uf-heart</div>
	                </li>
	                <li>
	                    <Icon type="uf-heart-o"></Icon>
	                    <div className="name">心_线</div>
	                    <div className="fontclass">.uf-heart-o</div>
	                </li>
	                <li>
	                    <Icon type="uf-shangyitiao-copy"></Icon>
	                    <div className="name">定位_上一个</div>
	                    <div className="fontclass">.uf-shangyitiao-copy</div>
	                </li>
	                <li>
	                    <Icon type="uf-xiayitiao-copy"></Icon>
	                    <div className="name">定位_下一个</div>
	                    <div className="fontclass">.uf-xiayitiao-copy</div>
	                </li>
	                <li>
	                    <Icon type="uf-biaotoudingweiyidingweinormal"></Icon>
	                    <div className="name">表头定位_已定位</div>
	                    <div className="fontclass">.uf-biaotoudingweiyidingweinormal</div>
	                </li>
	                <li>
	                    <Icon type="uf-dongjie"></Icon>
	                    <div className="name">表头锁定_已锁定</div>
	                    <div className="fontclass">.uf-dongjie</div>
	                </li>
	                <li>
	                    <Icon type="uf-weidongjie"></Icon>
	                    <div className="name">表头锁定_解锁</div>
	                    <div className="fontclass">.uf-weidongjie</div>
	                </li>
	                <li>
	                    <Icon type="uf-biaodansousuo"></Icon>
	                    <div className="name">表头定位_常规</div>
	                    <div className="fontclass">.uf-biaodansousuo</div>
	                </li>
	                <li>
	                    <Icon type="uf-biaotoushaixuanyixuannormal"></Icon>
	                    <div className="name">表头筛选_已筛选</div>
	                    <div className="fontclass">.uf-biaotoushaixuanyixuannormal</div>
	                </li>
	                <li>
	                    <Icon type="uf-shaixuan1-copy"></Icon>
	                    <div className="name">表头筛选_常规</div>
	                    <div className="fontclass">.uf-shaixuan1-copy</div>
	                </li>
	                <li>
	                    <Icon type="uf-qiehuanchaxunfangshi"></Icon>
	                    <div className="name">切换</div>
	                    <div className="fontclass">.uf-qiehuanchaxunfangshi</div>
	                </li>
	                <li>
	                    <Icon type="uf-liulantai-biangeng-bukeyong"></Icon>
	                    <div className="name">变更</div>
	                    <div className="fontclass">.uf-liulantai-biangeng-bukeyong</div>
	                </li>
	                <li>
	                    <Icon type="uf-liulantai-ruku"></Icon>
	                    <div className="name">入库</div>
	                    <div className="fontclass">.uf-liulantai-ruku</div>
	                </li>
	                <li>
	                    <Icon type="uf-correct-2"></Icon>
	                    <div className="name">对号</div>
	                    <div className="fontclass">.uf-correct-2</div>
	                </li>
	                <li>
	                    <Icon type="uf-tongzhi"></Icon>
	                    <div className="name">事件中心</div>
	                    <div className="fontclass">.uf-tongzhi</div>
	                </li>
	                <li>
	                    <Icon type="uf-hanshu"></Icon>
	                    <div className="name">函数</div>
	                    <div className="fontclass">.uf-hanshu</div>
	                </li>
	                <li>
	                    <Icon type="uf-jiesuo"></Icon>
	                    <div className="name">不钉住</div>
	                    <div className="fontclass">.uf-jiesuo</div>
	                </li>
	                <li>
	                    <Icon type="uf-suoding"></Icon>
	                    <div className="name">钉住</div>
	                    <div className="fontclass">.uf-suoding</div>
	                </li>
	                <li>
	                    <Icon type="uf-appshouqi"></Icon>
	                    <div className="name">小菜单_折叠</div>
	                    <div className="fontclass">.uf-appshouqi</div>
	                </li>
	                <li>
	                    <Icon type="uf-appzhankai"></Icon>
	                    <div className="name">小菜单_展开</div>
	                    <div className="fontclass">.uf-appzhankai</div>
	                </li>
	                <li>
	                    <Icon type="uf-close"></Icon>
	                    <div className="name">叉号</div>
	                    <div className="fontclass">.uf-close</div>
	                </li>
	                <li>
	                    <Icon type="uf-plus"></Icon>
	                    <div className="name">加号</div>
	                    <div className="fontclass">.uf-plus</div>
	                </li>
	                <li>
	                    <Icon type="uf-hebingzhiweixinxi"></Icon>
	                    <div className="name">步骤条_合并职位信息</div>
	                    <div className="fontclass">.uf-hebingzhiweixinxi</div>
	                </li>
	                <li>
	                    <Icon type="uf-liulantai-tijiao-bukeyong1"></Icon>
	                    <div className="name">提交</div>
	                    <div className="fontclass">.uf-liulantai-tijiao-bukeyong1</div>
	                </li>
	                <li>
	                    <Icon type="uf-budingzhu_xiao"></Icon>
	                    <div className="name">不钉住_小</div>
	                    <div className="fontclass">.uf-budingzhu_xiao</div>
	                </li>
	                <li>
	                    <Icon type="uf-dingzhu_xiao"></Icon>
	                    <div className="name">钉住_小</div>
	                    <div className="fontclass">.uf-dingzhu_xiao</div>
	                </li>
	                <li>
	                    <Icon type="uf-youjiantou_shuang"></Icon>
	                    <div className="name">右箭头_双</div>
	                    <div className="fontclass">.uf-youjiantou_shuang</div>
	                </li>
	                <li>
	                    <Icon type="uf-yemianfenlan_zhankai"></Icon>
	                    <div className="name">页面分栏_展开</div>
	                    <div className="fontclass">.uf-yemianfenlan_zhankai</div>
	                </li>
	                <li>
	                    <Icon type="uf-yemianfenlan_zhedie"></Icon>
	                    <div className="name">页面分栏_折叠</div>
	                    <div className="fontclass">.uf-yemianfenlan_zhedie</div>
	                </li>
	                <li>
	                    <Icon type="uf-arrow-up-2"></Icon>
	                    <div className="name">箭头上</div>
	                    <div className="fontclass">.uf-arrow-up-2</div>
	                </li>
	                <li>
	                    <Icon type="uf-arrow-down-2"></Icon>
	                    <div className="name">箭头下</div>
	                    <div className="fontclass">.uf-arrow-down-2</div>
	                </li>
	                <li>
	                    <Icon type="uf-chaosong"></Icon>
	                    <div className="name">抄送</div>
	                    <div className="fontclass">.uf-chaosong</div>
	                </li>
	                <li>
	                    <Icon type="uf-yunqianming"></Icon>
	                    <div className="name">云签名</div>
	                    <div className="fontclass">.uf-yunqianming</div>
	                </li>
	                <li>
	                    <Icon type="uf-qianmingtupian"></Icon>
	                    <div className="name">签名图片</div>
	                    <div className="fontclass">.uf-qianmingtupian</div>
	                </li>
	                <li>
	                    <Icon type="uf-bukejian"></Icon>
	                    <div className="name">不可见</div>
	                    <div className="fontclass">.uf-bukejian</div>
	                </li>
	                <li>
	                    <Icon type="uf-changyongyu"></Icon>
	                    <div className="name">常用语</div>
	                    <div className="fontclass">.uf-changyongyu</div>
	                </li>
	                <li>
	                    <Icon type="uf-ziliuchengshenpizhong"></Icon>
	                    <div className="name">子流程审批中</div>
	                    <div className="fontclass">.uf-ziliuchengshenpizhong</div>
	                </li>
	                <li>
	                    <Icon type="uf-quanshan"></Icon>
	                    <div className="name">全删</div>
	                    <div className="fontclass">.uf-quanshan</div>
	                </li>
	                <li>
	                    <Icon type="uf-zhinengsousuo"></Icon>
	                    <div className="name">智能搜索</div>
	                    <div className="fontclass">.uf-zhinengsousuo</div>
	                </li>
	                <li>
	                    <Icon type="uf-ellipsis"></Icon>
	                    <div className="name">更多</div>
	                    <div className="fontclass">.uf-ellipsis</div>
	                </li>
	                <li>
	                    <Icon type="uf-wentifankui"></Icon>
	                    <div className="name">问题反馈</div>
	                    <div className="fontclass">.uf-wentifankui</div>
	                </li>
	                <li>
	                    <Icon type="uf-qiehuanzhanghao"></Icon>
	                    <div className="name">切换账号</div>
	                    <div className="fontclass">.uf-qiehuanzhanghao</div>
	                </li>
	                <li>
	                    <Icon type="uf-shangpinzhongxin"></Icon>
	                    <div className="name">商品中心</div>
	                    <div className="fontclass">.uf-shangpinzhongxin</div>
	                </li>
	                <li>
	                    <Icon type="uf-tuandui"></Icon>
	                    <div className="name">用户及角色</div>
	                    <div className="fontclass">.uf-tuandui</div>
	                </li>
	                <li>
	                    <Icon type="uf-qiehuanxiaoxie"></Icon>
	                    <div className="name">切换小写</div>
	                    <div className="fontclass">.uf-qiehuanxiaoxie</div>
	                </li>
	                <li>
	                    <Icon type="uf-qiehuandaxie"></Icon>
	                    <div className="name">切换大写</div>
	                    <div className="fontclass">.uf-qiehuandaxie</div>
	                </li>
	                <li>
	                    <Icon type="uf-shang"></Icon>
	                    <div className="name">上</div>
	                    <div className="fontclass">.uf-shang</div>
	                </li>
	                <li>
	                    <Icon type="uf-xia"></Icon>
	                    <div className="name">下</div>
	                    <div className="fontclass">.uf-xia</div>
	                </li>
	                <li>
	                    <Icon type="uf-chexiao"></Icon>
	                    <div className="name">撤销</div>
	                    <div className="fontclass">.uf-chexiao</div>
	                </li>
	                <li>
	                    <Icon type="uf-daishenhe"></Icon>
	                    <div className="name">待审核</div>
	                    <div className="fontclass">.uf-daishenhe</div>
	                </li>
	                <li>
	                    <Icon type="uf-shibai"></Icon>
	                    <div className="name">失败</div>
	                    <div className="fontclass">.uf-shibai</div>
	                </li>
	                <li>
	                    <Icon type="uf-top-up"></Icon>
	                    <div className="name">返回顶部</div>
	                    <div className="fontclass">.uf-top-up</div>
	                </li>
	                <li>
	                    <Icon type="uf-dingdanguanli"></Icon>
	                    <div className="name">订单管理</div>
	                    <div className="fontclass">.uf-dingdanguanli</div>
	                </li>
	                <li>
	                    <Icon type="uf-zuixiaohua"></Icon>
	                    <div className="name">最小化</div>
	                    <div className="fontclass">.uf-zuixiaohua</div>
	                </li>
	                <li>
	                    <Icon type="uf-huichequeren"></Icon>
	                    <div className="name">回车确认</div>
	                    <div className="fontclass">.uf-huichequeren</div>
	                </li>
	                <li>
	                    <Icon type="uf-tihuan"></Icon>
	                    <div className="name">替换</div>
	                    <div className="fontclass">.uf-tihuan</div>
	                </li>
	                <li>
	                    <Icon type="uf-zanting"></Icon>
	                    <div className="name">暂停</div>
	                    <div className="fontclass">.uf-zanting</div>
	                </li>
	                <li>
	                    <Icon type="uf-bofang"></Icon>
	                    <div className="name">播放</div>
	                    <div className="fontclass">.uf-bofang</div>
	                </li>
	                <li>
	                    <Icon type="uf-qiye"></Icon>
	                    <div className="name">组织单元</div>
	                    <div className="fontclass">.uf-qiye</div>
	                </li>
	                <li>
	                    <Icon type="uf-dingwei"></Icon>
	                    <div className="name">定位</div>
	                    <div className="fontclass">.uf-dingwei</div>
	                </li>
	                <li>
	                    <Icon type="uf-chongzhi1"></Icon>
	                    <div className="name">重置</div>
	                    <div className="fontclass">.uf-chongzhi1</div>
	                </li>
	                <li>
	                    <Icon type="uf-exc-t"></Icon>
	                    <div className="name">警示提示</div>
	                    <div className="fontclass">.uf-exc-t</div>
	                </li>
	                <li>
	                    <Icon type="uf-exc-c-2"></Icon>
	                    <div className="name">失败提示</div>
	                    <div className="fontclass">.uf-exc-c-2</div>
	                </li>
	                <li>
	                    <Icon type="uf-xingzhuangbeifen"></Icon>
	                    <div className="name">常规提示</div>
	                    <div className="fontclass">.uf-xingzhuangbeifen</div>
	                </li>
	                <li>
	                    <Icon type="uf-chenggongtishi"></Icon>
	                    <div className="name">成功提示</div>
	                    <div className="fontclass">.uf-chenggongtishi</div>
	                </li>
	                <li>
	                    <Icon type="uf-xunizuzhi"></Icon>
	                    <div className="name">虚拟组织</div>
	                    <div className="fontclass">.uf-xunizuzhi</div>
	                </li>
	                <li>
	                    <Icon type="uf-fuzhi2"></Icon>
	                    <div className="name">复制</div>
	                    <div className="fontclass">.uf-fuzhi2</div>
	                </li>
	                <li>
	                    <Icon type="uf-ziduanbiangeng"></Icon>
	                    <div className="name">字段变更</div>
	                    <div className="fontclass">.uf-ziduanbiangeng</div>
	                </li>
	                <li>
	                    <Icon type="uf-fujian"></Icon>
	                    <div className="name">附件</div>
	                    <div className="fontclass">.uf-fujian</div>
	                </li>
	                <li>
	                    <Icon type="uf-bell-o"></Icon>
	                    <div className="name">公告管理</div>
	                    <div className="fontclass">.uf-bell-o</div>
	                </li>
	                <li>
	                    <Icon type="uf-symlist"></Icon>
	                    <div className="name">参照</div>
	                    <div className="fontclass">.uf-symlist</div>
	                </li>
	                <li>
	                    <Icon type="uf-calendar"></Icon>
	                    <div className="name">日期</div>
	                    <div className="fontclass">.uf-calendar</div>
	                </li>
	                <li>
	                    <Icon type="uf-tuichudenglu"></Icon>
	                    <div className="name">退出登录</div>
	                    <div className="fontclass">.uf-tuichudenglu</div>
	                </li>
	                <li>
	                    <Icon type="uf-gerenxinxi"></Icon>
	                    <div className="name">个人信息</div>
	                    <div className="fontclass">.uf-gerenxinxi</div>
	                </li>
	                <li>
	                    <Icon type="uf-xiaolian"></Icon>
	                    <div className="name">笑脸</div>
	                    <div className="fontclass">.uf-xiaolian</div>
	                </li>
	                <li>
	                    <Icon type="uf-shuaxin"></Icon>
	                    <div className="name">刷新</div>
	                    <div className="fontclass">.uf-shuaxin</div>
	                </li>
	                <li>
	                    <Icon type="uf-i-c"></Icon>
	                    <div className="name">通知信息</div>
	                    <div className="fontclass">.uf-i-c</div>
	                </li>
	                <li>
	                    <Icon type="uf-rollback"></Icon>
	                    <div className="name">返回</div>
	                    <div className="fontclass">.uf-rollback</div>
	                </li>
	                <li>
	                    <Icon type="uf-eye-o"></Icon>
	                    <div className="name">隐藏</div>
	                    <div className="fontclass">.uf-eye-o</div>
	                </li>
	                <li>
	                    <Icon type="uf-eye"></Icon>
	                    <div className="name">可见</div>
	                    <div className="fontclass">.uf-eye</div>
	                </li>
	                <li>
	                    <Icon type="uf-erweima"></Icon>
	                    <div className="name">二维码</div>
	                    <div className="fontclass">.uf-erweima</div>
	                </li>
	                <li>
	                    <Icon type="uf-jiangxu"></Icon>
	                    <div className="name">降序</div>
	                    <div className="fontclass">.uf-jiangxu</div>
	                </li>
	                <li>
	                    <Icon type="uf-shengxu"></Icon>
	                    <div className="name">升序</div>
	                    <div className="fontclass">.uf-shengxu</div>
	                </li>
	                <li>
	                    <Icon type="uf-tuodong"></Icon>
	                    <div className="name">拖动</div>
	                    <div className="fontclass">.uf-tuodong</div>
	                </li>
	                <li>
	                    <Icon type="uf-zuidahua"></Icon>
	                    <div className="name">最大化</div>
	                    <div className="fontclass">.uf-zuidahua</div>
	                </li>
	                <li>
	                    <Icon type="uf-globe"></Icon>
	                    <div className="name">多语言</div>
	                    <div className="fontclass">.uf-globe</div>
	                </li>
	                <li>
	                    <Icon type="uf-nodata"></Icon>
	                    <div className="name">暂无数据</div>
	                    <div className="fontclass">.uf-nodata</div>
	                </li>
	            </ul>
	        </div>
	    );
	}
}

export default Demo1;
