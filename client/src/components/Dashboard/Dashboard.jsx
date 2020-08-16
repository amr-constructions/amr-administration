import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import { SideNavToggleProvider } from '../../contexts/SideNavToggleContext';
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
      <SideNavToggleProvider value={collapsed}>
        <Layout className="dashboard-layout-container">
          <SideNav />
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
      </SideNavToggleProvider>
    );
  }
}

export default Dashboard;
