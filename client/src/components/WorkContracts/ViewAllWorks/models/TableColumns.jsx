import { CheckCircleOutlined, CloseCircleOutlined, DeleteFilled, EditOutlined, ExclamationCircleOutlined, SyncOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Space, Tag, Tooltip } from 'antd';
import React from 'react';
import Constants from '../../../../constants/Constants';
import { currencyFormatter, dateFormatter } from '../../../../utils/LocaleUtils';
import { workCategories, workStatus } from '../../common/model';

const getWorkStatusTag = (status) => {
  switch (status) {
    case Constants.WORK_STATUS.WIP:
      return (<Tag icon={<SyncOutlined />} color="processing" className="amr-work-status">{workStatus[status]}</Tag>);
    case Constants.WORK_STATUS.COMPLETED:
      return (<Tag icon={<CheckCircleOutlined />} color="success" className="amr-work-status">{workStatus[status]}</Tag>);
    case Constants.WORK_STATUS.OVERDUE:
      return (<Tag icon={<ExclamationCircleOutlined />} color="warning" className="amr-work-status">{workStatus[status]}</Tag>);
    case Constants.WORK_STATUS.DELETED:
      return (<Tag size="large" icon={<CloseCircleOutlined />} color="error" className="amr-work-status">{workStatus[status]}</Tag>);
    default:
      return (<Tag size="large" icon={<WarningFilled />} color="error" className="amr-work-status">Error</Tag>);
  }
};

const getWorkCategories = (categories) => categories.map((item) => workCategories[item]).join(', ');

export default ({ handlers }) => [
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
    render: getWorkCategories,
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
    render: getWorkStatusTag,
    filters: [
      {
        text: workStatus[Constants.WORK_STATUS.WIP],
        value: Constants.WORK_STATUS.WIP,
      },
      {
        text: workStatus[Constants.WORK_STATUS.COMPLETED],
        value: Constants.WORK_STATUS.COMPLETED,
      },
      {
        text: workStatus[Constants.WORK_STATUS.OVERDUE],
        value: Constants.WORK_STATUS.OVERDUE,
      },
      {
        text: workStatus[Constants.WORK_STATUS.DELETED],
        value: Constants.WORK_STATUS.DELETED,
      },
    ],
    onFilter: (value, record) => record.status === value,
    defaultFilteredValue: [ Constants.WORK_STATUS.WIP, Constants.WORK_STATUS.COMPLETED, Constants.WORK_STATUS.OVERDUE ],
    defaultSortOrder: 'ascend',
    sortDirections: [ 'ascend', 'descend', 'ascend' ],
    sorter: (a, b) => a.status - b.status,
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
      (record.status === Constants.WORK_STATUS.DELETED) ? (
        <Button type="dashed" disabled>
          - NA -
        </Button>
      ) : (
        <Space size="large" align="end">
          <Tooltip title="Edit Work Details">
            <Button
              type="primary"
              size="medium"
              shape="circle"
              onClick={() => {
                handlers.editWork(record.id);
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip title="Delete Work">
            <Button
              type="danger"
              size="medium"
              shape="circle"
              onClick={() => {
                handlers.deleteWork(record.id);
              }}
              icon={<DeleteFilled />}
            />
          </Tooltip>
        </Space>
      )
    ),
  },
];
