import React, { FC, ChangeEvent, useState, useEffect } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const handleSearch = (event: any) => {
    // 跳转
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])
  return (
    <>
      <Search
        placeholder="请输入关键字"
        allowClear
        enterButton
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: '260px' }}
      />
    </>
  )
}

export default ListSearch
