import React from 'react';
import { currencyFormatter, dateFormatter } from '../../../../utils/LocaleUtils';

export default () => [
  {
    title: 'Date',
    dataIndex: 'date',
    render: (date) => <span>{dateFormatter(date)}</span>,
    defaultSortOrder: 'ascend',
    sortDirections: [ 'ascend', 'descend', 'ascend' ],
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Debit',
    dataIndex: 'value',
    className: 'column-money',
    align: 'right',
    render: (amount, record) => ((record.type === 'DR') ? <span>{currencyFormatter(amount)}</span> : ''),
  },
  {
    title: 'Credit',
    dataIndex: 'value',
    className: 'column-money',
    align: 'right',
    render: (amount, record) => ((record.type === 'CR') ? <span>{currencyFormatter(amount)}</span> : ''),
  },
  {
    title: 'Balance',
    dataIndex: 'bal',
    className: 'column-money',
    align: 'right',
    render: (amount) => <span>{currencyFormatter(amount)}</span>,
  },
];
