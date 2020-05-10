import React, { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { BudgetTypeContext } from "../../contexts/budget_types";

const AnggotaTypeEdit = React.memo((props: { id: any }) => {
  const budgetType = useContext(BudgetTypeContext);

  useEffect(() => {
    budgetType?.getBudgetType(props.id);
  }, []);

  useEffect(() => {
    budgetType?.setErrors({});
    budgetType?.clearListRoles();
  }, []);

  return (
    <Row>
      <Col span={6} />
      <Col span={12}>
        <HeaderPage title="Ubah Master Budget" />
        <RoleForm form="edit" />
      </Col>
      <Col span={6} />
    </Row>
  );
});

export default AnggotaTypeEdit;
