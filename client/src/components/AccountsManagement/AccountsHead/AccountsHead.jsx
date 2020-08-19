import { HomeOutlined, MoneyCollectTwoTone, UserOutlined } from '@ant-design/icons';
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
    title: 'Accounts Management',
    icon: UserOutlined,
  },
  {
    level: 2,
    title: 'Accounts Head',
    icon: MoneyCollectTwoTone,
  },
];

const AccountsHead = () => (
  <div>
    <NavigationPath path={navigationPath} />
  </div>
);

export default AccountsHead;
