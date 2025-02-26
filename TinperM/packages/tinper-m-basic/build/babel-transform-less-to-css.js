module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path, source) {
        if (path.node.source.value.endsWith('.less')) {
          path.node.source.value = path.node.source.value.replace(
            /\.less$/,
            '.css'
          )
        }
        if (path.node.source.value.endsWith('.map.tsx')) {
          path.node.source.value = path.node.source.value.replace(
            /\.tsx$/,
            '.js'
          )
        }
      },
    },
  }
}
