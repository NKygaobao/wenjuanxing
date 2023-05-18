import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography, Empty, Spin, Pagination } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
const { Title } = Typography

const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list, total } = data
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
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
            return <QuestionCard key={question._id} {...question}></QuestionCard>
          })}
      </div>
      {!loading && (
        <div className={styles.footer}>
          <ListPage total={total} />
        </div>
      )}
    </>
  )
}

export default Star
