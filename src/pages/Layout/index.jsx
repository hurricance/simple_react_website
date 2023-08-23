import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
const { Header, Sider } = Layout

import { useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

import { observer } from 'mobx-react-lite'

import { clearToken } from '/src/utils'
import useStore from '/src/Store'
import './index.scss'
const MyLayout = observer(() => {

  const { pathname } = useLocation()
  const { userStore, channelStore } = useStore()

  useEffect(() => {
    userStore.getUserInfo()
    channelStore.getChannels()
  }, [userStore, channelStore])
  const onConfirm = () => {
    clearToken()
    window.location.reload()
  } 

  return (
    <Layout>
      <Header className="header">
        <div className="logo"></div>
        <div className="user-info">
          <span className="user-name">用户:{userStore.userInfo.username}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="side-bar">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={ [pathname] }
            items={[
              {
                key: '/',
                icon: <HomeOutlined />,
                label: <Link to={'/'}>数据概览</Link>,
                
              },
              {
                key: '/article',
                icon: <DiffOutlined />,
                label: <Link to={'/article'}>内容管理</Link>,
              },
              {
                key: '/publish',
                icon: <EditOutlined />,
                label: <Link to={'/publish'}>发布文章</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className="layout-content"><Outlet /></Layout>
      </Layout>
    </Layout>
  )

})

export default MyLayout
