import { AppstoreAddOutlined, HomeOutlined, LoadingOutlined, MoneyCollectTwoTone, UserOutlined } from '@ant-design/icons';
import { message, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Constants from '../../../constants/Constants';
import NavigationPath from '../../NavigationPath/NavigationPath';
import TableTitle from '../../TableTitle/TableTitle';
import './AccountsHead.css';
import EditAccountHeadForm from './EditAccountHeadForm';
import Columns from './models/TableColumns';
import NewAccountHeadForm from './NewAccountHeadForm';
import Services from './services/entry';

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
    editAccountHeadVisible: false,
    dataForEdit: {
    },
  });

  const formRef = useRef(null);

  const newAccountHead = () => {
    setState((prevState) => ({
      ...prevState,
      visible: true,
    }));
  };

  const editAccountHead = (e, record) => {
    setState((prevState) => ({
      ...prevState,
      dataForEdit: record,
      editAccountHeadVisible: true,
    }));
  };

  useEffect(() => {
    const getAccountHeadsList = async function () {
      const response = await Services[Constants.ACCOUNTS_MGMT.GET_ACCOUNT_HEADS]();
      if (response.code !== Constants.SUCCESS) {
        setState((prevState) => ({
          ...prevState,
          data: [],
          tableLoading: false,
        }));

        message.error(`${response.reason} [${response.debugCode}]`);
        return;
      }

      setState((prevState) => ({
        ...prevState,
        data: response.data,
        tableLoading: false,
      }));
    };

    getAccountHeadsList();

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  const submitNewAccountForm = async (values) => {
    setState((prevState) => ({
      ...prevState,
      modalSubmit: true,
    }));

    const response = await Services[Constants.ACCOUNTS_MGMT.CREATE_ACCOUNT_HEAD](values);
    if (response.code !== Constants.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        tableLoading: false,
        modalSubmit: false,
      }));

      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    setState((prevState) => ({
      ...prevState,
      tableLoading: true,
      modalSubmit: false,
    }));

    formRef.current.resetFields();

    message.success('New Account Head Added Successfully');

    setState((prevState) => {
      const newData = prevState.data.slice(0);
      newData.push(response.data);

      return ({
        ...prevState,
        data: newData,
        tableLoading: false,
      });
    });
  };

  const updateAccountForm = async (values) => {
    setState((prevState) => ({
      ...prevState,
      modalSubmit: true,
    }));

    const response = await Services[Constants.ACCOUNTS_MGMT.UPDATE_ACCOUNT_HEAD](values);
    if (response.code !== Constants.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        tableLoading: false,
        modalSubmit: false,
      }));

      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    setState((prevState) => ({
      ...prevState,
      tableLoading: true,
    }));

    const idx = state.data.findIndex((item) => item.id === response.data.id);
    if (idx === -1) {
      setState((prevState) => ({
        ...prevState,
        tableLoading: false,
        modalSubmit: false,
      }));

      message.error('Account Head Update Failed [CLIENT]');
      return;
    }

    const updatedData = state.data.slice(0);
    updatedData[idx] = {
      ...updatedData[idx], ...response.data,
    };

    setState((prevState) => {
      message.success('Account Head Updated Successfully');
      return ({
        ...prevState,
        data: updatedData,
        tableLoading: false,
        editAccountHeadVisible: false,
        modalSubmit: false,
      });
    });
  };

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Table
        columns={Columns({
          handlers: {
            editAccount: editAccountHead,
          },
        })}
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
      <NewAccountHeadForm ref={formRef} onSubmit={submitNewAccountForm} state={state} setState={setState} />
      <EditAccountHeadForm onSubmit={updateAccountForm} state={state} setState={setState} />
    </div>
  );
};

export default AccountsHead;
