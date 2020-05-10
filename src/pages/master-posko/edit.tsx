import React, { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { MasterPoskoContext } from "../../contexts/master-posko";

const AnggotaTypeEdit = React.memo((props: { id: any }) => {
  const masterPoskoContext = useContext(MasterPoskoContext);

  useEffect(() => {
    masterPoskoContext?.getMasterPosko(props.id);
  }, []);

  useEffect(() => {
    masterPoskoContext?.setErrors({});
    masterPoskoContext?.clearListRoles();
  }, []);

  return (
    <div style={{ margin: 10 }}>
      <HeaderPage title="Ubah Produk" />
      <RoleForm form="edit" />
    </div>
  );
});

export default AnggotaTypeEdit;
