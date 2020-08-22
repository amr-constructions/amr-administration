import { BankOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../config/config';
import './AccountsHead.css';

const { Option } = Select;

const mergeRefs = (...refs) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (inst) => {
    for (let i = 0, l = filteredRefs.length; i < l; ++i) {
      if (typeof ref === 'function') {
        filteredRefs[i](inst);
      } else if (filteredRefs[i]) {
        filteredRefs[i].current = inst;
      }
    }
  };
};

const NewAccountHeadForm = ({ onSubmit, state, setState, parentFormRef, firstInputRef }) => {
  const formRef = React.createRef();

  const imitateNumberInput = (e) => {
    const { value } = e.target;
    if (/^-?\d*(\.\d*)?$/.test(value) || value === '' || value === '-') {
      formRef.current.setFieldsValue({
        opening_balance: value,
      });
    } else {
      formRef.current.setFieldsValue({
        opening_balance: value.slice(0, -1),
      });
    }
  };

  const formatValue = (e) => {
    let { value } = e.target;

    if (value.charAt(value.length - 1) === '.' || value === '-') {
      value = value.slice(0, -1);
    }

    formRef.current.setFieldsValue({
      opening_balance: parseFloat(value).toFixed(2),
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
        ref={mergeRefs(formRef, parentFormRef)}
        onFinish={onSubmit}
        hideRequiredMark
        layout="vertical"
      >

        <Form.Item
          name="type"
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
            disabled={state.modalSubmit}
            ref={firstInputRef}
          >
            <Option value="bank">Bank Account</Option>
            <Option value="expense">Expense Account</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="head_name"
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
            disabled={state.modalSubmit}
            onPressEnter={() => formRef.current.submit()}
          />
        </Form.Item>

        <Form.Item
          name="opening_balance"
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
            disabled={state.modalSubmit}
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
  parentFormRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element),
    }),
  ]).isRequired,
  firstInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element),
    }),
  ]).isRequired,
};

export default NewAccountHeadForm;
