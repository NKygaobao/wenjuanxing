import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Typography, Spin, Empty } from 'antd'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { getQuestionListService } from '../../services/question'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
const { Title } = Typography

const List: FC = () => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [started, setStarted] = useState(false) // 是否已经开始加载（防抖，有延迟时间）
  const haveMoreData = total > list.length
  const containerRef = useRef<HTMLDivElement>(null)

  const [searchParams] = useSearchParams() // url 参数

  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  const { loading, run: load } = useRequest(
    async () => {
      const data = await getQuestionListService({ page, keyword, pageSize: LIST_PAGE_SIZE })
      return data
    },
    {
      onSuccess: result => {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current

      if (elem == null) return
      const domRect = elem.getBoundingClientRect()

      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        console.log('加载...')
        load() // 真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 20,
    }
  )

  // LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])

  // keyword 变化时，重置信息
  useEffect(() => {
    setPage(1)
    setList([])
    setTotal(0)
    setStarted(false)
  }, [keyword])

  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // 页面滚动触发加载
  useEffect(() => {
    console.log('haveMoreData', haveMoreData)

    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)

      return () => {
        window.removeEventListener('scroll', tryLoadMore) // 解绑
      }
    }
  }, [searchParams, haveMoreData])

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
        {list.length > 0 &&
          list.map((question: any) => {
            const { _id } = question
            return <QuestionCard key={_id} {...question}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </div>
  )
}

export default List
