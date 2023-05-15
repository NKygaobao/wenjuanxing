import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  const { id = '' } = useParams()
  console.log(id)
  
  useEffect(() => {
    console.log(id)
  }, [])
  return <div>Edit</div>
}

export default Edit
