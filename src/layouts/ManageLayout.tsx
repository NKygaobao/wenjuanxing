import React, { FC } from 'react'
// @ts-ignore
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
    return <div className={styles.container}>
        <div className={styles.left}>
            <p>ManageLayout left</p>
            <button>创建</button><br />
            <a href="#">我的问卷</a><br />
            <a href="#">星标问卷</a><br />
            <a href="#">回收站</a>
        </div>
        <div className={styles.rigth}>
            <Outlet></Outlet>
        </div>
    </div>
}

export default ManageLayout