import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SideNav from '../SideNav/SideNav';
import './Dashboard.css';

const { Header, Content, Footer } = Layout;

const Dashboard = ({ history }) => {
  const [ state, setState ] = useState({
    collapsed: false,
  });

  function gotoLocation(to) {
    if (to) {
      history.push(to);
    }
  }

  const toggle = () => {
    setState((prevState) => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  };

  const currentYear = new Date().getFullYear();
  const { collapsed } = state;

  return (
    <Layout className="dashboard-layout-container">
      <SideNav collapsed={collapsed} navigate={gotoLocation} />
      <Layout className={`dashboard-layout ${collapsed ? 'side-nav-collapsed' : ''}`}>
        <Header className="dashboard-header dashboard-background">
          {
              React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'dashboard-side-nav-trigger',
                onClick: toggle,
              })
            }
          Admin Dashboard
        </Header>
        <Content className="dashboard-main-content dashboard-background">
          Content
        </Content>
        <Footer className="dashboard-footer">
          {`©${currentYear} Created by Azanay Tech`}
        </Footer>
      </Layout>
    </Layout>
  );
};

Dashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Dashboard;
