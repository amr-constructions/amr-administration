import { HomeOutlined, MoneyCollectTwoTone, UserOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React from 'react';
import NavigationPath from '../../NavigationPath/NavigationPath';
import './AccountsHead.css';
import { dateFormatter, currencyFormatter } from '../../../utils/LocaleUtils';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    render: (text) => <span className="table_slno">{text}</span>,
  },
  {
    title: 'Account Head Name',
    dataIndex: 'name',
  },
  {
    title: 'Account Type',
    dataIndex: 'type',
  },
  {
    title: 'Operational Balance',
    className: 'column-money',
    dataIndex: 'op_bal',
    align: 'right',
    render: (amount) => <span>{currencyFormatter(amount)}</span>,
  },
  {
    title: 'Current Balance',
    className: 'column-money',
    dataIndex: 'curr_bal',
    align: 'right',
    render: (amount) => <span>{currencyFormatter(amount)}</span>,
  },
  {
    title: 'Created On',
    dataIndex: 'created_on',
    render: (date) => <span>{dateFormatter(date)}</span>,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    fixed: 'right',
    width: 100,
  },
];

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
      columns={columns}
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
