import React, { useContext, useEffect } from "react";
import { Row, Col } from "antd";
import HeaderPage from "../../components/header";
import PenggunaForm from "./form";
import { PaymentContext } from "../../contexts/payments";

const PenggunaAdd = React.memo(() => {
  const payments = useContext(PaymentContext);

  useEffect(() => {
    payments?.setErrors({});
    payments?.clerForm();
    payments?.clearListPayment();
  }, []);

  return (
    <Row>
      <Col sm={24}>
        <HeaderPage title="Tambah Transaksi" />
        <PenggunaForm form="add" />
      </Col>
    </Row>
  );
});

export default PenggunaAdd;
