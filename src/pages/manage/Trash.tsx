import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import styles from './common.module.scss'

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


const TableElem = (
  <>
  </>
)

const Trash: FC = () => {
  useTitle('问卷 - 回收站')
  const [questionList] = useState(rawQuestionList)
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
        {questionList.length > 0 && TableElem}
      </div>
    </>
  )
}

export default Trash
