import React, { useContext, useEffect } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { PaymentTypeContext } from "../../contexts/anggota-type";

const AnggotaTypeAdd = React.memo(() => {
  const paymentTypeContext = useContext(PaymentTypeContext);

  useEffect(() => {
    paymentTypeContext?.setErrors({});
    paymentTypeContext?.clerForm();
    paymentTypeContext?.clearListRoles();
  }, []);

  return (
    <Row>
      <Col span={6} />
      <Col span={12}>
        <HeaderPage title="Tambah Metode Pembayaran" />
        <RoleForm form="add" />
        <br />
      </Col>
      <Col span={6} />
    </Row>
  );
});

export default AnggotaTypeAdd;
