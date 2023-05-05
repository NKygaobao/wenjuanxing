import { createBrowserRouter, RouteObject } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import React, { lazy } from 'react'
import List from '../pages/manage/List'
import Trash from '../pages/manage/Trash'
import Star from '../pages/manage/Star'

const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/Edit'))
const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/question/Stat'))


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'manage',
                element: <ManageLayout />,
                children: [
                    {
                        path: 'list',
                        element: <List />,
                    },
                    {
                        path: 'star',
                        element: <Star />,
                    },
                    {
                        path: 'trash',
                        element: <Trash />,
                    },
                ],
            },
            {
                path: '*', // 404 路由配置，都写在最后（兜底）
                element: <NotFound />,
            },
        ]
    },
    {
        path: 'question',
        element: <QuestionLayout />,
        children: [
            {
                path: 'edit/:id',
                element: <Edit />,
            },
            {
                path: 'stat/:id', // statistic 统计
                element: <Stat />,
            },
        ],
    },
])

export default router
