const { name } = require('../package.json');

module.exports = {
  code: name,
  name,
  version: '1.0.0',
  // domainKey: "", // default: iuap-yonbuilder-designer
  keywords: [name, 'library'],
  description: 'TinperM组件包',
  terminalType: 1, // 0:pc, 1:mobile
  group: [
    {
      id: 'baseGroup',
      name: '基础组件',
      children: [
        'Button'
      ]
    }
  ]
};
