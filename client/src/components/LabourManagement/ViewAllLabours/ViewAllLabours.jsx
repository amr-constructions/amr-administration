import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import NavigationPath from '../../NavigationPath/NavigationPath';
import ViewGroupLabours from '../ViewGroupLabours/ViewGroupLabours';
import ViewIndividualLabours from '../ViewIndividualLabours/ViewIndividualLabours';

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
    <Space
      direction="vertical"
      size="large"
      style={{
        width: '100%',
      }}
    >
      <ViewIndividualLabours />
      <ViewGroupLabours />
    </Space>
  </div>
);

export default ViewAllLabours;
