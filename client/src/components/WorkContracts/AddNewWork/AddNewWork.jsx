import { CheckOutlined, CloseOutlined, HomeOutlined, HomeTwoTone, UserOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import config from '../../../config/config';
import Constants from '../../../constants/Constants';
import ClientServices from '../../Clients/services/entry';
import NavigationPath from '../../NavigationPath/NavigationPath';
import Services from '../services/entry';
import AddNewClient from './AddNewClient';
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

  const [ state, setState ] = useState({
    clientNames: [],
    newClientFormVisible: false,
    newClientName: '',
    modalSubmit: false,
    disableClientList: false,
    newWorkSubmit: false,
  });

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

  const removeDynamicAddClientEntry = (clients) => {
    if (clients.length && clients[0].value === -1) {
      clients.shift();
    }
  };

  const searchHandler = (searchKey) => {
    const newClientItem = {
      label: `Add ${searchKey} as New Client`,
      value: -1,
      name: searchKey,
    };

    const newArray = state.clientNames.slice(0);
    removeDynamicAddClientEntry(newArray);

    if (searchKey) {
      newArray.unshift(newClientItem);
    }

    setState((prevState) => ({
      ...prevState,
      clientNames: newArray,
    }));
  };

  const selectionHandler = (value, option) => {
    if (value === -1) {
      formRef.current.setFieldsValue({
        client: null,
      });

      const newArray = state.clientNames.slice(0);
      removeDynamicAddClientEntry(newArray);

      /* Convert to Title Case */
      const clientName = option.name
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      setState((prevState) => ({
        ...prevState,
        clientNames: newArray,
        newClientName: clientName,
        newClientFormVisible: true,
      }));
    }
  };

  const createNewClient = async (values) => {
    setState((prevState) => ({
      ...prevState,
      modalSubmit: true,
    }));

    const response = await ClientServices[Constants.CLIENTS_MGMT.CREATE_CLIENT](values);
    if (response.code !== Constants.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        modalSubmit: false,
      }));

      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    const { data } = response;

    const newData = state.clientNames.slice(0);
    newData.push({
      label: `${data.name}    ${data.contact}`,
      value: data.id,
    });

    setState((prevState) => ({
      ...prevState,
      modalSubmit: false,
      newClientFormVisible: false,
      clientNames: newData,
    }));

    formRef.current.setFieldsValue({
      client: data.id,
    });

    message.success('New Client Added Successfully');
  };

  const createNewWorkContract = async (values) => {
    setState((prevState) => ({
      ...prevState,
      newWorkSubmit: true,
    }));

    const response = await Services[Constants.WORKS_MGMT.CREATE_WORK](values);
    if (response.code !== Constants.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        newWorkSubmit: false,
      }));

      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    setState((prevState) => ({
      ...prevState,
      newWorkSubmit: false,
    }));

    formRef.current.resetFields();

    message.success('New Work Contract Created Successfully!');
  };

  useEffect(() => {
    const getClientList = async function () {
      const response = await ClientServices[Constants.CLIENTS_MGMT.GET_CLIENTS]();
      if (response.code !== Constants.SUCCESS) {
        setState((prevState) => ({
          ...prevState,
          disableClientList: true,
        }));
        message.error(`${response.reason} [${response.debugCode}]`);
        return;
      }

      setState((prevState) => ({
        ...prevState,
        clientNames: response.data.map((item) => ({
          label: `${item.name}    ${item.contact}`,
          value: item.id,
        })),
      }));
    };

    getClientList();
  }, []);

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Card>
        <Form
          name="amr-new-work-form"
          hideRequiredMark
          layout="vertical"
          ref={formRef}
          onFinish={createNewWorkContract}
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
              disabled={state.newWorkSubmit}
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
              disabled={state.newWorkSubmit}
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
              disabled={state.newWorkSubmit}
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
              options={state.clientNames}
              onSearch={searchHandler}
              onSelect={selectionHandler}
              disabled={state.disableClientList || state.newWorkSubmit}
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
                  disabled={state.newWorkSubmit}
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
                  disabled={state.newWorkSubmit}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Work Description"
          >
            <TextArea placeholder="Optional" allowClear disabled={state.newWorkSubmit} />
          </Form.Item>

          <Form.Item className="amr-login-submit">
            <Button
              type="primary"
              size="large"
              icon={<CheckOutlined />}
              htmlType="submit"
              loading={state.newWorkSubmit}
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
              disabled={state.newWorkSubmit}
            >
              Clear All Fields
            </Button>
          </Form.Item>

        </Form>
      </Card>

      <AddNewClient state={state} setState={setState} onSubmit={createNewClient} />
    </div>
  );
};

export default AddNewWork;
