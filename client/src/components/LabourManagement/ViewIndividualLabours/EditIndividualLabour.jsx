import { EditOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Radio, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import config from '../../../config/config';
import { formatValue, imitateContactNumberInput, imitateNumberInput } from '../../../utils/InputUtils';

const { Option } = Select;

const EditIndividualLabour = ({ onSubmit, state, setState, workTypes }) => {
  const formRef = useRef(null);

  const toggleDailyWageInputVisibility = (e) => {
    setState((prevState) => ({
      ...prevState,
      dailyWageVisible: e.target.value === 'Y',
    }));
  };

  const { editLabourModalVisible, modalSubmit, dataForEdit } = state;

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      dailyWageVisible: dataForEdit.fixed === 'Y',
    }));
  }, [ setState, dataForEdit ]);

  return (
    <Modal
      title="Edit Individual Labour"
      visible={editLabourModalVisible}
      onCancel={() => {
        setState((prevState) => ({
          ...prevState,
          editLabourModalVisible: false,
        }));
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
        name="edit-individual-labour-form"
        ref={formRef}
        onFinish={onSubmit}
        hideRequiredMark
        layout="vertical"
        initialValues={{
          name: dataForEdit.name,
          contact: dataForEdit.contact?.substr(config.LOCALE.countryCode.length),
          fixed: dataForEdit.fixed,
          wage_per_day: parseFloat(dataForEdit.wage_per_day).toFixed(2),
          work_type: dataForEdit.work_type?.toString(),
        }}
      >

        <Form.Item
          name="name"
          label="Labour Name"
          rules={[
            {
              required: true,
              message: 'Labour Name cannot be empty!',
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Labour Name"
            prefix={<UserOutlined />}
            disabled={state.modalSubmit}
            onPressEnter={() => formRef.current.submit()}
            autoFocus
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
            disabled={state.modalSubmit}
            onPressEnter={() => formRef.current.submit()}
          />
        </Form.Item>

        <Form.Item
          name="work_type"
          label="Work Type"
          rules={[
            {
              required: true,
              message: 'Work Type Must Be Selected!',
            },
          ]}
        >
          <Select
            showSearch
            size="large"
            placeholder="Work Type"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            disabled={state.modalSubmit}
          >
            {
              workTypes.map((item) => (<Option key={item.id}>{item.type}</Option>))
            }
          </Select>
        </Form.Item>

        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              name="fixed"
              label="Fixed Daily Basic Wage ?"
              rules={[
                {
                  required: true,
                  message: 'Option Must Be Selected',
                },
              ]}
            >
              <Radio.Group
                size="large"
                options={
                  [ {
                    label: 'Yes', value: 'Y',
                  },
                  {
                    label: 'No', value: 'N',
                  } ]
                }
                onChange={(e) => {
                  toggleDailyWageInputVisibility(e);
                }}
                optionType="button"
                buttonStyle="solid"
                disabled={state.modalSubmit}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {
            state.dailyWageVisible
              ? (
                <Form.Item
                  name="wage_per_day"
                  label="Wage Per Day"
                  rules={[
                    {
                      required: true,
                      message: 'Wage Per Day Cannot Be Empty!',
                    },
                  ]}
                >
                  <Input
                    prefix={config.LOCALE.currencySymbol}
                    size="large"
                    placeholder="Basic Wage Per Day"
                    disabled={state.modalSubmit}
                    style={{
                      width: '100%',
                    }}
                    onPressEnter={() => formRef.current.submit()}
                    onChange={(e) => imitateNumberInput(e, formRef, 'wage_per_day')}
                    onBlur={(e) => formatValue(e, formRef, 'wage_per_day')}
                  />
                </Form.Item>
              )
              : null
          }
          </Col>
        </Row>

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

EditIndividualLabour.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape({
    editLabourModalVisible: PropTypes.bool,
    modalSubmit: PropTypes.bool,
    newAccountHeadLoading: PropTypes.bool,
    dataForEdit: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      fixed: PropTypes.oneOf([ 'Y', 'N' ]),
      contact: PropTypes.string,
      wage_per_day: PropTypes.string,
      work_type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
    dailyWageVisible: PropTypes.bool.isRequired,
  }).isRequired,
  setState: PropTypes.func.isRequired,
  workTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
    }),
  ).isRequired,
};

export default EditIndividualLabour;
