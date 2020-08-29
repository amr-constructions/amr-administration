import { HomeOutlined, PropertySafetyTwoTone, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, message, Select, Space } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import config from '../../../config/config';
import Constants from '../../../constants/Constants';
import NavigationPath from '../../NavigationPath/NavigationPath';
import Services from '../services/entry';
import './AccountLedger.css';
import LedgerTable from './LedgerTable';

const { RangePicker } = DatePicker;

const navigationPath = [
  {
    level: 0,
    title: 'Dashboard',
    icon: HomeOutlined,
    route: '/dashboard',
  },
  {
    level: 1,
    title: 'Accounts Management',
    icon: UserOutlined,
  },
  {
    level: 2,
    title: 'Account Ledger',
    icon: PropertySafetyTwoTone,
  },
];

const AccountLedger = ({ match }) => {
  const formRef = useRef(null);

  const [ state, setState ] = useState({
    submit: false,
    accountNames: [],
    txnData: {
    },
    showResult: false,
    isToastShown: false,
  });

  const disabledDate = (current) => current && current >= moment().endOf('day');

  useEffect(() => {
    const getAccountHeadsList = async function () {
      const response = await Services[Constants.ACCOUNTS_MGMT.GET_ACCOUNT_HEADS]();
      if (response.code !== Constants.SUCCESS) {
        message.error(`${response.reason} [${response.debugCode}]`);
        return;
      }

      setState((prevState) => ({
        ...prevState,
        accountNames: response.data.map((item) => ({
          label: item.head_name,
          value: item.id,
        })),
      }));

      if (match.params.id) {
        if (response.data.find(({ id }) => id === match.params.id)) {
          formRef.current.setFieldsValue({
            account_name: match.params.id,
          });
        }
      }
    };

    getAccountHeadsList();
  }, []);

  const searchAccountTxns = async (values) => {
    if (state.isToastShown) {
      message.destroy();
      setState((prevState) => ({
        ...prevState,
        isToastShown: false,
      }));
    }

    setState((prevState) => ({
      ...prevState,
      submit: true,
    }));

    const response = await Services[Constants.ACCOUNTS_MGMT.GET_ACCOUNT_TXNS](values);
    if (response.code !== Constants.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        submit: false,
        isToastShown: true,
      }));

      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    setState((prevState) => ({
      ...prevState,
      txnData: response.data,
      submit: false,
      showResult: true,
      isToastShown: true,
    }));

    message.success('Account Transactions Retrieved Successfully !');
  };

  return (
    <div>
      <NavigationPath path={navigationPath} />

      <Card className="account-ledger-search">
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={searchAccountTxns}
          ref={formRef}
        >
          <Space size="large" align="end" className="account-ledger-search-form-spacer">

            <Form.Item
              label="Account"
              name="account_name"
              rules={[
                {
                  required: true,
                  message: 'Account Name Must Be Selected!',
                },
              ]}
            >
              <Select
                showSearch
                size="large"
                placeholder="Account Name"
                filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={state.submit}
                autoFocus
                options={state.accountNames}
                style={{
                  minWidth: 350,
                }}
              />
            </Form.Item>

            <Form.Item label="Time Period" name="period">
              <RangePicker
                size="large"
                renderExtraFooter={() => 'Leave Time Period Empty To Get All Transactions'}
                disabled={state.submit}
                format={config.LOCALE.dateFormat}
                disabledDate={disabledDate}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                htmlType="submit"
                loading={state.submit}
              >
                Search
              </Button>
            </Form.Item>

          </Space>
        </Form>
      </Card>

      {
        state.showResult ? <LedgerTable data={state.txnData} /> : null
      }

    </div>
  );
};

AccountLedger.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.exact({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default AccountLedger;
