import { HomeOutlined, PropertySafetyTwoTone, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Select, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import config from '../../../config/config';
import NavigationPath from '../../NavigationPath/NavigationPath';
import './AccountLedger.css';

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

const AccountLedger = () => {
  const [ state, setState ] = useState({
    submit: false,
    options: [],
  });

  const disabledDate = (current) => current && current >= moment().endOf('day');

  return (
    <div>
      <NavigationPath path={navigationPath} />

      <Card className="account-ledger-search">
        <Form
          layout="vertical"
          hideRequiredMark
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
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={state.submit}
                autoFocus
                options={state.options}
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
    </div>
  );
};

export default AccountLedger;
