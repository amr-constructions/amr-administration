import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { currencyFormatter, dateFormatter } from '../../../../utils/LocaleUtils';

const getWorkType = (id, workTypes) => {
  const workTypeItem = workTypes.find((workType) => workType.id.toString() === id.toString());
  if (workTypeItem != null) {
    return workTypeItem.type;
  }
  return null;
};

export default ({ workTypes, handlers }) => [
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
    title: 'Contact',
    dataIndex: 'contact',
  },
  {
    title: 'Work Type',
    dataIndex: 'work_type',
    render: (id) => getWorkType(id, workTypes),
  },
  {
    title: 'Fixed Wage ?',
    dataIndex: 'fixed',
  },
  {
    title: 'Wage Per Day',
    className: 'column-money',
    dataIndex: 'wage_per_day',
    align: 'right',
    render: (amount) => <span>{amount != null ? currencyFormatter(amount) : '- NA -'}</span>,
  },
  {
    title: 'Opening Balance',
    className: 'column-money',
    dataIndex: 'opening_balance',
    align: 'right',
    render: (amount) => <span>{currencyFormatter(amount)}</span>,
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
    render: (text, record) => (
      <Space size="large" align="end">
        <Tooltip title="Edit Labour Details">
          <Button
            type="primary"
            size="medium"
            shape="circle"
            onClick={(e) => handlers.editIndividualLabour(e, record)}
            icon={<EditOutlined />}
          />
        </Tooltip>
        <Tooltip title="Delete Labour">
          <Button
            type="danger"
            size="medium"
            shape="circle"
            onClick={() => {}}
            icon={<DeleteFilled />}
          />
        </Tooltip>
      </Space>
    ),
  },
];
