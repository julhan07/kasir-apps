import React, { useContext, useEffect } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { MasterPoskoContext } from "../../contexts/master-posko";

const AnggotaTypeAdd = React.memo(() => {
  const masterPoskoContext = useContext(MasterPoskoContext);

  useEffect(() => {
    masterPoskoContext?.setErrors({});
    masterPoskoContext?.clerForm();
    masterPoskoContext?.clearListRoles();
  }, []);

  return (
    <div style={{ margin: 10 }}>
      <HeaderPage title="Tambah Produk" />
      <RoleForm form="add" />
      <br />
    </div>
  );
});

export default AnggotaTypeAdd;
