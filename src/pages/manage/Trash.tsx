import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Typography, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { useRequest } from 'ahooks'
import styles from './common.module.scss'
import ListSearch from '../../components/ListSearch'
import { updateQuestionService, deleteQuestionsService } from '../../services/question'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
const { confirm } = Modal
const { Title } = Typography

const Trash: FC = () => {
  useTitle('问卷 - 回收站')
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total } = data

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
      onOk: deleteQuestion,
    })
  }

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功')
        refresh() // 手动刷新列表
        setSelectedIds([])
      },
    }
  )
  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectedIds([])
      },
    }
  )

  const tableElem = (
    <>
      <Space style={{ marginBottom: '15px' }}>
        <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
          恢复
        </Button>
        <Button danger onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowkeys => {
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
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <div>
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </div>
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && tableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
