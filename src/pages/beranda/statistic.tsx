import React, { useEffect, useState } from "react";
import { Card, Row, Col, Icon, Spin } from "antd";

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
      <Row gutter={12}>
        <Col span={6}>
          <Card
            title={
              <div>
                <Icon type="sync" /> Total Harga Jual
              </div>
            }
          >
            <h1 style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
              Rp. {FormatMataUang(String(data.total_harga_jual))}
            </h1>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={
              <span>
                <Icon type="sync" /> Total Harga Pokok
              </span>
            }
          >
            <h1 style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
              Rp. {FormatMataUang(String(data.total_harga_awal))}
            </h1>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={
              <div>
                <Icon type="sync" /> Laba Kotor
              </div>
            }
          >
            <h1 style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
              Rp. {FormatMataUang(String(data.laba_kotor))}
            </h1>
          </Card>
        </Col>

        <Col span={6}>
          <Card
            title={
              <span>
                <Icon type="sync" /> Total Aset
              </span>
            }
          >
            <h1 style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
              Rp. {FormatMataUang(String(data.total_asset))}
            </h1>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistic;
