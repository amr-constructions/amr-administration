import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { currencyFormatter, dateFormatter } from '../../../../utils/LocaleUtils';
import { workCategories, workStatus } from '../../common/model';

export default () => [
  {
    title: '#',
    dataIndex: 'id',
    render: (text) => <span className="table_slno">{text}</span>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Assigned Supervisors',
    dataIndex: 'supervisors',
  },
  {
    title: 'Client Name',
    dataIndex: 'client_name',
  },
  {
    title: 'Client Contact',
    dataIndex: 'client_contact',
  },
  {
    title: 'Location',
    dataIndex: 'location',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    render: (category) => (<span>{workCategories[category]}</span>),
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
    className: 'column-money',
    align: 'right',
    render: (amount) => <span>{currencyFormatter(amount)}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => (<span>{workStatus[status]}</span>),
  },
  {
    title: 'Created By',
    dataIndex: 'created_by',
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
    render: () => (
      <Space size="large" align="end">
        <Tooltip title="Edit Work Details">
          <Button type="primary" size="medium" shape="circle" onClick={() => {}} icon={<EditOutlined />} />
        </Tooltip>
        <Tooltip title="Delete Work">
          <Button type="danger" size="medium" shape="circle" onClick={() => {}} icon={<DeleteFilled />} />
        </Tooltip>
      </Space>
    ),
  },
];
