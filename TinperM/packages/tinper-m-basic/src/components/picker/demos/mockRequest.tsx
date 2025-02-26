import { basicColumns } from './columns-data'

export async function mockRequest({ delay }: { delay: number }) {
  await new Promise(resolve => setTimeout(resolve, delay))
  return basicColumns
}
