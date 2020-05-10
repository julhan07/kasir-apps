import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Row,
  Col,
  Icon,
  Spin,
  Divider,
  DatePicker,
  Form,
  Button,
} from "antd";
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
      <HeaderPage title="Neraca" action={<DatePicker.RangePicker />} />
      <Row gutter={12}>
        <Col span={24}>
          <Card>
            <h4>Aset</h4>
            <Divider />
            <Row style={{ marginBottom: 10 }}>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Investasi
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>Rp. {FormatMataUang(String(data.investasi))}</Col>
            </Row>

            <Row>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Kas ditangan
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp. {FormatMataUang(String(data.sisa_modal_ditangan))}
              </Col>
            </Row>
            {/* <br /> */}

            {/* <Row>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Produk Belum Terjual
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp. {FormatMataUang(String(data.total_harga_sisa_stok))}
              </Col>
            </Row> */}

            <br />

            <Row>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Modal
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp. {FormatMataUang(String(data.total_modal_awal))}
              </Col>
            </Row>

            <Divider />
            <Row>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Total Assets
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp. {FormatMataUang(String(data.total_asset))}
              </Col>
            </Row>
            <Divider />
            <h4>Ekuitas</h4>
            <Divider />
            <Row>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Laba ditahan
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp. {FormatMataUang(String(data.laba_kotor - data.kas_keluar))}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Piutang Penjualan
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>Rp. {FormatMataUang(String(data.kas_keluar))}</Col>
            </Row>
            <br />
            <Row>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Saldo Awal
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp. {FormatMataUang(String(data.total_asset))}
              </Col>
            </Row>

            <Divider />
            <Row>
              <Col span={10} style={{ fontWeight: "bold" }}>
                Total Ekuitas
              </Col>
              <Col span={2}>:</Col>
              <Col span={12}>
                Rp.{" "}
                {FormatMataUang(
                  String(data.total_asset + data.laba_kotor - data.kas_keluar)
                )}
              </Col>
            </Row>
            <Divider />
            {/* <Button>Kembali</Button> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistic;
