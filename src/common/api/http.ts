/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const { CancelToken } = axios
const cancelTokenMap = new Map()

const generateCancelKey = (config: AxiosRequestConfig) => {
  const { url, method, params, data } = config
  const cancelKey = JSON.stringify({ url, method, params, data })
  return cancelKey
}

const addCancelRequest = (config: AxiosRequestConfig) => {
  const cancelKey = generateCancelKey(config)
  config.cancelToken = new CancelToken((cancel) => {
    cancelTokenMap.set(cancelKey, cancel)
  })
}

const removeCancelRequest = (config: AxiosRequestConfig) => {
  const cancelKey = generateCancelKey(config)
  const cancel = cancelTokenMap.get(cancelKey)
  cancel && cancel(cancelKey)
}

axios.interceptors.request.use(
  (config) => {
    // Toast.loading('', 0)
    removeCancelRequest(config)
    addCancelRequest(config)
    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => {
    const cancelKey = generateCancelKey(response.config)
    cancelTokenMap.delete(cancelKey)
    return response
  },
  (error) => {
    if (axios.isCancel(error)) {
      const cancelKey = error.message
      console.log('Request canceled', cancelKey)
    }
    return Promise.resolve(error)
  },
)

// let requestErr = false

const checkStatus = async (response: AxiosResponse) => {
  // !requestErr && Toast.hide()
  if (response && response.status === 200) {
    if (response.data.code === 200) {
      return response.data.data
    }
    const { msg } = response.data
    if (msg) {
      // requestErr = true
      // Toast.info(response.data.msg, 3, () => {
      //   requestErr = false
      // })
    }
    return false
  }
  return false
}

export default class http {
  static post(url: string, data?: object) {
    return axios({
      method: 'post',
      url,
      data,
      timeout: 60000,
    }).then((response) => checkStatus(response))
  }

  static get(url: string, params?: object) {
    return axios({
      method: 'get',
      url,
      params,
      timeout: 60000,
    }).then((response) => checkStatus(response))
  }
}
