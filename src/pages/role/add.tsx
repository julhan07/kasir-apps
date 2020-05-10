import React, { useContext, useEffect } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { RolesContext } from "../../contexts/role";

const PenggunaAdd = React.memo(() => {
  const roleContext = useContext(RolesContext);

  useEffect(() => {
    roleContext?.setErrors({});
    roleContext?.clerForm();
    roleContext?.clearListRoles();
  }, []);

  return (
    <Row>
      <Col span={6} />
      <Col span={12}>
        <HeaderPage title="Tambah Role" />
        <RoleForm form="add" />
        <br />
      </Col>
      <Col span={6} />
    </Row>
  );
});

export default PenggunaAdd;
