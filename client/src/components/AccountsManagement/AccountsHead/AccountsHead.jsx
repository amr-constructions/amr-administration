import { HomeOutlined, MoneyCollectTwoTone, UserOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import NavigationPath from '../../NavigationPath/NavigationPath';
import Columns from './models/TableColumns';
import LoadTableData from './xhr/getTableData';
import './AccountsHead.css';

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

const AccountsHead = () => {
  const [ state, setState ] = useState({
    data: [],
  });

  useEffect(() => {
    LoadTableData().then((response) => {
      setState((prevState) => ({
        ...prevState,
        data: response.data,
      }));
    }).catch(() => {
      setState((prevState) => ({
        ...prevState,
        data: [],
      }));
    });

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Table
        columns={Columns}
        dataSource={state.data}
        bordered
        title={() => 'List Of Account Heads'}
        className="accountsHead_Table"
        pagination={{
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} ${total > 1 ? 'items' : 'item'}`,
        }}
      />
    </div>
  );
};

export default AccountsHead;
