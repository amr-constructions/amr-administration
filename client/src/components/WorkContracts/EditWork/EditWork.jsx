import { EditTwoTone, HomeOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import NavigationPath from '../../NavigationPath/NavigationPath';
import './EditWork.css';

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
    title: 'Edit Work Details',
    icon: EditTwoTone,
  },
];

const EditWork = () => (
  <div>
    <NavigationPath path={navigationPath} />
  </div>
);

export default EditWork;
