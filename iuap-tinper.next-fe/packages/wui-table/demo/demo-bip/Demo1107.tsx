/**
 *
 * @title 图片在表格中的展示
 * @parent 扩展行 Expanded Row
 * @description 根据图片高度自动撑开行高，可结合图片查看器使用 http://design.yonyoucloud.com/tinper-bee/bee-viewer,  注：如果图片在固定列中，可以使用heightConsistent属性，当此属性为true，就不会出现错行问题
 * @type bip
 * demo1107
 */

import { Table, TableProps } from "@tinper/next-ui";
import React, {Component} from "react";

const columns: TableProps['columns'] = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 80,
        render(_text: any, _record: Record<string, any>, index: number) {
            return index + 1;
        }
    },
    {
        title: "图样",
        dataIndex: "picture",
        key: "picture",
        render(text:any, _record: Record<string, any>, _index: number) {
            return <img style={{height: '35px'}} src={text} alt="Picture"/>
        }
    },
    {
        title: "组织部门",
        dataIndex: "orgDept",
        key: "orgDept",
        width: 100,
    },
    {
        title: "设施管理部门",
        dataIndex: "facilityManageUnit",
        key: "facilityManageUnit",
        width: 150,
    },
    {
        title: "案卷编号",
        dataIndex: "docketnum",
        key: "docketnum",
        width: 100,
    },
    {
        title: "数量",
        dataIndex: "num",
        key: "num",
        width: 100,
    },
    {
        title: "首次发现时间",
        dataIndex: "discoveryTime",
        key: "discoveryTime",
        width: 150,
    },
    {
        title: "实际修复时间",
        dataIndex: "repairTime",
        key: "repairTime",
        width: 150,
    }
];

const data: TableProps['data'] = [
    {
        key: "1",
        orgDept: "组织1",
        facilityManageUnit: "部门1",
        docketnum: 41,
        num: "1",
        discoveryTime: "2018-10-17",
        repairTime: "2018-10-30",
        picture: "http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg"
    },
    {
        key: "2",
        orgDept: "组织2",
        facilityManageUnit: "部门2",
        docketnum: 30,
        num: "2",
        discoveryTime: "2019-01-15",
        repairTime: "2019-01-20",
        picture: "http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-2-min.jpg"
    },
    {
        key: "3",
        orgDept: "组织3",
        facilityManageUnit: "部门3",
        docketnum: 35,
        num: "3",
        discoveryTime: "2019-04-10",
        repairTime: "2019-04-17",
        picture: "http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-3-min.jpg"
    }
];

class Demo1107 extends Component {
    render() {
        return (
            <Table
                columns={columns}
                data={data}
            />
        );
    }
}

export default Demo1107;
