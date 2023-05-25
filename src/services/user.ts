import { AxiosResponse } from 'axios'
import request, { ResDataType } from '../utils/axiosUtil'

enum Api {
  Register = '/user/register',
  LoginService = '/user/login',
  GetUserInfo = '/user/info',
}

type RegisterServiceParams = {
  username: string
  password: string
  nickname: string
}

export const getUserInfoService = async () => {
  return (await request.get(Api.GetUserInfo, false)) as ResDataType
}

export const registerService = ({ username, password, nickname }: RegisterServiceParams) => {
  return request.post(Api.Register, false, {
    username,
    password,
    nickname: nickname || username,
  })
}

export const loginService = (username: string, password: string) => {
  return request.post(Api.LoginService, false, {
    username,
    password,
  }) as ResDataType
}
