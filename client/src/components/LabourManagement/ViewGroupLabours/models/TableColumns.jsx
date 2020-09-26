import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tag, Tooltip } from 'antd';
import React from 'react';
import { currencyFormatter, dateFormatter } from '../../../../utils/LocaleUtils';

const getNameWithTag = (name, record) => (
  <>
    {name}
    <br />
    {
        record.leader === 'Y'
          ? <Tag color="#87d068">Leader</Tag>
          : <Tag color="#108ee9">Member</Tag>
      }
  </>
);

const getWorkType = (id, workTypes) => {
  const workTypeItem = workTypes.find((workType) => workType.id.toString() === id.toString());
  if (workTypeItem != null) {
    return workTypeItem.type;
  }
  return null;
};

export default ({ workTypes }) => [
  {
    title: '#',
    dataIndex: 'id',
    render: (text) => <span className="table_slno">{text}</span>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: getNameWithTag,
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
    render: (amount) => <span>{currencyFormatter(amount)}</span>,
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
      (!record.leader || record.leader !== 'Y') ? (
        <Button type="dashed" disabled>
          - NA -
        </Button>
      ) : (
        <Space size="large" align="end">
          <Tooltip title="Edit Labour Group">
            <Button
              type="primary"
              size="medium"
              shape="circle"
              onClick={() => {}}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip title="Delete Labour Group">
            <Button
              type="danger"
              size="medium"
              shape="circle"
              onClick={() => {}}
              icon={<DeleteFilled />}
            />
          </Tooltip>
        </Space>
      )
    ),
  },
];
