import React, { FC } from 'react'
// @ts-ignore
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
    return <>
        <p>Question layout</p>
        <div>
            <Outlet></Outlet>
        </div>
    </>
}

export default QuestionLayout