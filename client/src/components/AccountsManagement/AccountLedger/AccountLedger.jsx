import { HomeOutlined, PropertySafetyTwoTone, UserOutlined } from '@ant-design/icons';
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
    title: 'Account Ledger',
    icon: PropertySafetyTwoTone,
  },
];

const AccountLedger = () => (
  <div>
    <NavigationPath path={navigationPath} />
  </div>
);

export default AccountLedger;
