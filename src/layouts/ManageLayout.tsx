import React, { FC } from 'react'
// @ts-ignore
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'
import { useRequest } from 'ahooks'
import { createQuestionService } from '../services/question'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
    },
  })
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" onClick={handleCreateClick} icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            icon={<BarsOutlined />}
            size="large"
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            icon={<StarOutlined />}
            size="large"
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.rigth}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ManageLayout
