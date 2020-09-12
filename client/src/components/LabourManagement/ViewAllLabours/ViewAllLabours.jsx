import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import NavigationPath from '../../NavigationPath/NavigationPath';

const navigationPath = [
  {
    level: 0,
    title: 'Dashboard',
    icon: HomeOutlined,
    route: '/dashboard',
  },
  {
    level: 1,
    title: 'Labour Management',
    icon: UserOutlined,
  },
  {
    level: 2,
    title: 'Labour Profiles',
    icon: TeamOutlined,
  },
];

const ViewAllLabours = () => (
  <div>
    <NavigationPath path={navigationPath} />
  </div>
);

export default ViewAllLabours;
