import classnames from 'classnames';

export function getAlignCls (cls, horAlign, verAlign) {
  return classnames(cls, {
    [`${cls}-align-left`]: horAlign === 'left',
    [`${cls}-align-center`]: horAlign === 'center',
    [`${cls}-align-right`]: horAlign === 'right',
    [`${cls}-ver-top`]: verAlign === 'top',
    [`${cls}-ver-middle`]: verAlign === 'middle',
    [`${cls}-ver-bottom`]: verAlign === 'bottom'
  });
}
