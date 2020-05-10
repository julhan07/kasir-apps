import React, { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { RolesContext } from "../../contexts/role";

const UserEdit = React.memo((props: { id: any }) => {
  const roleContext = useContext(RolesContext);

  useEffect(() => {
    roleContext?.getRole(props.id);
  }, []);

  useEffect(() => {
    roleContext?.setErrors({});
    roleContext?.clearListRoles();
  }, []);

  return (
    <Row>
      <Col span={6} />
      <Col span={12}>
        <HeaderPage title="Ubah Role" />
        <RoleForm form="edit" />
      </Col>
      <Col span={6} />
    </Row>
  );
});

export default UserEdit;
