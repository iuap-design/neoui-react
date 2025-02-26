
const postcss = require('postcss');

module.exports = postcss.plugin('add-direction-to-css', () => {
  return (root, { options }) => {
    root.prepend(
      postcss.rule({
        selector: 'html[dir="rtl"]',
        nodes: [
          postcss.decl({
            prop: 'direction',
            value: 'rtl'
          })
        ]
      })
    );
  };
});