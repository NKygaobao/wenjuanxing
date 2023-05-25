import { message } from 'antd'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios'
import { USER_TOKEN } from '../constant'
import { getLocalStorage } from './localStorage'
const SERVER_ERR = '请求服务器的网址错误或网络连接失败'

interface AxiosRequestConfig_ extends AxiosRequestConfig {
  // isMock 并不存在 AxiosRequestConfig 里面
  isMock: boolean
}
type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
const methods: Method[] = ['get', 'post', 'put', 'delete', 'patch']
type ReqFn = (url: string, isMock: boolean, data?: any, params?: any) => AxiosPromise<any>
type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}
export type ResDataType = {
  [key: string]: any
}
interface ReqExecute {
  get: ReqFn
  post: ReqFn
  put: ReqFn
  delete: ReqFn
  patch: ReqFn
}

class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil()
  axiosInstance!: AxiosInstance
  request!: ReqExecute
  constructor() {
    this.request = {
      get: (): any => {},
      post: (): any => {},
      delete: (): any => {},
      patch: (): any => {},
      put: (): any => {},
    }
    this.createAxiosInstance()
    this.beforeReqIntercpt()
    this.beforeResponseIntercpt()
    this.reqPrepare()
  }
  createAxiosInstance() {
    this.axiosInstance = axios.create({
      timeout: 150000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // 'Content-Type': 'application/json;charset=utf-8'
      },
    })
  }
  /** 1.请求开始之前的请求拦截 */
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use(
      request => {
        request.headers['Authorization'] = `Bearer ${getLocalStorage(USER_TOKEN)}` // JWT 的固定格式
        return request
      },
      error => Promise.reject(error)
    )
  }
  /** 2.数据响应之前的响应拦截器 */
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use(
      response => {
        const resData = (response.data || {}) as ResType
        console.log(resData)

        const { errno, data, msg } = resData
        if (errno !== 0) {
          if (msg) {
            message.error(msg)
          }
          throw new Error(msg)
        }
        return data as any
      },
      err => {
        throw new Error(err.message || SERVER_ERR)
      }
    )
  }
  /** 3.发送请求给服务器 get post put delete patch */
  sendRequest(options: AxiosRequestConfig_) {
    this.axiosInstance.defaults.baseURL = '/api'
    return this.axiosInstance(options) // 返回一个 AxiosPromise<any> 对象
  }
  /** 4.深入灵活应用 TS 完成请求method类型自动提示*/
  reqPrepare() {
    return methods.forEach(method => {
      this.request[method] = (url, isMock, data, params) => {
        const config = {
          url,
          isMock,
          method,
          data,
          params,
        }
        if (method === 'get') {
          config.params = data
          delete config.data
        }
        return this.sendRequest(config)
      }
    })
  }
}

export default AxiosUtil.axiosUtil.request
