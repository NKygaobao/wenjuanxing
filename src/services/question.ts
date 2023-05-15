import { AxiosResponse } from 'axios'
import request from '../utils/axiosUtil'

enum Api {
  GetQuestionService = '/api/question/',
}

type RegisterServiceParams = {
  username: string
  password: string
  nickname: string
}

export const getQuestionService = (id: number) => {
  return request.get(`${Api.GetQuestionService}/${id}`, false)
}
