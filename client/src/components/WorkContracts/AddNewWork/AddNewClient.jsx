import { CheckOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import config from '../../../config/config';
import { imitateContactNumberInput } from '../../../utils/InputUtils';

const AddNewClient = ({ onSubmit, state, setState }) => {
  const formRef = useRef(null);

  const { newClientFormVisible: visible, newClientName: clientName, modalSubmit: submit } = state;

  const handleEnterKey = (e) => {
    e.preventDefault();
    formRef.current.submit();
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
              onPressEnter={handleEnterKey}
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
              prefix={config.LOCALE.countryCode}
              addonBefore={<MobileOutlined />}
              onChange={(e) => imitateContactNumberInput(e, formRef, 'contact')}
              disabled={submit}
              onPressEnter={handleEnterKey}
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
