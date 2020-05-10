import React, { useContext, useEffect } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { BudgetTypeContext } from "../../contexts/budget_types";

const AnggotaTypeAdd = React.memo(() => {
  const bugdetType = useContext(BudgetTypeContext);

  useEffect(() => {
    bugdetType?.setErrors({});
    bugdetType?.clerForm();
    bugdetType?.clearListRoles();
  }, []);

  return (
    <div style={{ margin: 10 }}>
      <HeaderPage title="Tambah Master Budget" />
      <RoleForm form="add" />
    </div>
  );
});

export default AnggotaTypeAdd;
