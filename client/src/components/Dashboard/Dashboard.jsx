import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import './Dashboard.css';

const { Header, Sider, Content } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Layout className="dashboard-layout-container">
        <Sider trigger={null} collapsed={collapsed} collapsible>
          <div className="dashboard-logo" />
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
        <Layout className="dashboard-layout">
          <Header className="dashboard-header dashboard-background">
            {
              React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'dashboard-side-nav-trigger',
                onClick: this.toggle,
              })
            }
            Admin Dashboard
          </Header>
          <Content className="dashboard-main-content dashboard-background">
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
