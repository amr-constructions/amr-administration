import { Layout, Menu } from 'antd';
import React from 'react';
import { SideNavToggleConsumer } from '../../contexts/SideNavToggleContext';
import './SideNav.css';
import MenuItems from './SideNavItems';

const { Sider } = Layout;

const SideNav = () => (
  <SideNavToggleConsumer>
    {
    (collapsed) => (
      <Sider
        trigger={null}
        collapsed={collapsed}
        collapsible
        width={250}
        className="dashboard-sidenav"
      >
        <div className="dashboard-sidenav-logo" />
        <Menu theme="dark" mode="inline">
          {
            MenuItems.map((menuItem) => {
              const menuIcon = React.createElement(menuItem.icon);
              return (
                <Menu.Item key={menuItem.id} icon={menuIcon}>
                  {menuItem.title}
                </Menu.Item>
              );
            })
          }
        </Menu>
      </Sider>
    )
  }
  </SideNavToggleConsumer>
);

export default SideNav;
