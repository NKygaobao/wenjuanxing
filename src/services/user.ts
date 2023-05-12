import request from '../utils/axiosUtil'

enum Api {
    Register = '/user/register'
}

type RegisterServiceParams = {
    username: string
    password: string
    nickname: string
}

export const registerService = async ({ username, password, nickname }: RegisterServiceParams) => {
    return await request.post(Api.Register, false, { username, password, nickname: nickname || username })
}
