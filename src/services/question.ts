import { AxiosResponse } from 'axios'
import request, { ResDataType } from '../utils/axiosUtil'

enum Api {
  GetQuestionService = 'question/',
  CreateQuestion = 'question/',
}

type RegisterServiceParams = {
  username: string
  password: string
  nickname: string
}

// 获取单个问卷信息
export const getQuestionService = (id: number | string) => {
  return request.get(`${Api.GetQuestionService}/${id}`, false)
}
// 创建问卷
export const createQuestionService = async () => {
  return (await request.post(Api.CreateQuestion, false)) as ResDataType
}
