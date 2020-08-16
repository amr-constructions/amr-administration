import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { SideNavToggleConsumer } from '../../contexts/SideNavToggleContext';
import './SideNav.css';

const { Sider } = Layout;

const SideNav = () => (
  <SideNavToggleConsumer>
    {
    (collapsed) => (
      <Sider trigger={null} collapsed={collapsed} collapsible>
        <div className="dashboard-sidenav-logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[ '1' ]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
  </SideNavToggleConsumer>
);

export default SideNav;
