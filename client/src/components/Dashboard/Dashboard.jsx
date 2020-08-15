import { Col, Row, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

function Dashboard() {
  return (
    <Row>
      <Col>
        <Title level={2}>Welcome To Dashboard</Title>
      </Col>
    </Row>
  );
}

export default Dashboard;
