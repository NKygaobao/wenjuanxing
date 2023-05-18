import type { FC } from 'react'
import { Typography, Spin } from 'antd'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
const { Title } = Typography

const List: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({})
  const { list, total } = data

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
        {!loading &&
          list.length > 0 &&
          list.map((question: any) => {
            const { answerCount, _id, createdAt, isStart, isPublished, title } = question
            return <QuestionCard key={_id} {...question}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>
      </div>
    </div>
  )
}

export default List
