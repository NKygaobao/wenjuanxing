import styles from './MainLayout.module.scss'
import React, { FC } from 'react'
import { Layout, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
const { Header, Content, Footer, Sider } = Layout

const MainLayout: FC = () => {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Logo />
                </div>
                <div className={styles.right}>
                    <UserInfo />
                </div>
            </Header>
            <Layout className={styles.main}>
                <Content>
                    <Outlet></Outlet>
                </Content>
            </Layout>
            <Footer className={styles.footer}>满意度问卷 &copy;2023 - present. Created by xxx</Footer>
        </Layout>
    )

}

export default MainLayout