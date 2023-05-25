import React, { FC } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { removeLocalStorage } from '../utils/localStorage'
import { USER_TOKEN } from '../constant'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const { data = {} } = useRequest(getUserInfoService)
  const { nickname } = data

  const logout = () => {
    removeLocalStorage(USER_TOKEN)
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  return UserInfo
}

export default UserInfo
