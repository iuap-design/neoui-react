/**
 * @title Icon 图标
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
		target.parentNode.nodeName.toLowerCase() == "li";
	    let iconCls = "";
	    if (target.nodeName.toLowerCase() == "li") {
	        iconCls = target.lastElementChild.innerText;
	        return iconCls && iconCls.substr(1);
	    } else if (target.parentNode.nodeName.toLowerCase() == "li") {
	        iconCls = target.parentNode.lastElementChild.innerText;
	        return iconCls && iconCls.substr(1);
	    }
	    return iconCls;
	};

	render() {
	    return (
	        <div className="tinper-icon-demo">
	            <ul id="icon_lists" className="icon_lists">
	                <li>
	                    <Icon type="uf-wechat"></Icon>
	                    <div className="name">微信</div>
	                    <div className="fontclass">.uf-wechat</div>
	                </li>
	                <li>
	                    <Icon type="uf-search"></Icon>
	                    <div className="name">搜索</div>
	                    <div className="fontclass">.uf-search</div>
	                </li>

	                <li>
	                    <Icon type="uf-histogram-arrow-up"></Icon>
	                    <div className="name">图表 折线图</div>
	                    <div className="fontclass">.uf-histogram-arrow-up</div>
	                </li>

	                <li>
	                    <Icon type="uf-close-bold"></Icon>
	                    <div className="name">关闭</div>
	                    <div className="fontclass">.uf-close-bold</div>
	                </li>

	                <li>
	                    <Icon type="uf-umbrella"></Icon>
	                    <div className="name">雨伞</div>
	                    <div className="fontclass">.uf-umbrella</div>
	                </li>

	                <li>
	                    <Icon type="uf-qq"></Icon>
	                    <div className="name">QQ</div>
	                    <div className="fontclass">.uf-qq</div>
	                </li>

	                <li>
	                    <Icon type="uf-4square-3"></Icon>
	                    <div className="name">分类</div>
	                    <div className="fontclass">.uf-4square-3</div>
	                </li>

	                <li>
	                    <Icon type="uf-send"></Icon>
	                    <div className="name">发送</div>
	                    <div className="fontclass">.uf-send</div>
	                </li>

	                <li>
	                    <Icon type="uf-map"></Icon>
	                    <div className="name">地图</div>
	                    <div className="fontclass">.uf-map</div>
	                </li>

	                <li>
	                    <Icon type="uf-9square-2"></Icon>
	                    <div className="name">标定</div>
	                    <div className="fontclass">.uf-9square-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-navmenu"></Icon>
	                    <div className="name">汉堡包</div>
	                    <div className="fontclass">.uf-navmenu</div>
	                </li>

	                <li>
	                    <Icon type="uf-pc-2"></Icon>
	                    <div className="name">显示器</div>
	                    <div className="fontclass">.uf-pc-2</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-search-light-2"></Icon>
						 <div className="name">zoom</div>
						 <div className="fontclass">.uf-search-light-2</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-check-s-2"></Icon>
	                    <div className="name">任务</div>
	                    <div className="fontclass">.uf-check-s-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-pencil"></Icon>
	                    <div className="name">编辑</div>
	                    <div className="fontclass">.uf-pencil</div>
	                </li>

	                <li>
	                    <Icon type="uf-repeat"></Icon>
	                    <div className="name">撤销</div>
	                    <div className="fontclass">.uf-repeat</div>
	                </li>

	                <li>
	                    <Icon type="uf-security-2"></Icon>
	                    <div className="name">安全</div>
	                    <div className="fontclass">.uf-security-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-lexi"></Icon>
	                    <div className="name">女</div>
	                    <div className="fontclass">.uf-lexi</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-pencil-s"></Icon>
						 <div className="name">编辑</div>
						 <div className="fontclass">.uf-pencil-s</div>
					 </li> */}

	                {/* <li>
						 <Icon type="uf-del"></Icon>
						 <div className="name">删除</div>
						 <div className="fontclass">.uf-del</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-bi-o"></Icon>
	                    <div className="name">比价</div>
	                    <div className="fontclass">.uf-bi-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-pencil-c"></Icon>
	                    <div className="name">编辑</div>
	                    <div className="fontclass">.uf-pencil-c</div>
	                </li>

	                <li>
	                    <Icon type="uf-qrcode"></Icon>
	                    <div className="name">二维码</div>
	                    <div className="fontclass">.uf-qrcode</div>
	                </li>

	                <li>
	                    <Icon type="uf-rmb-c-o"></Icon>
	                    <div className="name">免费报价</div>
	                    <div className="fontclass">.uf-rmb-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-search-c-o"></Icon>
	                    <div className="name">搜索</div>
	                    <div className="fontclass">.uf-search-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-bell"></Icon>
	                    <div className="name">铃铛</div>
	                    <div className="fontclass">.uf-bell</div>
	                </li>

	                <li>
	                    <Icon type="uf-pass-3"></Icon>
	                    <div className="name">机检通过</div>
	                    <div className="fontclass">.uf-pass-3</div>
	                </li>

	                <li>
	                    <Icon type="uf-treearrow-down"></Icon>
	                    <div className="name">树形线</div>
	                    <div className="fontclass">.uf-treearrow-down</div>
	                </li>

	                <li>
	                    <Icon type="uf-training"></Icon>
	                    <div className="name">培训</div>
	                    <div className="fontclass">.uf-training</div>
	                </li>

	                <li>
	                    <Icon type="uf-group-2"></Icon>
	                    <div className="name">组织架构</div>
	                    <div className="fontclass">.uf-group-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-zoom-in"></Icon>
	                    <div className="name">zoom-in</div>
	                    <div className="fontclass">.uf-zoom-in</div>
	                </li>

	                <li>
	                    <Icon type="uf-security-o"></Icon>
	                    <div className="name">安全</div>
	                    <div className="fontclass">.uf-security-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-baojia-c"></Icon>
	                    <div className="name">报价</div>
	                    <div className="fontclass">.uf-baojia-c</div>
	                </li>

	                <li>
	                    <Icon type="uf-rulerpen"></Icon>
	                    <div className="name">定制</div>
	                    <div className="fontclass">.uf-rulerpen</div>
	                </li>

	                <li>
	                    <Icon type="uf-erpsearch"></Icon>
	                    <div className="name">erp</div>
	                    <div className="fontclass">.uf-erpsearch</div>
	                </li>

	                <li>
	                    <Icon type="uf-group-o"></Icon>
	                    <div className="name">组织机构</div>
	                    <div className="fontclass">.uf-group-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-cloud-o-updown"></Icon>
	                    <div className="name">同步中2-同步</div>
	                    <div className="fontclass">.uf-cloud-o-updown</div>
	                </li>

	                <li>
	                    <Icon type="uf-close-c-o"></Icon>
	                    <div className="name">关闭</div>
	                    <div className="fontclass">.uf-close-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-add-s"></Icon>
	                    <div className="name">加</div>
	                    <div className="fontclass">.uf-add-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-pc"></Icon>
	                    <div className="name">工作台</div>
	                    <div className="fontclass">.uf-pc</div>
	                </li>

	                <li>
	                    <Icon type="uf-rain"></Icon>
	                    <div className="name">空气_雨天</div>
	                    <div className="fontclass">.uf-rain</div>
	                </li>

	                <li>
	                    <Icon type="uf-nodata"></Icon>
	                    <div className="name">无数据</div>
	                    <div className="fontclass">.uf-nodata</div>
	                </li>

	                <li>
	                    <Icon type="uf-close-c"></Icon>
	                    <div className="name">关闭</div>
	                    <div className="fontclass">.uf-close-c</div>
	                </li>

	                <li>
	                    <Icon type="uf-bohui-s-o"></Icon>
	                    <div className="name">审批-驳回</div>
	                    <div className="fontclass">.uf-bohui-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-cloud"></Icon>
	                    <div className="name">天气</div>
	                    <div className="fontclass">.uf-cloud</div>
	                </li>

	                <li>
	                    <Icon type="uf-bag-s"></Icon>
	                    <div className="name">商品</div>
	                    <div className="fontclass">.uf-bag-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-table-2"></Icon>
	                    <div className="name">made</div>
	                    <div className="fontclass">.uf-table-2</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-anglearrowpointingtoright"></Icon>
						 <div className="name">箭头</div>
						 <div className="fontclass">.uf-anglearrowpointingtoright</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-exc-c-o"></Icon>
	                    <div className="name">叹号</div>
	                    <div className="fontclass">.uf-exc-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-group"></Icon>
	                    <div className="name">组织机构</div>
	                    <div className="fontclass">.uf-group</div>
	                </li>

	                <li>
	                    <Icon type="uf-personin-o"></Icon>
	                    <div className="name">认证激活</div>
	                    <div className="fontclass">.uf-personin-o</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-calendar"></Icon>
						 <div className="name">gm_日历</div>
						 <div className="fontclass">.uf-calendar</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-add-s-o"></Icon>
	                    <div className="name">加</div>
	                    <div className="fontclass">.uf-add-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-sync-c-o"></Icon>
	                    <div className="name">同步</div>
	                    <div className="fontclass">.uf-sync-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-grid"></Icon>
	                    <div className="name">grid</div>
	                    <div className="fontclass">.uf-grid</div>
	                </li>

	                <li>
	                    <Icon type="uf-anglepointingtoleft"></Icon>
	                    <div className="name">箭头</div>
	                    <div className="fontclass">.uf-anglepointingtoleft</div>
	                </li>

	                <li>
	                    <Icon type="uf-activate-3"></Icon>
	                    <div className="name">激活</div>
	                    <div className="fontclass">.uf-activate-3</div>
	                </li>

	                <li>
	                    <Icon type="uf-caven"></Icon>
	                    <div className="name">男</div>
	                    <div className="fontclass">.uf-caven</div>
	                </li>

	                <li>
	                    <Icon type="uf-back"></Icon>
	                    <div className="name">返回</div>
	                    <div className="fontclass">.uf-back</div>
	                </li>

	                <li>
	                    <Icon type="uf-pass-2"></Icon>
	                    <div className="name">授权</div>
	                    <div className="fontclass">.uf-pass-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-reduce-s-o"></Icon>
	                    <div className="name">显示树</div>
	                    <div className="fontclass">.uf-reduce-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-area"></Icon>
	                    <div className="name">图表图标-面积图</div>
	                    <div className="fontclass">.uf-area</div>
	                </li>

	                <li>
	                    <Icon type="uf-flag"></Icon>
	                    <div className="name">旗帜</div>
	                    <div className="fontclass">.uf-flag</div>
	                </li>

	                <li>
	                    <Icon type="uf-box-o-2"></Icon>
	                    <div className="name">购买盒子</div>
	                    <div className="fontclass">.uf-box-o-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-s-o-down"></Icon>
	                    <div className="name">下架</div>
	                    <div className="fontclass">.uf-arrow-s-o-down</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-s-o-up"></Icon>
	                    <div className="name">上架</div>
	                    <div className="fontclass">.uf-arrow-s-o-up</div>
	                </li>

	                <li>
	                    <Icon type="uf-building"></Icon>
	                    <div className="name">企业信息</div>
	                    <div className="fontclass">.uf-building</div>
	                </li>

	                <li>
	                    <Icon type="uf-tapp"></Icon>
	                    <div className="name">天气</div>
	                    <div className="fontclass">.uf-tapp</div>
	                </li>

	                <li>
	                    <Icon type="uf-treefolder"></Icon>
	                    <div className="name">搜索</div>
	                    <div className="fontclass">.uf-treefolder</div>
	                </li>

	                <li>
	                    <Icon type="uf-advice"></Icon>
	                    <div className="name">咨询</div>
	                    <div className="fontclass">.uf-advice</div>
	                </li>

	                <li>
	                    <Icon type="uf-2collayout"></Icon>
	                    <div className="name">序列布局</div>
	                    <div className="fontclass">.uf-2collayout</div>
	                </li>

	                <li>
	                    <Icon type="uf-check-s"></Icon>
	                    <div className="name">审批</div>
	                    <div className="fontclass">.uf-check-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-sign"></Icon>
	                    <div className="name">采购合同</div>
	                    <div className="fontclass">.uf-sign</div>
	                </li>

	                <li>
	                    <Icon type="uf-listsearch"></Icon>
	                    <div className="name">查看详情</div>
	                    <div className="fontclass">.uf-listsearch</div>
	                </li>

	                <li>
	                    <Icon type="uf-gridcaretarrowup"></Icon>
	                    <div className="name">必填</div>
	                    <div className="fontclass">.uf-gridcaretarrowup</div>
	                </li>

	                <li>
	                    <Icon type="uf-eye-c-o"></Icon>
	                    <div className="name">查看</div>
	                    <div className="fontclass">.uf-eye-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-check-c-o"></Icon>
	                    <div className="name">许可</div>
	                    <div className="fontclass">.uf-check-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-seal"></Icon>
	                    <div className="name">审批</div>
	                    <div className="fontclass">.uf-seal</div>
	                </li>

	                <li>
	                    <Icon type="uf-erpbox"></Icon>
	                    <div className="name">erp</div>
	                    <div className="fontclass">.uf-erpbox</div>
	                </li>

	                <li>
	                    <Icon type="uf-rulerpen-o"></Icon>
	                    <div className="name">定制</div>
	                    <div className="fontclass">.uf-rulerpen-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-role"></Icon>
	                    <div className="name">角色</div>
	                    <div className="fontclass">.uf-role</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-exc-c-2"></Icon>
						 <div className="name">提示叹号</div>
						 <div className="fontclass">.uf-exc-c-2</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-pad"></Icon>
	                    <div className="name">pad</div>
	                    <div className="fontclass">.uf-pad</div>
	                </li>

	                <li>
	                    <Icon type="uf-treefolder-closed"></Icon>
	                    <div className="name">tree-new-sbling-node</div>
	                    <div className="fontclass">.uf-treefolder-closed</div>
	                </li>

	                <li>
	                    <Icon type="uf-reduce-c-o"></Icon>
	                    <div className="name">减号</div>
	                    <div className="fontclass">.uf-reduce-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-pass-s-o"></Icon>
	                    <div className="name">通过</div>
	                    <div className="fontclass">.uf-pass-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-setting"></Icon>
	                    <div className="name">维护</div>
	                    <div className="fontclass">.uf-setting</div>
	                </li>

	                <li>
	                    <Icon type="uf-close-s"></Icon>
	                    <div className="name">ZSX号</div>
	                    <div className="fontclass">.uf-close-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-map-o"></Icon>
	                    <div className="name">地图</div>
	                    <div className="fontclass">.uf-map-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-move"></Icon>
	                    <div className="name">移动</div>
	                    <div className="fontclass">.uf-move</div>
	                </li>

	                {/* yondesign 未平替 */}
	                {/* <li>
						 <Icon type="uf-2arrow-down"></Icon>
						 <div className="name">箭头</div>
						 <div className="fontclass">.uf-2arrow-down</div>
					 </li> */}
	                {/* yondesign 未平替 */}
	                {/* <li>
						 <Icon type="uf-2arrow-right"></Icon>
						 <div className="name">箭头</div>
						 <div className="fontclass">.uf-2arrow-right</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-arrow-c-o-left"></Icon>
	                    <div className="name">箭头</div>
	                    <div className="fontclass">.uf-arrow-c-o-left</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-plus"></Icon>
						 <div className="name">plus</div>
						 <div className="fontclass">.uf-plus</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-arrow-c-o-right"></Icon>
	                    <div className="name">箭头</div>
	                    <div className="fontclass">.uf-arrow-c-o-right</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-c-o-down"></Icon>
	                    <div className="name">箭头</div>
	                    <div className="fontclass">.uf-arrow-c-o-down</div>
	                </li>

	                <li>
	                    <Icon type="uf-list-s-o"></Icon>
	                    <div className="name">暂无数据</div>
	                    <div className="fontclass">.uf-list-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-cloud-o-down"></Icon>
	                    <div className="name">云下载</div>
	                    <div className="fontclass">.uf-cloud-o-down</div>
	                </li>

	                <li>
	                    <Icon type="uf-nodata-2"></Icon>
	                    <div className="name">无效数据</div>
	                    <div className="fontclass">.uf-nodata-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-file-s"></Icon>
	                    <div className="name">文档文件-01</div>
	                    <div className="fontclass">.uf-file-s</div>
	                </li>

	                {/* yondesign 未平替 */}
	                {/* <li>
						 <Icon type="uf-2arrow-up"></Icon>
						 <div className="name">箭头</div>
						 <div className="fontclass">.uf-2arrow-up</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-notification"></Icon>
	                    <div className="name">消息喇叭</div>
	                    <div className="fontclass">.uf-notification</div>
	                </li>

	                <li>
	                    <Icon type="uf-piechart"></Icon>
	                    <div className="name">图表_饼</div>
	                    <div className="fontclass">.uf-piechart</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-cloud-o-up"></Icon>
						 <div className="name">云_上传</div>
						 <div className="fontclass">.uf-cloud-o-up</div>
					 </li> */}

	                {/* <li>
						 <Icon type="uf-close"></Icon>
						 <div className="name">取消</div>
						 <div className="fontclass">.uf-close</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-correct"></Icon>
	                    <div className="name">对号</div>
	                    <div className="fontclass">.uf-correct</div>
	                </li>

	                <li>
	                    <Icon type="uf-histogram-s-o-2"></Icon>
	                    <div className="name">图表切换</div>
	                    <div className="fontclass">.uf-histogram-s-o-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-4square-2"></Icon>
	                    <div className="name">应用中心</div>
	                    <div className="fontclass">.uf-4square-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-sunny"></Icon>
	                    <div className="name">天气</div>
	                    <div className="fontclass">.uf-sunny</div>
	                </li>

	                <li>
	                    <Icon type="uf-link"></Icon>
	                    <div className="name">复制链接</div>
	                    <div className="fontclass">.uf-link</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-eye"></Icon>
						 <div className="name">查看</div>
						 <div className="fontclass">.uf-eye</div>
					 </li>

					 <li>
						 <Icon type="uf-eye-o"></Icon>
						 <div className="name">查看</div>
						 <div className="fontclass">.uf-eye-o</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-qian"></Icon>
	                    <div className="name">签</div>
	                    <div className="fontclass">.uf-qian</div>
	                </li>

	                <li>
	                    <Icon type="uf-widgetab"></Icon>
	                    <div className="name">小部件授权</div>
	                    <div className="fontclass">.uf-widgetab</div>
	                </li>

	                <li>
	                    <Icon type="uf-rmb-s"></Icon>
	                    <div className="name">报价</div>
	                    <div className="fontclass">.uf-rmb-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-link-off"></Icon>
	                    <div className="name">断开链接</div>
	                    <div className="fontclass">.uf-link-off</div>
	                </li>

	                <li>
	                    <Icon type="uf-shang-s"></Icon>
	                    <div className="name">上架</div>
	                    <div className="fontclass">.uf-shang-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-xia-s"></Icon>
	                    <div className="name">下架</div>
	                    <div className="fontclass">.uf-xia-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-box-2"></Icon>
	                    <div className="name">盒子full</div>
	                    <div className="fontclass">.uf-box-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-pass-o"></Icon>
	                    <div className="name">授权</div>
	                    <div className="fontclass">.uf-pass-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-down"></Icon>
	                    <div className="name">angle-arrow-down</div>
	                    <div className="fontclass">.uf-arrow-down</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-right"></Icon>
	                    <div className="name">angle-arrow-pointing-to-right</div>
	                    <div className="fontclass">.uf-arrow-right</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-left"></Icon>
	                    <div className="name">angle-pointing-to-left</div>
	                    <div className="fontclass">.uf-arrow-left</div>
	                </li>

	                <li>
	                    <Icon type="uf-box"></Icon>
	                    <div className="name">archive-black-box</div>
	                    <div className="fontclass">.uf-box</div>
	                </li>

	                <li>
	                    <Icon type="uf-triangle-right"></Icon>
	                    <div className="name">arrowhead-pointing-to-the-right</div>
	                    <div className="fontclass">.uf-triangle-right</div>
	                </li>

	                <li>
	                    <Icon type="uf-histogram-s-o"></Icon>
	                    <div className="name">bar-graph-on-a-rectangle</div>
	                    <div className="fontclass">.uf-histogram-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-book"></Icon>
	                    <div className="name">book</div>
	                    <div className="fontclass">.uf-book</div>
	                </li>

	                <li>
	                    <Icon type="uf-bookmark-o"></Icon>
	                    <div className="name">bookmark-white</div>
	                    <div className="fontclass">.uf-bookmark-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-leaf"></Icon>
	                    <div className="name">branch-with-leaves-black-shape</div>
	                    <div className="fontclass">.uf-leaf</div>
	                </li>

	                <li>
	                    <Icon type="uf-bullseye"></Icon>
	                    <div className="name">bullseye</div>
	                    <div className="fontclass">.uf-bullseye</div>
	                </li>

	                <li>
	                    <Icon type="uf-gridcaretdown"></Icon>
	                    <div className="name">camera-retro</div>
	                    <div className="fontclass">.uf-gridcaretdown</div>
	                </li>

	                <li>
	                    <Icon type="uf-triangle-up"></Icon>
	                    <div className="name">caret-arrow-up</div>
	                    <div className="fontclass">.uf-triangle-up</div>
	                </li>

	                <li>
	                    <Icon type="uf-triangle-down"></Icon>
	                    <div className="name">caret-down</div>
	                    <div className="fontclass">.uf-triangle-down</div>
	                </li>

	                <li>
	                    <Icon type="uf-cloud-down"></Icon>
	                    <div className="name">cloud-storage-download</div>
	                    <div className="fontclass">.uf-cloud-down</div>
	                </li>

	                <li>
	                    <Icon type="uf-cloud-up"></Icon>
	                    <div className="name">cloud-storage-uploading-option</div>
	                    <div className="fontclass">.uf-cloud-up</div>
	                </li>

	                <li>
	                    <Icon type="uf-bubble"></Icon>
	                    <div className="name">comment-black-oval-bubble-shape</div>
	                    <div className="fontclass">.uf-bubble</div>
	                </li>

	                <li>
	                    <Icon type="uf-bubble-o"></Icon>
	                    <div className="name">comment-white-oval-bubble</div>
	                    <div className="fontclass">.uf-bubble-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-copy"></Icon>
	                    <div className="name">copy-document</div>
	                    <div className="fontclass">.uf-copy</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-correct-2"></Icon>
						 <div className="name">correct-symbol</div>
						 <div className="fontclass">.uf-correct-2</div>
					 </li> */}

	                {/* yondesign 未平替 */}
	                {/* <li>
						 <Icon type="uf-2arrow-left"></Icon>
						 <div className="name">double-left-chevron</div>
						 <div className="fontclass">.uf-2arrow-left</div>
					 </li> */}

	                {/* <li>
						 <Icon type="uf-arrow-down-2"></Icon>
						 <div className="name">down-arrow</div>
						 <div className="fontclass">.uf-arrow-down-2</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-download"></Icon>
	                    <div className="name">download-to-storage-drive</div>
	                    <div className="fontclass">.uf-download</div>
	                </li>

	                <li>
	                    <Icon type="uf-earth"></Icon>
	                    <div className="name">earth-globe</div>
	                    <div className="fontclass">.uf-earth</div>
	                </li>

	                <li>
	                    <Icon type="uf-mail-o"></Icon>
	                    <div className="name">envelope-of-white-paper</div>
	                    <div className="fontclass">.uf-mail-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-mail"></Icon>
	                    <div className="name">envelope</div>
	                    <div className="fontclass">.uf-mail</div>
	                </li>

	                <li>
	                    <Icon type="uf-exc"></Icon>
	                    <div className="name">exclamation</div>
	                    <div className="fontclass">.uf-exc</div>
	                </li>

	                <li>
	                    <Icon type="uf-externallink"></Icon>
	                    <div className="name">external-link-symbol</div>
	                    <div className="fontclass">.uf-externallink</div>
	                </li>

	                <li>
	                    <Icon type="uf-video"></Icon>
	                    <div className="name">facetime-button</div>
	                    <div className="fontclass">.uf-video</div>
	                </li>

	                <li>
	                    <Icon type="uf-films"></Icon>
	                    <div className="name">film-strip-with-two-photograms</div>
	                    <div className="fontclass">.uf-films</div>
	                </li>

	                <li>
	                    <Icon type="uf-folder"></Icon>
	                    <div className="name">folder-closed-black-shape</div>
	                    <div className="fontclass">.uf-folder</div>
	                </li>

	                <li>
	                    <Icon type="uf-folder-o"></Icon>
	                    <div className="name">folder-white-shape</div>
	                    <div className="fontclass">.uf-folder-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-4square"></Icon>
	                    <div className="name">four-black-squares</div>
	                    <div className="fontclass">.uf-4square</div>
	                </li>

	                <li>
	                    <Icon type="uf-gift"></Icon>
	                    <div className="name">gift-box</div>
	                    <div className="fontclass">.uf-gift</div>
	                </li>

	                <li>
	                    <Icon type="uf-github-c"></Icon>
	                    <div className="name">github-logo</div>
	                    <div className="fontclass">.uf-github-c</div>
	                </li>

	                <li>
	                    <Icon type="uf-github-s"></Icon>
	                    <div className="name">github-sign</div>
	                    <div className="fontclass">.uf-github-s</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-heart-o"></Icon>
						 <div className="name">heart-shape-outline</div>
						 <div className="fontclass">.uf-heart-o</div>
					 </li>

					 <li>
						 <Icon type="uf-heart"></Icon>
						 <div className="name">heart-shape-silhouette</div>
						 <div className="fontclass">.uf-heart</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-home"></Icon>
	                    <div className="name">home</div>
	                    <div className="fontclass">.uf-home</div>
	                </li>

	                <li>
	                    <Icon type="uf-i-c-2"></Icon>
	                    <div className="name">information-button</div>
	                    <div className="fontclass">.uf-i-c-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-i"></Icon>
	                    <div className="name">information-symbol</div>
	                    <div className="fontclass">.uf-i</div>
	                </li>

	                <li>
	                    <Icon type="uf-triangle-left"></Icon>
	                    <div className="name">left-arrow</div>
	                    <div className="fontclass">.uf-triangle-left</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-symlist"></Icon>
						 <div className="name">listing-option</div>
						 <div className="fontclass">.uf-symlist</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-arrow-left-2"></Icon>
	                    <div className="name">long-arrow-pointing-to-left</div>
	                    <div className="fontclass">.uf-arrow-left-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-right-2"></Icon>
	                    <div className="name">long-arrow-pointing-to-the-right</div>
	                    <div className="fontclass">.uf-arrow-right-2</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-arrow-up-2"></Icon>
						 <div className="name">long-arrow-pointing-up</div>
						 <div className="fontclass">.uf-arrow-up-2</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-reduce-c"></Icon>
	                    <div className="name">minus-sign-inside-a-black-circle</div>
	                    <div className="fontclass">.uf-reduce-c</div>
	                </li>

	                <li>
	                    <Icon type="uf-reduce-s"></Icon>
	                    <div className="name">
							minus-sign-inside-a-black-rounded-square-shape
	                    </div>
	                    <div className="fontclass">.uf-reduce-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-minus"></Icon>
	                    <div className="name">minus-symbol</div>
	                    <div className="fontclass">.uf-minus</div>
	                </li>

	                <li>
	                    <Icon type="uf-mobile"></Icon>
	                    <div className="name">mobile-phone</div>
	                    <div className="fontclass">.uf-mobile</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-bell-o"></Icon>
						 <div className="name">musical-bell-outline</div>
						 <div className="fontclass">.uf-bell-o</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-9square"></Icon>
	                    <div className="name">nine-black-tiles</div>
	                    <div className="fontclass">.uf-9square</div>
	                </li>

	                <li>
	                    <Icon type="uf-numlist"></Icon>
	                    <div className="name">numbered-list</div>
	                    <div className="fontclass">.uf-numlist</div>
	                </li>

	                <li>
	                    <Icon type="uf-folderopen-o"></Icon>
	                    <div className="name">open-folder-outline</div>
	                    <div className="fontclass">.uf-folderopen-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-treefolderopen"></Icon>
	                    <div className="name">open-folder</div>
	                    <div className="fontclass">.uf-treefolderopen</div>
	                </li>

	                <li>
	                    <Icon type="uf-mac"></Icon>
	                    <div className="name">open-laptop-computer</div>
	                    <div className="fontclass">.uf-mac</div>
	                </li>

	                <li>
	                    <Icon type="uf-camera"></Icon>
	                    <div className="name">photo-camera</div>
	                    <div className="fontclass">.uf-camera</div>
	                </li>

	                <li>
	                    <Icon type="uf-picture"></Icon>
	                    <div className="name">picture</div>
	                    <div className="fontclass">.uf-picture</div>
	                </li>

	                <li>
	                    <Icon type="uf-play"></Icon>
	                    <div className="name">play-sign</div>
	                    <div className="fontclass">.uf-play</div>
	                </li>

	                <li>
	                    <Icon type="uf-play-o"></Icon>
	                    <div className="name">play-video-button</div>
	                    <div className="fontclass">.uf-play-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-qm-c"></Icon>
	                    <div className="name">
							question-mark-on-a-circular-black-background
	                    </div>
	                    <div className="fontclass">.uf-qm-c</div>
	                </li>

	                <li>
	                    <Icon type="uf-qm"></Icon>
	                    <div className="name">question-sign</div>
	                    <div className="fontclass">.uf-qm</div>
	                </li>

	                <li>
	                    <Icon type="uf-navmenu-light"></Icon>
	                    <div className="name">reorder-option</div>
	                    <div className="fontclass">.uf-navmenu-light</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-settings"></Icon>
						 <div className="name">settings</div>
						 <div className="fontclass">.uf-settings</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-cart"></Icon>
	                    <div className="name">shopping-cart-black-shape</div>
	                    <div className="fontclass">.uf-cart</div>
	                </li>

	                <li>
	                    <Icon type="uf-histogram"></Icon>
	                    <div className="name">signal-bars</div>
	                    <div className="fontclass">.uf-histogram</div>
	                </li>

	                <li>
	                    <Icon type="uf-finetune"></Icon>
	                    <div className="name">sort-arrows-couple-pointing-up-and-down</div>
	                    <div className="fontclass">.uf-finetune</div>
	                </li>

	                <li>
	                    <Icon type="uf-sortup"></Icon>
	                    <div className="name">
							sort-by-attributes-interface-button-option
	                    </div>
	                    <div className="fontclass">.uf-sortup</div>
	                </li>

	                <li>
	                    <Icon type="uf-sortdown"></Icon>
	                    <div className="name">sort-by-attributes</div>
	                    <div className="fontclass">.uf-sortdown</div>
	                </li>

	                <li>
	                    <Icon type="uf-sort19"></Icon>
	                    <div className="name">sort-by-numeric-order</div>
	                    <div className="fontclass">.uf-sort19</div>
	                </li>

	                <li>
	                    <Icon type="uf-sort91"></Icon>
	                    <div className="name">sort-by-order</div>
	                    <div className="fontclass">.uf-sort91</div>
	                </li>

	                <li>
	                    <Icon type="uf-za"></Icon>
	                    <div className="name">sort-reverse-alphabetical-order</div>
	                    <div className="fontclass">.uf-za</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-star-o"></Icon>
						 <div className="name">star-1</div>
						 <div className="fontclass">.uf-star-o</div>
					 </li>

					 <li>
						 <Icon type="uf-star-2"></Icon>
						 <div className="name">star-half-empty</div>
						 <div className="fontclass">.uf-star-2</div>
					 </li>

					 <li>
						 <Icon type="uf-star"></Icon>
						 <div className="name">star</div>
						 <div className="fontclass">.uf-star</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-luggage"></Icon>
	                    <div className="name">suitcase-with-white-details</div>
	                    <div className="fontclass">.uf-luggage</div>
	                </li>

	                <li>
	                    <Icon type="uf-table"></Icon>
	                    <div className="name">table-grid</div>
	                    <div className="fontclass">.uf-table</div>
	                </li>

	                <li>
	                    <Icon type="uf-tel"></Icon>
	                    <div className="name">telephone-handle-silhouette</div>
	                    <div className="fontclass">.uf-tel</div>
	                </li>

	                <li>
	                    <Icon type="uf-tel-s"></Icon>
	                    <div className="name">telephone-symbol-button</div>
	                    <div className="fontclass">.uf-tel-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-terminal"></Icon>
	                    <div className="name">terminal</div>
	                    <div className="fontclass">.uf-terminal</div>
	                </li>

	                <li>
	                    <Icon type="uf-file"></Icon>
	                    <div className="name">text-file-1</div>
	                    <div className="fontclass">.uf-file</div>
	                </li>

	                <li>
	                    <Icon type="uf-file-o"></Icon>
	                    <div className="name">text-file</div>
	                    <div className="fontclass">.uf-file-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-3dot-h"></Icon>
	                    <div className="name">three-small-square-shapes</div>
	                    <div className="fontclass">.uf-3dot-h</div>
	                </li>

	                <li>
	                    <Icon type="uf-time-c-o"></Icon>
	                    <div className="name">time</div>
	                    <div className="fontclass">.uf-time-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-upload"></Icon>
	                    <div className="name">upload</div>
	                    <div className="fontclass">.uf-upload</div>
	                </li>

	                <li>
	                    <Icon type="uf-3dot-v"></Icon>
	                    <div className="name">vertical-ellipsis</div>
	                    <div className="fontclass">.uf-3dot-v</div>
	                </li>

	                <li>
	                    <Icon type="uf-rmb"></Icon>
	                    <div className="name">yen-symbol</div>
	                    <div className="fontclass">.uf-rmb</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-c-o-up"></Icon>
	                    <div className="name">箭头</div>
	                    <div className="fontclass">.uf-arrow-c-o-up</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-reject-2"></Icon>
						 <div className="name">驳回</div>
						 <div className="fontclass">.uf-reject-2</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-barcode"></Icon>
	                    <div className="name">barcode-1</div>
	                    <div className="fontclass">.uf-barcode</div>
	                </li>

	                <li>
	                    <Icon type="uf-zoom-out"></Icon>
	                    <div className="name">zoom-out</div>
	                    <div className="fontclass">.uf-zoom-out</div>
	                </li>

	                <li>
	                    <Icon type="uf-exc-t-o"></Icon>
	                    <div className="name">三角叹号</div>
	                    <div className="fontclass">.uf-exc-t-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-pass"></Icon>
	                    <div className="name">通过</div>
	                    <div className="fontclass">.uf-pass</div>
	                </li>

	                <li>
	                    <Icon type="uf-flow"></Icon>
	                    <div className="name">关系网络</div>
	                    <div className="fontclass">.uf-flow</div>
	                </li>

	                <li>
	                    <Icon type="uf-add-c"></Icon>
	                    <div className="name">加</div>
	                    <div className="fontclass">.uf-add-c</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-c-o-right-2"></Icon>
	                    <div className="name">箭头</div>
	                    <div className="fontclass">.uf-arrow-c-o-right-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-shelf-on"></Icon>
	                    <div className="name">上架</div>
	                    <div className="fontclass">.uf-shelf-on</div>
	                </li>

	                <li>
	                    <Icon type="uf-shelf-off"></Icon>
	                    <div className="name">下架</div>
	                    <div className="fontclass">.uf-shelf-off</div>
	                </li>

	                <li>
	                    <Icon type="uf-file-o-2"></Icon>
	                    <div className="name">文件</div>
	                    <div className="fontclass">.uf-file-o-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-truck-o"></Icon>
	                    <div className="name">到货确认</div>
	                    <div className="fontclass">.uf-truck-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-super"></Icon>
	                    <div className="name">功能强大</div>
	                    <div className="fontclass">.uf-super</div>
	                </li>

	                <li>
	                    <Icon type="uf-equipment"></Icon>
	                    <div className="name">设备</div>
	                    <div className="fontclass">.uf-equipment</div>
	                </li>

	                <li>
	                    <Icon type="uf-arrow-c-o-left-2"></Icon>
	                    <div className="name">箭头</div>
	                    <div className="fontclass">.uf-arrow-c-o-left-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-files-o"></Icon>
	                    <div className="name">资源文件</div>
	                    <div className="fontclass">.uf-files-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-cloud-o"></Icon>
	                    <div className="name">云</div>
	                    <div className="fontclass">.uf-cloud-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-rmb-s-o-2"></Icon>
	                    <div className="name">对账</div>
	                    <div className="fontclass">.uf-rmb-s-o-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-3dot-c-o"></Icon>
	                    <div className="name">管理中心</div>
	                    <div className="fontclass">.uf-3dot-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-dafeng"></Icon>
	                    <div className="name">天气_大风</div>
	                    <div className="fontclass">.uf-dafeng</div>
	                </li>

	                <li>
	                    <Icon type="uf-baoxue"></Icon>
	                    <div className="name">天气_暴雪</div>
	                    <div className="fontclass">.uf-baoxue</div>
	                </li>

	                <li>
	                    <Icon type="uf-bingbao"></Icon>
	                    <div className="name">天气_冰雹</div>
	                    <div className="fontclass">.uf-bingbao</div>
	                </li>

	                <li>
	                    <Icon type="uf-fengbao"></Icon>
	                    <div className="name">天气_风暴</div>
	                    <div className="fontclass">.uf-fengbao</div>
	                </li>

	                <li>
	                    <Icon type="uf-xiaoyu"></Icon>
	                    <div className="name">天气_小雨</div>
	                    <div className="fontclass">.uf-xiaoyu</div>
	                </li>

	                <li>
	                    <Icon type="uf-zhenxue"></Icon>
	                    <div className="name">天气_阵雪</div>
	                    <div className="fontclass">.uf-zhenxue</div>
	                </li>

	                <li>
	                    <Icon type="uf-zhongyu"></Icon>
	                    <div className="name">天气_中雨</div>
	                    <div className="fontclass">.uf-zhongyu</div>
	                </li>

	                <li>
	                    <Icon type="uf-es"></Icon>
	                    <div className="name">ES</div>
	                    <div className="fontclass">.uf-es</div>
	                </li>

	                <li>
	                    <Icon type="uf-flow-o-2"></Icon>
	                    <div className="name">流程</div>
	                    <div className="fontclass">.uf-flow-o-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-activate-2"></Icon>
	                    <div className="name">激活-01</div>
	                    <div className="fontclass">.uf-activate-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-flow-o"></Icon>
	                    <div className="name">流程</div>
	                    <div className="fontclass">.uf-flow-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-bulb-2"></Icon>
	                    <div className="name">技术支持</div>
	                    <div className="fontclass">.uf-bulb-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-mi-c"></Icon>
	                    <div className="name">必填</div>
	                    <div className="fontclass">.uf-mi-c</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-top-up"></Icon>
						 <div className="name">返回顶部</div>
						 <div className="fontclass">.uf-top-up</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-creditcard"></Icon>
	                    <div className="name">credit-card</div>
	                    <div className="fontclass">.uf-creditcard</div>
	                </li>

	                <li>
	                    <Icon type="uf-align-center"></Icon>
	                    <div className="name">align-center</div>
	                    <div className="fontclass">.uf-align-center</div>
	                </li>

	                <li>
	                    <Icon type="uf-align-justify"></Icon>
	                    <div className="name">align-justify</div>
	                    <div className="fontclass">.uf-align-justify</div>
	                </li>

	                <li>
	                    <Icon type="uf-align-left"></Icon>
	                    <div className="name">align-left</div>
	                    <div className="fontclass">.uf-align-left</div>
	                </li>

	                <li>
	                    <Icon type="uf-align-right"></Icon>
	                    <div className="name">align-right</div>
	                    <div className="fontclass">.uf-align-right</div>
	                </li>

	                <li>
	                    <Icon type="uf-ju-c-o"></Icon>
	                    <div className="name">拒</div>
	                    <div className="fontclass">.uf-ju-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-truck"></Icon>
	                    <div className="name">货到付款</div>
	                    <div className="fontclass">.uf-truck</div>
	                </li>

	                <li>
	                    <Icon type="uf-setting-c-o"></Icon>
	                    <div className="name">流程</div>
	                    <div className="fontclass">.uf-setting-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-users-o"></Icon>
	                    <div className="name">楼宇图标_用户组</div>
	                    <div className="fontclass">.uf-users-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-bag-s-o"></Icon>
	                    <div className="name">商品</div>
	                    <div className="fontclass">.uf-bag-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-cai-s"></Icon>
	                    <div className="name">采购</div>
	                    <div className="fontclass">.uf-cai-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-listcheck"></Icon>
	                    <div className="name">定标</div>
	                    <div className="fontclass">.uf-listcheck</div>
	                </li>

	                <li>
	                    <Icon type="uf-users"></Icon>
	                    <div className="name">群</div>
	                    <div className="fontclass">.uf-users</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-i-c"></Icon>
						 <div className="name">查看详情</div>
						 <div className="fontclass">.uf-i-c</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-building-o"></Icon>
	                    <div className="name">企业信息</div>
	                    <div className="fontclass">.uf-building-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-rmb-s-o"></Icon>
	                    <div className="name">报价管理</div>
	                    <div className="fontclass">.uf-rmb-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-reject"></Icon>
	                    <div className="name">已驳回</div>
	                    <div className="fontclass">.uf-reject</div>
	                </li>

	                <li>
	                    <Icon type="uf-9dot"></Icon>
	                    <div className="name">菜单</div>
	                    <div className="fontclass">.uf-9dot</div>
	                </li>

	                {/* <li>
	                    <Icon type="uf-loadingstate"></Icon>
	                    <div className="name">loading</div>
	                    <div className="fontclass">.uf-loadingstate</div>
	                </li> */}

	                <li>
	                    <Icon type="uf-gateway"></Icon>
	                    <div className="name">网关</div>
	                    <div className="fontclass">.uf-gateway</div>
	                </li>

	                <li>
	                    <Icon type="uf-ticket-s-o"></Icon>
	                    <div className="name">发票</div>
	                    <div className="fontclass">.uf-ticket-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-userset"></Icon>
	                    <div className="name">管理中心</div>
	                    <div className="fontclass">.uf-userset</div>
	                </li>

	                <li>
	                    <Icon type="uf-puzzle-o"></Icon>
	                    <div className="name">组件</div>
	                    <div className="fontclass">.uf-puzzle-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-box-o"></Icon>
	                    <div className="name">物料管理</div>
	                    <div className="fontclass">.uf-box-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-bulb"></Icon>
	                    <div className="name">激活</div>
	                    <div className="fontclass">.uf-bulb</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-exc-t"></Icon>
						 <div className="name">感叹号_icon</div>
						 <div className="fontclass">.uf-exc-t</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-rmb-c"></Icon>
	                    <div className="name">报价</div>
	                    <div className="fontclass">.uf-rmb-c</div>
	                </li>

	                <li>
	                    <Icon type="uf-table-s-o"></Icon>
	                    <div className="name">发票</div>
	                    <div className="fontclass">.uf-table-s-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-umbrella-o"></Icon>
	                    <div className="name">伞</div>
	                    <div className="fontclass">.uf-umbrella-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-dropbox"></Icon>
	                    <div className="name">dropbox</div>
	                    <div className="fontclass">.uf-dropbox</div>
	                </li>

	                <li>
	                    <Icon type="uf-search-light"></Icon>
	                    <div className="name">搜索-搜索</div>
	                    <div className="fontclass">.uf-search-light</div>
	                </li>

	                <li>
	                    <Icon type="uf-cart-o"></Icon>
	                    <div className="name">shopping-cart-black-shape</div>
	                    <div className="fontclass">.uf-cart-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-kero-col"></Icon>
	                    <div className="name">kero</div>
	                    <div className="fontclass">.uf-kero-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-uba-col"></Icon>
	                    <div className="name">uba</div>
	                    <div className="fontclass">.uf-uba-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-tinperzc-col"></Icon>
	                    <div className="name">tinperzc</div>
	                    <div className="fontclass">.uf-tinperzc-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-tinperzch-col"></Icon>
	                    <div className="name">tinperzch</div>
	                    <div className="fontclass">.uf-tinperzch-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-iuap-col"></Icon>
	                    <div className="name">iuap</div>
	                    <div className="fontclass">.uf-iuap-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-iuapdesign-col"></Icon>
	                    <div className="name">iuapdesignz</div>
	                    <div className="fontclass">.uf-iuapdesign-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-bee-col"></Icon>
	                    <div className="name">bee</div>
	                    <div className="fontclass">.uf-bee-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-neoui-col"></Icon>
	                    <div className="name">neoui</div>
	                    <div className="fontclass">.uf-neoui-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-sparrow-col"></Icon>
	                    <div className="name">sparrow</div>
	                    <div className="fontclass">.uf-sparrow-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-tinpercn-col"></Icon>
	                    <div className="name">tinpercn</div>
	                    <div className="fontclass">.uf-tinpercn-col</div>
	                </li>

	                <li>
	                    <Icon type="uf-tinperen-col"></Icon>
	                    <div className="name">tinperen</div>
	                    <div className="fontclass">.uf-tinperen-col</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-arrow-up"></Icon>
						 <div className="name">angle-arrow-down</div>
						 <div className="fontclass">.uf-arrow-up</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-mailsym"></Icon>
	                    <div className="name">webmail</div>
	                    <div className="fontclass">.uf-mailsym</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-print"></Icon>
						 <div className="name">办公用品</div>
						 <div className="fontclass">.uf-print</div>
					 </li> */}

	                <li>
	                    <Icon type="uf-ticket-3"></Icon>
	                    <div className="name">报销</div>
	                    <div className="fontclass">.uf-ticket-3</div>
	                </li>

	                <li>
	                    <Icon type="uf-loan"></Icon>
	                    <div className="name">借款</div>
	                    <div className="fontclass">.uf-loan</div>
	                </li>

	                <li>
	                    <Icon type="uf-ticket-2"></Icon>
	                    <div className="name">凭证中心</div>
	                    <div className="fontclass">.uf-ticket-2</div>
	                </li>

	                <li>
	                    <Icon type="uf-offwork"></Icon>
	                    <div className="name">请假</div>
	                    <div className="fontclass">.uf-offwork</div>
	                </li>

	                <li>
	                    <Icon type="uf-todolist"></Icon>
	                    <div className="name">待办</div>
	                    <div className="fontclass">.uf-todolist</div>
	                </li>

	                <li>
	                    <Icon type="uf-personin"></Icon>
	                    <div className="name">员工入职</div>
	                    <div className="fontclass">.uf-personin</div>
	                </li>

	                <li>
	                    <Icon type="uf-ticket"></Icon>
	                    <div className="name">票务</div>
	                    <div className="fontclass">.uf-ticket</div>
	                </li>

	                <li>
	                    <Icon type="uf-linechart"></Icon>
	                    <div className="name">小icon-图表</div>
	                    <div className="fontclass">.uf-linechart</div>
	                </li>

	                <li>
	                    <Icon type="uf-4leaf"></Icon>
	                    <div className="name">应用中心</div>
	                    <div className="fontclass">.uf-4leaf</div>
	                </li>

	                <li>
	                    <Icon type="uf-listset"></Icon>
	                    <div className="name">信息维护</div>
	                    <div className="fontclass">.uf-listset</div>
	                </li>

	                <li>
	                    <Icon type="uf-qi-c-o"></Icon>
	                    <div className="name">企业认证</div>
	                    <div className="fontclass">.uf-qi-c-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-exc-c"></Icon>
	                    <div className="name">叹号</div>
	                    <div className="fontclass">.uf-exc-c</div>
	                </li>

	                <li>
	                    <Icon type="uf-code"></Icon>
	                    <div className="name">集成开发</div>
	                    <div className="fontclass">.uf-code</div>
	                </li>

	                <li>
	                    <Icon type="uf-plug-o"></Icon>
	                    <div className="name">热拔插</div>
	                    <div className="fontclass">.uf-plug-o</div>
	                </li>

	                <li>
	                    <Icon type="uf-search-s"></Icon>
	                    <div className="name">搜索</div>
	                    <div className="fontclass">.uf-search-s</div>
	                </li>

	                <li>
	                    <Icon type="uf-treeadd"></Icon>
	                    <div className="name">tree-new-sbling-node</div>
	                    <div className="fontclass">.uf-treeadd</div>
	                </li>

	                {/* <li>
						 <Icon type="uf-mi"></Icon>
						 <div className="name">必填</div>
						 <div className="fontclass">.uf-mi</div>
					 </li> */}
	                <li>
	                    <Icon type="uf-treeline-copy"></Icon>
	                    <div className="name">树形线</div>
	                    <div className="fontclass">.uf-treeline-copy</div>
	                </li>
	                <li>
	                    <Icon type="uf-listwithdots"></Icon>
	                    <div className="name">列表项</div>
	                    <div className="fontclass">.uf-listwithdots</div>
	                </li>
	                <li>
	                    <Icon type="uf-gridlogo"></Icon>
	                    <div className="name">Grid</div>
	                    <div className="fontclass">.uf-gridlogo</div>
	                </li>
	                <li>
	                    <Icon type="uf-magnifyingglass"></Icon>
	                    <div className="name">搜索</div>
	                    <div className="fontclass">.uf-magnifyingglass</div>
	                </li>
	                {/* <li>
						 <Icon type="uf-anglearrowdown"></Icon>
						 <div className="name">向下箭头</div>
						 <div className="fontclass">.uf-anglearrowdown</div>
					 </li> */}
	                <li>
	                    <Icon type="uf-yongyouyunchnen"></Icon>
	                    <div className="name">用友云（小）</div>
	                    <div className="fontclass">.uf-yongyouyunchnen</div>
	                </li>
	                <li>
	                    <Icon type="uf-yycloud"></Icon>
	                    <div className="name">用友云</div>
	                    <div className="fontclass">.uf-yycloud</div>
	                </li>
	                <li>
	                    <Icon type="uf-funnel-o"></Icon>
	                    <div className="name">筛选</div>
	                    <div className="fontclass">.uf-funnel-o</div>
	                </li>
	                <li>
	                    <Icon type="uf-filter"></Icon>
	                    <div className="name">过滤</div>
	                    <div className="fontclass">.uf-filter</div>
	                </li>
	                <li>
	                    <Icon type="uf-filterno"></Icon>
	                    <div className="name">取消过滤</div>
	                    <div className="fontclass">.uf-filterno</div>
	                </li>
	                <li>
	                    <Icon type="uf-clean"></Icon>
	                    <div className="name">橡皮擦</div>
	                    <div className="fontclass">.uf-clean</div>
	                </li>
	                <li>
	                    <Icon type="uf-save"></Icon>
	                    <div className="name">保存</div>
	                    <div className="fontclass">.uf-save</div>
	                </li>
	                {/* <li>
						 <Icon type="uf-export"></Icon>
						 <div className="name">导出</div>
						 <div className="fontclass">.uf-export</div>
					 </li>
					 <li>
						 <Icon type="uf-import"></Icon>
						 <div className="name">导入</div>
						 <div className="fontclass">.uf-import</div>
					 </li> */}
	                <li>
	                    <Icon type="uf-stop-c"></Icon>
	                    <div className="name">stop-c</div>
	                    <div className="fontclass">.uf-stop-c</div>
	                </li>
	                <li>
	                    <Icon type="uf-rubber"></Icon>
	                    <div className="name">橡皮擦</div>
	                    <div className="fontclass">.uf-rubber</div>
	                </li>
	                <li>
	                    <Icon type="uf-bediting"></Icon>
	                    <div className="name">批次编辑</div>
	                    <div className="fontclass">.uf-bediting</div>
	                </li>
	            </ul>
	        </div>
	    );
	}
}

export default Demo1;
