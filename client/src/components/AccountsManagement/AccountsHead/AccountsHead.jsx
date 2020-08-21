import { AppstoreAddOutlined, HomeOutlined, MoneyCollectTwoTone, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import NavigationPath from '../../NavigationPath/NavigationPath';
import TableTitle from '../../TableTitle/TableTitle';
import './AccountsHead.css';
import Columns from './models/TableColumns';
import NewAccountHeadForm from './NewAccountHeadForm';
import LoadTableData from './xhr/getTableData';

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
    visible: false,
    newAccountHeadLoading: false,
    modalSubmit: false,
    tableLoading: true,
  });

  const newAccountHead = () => {
    setState((prevState) => ({
      ...prevState,
      visible: true,
    }));
  };

  useEffect(() => {
    LoadTableData().then((response) => {
      setState((prevState) => ({
        ...prevState,
        data: response.data,
        tableLoading: false,
      }));
    }).catch(() => {
      setState((prevState) => ({
        ...prevState,
        data: [],
        tableLoading: false,
      }));
    });

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  const submitNewAccountForm = async (values) => {
    console.log('form submitted');
    console.log(values);
  };

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Table
        columns={Columns}
        dataSource={state.data}
        bordered
        title={() => (
          <TableTitle
            title="List Of Account Heads"
            button={{
              icon: AppstoreAddOutlined,
              type: 'primary',
              label: 'New Account Head',
              onClick: newAccountHead,
            }}
          />
        )}
        className="accountsHead_Table"
        pagination={{
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} ${total > 1 ? 'items' : 'item'}`,
        }}
        loading={{
          indicator: (<LoadingOutlined />),
          size: 'large',
          tip: 'Loading Data...',
          spinning: state.tableLoading,
        }}
      />
      <NewAccountHeadForm onSubmit={submitNewAccountForm} state={state} setState={setState} />
    </div>
  );
};

export default AccountsHead;
