import React from "react";
import { LoginContextContainer } from "../../contexts";
import "./style.css";

import Form from "./form";
import { Row, Col } from "antd";

const Add: React.FC = () => {
  return (
    <LoginContextContainer>
      <Row
        style={{
          backgroundColor: "#f2f9f2",
          position: "fixed",
          width: "100%",
          height: "100%",
        }}
      >
        <Col lg={8} sm={4} md={4} xs={1} />
        <Col lg={8} sm={16} md={16} xs={22}>
          <Form />
        </Col>
        <Col lg={8} sm={4} md={4} xs={1} />
      </Row>
    </LoginContextContainer>
  );
};

export default Add;
