import { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}
const ListPage: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  //   从url参数中解析 pageSize page
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const size = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(size)
  }, [searchParams])

  const handlePageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <>
      <Pagination total={total} pageSize={pageSize} current={current} onChange={handlePageChange} />
    </>
  )
}

export default ListPage
