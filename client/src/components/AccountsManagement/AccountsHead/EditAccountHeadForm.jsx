import { BankOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const { Option } = Select;

const EditAccountHeadForm = ({ onSubmit, state, setState }) => {
  const formRef = React.createRef();

  const { editAccountHeadVisible, modalSubmit, dataForEdit } = state;

  return (
    <Modal
      title="Edit Account Head"
      visible={editAccountHeadVisible}
      onCancel={() => {
        setState((prevState) => ({
          ...prevState,
          editAccountHeadVisible: false,
          dataForEdit: {
          },
        }));
        formRef.current.resetFields();
      }}
      footer={[
        <Button
          key={0}
          type="primary"
          loading={modalSubmit}
          onClick={() => {
            formRef.current.submit();
          }}
          disabled={modalSubmit}
        >
          Update
          <EditOutlined />
        </Button>,
      ]}
      destroyOnClose
    >
      <Form
        name="new-account-form"
        ref={formRef}
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
          initialValue={dataForEdit.type}
        >
          <Select
            showSearch
            size="large"
            placeholder="Account Type"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            disabled={modalSubmit}
            autoFocus
          >
            <Option value="bank">Bank Account</Option>
            <Option value="expense">Expense Account</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="head_name"
          label="Account Head Name"
          initialValue={dataForEdit.head_name}
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
            disabled={modalSubmit}
            onPressEnter={() => formRef.current.submit()}
          />
        </Form.Item>

        <Form.Item
          name="id"
          initialValue={dataForEdit.id}
          hidden
        >
          <Input type="text" />
        </Form.Item>

      </Form>
    </Modal>
  );
};

EditAccountHeadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape({
    editAccountHeadVisible: PropTypes.bool,
    modalSubmit: PropTypes.bool,
    newAccountHeadLoading: PropTypes.bool,
    dataForEdit: PropTypes.shape({
      type: PropTypes.string,
      head_name: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
  setState: PropTypes.func.isRequired,
};

export default EditAccountHeadForm;
