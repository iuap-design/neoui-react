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
  price: string
  org: string
}
export interface User {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  age: number;
  birthdate: Date;
  registeredAt: Date;
}

export function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    age: faker.number.int({ min: 18, max: 60 }),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export function createRandomOrder(): Order {
  return {
    orderId: faker.string.uuid(),
    providerName: faker.lorem.word(),
    transactionType: TransactionType.Common,
    price: faker.number.float({min: 99, max: 999, multipleOf: 2}).toString(),
    org: faker.lorem.word({ length: { min: 4, max: 8}}),
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

export function makeOrderData() {
  return makeData(createRandomOrder, 1000)
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
