// import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../services/question'
import { useRequest } from 'ahooks'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY, STAT_PAGE_SIZE } from '../constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}
const useLoadQuestionListData = (opt: Partial<OptionType>) => {
  const { isDeleted = false, isStar = false } = opt
  const [searchParams] = useSearchParams()
  console.log(searchParams)

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_SEARCH_PARAM_KEY) || '') || STAT_PAGE_SIZE
      const data = await getQuestionListService({ keyword, isDeleted, isStar, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams], // 更新触发
    }
  )

  return { data, loading, error }
}

export default useLoadQuestionListData
