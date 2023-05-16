import React, { FC, useEffect, useState } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <div>
      <p>Edit{loading}</p>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default Edit
