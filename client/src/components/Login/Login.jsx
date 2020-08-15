import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import logo from '../../assets/img/amr_logo_black.png';
import './Login.css';

const { Title } = Typography;

function Login() {
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
              />
            </Form.Item>

            <Form.Item className="amr-login-submit">
              <Button
                type="primary"
                size="large"
                icon={<LoginOutlined />}
                htmlType="submit"
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
