import { BankOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../config/config';
import './AccountsHead.css';

const { Option } = Select;

const NewAccountHeadForm = ({ onSubmit, state, setState }) => {
  const formRef = React.createRef();

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

  return (
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
          key={0}
          type="primary"
          loading={state.modalSubmit}
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
        onFinish={onSubmit}
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
  );
};

NewAccountHeadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape({
    visible: PropTypes.bool,
    modalSubmit: PropTypes.bool,
    newAccountHeadLoading: PropTypes.bool,
  }).isRequired,
  setState: PropTypes.func.isRequired,
};

export default NewAccountHeadForm;
