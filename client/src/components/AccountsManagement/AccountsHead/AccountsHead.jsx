import { AppstoreAddOutlined, BankOutlined, CheckOutlined, HomeOutlined, MoneyCollectTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import config from '../../../config/config';
import NavigationPath from '../../NavigationPath/NavigationPath';
import TableTitle from '../../TableTitle/TableTitle';
import './AccountsHead.css';
import Columns from './models/TableColumns';
import LoadTableData from './xhr/getTableData';

const { Option } = Select;

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

  const imitateNumberInput = (e) => {
    const { value } = e.target;
    if (/^-?\d*(\.\d*)?$/.test(value) || value === '' || value === '-') {
      formRef.current.setFieldsValue({
        account_opening_balance: value,
      });
    } else {
      formRef.current.setFieldsValue({
        account_opening_balance: value.slice(0, -1),
      });
    }
  };

  const formatValue = (e) => {
    let { value } = e.target;

    if (value.charAt(value.length - 1) === '.' || value === '-') {
      value = value.slice(0, -1);
    }

    formRef.current.setFieldsValue({
      account_opening_balance: parseFloat(value).toFixed(2),
    });
  };

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

        <Form
          name="new-account-form"
          ref={formRef}
          onFinish={submitNewAccountForm}
          hideRequiredMark
          layout="vertical"
        >

          <Form.Item
            name="account_type"
            label="Account Type"
            rules={[
              {
                required: true,
                message: 'Account Type Must Be Selected!',
              },
            ]}
          >
            <Select
              showSearch
              size="large"
              placeholder="Account Type"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              disabled={state.newAccountHeadLoading}
            >
              <Option value="bank">Bank Account</Option>
              <Option value="expense">Expense Account</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="account_head_name"
            label="Account Head Name"
            rules={[
              {
                required: true,
                message: 'Account Head Name Cannot Be Empty!',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Account Head Name"
              prefix={<BankOutlined />}
              disabled={state.newAccountHeadLoading}
              onPressEnter={() => formRef.current.submit()}
            />
          </Form.Item>

          <Form.Item
            name="account_opening_balance"
            label="Opening Balance (On Account Creation)"
            initialValue="0.00"
            rules={[
              {
                required: true,
                message: 'Account Opening Balance Cannot Be Empty!',
              },
            ]}
          >
            <Input
              addonBefore={config.LOCALE.currencySymbol}
              disabled={state.newAccountHeadLoading}
              size="large"
              style={{
                width: '100%',
              }}
              onPressEnter={() => formRef.current.submit()}
              onChange={imitateNumberInput}
              onBlur={formatValue}
            />
          </Form.Item>

        </Form>

      </Modal>
    </div>
  );
};

export default AccountsHead;
