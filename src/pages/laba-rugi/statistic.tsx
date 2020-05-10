import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, DatePicker } from "antd";
import HeaderPage from "../../components/header";

import { FormatMataUang } from "../../helpers/formtMataUang";

import { apiGetAll } from "../../actions";

const Statistic: React.FC = () => {
  const [data, setData] = useState({
    total_harga_jual: 0,
    total_harga_awal: 0,
    total_utang: 0,
    total_lunas: 0,
    laba_kotor: 0,
    total_harga_sisa_stok: 0,
    total_asset: 0,
    kas_masuk: 0,
    kas_keluar: 0,
    investasi: 0,
    sisa_modal_ditangan: 0,
    total_modal_awal: 0,
  });

  const getAllStatistik = () => {
    apiGetAll("statistik", {}).then((res) => {
      setData(res.payload);
    });
  };

  useEffect(() => {
    getAllStatistik();
  }, []);

  return (
    <div>
      <HeaderPage title="Laba Rugi" action={<DatePicker.RangePicker />} />
      <Row gutter={12}>
        <Col span={24}>
          <Card>
            <Row style={{ marginBottom: 10 }}>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Transaksi Penjualan
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp. {FormatMataUang(String(data.total_harga_jual))}
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Pokok Penjualan
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp. {FormatMataUang(String(data.total_harga_awal))}
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Laba Kotor
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>Rp. {FormatMataUang(String(data.laba_kotor))}</Col>
            </Row>
            <Divider />
            <Row style={{ marginBottom: 10 }}>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Biaya - Biaya
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>Rp. {FormatMataUang(String(data.kas_keluar))}</Col>
            </Row>
            <Divider />
            <Row style={{ marginBottom: 10 }}>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Labar (Rugi) Bersih
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp. {FormatMataUang(String(data.laba_kotor - data.kas_keluar))}
              </Col>
            </Row>
            <Divider />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistic;
