import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import SideNav from '../SideNav/SideNav';
import './Dashboard.css';

const { Header, Content, Footer } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };

    this.currentYear = new Date().getFullYear();
    this.toggle = this.toggle.bind(this);
    this.gotoLocation = this.gotoLocation.bind(this);
  }

  gotoLocation(to) {
    if (to) {
      const { history } = this.props;
      history.push(to);
    }
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
        <SideNav collapsed={collapsed} navigate={this.gotoLocation} />
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
          <Footer className="dashboard-footer">
            {`©${this.currentYear} Created by Azanay Tech`}
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Dashboard;
