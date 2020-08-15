import { Card, Col, Row } from 'antd';

import React from 'react';
import logo from '../../assets/img/amr_logo_black.png';
import './Login.css';

function Login() {
  return (
    <Row
      className="amr-login"
      justify="center"
      align="middle"
      style={{
        minHeight: '100vh',
      }}
    >
      <Col>
        <Card
          style={{
            width: '50rem',
          }}
        >
          <center>
            <img src={logo} className="logo" alt="AMR Constructions Logo" title="AMR Constructions" />
          </center>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
