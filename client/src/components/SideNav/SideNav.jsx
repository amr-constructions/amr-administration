import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/img/amr_logo_white.png';
import './SideNav.css';
import MenuItems from './SideNavItems';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = ({ collapsed, navigate }) => {
  const handleClick = (e) => {
    navigate('/dashboard');
  };

  return (
    <Sider
      trigger={null}
      collapsed={collapsed}
      collapsible
      width={250}
      className="dashboard-sidenav"
    >
      <Link to="/dashboard">
        <div className="dashboard-sidenav-logo-container">
          <img src={logo} className="dashboard-sidenav-logo" alt="AMR Constructions Logo" title="AMR Constructions" />
        </div>
      </Link>

      <Menu theme="dark" mode="inline" onClick={handleClick}>
        {
        MenuItems.map((menuItem) => {
          const menuIcon = React.createElement(menuItem.icon);

          let menuItemToRender = '';
          if (!menuItem.parent || !menuItem.children || !menuItem.children.length) {
            menuItemToRender = (
              <Menu.Item key={menuItem.id} icon={menuIcon}>
                {menuItem.title}
              </Menu.Item>
            );
          } else {
            menuItemToRender = (
              <SubMenu key={menuItem.id} icon={menuIcon} title={menuItem.title}>
                {
                  menuItem.children.map((SubMenuItem) => {
                    const subMenuIcon = React.createElement(SubMenuItem.icon);
                    return (
                      <Menu.Item key={SubMenuItem.id} icon={subMenuIcon}>
                        {SubMenuItem.title}
                      </Menu.Item>
                    );
                  })
              }
              </SubMenu>
            );
          }
          return (
            menuItemToRender
          );
        })
      }
      </Menu>
    </Sider>
  );
};

SideNav.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default SideNav;
