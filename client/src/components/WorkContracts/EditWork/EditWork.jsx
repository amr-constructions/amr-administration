import { CloseOutlined, EditOutlined, EditTwoTone, HomeOutlined, UserOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import config from '../../../config/config';
import Constants from '../../../constants/Constants';
import { formatValue, imitateNumberInput } from '../../../utils/InputUtils';
import ClientServices from '../../Clients/services/entry';
import NavigationPath from '../../NavigationPath/NavigationPath';
import AddNewClient from '../AddNewWork/AddNewClient';
import { workCategories } from '../common/model';
import Services from '../services/entry';
import './EditWork.css';

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
    title: 'Edit Work Details',
    icon: EditTwoTone,
  },
];

const disabledDate = (current) => current && current < moment().endOf('day');

/* Map the response to corresponding form names */
const getFormUnderstandableResponse = (responseData) => ({
  workName: responseData.name,
  location: responseData.location,
  category: responseData.category,
  supervisor: responseData.supervisor,
  client: responseData.client_id,
  budget: parseFloat(responseData.budget).toFixed(2),
  completeOn: moment(responseData.completeOn),
  description: responseData.description,
});

const EditWork = ({ match, history }) => {
  const formRef = useRef(null);

  const [ state, setState ] = useState({
    clientNames: [],
    newClientFormVisible: false,
    newClientName: '',
    modalSubmit: false,
    disableClientList: false,
    updateWorkSubmit: false,
    id: null,
    dataForEdit: {
    },
    loading: true,
  });

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

  const updateWorkContract = async (values) => {
    setState((prevState) => ({
      ...prevState,
      updateWorkSubmit: true,
    }));

    const response = await Services[Constants.WORKS_MGMT.UPDATE_WORK](state.id, values);
    if (response.code !== Constants.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        updateWorkSubmit: false,
      }));

      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    history.push('/dashboard/work_contracts/view_all_works');
    message.success('Work Contract Updated Successfully!');
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

    const getWorkDetails = async function () {
      const response = await Services[Constants.WORKS_MGMT.GET_WORK](match.params.id);
      if (response.code !== Constants.SUCCESS) {
        message.error(`${response.reason} [${response.debugCode}]`);
        return;
      }

      const formData = getFormUnderstandableResponse(response.data);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        id: response.data.id,
        dataForEdit: formData,
      }));
      formRef.current.setFieldsValue(formData);
    };

    getClientList();
    getWorkDetails();
  }, [ match.params.id ]);

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Card loading={state.loading}>
        <Form
          name="amr-new-work-form"
          hideRequiredMark
          layout="vertical"
          ref={formRef}
          onFinish={updateWorkContract}
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
              disabled={state.updateWorkSubmit}
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
              disabled={state.updateWorkSubmit}
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
              disabled={state.updateWorkSubmit}
            >
              {
                Object.keys(workCategories).map((item) => (<Option key={item}>{workCategories[item]}</Option>))
              }
            </Select>
          </Form.Item>

          <Row gutter={10}>
            <Col span={12}>
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
                  disabled={state.disableClientList || state.updateWorkSubmit}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="supervisor"
                label="Supervisor"
                rules={[
                  {
                    required: true,
                    message: 'Supervisor cannot be empty!',
                  },
                ]}
              >
                <Select
                  showSearch
                  filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  style={{
                    width: '100%',
                  }}
                  placeholder="Select Supervisor"
                  size="large"
                  options={state.superVisorNames}
                  disabled={state.disableClientList || state.updateWorkSubmit}
                />
              </Form.Item>
            </Col>
          </Row>

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
                onChange={(e) => imitateNumberInput(e, formRef, 'budget')}
                onBlur={(e) => formatValue(e, formRef, 'budget')}
              >
                <Input
                  prefix={config.LOCALE.currencySymbol}
                  size="large"
                  style={{
                    width: '100%',
                  }}
                  placeholder={`Budget Amount (in ${config.LOCALE.currencySymbol})`}
                  disabled={state.updateWorkSubmit}
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
                  disabled={state.updateWorkSubmit}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Work Description"
          >
            <TextArea placeholder="Optional" allowClear disabled={state.updateWorkSubmit} />
          </Form.Item>

          <Form.Item className="amr-login-submit">
            <Button
              type="primary"
              size="large"
              icon={<EditOutlined />}
              htmlType="submit"
              loading={state.updateWorkSubmit}
            >
              Update Work Contract
            </Button>
          </Form.Item>

          <Form.Item className="amr-form-reset">
            <Button
              size="large"
              icon={<CloseOutlined />}
              htmlType="reset"
              onClick={() => formRef.current.setFieldsValue(state.dataForEdit)}
              disabled={state.updateWorkSubmit}
            >
              Reset All Fields
            </Button>
          </Form.Item>

        </Form>
      </Card>

      <AddNewClient state={state} setState={setState} onSubmit={createNewClient} />
    </div>
  );
};

EditWork.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.exact({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default EditWork;
