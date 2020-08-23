import { EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { currencyFormatter, dateFormatter } from '../../../../utils/LocaleUtils';

const accountTypes = {
  bank: 'Bank Account',
  expense: 'Expense Account',
};

export default [
  {
    title: '#',
    dataIndex: 'id',
    render: (text) => <span className="table_slno">{text}</span>,
  },
  {
    title: 'Account Head Name',
    dataIndex: 'head_name',
  },
  {
    title: 'Account Type',
    dataIndex: 'type',
    render: (type) => <span>{accountTypes[type]}</span>,
  },
  {
    title: 'Opening Balance',
    className: 'column-money',
    dataIndex: 'opening_balance',
    align: 'right',
    render: (amount) => <span>{currencyFormatter(amount)}</span>,
  },
  {
    title: 'Current Balance',
    className: 'column-money',
    dataIndex: 'current_balance',
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
    align: 'center',
    render: (text, record) => (
      <Space size="large" align="end">
        <Tooltip title="View All Transactions">
          <Button type="primary" size="medium" shape="circle" data-record={record} icon={<UnorderedListOutlined />} />
        </Tooltip>
        <Tooltip title="Edit Account Details">
          <Button type="primary" size="medium" shape="circle" data-record={record} icon={<EditOutlined />} />
        </Tooltip>
      </Space>
    ),
  },
];
