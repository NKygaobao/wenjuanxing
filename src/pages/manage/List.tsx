import React, { FC, useState } from 'react'
import { Typography } from 'antd'
import styles from './common.module.scss'
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
    isStart: false,
    answerCount: 4,
    createdAt: '1月10 12:22',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStart: false,
    answerCount: 4,
    createdAt: '5月10 12:22',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: false,
    isStart: false,
    answerCount: 4,
    createdAt: '1月10 12:22',
  },
]
const List: FC = () => {
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
        {questionList.map((question) => {
          const { answerCount, _id, createdAt, isStart, isPublished, title } =
            question
          return <QuestionCard key={_id} {...question}></QuestionCard>
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}

export default List
