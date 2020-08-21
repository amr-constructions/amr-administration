import { AppstoreAddOutlined, CheckOutlined, HomeOutlined, MoneyCollectTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
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
  const formRef = React.createRef();

  const [ state, setState ] = useState({
    data: [],
    visible: false,
    newAccountHeadLoading: false,
    modalSubmit: false,
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
      }));
    }).catch(() => {
      setState((prevState) => ({
        ...prevState,
        data: [],
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
      />
      <Modal
        title="Create Account Head"
        visible={state.visible}
        onCancel={() => {
          setState((prevState) => ({
            ...prevState,
            visible: false,
          }));
          formRef.current.resetFields();
        }}
        footer={[
          <Button
            type="primary"
            loading={false}
            onClick={() => {
              formRef.current.submit();
            }}
            disabled={state.modalSubmit}
          >
            Create
            <CheckOutlined />
          </Button>,
        ]}
      >
        <NewAccountHeadForm onSubmit={submitNewAccountForm} state={state} formRef={formRef} />
      </Modal>
    </div>
  );
};

export default AccountsHead;
