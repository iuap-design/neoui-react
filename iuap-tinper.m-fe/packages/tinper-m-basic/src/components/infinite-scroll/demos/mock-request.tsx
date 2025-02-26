import { sleep } from '@utils/Sleeps'
let count = 0

export async function mockRequest() {
  if (count >= 5) {
    return []
  }
  await sleep(2000)
  count++
  return [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
  ]
}

let errorCount = 0
export async function mockErrorRequest() {
  if (errorCount >= 5) {
    return []
  }
  await sleep(2000)
  errorCount++
  if (errorCount % 2 === 0) {
    throw new Error()
  }
  return [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
  ]
}
