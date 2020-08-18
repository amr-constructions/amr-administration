import { HomeOutlined, MoneyCollectTwoTone, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const AccountsHead = () => (
  <div>
    <Breadcrumb separator=">">
      <Breadcrumb.Item>
        <HomeOutlined />
        <span> Dashboard </span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <UserOutlined />
        <span> Accounts Management </span>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Title
      level={4}
      style={{
        marginTop: '0.4rem',
      }}
    >
      <MoneyCollectTwoTone />
      <span> Accounts Head </span>
    </Title>

  </div>
);

export default AccountsHead;
