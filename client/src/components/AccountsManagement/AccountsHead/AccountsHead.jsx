import { HomeOutlined, MoneyCollectTwoTone, UserOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React from 'react';
import NavigationPath from '../../NavigationPath/NavigationPath';
import Columns from './models/TableColumns';
import './AccountsHead.css';

const data = [
  {
    key: 1,
    id: '1',
    name: 'Supervisor\'s account',
    type: 'Cash In Hand',
    op_bal: '0',
    curr_bal: '0',
    created_on: new Date(),
    actions: 'To Do',
  },
];

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
    <Table
      columns={Columns}
      dataSource={data}
      bordered
      title={() => 'List Of Account Heads'}
      className="accountsHead_Table"
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} ${total > 1 ? 'items' : 'item'}`,
      }}
    />
  </div>
);

export default AccountsHead;
