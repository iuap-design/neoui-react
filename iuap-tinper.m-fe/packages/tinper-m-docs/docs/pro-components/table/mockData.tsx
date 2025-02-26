import { faker } from '@faker-js/faker';
import { sleep } from '@utils/Sleeps'

enum TransactionType {
  Common,
  Normal,
  Emergency
}
export interface Order {
  orderId: string
  providerName: string
  transactionType: TransactionType
  price: number
  org: string
}

export function createRandomOrder(): Order {
  return {
    orderId: `NU${faker.lorem.word(5).toUpperCase()}`,
    providerName: faker.person.firstName(),
    providerNameGroup: ['ProviderA', 'ProviderB', 'ProviderC'][Math.floor(Math.random()*10 % 3)] ,
    transactionType: Math.floor(Math.random()*10 % 3),
    price: faker.commerce.price(),
    org: faker.company.name()
  };
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export function makeData(dataCreater, ...lens: number[]) {
  const makeDataLevel = (depth = 0): User[] => {
    const len = lens[depth]!
    return range(len).map((d): User => {
      return {
        ...dataCreater(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

export function makeOrderData(size = [1000, 3, 2]) {
  return makeData(createRandomOrder, ...size)
}


let count = 0
export async function mockRequest() {
  if (count >= 5) {
    return []
  }
  await sleep(100)
  count++
  return makeData(createRandomOrder, 100,3,2)
}
