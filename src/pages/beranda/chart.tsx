import React, { useContext, useEffect, useState } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { Card, Row, Col } from "antd";
import { FormatMataUang } from "../../helpers/formtMataUang";

import { apiGetAll } from "../../actions";

const ChartComponet = () => {
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
      <br />
      <Row gutter={12}>
        <Col span={12} style={{ padding: 5 }}>
          <Card>
            <Doughnut
              data={{
                labels: ["Lunas", "Hutang", "Total"],
                datasets: [
                  {
                    label: "",
                    data: [
                      data.total_lunas,
                      data.total_utang,
                      data.total_harga_jual,
                    ],
                    backgroundColor: ["green", "red", "blue"],
                    borderColor: ["green", "red", "blue"],
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Trafik Transaksi",
                },
              }}
            />
          </Card>
        </Col>
        <Col span={12} style={{ padding: 5 }}>
          <Card>
            <Line
              //   type="horizontalBar"
              data={{
                labels: ["Jan", "Peb", "Mar", "Apr", "Mei", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Trafik Transaksi Tahun 2020",
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    barPercentage: 0.5,
                    barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    borderWidth: 1,
                    data: [2000, 3000, 40000, 43000, 56000, 2000, 70000],
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Trafik Transaksi",
                },
              }}
              //   options={{ maintainAspectRatio: true }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChartComponet;
