import { AxiosResponse } from 'axios'
import request from '../utils/axiosUtil'

enum Api {
  Register = '/user/register',
}

type RegisterServiceParams = {
  username: string
  password: string
  nickname: string
}

export const registerService = ({ username, password, nickname }: RegisterServiceParams) => {
  return request.post(Api.Register, false, {
    username,
    password,
    nickname: nickname || username,
  })
}
