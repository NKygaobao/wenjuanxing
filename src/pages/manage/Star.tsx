import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
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

const Star: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据"></Empty>}
        {questionList.length > 0 &&
          questionList.map((question) => {
            return <QuestionCard key={question._id} {...question}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}

export default Star
