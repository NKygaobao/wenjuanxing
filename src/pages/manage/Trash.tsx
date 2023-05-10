import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Typography, Table, Tag, Button, Space, Modal } from 'antd'
import styles from './common.module.scss'
import {
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
const { confirm } = Modal
const { Title } = Typography
const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStart: true,
    answerCount: 4,
    createdAt: '2月10 12:22',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStart: true,
    answerCount: 4,
    createdAt: '1月10 12:22',
  },
]

const Trash: FC = () => {
  useTitle('问卷 - 回收站')
  const [questionList, setQuestionList] = useState(rawQuestionList)
  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return (
          <Tag color={isPublished ? 'processing' : 'red'}>
            {isPublished ? '已经发布' : '未发布'}
          </Tag>
        )
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  const del = () => {
    confirm({
      title: '确定彻底删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不能找回',
      cancelText: '取消',
      okText: '确定',
      onOk() {},
    })
  }
  const tableElem = (
    <>
      <Space style={{ marginBottom: '15px' }}>
        <Button type="primary" disabled={selectedIds.length === 0}>
          恢复
        </Button>
        <Button danger onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowkeys) => {
            setSelectedIds(selectedRowkeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && tableElem}
      </div>
    </>
  )
}

export default Trash
