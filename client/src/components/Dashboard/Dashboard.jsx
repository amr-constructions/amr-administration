import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import SideNav from '../SideNav/SideNav';
import './Dashboard.css';

const { Header, Content } = Layout;

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
        <SideNav collapsed={collapsed} />
        <Layout className={`dashboard-layout ${collapsed ? 'side-nav-collapsed' : ''}`}>
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
