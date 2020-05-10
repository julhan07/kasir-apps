import React, { useContext, useEffect } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import PenggunaForm from "./form";
import { UserContext } from "../../contexts/user";

const PenggunaAdd = React.memo(() => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext?.setErrors({});
    userContext?.clerForm();
    userContext?.clearListUsers();
  }, []);

  return (
    <Row>
      <Col sm={24}>
        <HeaderPage title="Tambah Pengguna" />
        <PenggunaForm form="add" />
      </Col>
    </Row>
  );
});

export default PenggunaAdd;
