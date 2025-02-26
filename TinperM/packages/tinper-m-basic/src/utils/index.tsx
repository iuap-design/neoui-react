export const decodeValue = (value: string, formatReg: string, hiddenChart = '*', replaceChart = '#') => {
  if (!formatReg) {
    return value
  }
  const formatRegArr = formatReg.split('')
  const valueArr = String(value).split('')
  let newValue = []
  for (let index = 0; index < formatRegArr.length; index++) {
    const element = formatRegArr[index]

    if (element === replaceChart) {
      const cell = valueArr.shift()
      if (!cell) break
      newValue.push(cell)
    } else if (element === hiddenChart) {
      const cell = valueArr.shift()
      if (!cell) break
      newValue.push(hiddenChart)
    } else {
      newValue.push(element)
    }
  }
  if (valueArr.length > 0) {
    newValue = newValue.concat(valueArr)
  }
  return newValue.join('')
}
