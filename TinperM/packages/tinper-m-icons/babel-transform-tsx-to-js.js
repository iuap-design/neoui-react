module.exports = function () {
  return {
    visitor: {
      ExportNamedDeclaration(path) {
        const source = path.node.source;
        if (source && source.value?.endsWith('.tsx')) {
          source.value = source.value.replace('.tsx', '.js');
        }
      },
    },
  }
}
