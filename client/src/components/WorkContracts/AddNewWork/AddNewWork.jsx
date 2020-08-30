import { CheckOutlined, CloseOutlined, HomeOutlined, HomeTwoTone, UserOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import React, { useRef } from 'react';
import config from '../../../config/config';
import NavigationPath from '../../NavigationPath/NavigationPath';
import './AddNewWork.css';

const { Option } = Select;
const { TextArea } = Input;

const navigationPath = [
  {
    level: 0,
    title: 'Dashboard',
    icon: HomeOutlined,
    route: '/dashboard',
  },
  {
    level: 1,
    title: 'Work Contracts',
    icon: UserOutlined,
  },
  {
    level: 2,
    title: 'Add New Work',
    icon: HomeTwoTone,
  },
];

const disabledDate = (current) => current && current < moment().endOf('day');

const AddNewWork = () => {
  const formRef = useRef(null);

  const imitateNumberInput = (e) => {
    const { value } = e.target;
    if (/^-?\d*(\.\d*)?$/.test(value) || value === '' || value === '-') {
      formRef.current.setFieldsValue({
        budget: value,
      });
    } else {
      formRef.current.setFieldsValue({
        budget: value.slice(0, -1),
      });
    }
  };

  const formatValue = (e) => {
    let { value } = e.target;

    if (!value || value === '-' || value === '.') {
      value = 0;
    } else if (value.charAt(value.length - 1) === '.') {
      value = value.slice(0, -1);
    }

    formRef.current.setFieldsValue({
      budget: parseFloat(value).toFixed(2),
    });
  };

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Card>
        <Form
          name="amr-new-work-form"
          hideRequiredMark
          layout="vertical"
          ref={formRef}
        >

          <Form.Item
            name="workName"
            label="Work Name"
            rules={[
              {
                required: true,
                message: 'Work Name cannot be empty!',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Work Name"
              prefix={<WorkOutlineIcon />}
            />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: true,
                message: 'Location cannot be empty!',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Location"
              prefix={<LocationOnIcon />}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Work Category"
            rules={[
              {
                required: true,
                message: 'Work Category is mandatory!',
              },
            ]}
          >
            <Select
              mode="multiple"
              style={{
                width: '100%',
              }}
              placeholder="Select Work Category"
              size="large"
            >
              <Option key="proj_mgmt">Project Management</Option>
              <Option key="int_dsign">Interior Designing</Option>
              <Option key="plan_and_dsign">Plan & Designing</Option>
              <Option key="constrxn">Construction</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="client"
            label="Client"
            rules={[
              {
                required: true,
                message: 'Client cannot be empty!',
              },
            ]}
          >
            <Select
              showSearch
              filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              style={{
                width: '100%',
              }}
              placeholder="Select Client"
              size="large"
              options={[]}
            />
          </Form.Item>

          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                name="budget"
                label="Budget Amount"
                rules={[
                  {
                    required: true,
                    message: 'Budget cannot be empty!',
                  },
                ]}
                initialValue="0.00"
                onChange={imitateNumberInput}
                onBlur={formatValue}
              >
                <Input
                  prefix={config.LOCALE.currencySymbol}
                  size="large"
                  style={{
                    width: '100%',
                  }}
                  placeholder={`Budget Amount (in ${config.LOCALE.currencySymbol})`}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="completeOn"
                label="Completion Date"
                rules={[
                  {
                    required: true,
                    message: 'Completion Date cannot be empty!',
                  },
                ]}
              >
                <DatePicker
                  size="large"
                  format={config.LOCALE.dateFormat}
                  disabledDate={disabledDate}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Work Description"
          >
            <TextArea placeholder="Optional" allowClear />
          </Form.Item>

          <Form.Item className="amr-login-submit">
            <Button
              type="primary"
              size="large"
              icon={<CheckOutlined />}
              htmlType="submit"
            >
              Add Work Contract
            </Button>
          </Form.Item>

          <Form.Item className="amr-form-reset">
            <Button
              size="large"
              icon={<CloseOutlined />}
              htmlType="reset"
              onClick={() => formRef.current.resetFields()}
            >
              Clear All Fields
            </Button>
          </Form.Item>

        </Form>
      </Card>
    </div>
  );
};

export default AddNewWork;
