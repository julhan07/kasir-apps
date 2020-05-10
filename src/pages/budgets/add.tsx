import React, { useContext, useEffect } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { BudgetContext } from "../../contexts/budgets";

const AnggotaTypeAdd = React.memo(() => {
  const bugdet = useContext(BudgetContext);

  useEffect(() => {
    bugdet?.setErrors({});
    bugdet?.clerForm();
    bugdet?.clearListRoles();
  }, []);

  return (
    <div style={{ margin: 10 }}>
      <Row>
        <Col span={4} />
        <Col span={16}>
          <HeaderPage title="Tambah Kas" />
          <RoleForm form="add" />
        </Col>
        <Col span={4} />
      </Row>
    </div>
  );
});

export default AnggotaTypeAdd;
