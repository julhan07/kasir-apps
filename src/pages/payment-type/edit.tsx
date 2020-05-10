import React, { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import RoleForm from "./form";
import { PaymentTypeContext } from "../../contexts/anggota-type";

const AnggotaTypeEdit = React.memo((props: { id: any }) => {
  const paymentTypeContext = useContext(PaymentTypeContext);

  useEffect(() => {
    paymentTypeContext?.getPeymentType(props.id);
  }, []);

  useEffect(() => {
    paymentTypeContext?.setErrors({});
    paymentTypeContext?.clearListRoles();
  }, []);

  return (
    <Row>
      <Col span={6} />
      <Col span={12}>
        <HeaderPage title="Ubah Metode Pembayaran" />
        <RoleForm form="edit" />
      </Col>
      <Col span={6} />
    </Row>
  );
});

export default AnggotaTypeEdit;
