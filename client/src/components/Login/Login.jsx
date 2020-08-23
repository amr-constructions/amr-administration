import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/img/amr_logo_black.png';
import Constants from '../../constants/Constants';
import Authenticate from '../../services/Auth';
import './Login.css';

const { Title } = Typography;

function Login({ history }) {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const [ states, setStates ] = useState({
    loading: false,
    isToastShown: false,
    lastFocus: userNameRef,
  });

  const submitLoginForm = async (values) => {
    if (states.isToastShown) {
      message.destroy();
    }
    setStates((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await Authenticate(Constants.LOGIN, values);
    if (response.code !== Constants.SUCCESS) {
      setStates((prevState) => ({
        ...prevState,
        loading: false,
        isToastShown: true,
      }));

      states.lastFocus.current.focus();

      message.error(`${response.reason} [${response.debugCode}]`);
      return;
    }

    setStates((prevState) => ({
      ...prevState,
      isToastShown: true,
    }));
    message.success('Authentication Successful');

    /* Goto dashboard */
    history.push('/dashboard');
  };

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

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
                disabled={states.loading}
                ref={userNameRef}
                onFocus={() => setStates((prevState) => ({
                  ...prevState,
                  lastFocus: userNameRef,
                }))}
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
                disabled={states.loading}
                ref={passwordRef}
                onFocus={() => setStates((prevState) => ({
                  ...prevState,
                  lastFocus: passwordRef,
                }))}
              />
            </Form.Item>

            <Form.Item className="amr-login-submit">
              <Button
                type="primary"
                size="large"
                icon={<LoginOutlined />}
                htmlType="submit"
                loading={states.loading}
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
