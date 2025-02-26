const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))

export async function mockUpload(file: File) {
  await sleep(3000)
  return {
    url: URL.createObjectURL(file),
  }
}

export async function mockUploadFail() {
  await sleep(3000)
  throw new Error('Fail to upload')
}
