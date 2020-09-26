import { CheckOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Radio, Row, Select, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../config/config';
import { formatValue, imitateContactNumberInput, imitateNumberInput } from '../../../utils/InputUtils';

const { Text } = Typography;
const { Option } = Select;

const NewIndividualLabour = ({ onSubmit, state, setState, workTypes }, formRef) => {
  const toggleDailyWageInputVisibility = (e) => {
    setState((prevState) => ({
      ...prevState,
      dailyWageVisible: e.target.value === 'Y',
    }));
  };

  return (
    <Modal
      title="Create Individual Labour"
      visible={state.visible}
      onCancel={() => {
        setState((prevState) => ({
          ...prevState,
          visible: false,
        }));
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
      destroyOnClose
    >
      <Form
        name="new-individual-labour-form"
        ref={formRef}
        onFinish={onSubmit}
        hideRequiredMark
        layout="vertical"
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
                  initialValue="0.00"
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
          name="opening_balance"
          label="Opening/Old Balance At The Time Of Profile Creation"
          initialValue="0.00"
          rules={[
            {
              required: true,
              message: 'Opening Balance Cannot Be Empty!',
            },
          ]}
        >
          <Input
            prefix={config.LOCALE.currencySymbol}
            disabled={state.modalSubmit}
            size="large"
            style={{
              width: '100%',
            }}
            onPressEnter={() => formRef.current.submit()}
            onChange={(e) => imitateNumberInput(e, formRef, 'opening_balance')}
            onBlur={(e) => formatValue(e, formRef, 'opening_balance')}
          />
        </Form.Item>
        <Text
          type="secondary"
          strong
          style={{
            display: 'block', marginTop: '-1.5rem',
          }}
        >
          {`Add "${'-'}" sign for Balance To Receive`}
        </Text>

      </Form>
    </Modal>
  );
};

NewIndividualLabour.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape({
    visible: PropTypes.bool,
    modalSubmit: PropTypes.bool,
    newAccountHeadLoading: PropTypes.bool,
    workTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string,
      }),
    ),
    dailyWageVisible: PropTypes.bool,
  }).isRequired,
  setState: PropTypes.func.isRequired,
};

export default React.forwardRef(NewIndividualLabour);
