import React, { FC, useEffect, useState } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import styles from './Login.module.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { REGISTER_PATHNAME } from '../router'
import { setLocalStorage, removeLocalStorage, getLocalStorage } from '../utils/localStorage'
const { Title } = Typography

const USER_NAME_PWD = 'USER_NAME_PWD'
const rememberUser = (value: any) => {
  setLocalStorage('USER_NAME_PWD', value)
}
const deleteUserFromStorage = () => {
  removeLocalStorage(USER_NAME_PWD)
}
const getUserInfoFromStorage = () => {
  return getLocalStorage(USER_NAME_PWD) as { username: string; password: number }
}

const Login: FC = () => {
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    console.log(username, password)

    form.setFieldsValue({ username, password })
  }, [])
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    if (values.remember) {
      rememberUser(values)
    } else {
      deleteUserFromStorage()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
