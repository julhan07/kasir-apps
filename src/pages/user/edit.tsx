import React, { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import PenggunaForm from "./form";
import { UserContext } from "../../contexts/user";

const UserEdit = React.memo((props: { id: any }) => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext?.getUser(props.id);
  }, []);

  useEffect(() => {
    userContext?.setErrors({});
    userContext?.clearListUsers();
  }, []);

  return (
    <Row>
      <Col sm={24}>
        <HeaderPage title="Ubah Pengguna" />
        <PenggunaForm form="edit" />
      </Col>
    </Row>
  );
});

export default UserEdit;
