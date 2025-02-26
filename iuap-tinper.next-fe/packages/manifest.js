const { name, version } = require('../next-ui-library/package.json');

module.exports = {
    yprCode: 'iuap-tinper.next-fe',
    code: name,
    name,
    version,
    // domainKey: "", // default: iuap-yonbuilder-designer
    keywords: [name, "library"],
    description: "TinperNext基础组件",
    terminalType: 0, // 0:pc, 1:mobile
    group: [
        {
            id: "baseGroup",
            name: "基础组件",
            children: [
                "Table"
            ]
        }
    ]
};
