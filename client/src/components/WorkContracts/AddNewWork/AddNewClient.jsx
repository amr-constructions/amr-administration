import { CheckOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

const AddNewClient = ({ onSubmit, state, setState }) => {
  const formRef = useRef(null);

  const { newClientFormVisible: visible, newClientName: clientName, modalSubmit: submit } = state;

  const imitateContactNumberInput = (e) => {
    const { value } = e.target;
    if (/^\d{0,9}$/.test(value)) {
      formRef.current.setFieldsValue({
        contact: value,
      });
    } else {
      formRef.current.setFieldsValue({
        contact: value.slice(0, -1),
      });
    }
  };

  return (
    <div>
      <Modal
        title="Create New Client"
        visible={visible}
        destroyOnClose
        onCancel={() => {
          setState((prevState) => ({
            ...prevState,
            newClientFormVisible: false,
          }));
          formRef.current.resetFields();
        }}
        footer={[
          <Button
            key={0}
            type="primary"
            loading={submit}
            onClick={() => {
              formRef.current.submit();
            }}
            icon={<CheckOutlined />}
            disabled={submit}
          >
            Create
          </Button>,
        ]}
      >
        <Form
          name="amr-new-client-form"
          hideRequiredMark
          layout="vertical"
          ref={formRef}
          onFinish={onSubmit}
        >

          <Form.Item
            name="clientName"
            label="Client Name"
            rules={[
              {
                required: true,
                message: 'Client Name cannot be empty!',
              },
            ]}
            initialValue={clientName}
          >
            <Input
              size="large"
              placeholder="Client Name"
              prefix={<UserOutlined />}
              disabled={submit}
            />
          </Form.Item>

          <Form.Item
            name="contact"
            label="Contact Number"
            validateTrigger={[ 'onSubmit' ]}
            rules={[
              () => ({
                validator(_, value) {
                  if (value == null || !value.length) {
                    return Promise.reject(new Error('Contact Number is mandatory!'));
                  }
                  if (!/^\d{9}$/.test(value)) {
                    return Promise.reject(new Error('Contact Number must contain exactly 9 digits!'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              size="large"
              placeholder="Contact Number"
              prefix="+91"
              addonBefore={<MobileOutlined />}
              onChange={imitateContactNumberInput}
              disabled={submit}
            />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

AddNewClient.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape({
    newClientFormVisible: PropTypes.bool,
    newClientName: PropTypes.string,
    modalSubmit: PropTypes.bool,
  }).isRequired,
  setState: PropTypes.func.isRequired,
};

export default AddNewClient;
