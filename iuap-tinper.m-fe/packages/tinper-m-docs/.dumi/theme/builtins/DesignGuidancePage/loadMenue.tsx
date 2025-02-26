import axios from 'axios'

const env = process.env.NODE_ENV
enum REQ_TYPE {
  FILE = 1,
  MENU
}

const requestOrigins = env === 'development' ? null : {
  [REQ_TYPE.MENU]: location.origin,
  [REQ_TYPE.FILE]: ''
}

const getRequestUrlByEnv = (url: string, type: REQ_TYPE) => {
  return requestOrigins
    ? `${requestOrigins[type]}${url}`
    : url
}

export const getMenuTree = (cb: (res: any) => void) => {
  const URL = window.location.href.includes('test') ?
    `` :
    getRequestUrlByEnv('', REQ_TYPE.MENU)
  return axios.get(URL,
    // {
    //   params: {
    //     type: 'TinperM-Design'
    //   }
    // }
  )
    .then(function (response) {
      cb?.(response)
    })
    .catch(function (error) {
      cb?.(error)
      console.log(error)
    });
}

export const getYonDesignDocByMenuTree = (menu: string, cb: (res: any) => void) => {
  const URL = window.location.href.includes('test') ?
    `` :
    getRequestUrlByEnv('', REQ_TYPE.MENU)
  return axios.get(URL,
    {
      params: {
        menu
      }
    }
  )
    .then(function (response) {
      cb?.(response)
    })
    .catch(function (error) {
      cb?.(error)
      console.log(error)
    });
}

export const getHtmlContent = (URL: string, cb: (res: any) => void) => {
  const url = getRequestUrlByEnv(URL, REQ_TYPE.FILE)
  return axios.get(url)
    .then(function (response) {
      cb?.(response)
      // console.log(response.data)
    })
    .catch(function (error) {
      cb?.(error)
      console.log(error)
    });
}
