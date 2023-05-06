import React, { FC } from "react";
import { UserOutlined } from '@ant-design/icons'
import { Button } from "antd";


const UserInfo: FC = () => {

    const logout = () => {
    }

    const UserInfo = <>
        <span style={{ color: '#e8e8e8' }}>
            <UserOutlined />
            马斯克
        </span>
        <Button type="link" onClick={logout}>退出</Button>
    </>
    return UserInfo
}

export default UserInfo