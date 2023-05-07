import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Space, Tag, Button, Divider, Modal, Popconfirm } from 'antd'
import {
  StarOutlined,
  EditOutlined,
  LineChartOutlined,
  ExclamationCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons'

const { confirm } = Modal

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStart: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStart } = props

  const deleteQuestion = () => {}
  const onDel = () => {
    confirm({
      title: '确定删除该问卷吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStart && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
            >
              问卷统计
            </Button>
            <Button
              icon={<StarOutlined />}
              type="text"
              size="small"
              onClick={onDel}
            >
              删除问卷
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="text" icon={<StarOutlined />} size="small">
              {isStart ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              // onConfirm={duplicate}
            >
              <Button
                type="text"
                icon={<CopyOutlined />}
                size="small"
                // disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Button>删除</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
