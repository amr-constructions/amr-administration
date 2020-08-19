import React from 'react';
import { dateFormatter, currencyFormatter } from '../../../../utils/LocaleUtils';

export default [
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
