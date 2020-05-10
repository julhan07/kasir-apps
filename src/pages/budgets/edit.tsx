import React, { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { BudgetContext } from "../../contexts/budgets";

const AnggotaTypeEdit = React.memo((props: { id: any }) => {
  const budget = useContext(BudgetContext);

  useEffect(() => {
    budget?.getBudgetType(props.id);
  }, []);

  useEffect(() => {
    budget?.setErrors({});
    budget?.clearListRoles();
  }, []);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <HeaderPage title="Ubah Kas" />
        <RoleForm form="edit" />
      </Col>
      <Col span={4} />
    </Row>
  );
});

export default AnggotaTypeEdit;
