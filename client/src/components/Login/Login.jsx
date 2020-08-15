import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd';
import React, { useState } from 'react';
import logo from '../../assets/img/amr_logo_black.png';
import Constants from '../../constants/Constants';
import Authenticate from '../../services/Auth';
import './Login.css';

const { Title } = Typography;

const handleToastClose = () => {
  /* Redirect To Dashboard */
};

function Login() {
  const [ loading, setLoading ] = useState(false);
  const [ isToastShown, setToastShown ] = useState(false);

  const submitLoginForm = async (values) => {
    if (isToastShown) {
      message.destroy();
    }
    setLoading(true);

    const response = await Authenticate(Constants.LOGIN, values);
    if (response.code !== Constants.SUCCESS) {
      setLoading(false);
      setToastShown(true);
      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    setToastShown(true);
    message.success('Authentication Successful', 1, handleToastClose);
  };

  return (
    <Row
      className="amr-login-container"
      justify="center"
      align="middle"
    >
      <Col>
        <Card className="amr-login-card">
          <div className="amr-logo-container">
            <img src={logo} className="logo" alt="AMR Constructions Logo" title="AMR Constructions" />
          </div>

          <Title
            className="amr-login-form-title"
            level={3}
          >
            Admin Console
          </Title>

          <Form
            name="amr-login-form"
            onFinish={submitLoginForm}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Username cannot be empty!',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Username"
                prefix={<UserOutlined />}
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Password cannot be empty!',
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                disabled={loading}
              />
            </Form.Item>

            <Form.Item className="amr-login-submit">
              <Button
                type="primary"
                size="large"
                icon={<LoginOutlined />}
                htmlType="submit"
                loading={loading}
              >
                Login!
              </Button>
            </Form.Item>

          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
