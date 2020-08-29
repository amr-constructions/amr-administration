import { HomeOutlined, HomeTwoTone, UserOutlined } from '@ant-design/icons';
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
    title: 'Work Contracts',
    icon: UserOutlined,
  },
  {
    level: 2,
    title: 'Add New Work',
    icon: HomeTwoTone,
  },
];

const AddNewWork = () => (
  <div>
    <NavigationPath path={navigationPath} />
  </div>
);

export default AddNewWork;
