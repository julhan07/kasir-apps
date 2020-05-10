import React, { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import PenggunaForm from "./form";
import { PaymentContext } from "../../contexts/payments";

const UserEdit = React.memo((props: { id: any }) => {
  const payments = useContext(PaymentContext);

  useEffect(() => {
    payments?.getPayment(props.id);
  }, []);

  useEffect(() => {
    payments?.setErrors({});
    payments?.clearListPayment();
  }, []);

  return (
    <Row>
      <Col sm={24}>
        <HeaderPage title="Ubah Transaksi" />
        <PenggunaForm form="edit" />
      </Col>
    </Row>
  );
});

export default UserEdit;
