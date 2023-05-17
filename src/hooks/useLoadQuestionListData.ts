// import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../services/question'
import { useRequest } from 'ahooks'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

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
      const data = await getQuestionListService({ keyword, isDeleted, isStar })
      return data
    },
    {
      refreshDeps: [searchParams], // 更新触发
    }
  )

  return { data, loading, error }
}

export default useLoadQuestionListData
