import React, { useEffect, useContext, useState } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Tooltip,
  Select,
  Button,
  Modal,
  Form,
  Tag,
  DatePicker,
  Divider,
  Icon,
} from "antd";
import { ButtonAdd, ButtonBack } from "../../components/button";
import { Link } from "react-router-dom";
import HeaderPage from "../../components/header";
import { PaymentContext } from "../../contexts/payments";
import { MasterPoskoContext as PacketType } from "../../contexts/master-posko";
import FormItem from "../../components/FormItem";
import { FormatMataUang } from "../../helpers/formtMataUang";
import moment from "moment";
import "./style.css";

import { UserContext } from "../../contexts/user";

const { Option } = Select;

const PaymentList = React.memo(() => {
  const paymentContext = useContext(PaymentContext);
  const paket = useContext(PacketType);
  const user = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [visibleStatusKeuangan, setVisibleStatuaKeuangan] = useState(false);

  useEffect(() => {
    paymentContext?.getPayments({
      sortby: "id",
      order: "desc",
      limit: 6,
    });
    paket?.getMasterPoskos({
      limit: 200,
    });
    user?.getUsers({
      limi: 200,
    });
  }, []);

  const showTotalData = () => {
    return (
      <div>
        <a
          style={{ marginRight: 20, float: "left" }}
          onClick={onVisibleStatusKeuangan}
        >
          Cek Status Transaksi
        </a>
        {"Jumlah data " +
          paymentContext?.listData.length +
          " dari " +
          paymentContext?.count +
          " data "}
      </div>
    );
  };

  const onVisible = () => {
    setVisible(!visible);
  };

  const onVisibleStatusKeuangan = () => {
    setVisibleStatuaKeuangan(!visibleStatusKeuangan);
  };

  const onResetFilter = () => {
    paymentContext?.resetFilter({
      order: "desc",
      sortby: "id",
    });
    onVisible();
  };

  const onSubmitFilter = () => {
    paymentContext?.getPayments({
      sortby: "id",
      order: "desc",
      tanggal_awal: paymentContext.tanggal_awal,
      tanggal_ahir: paymentContext.tanggal_ahir,
      member_id: paymentContext.member_id,
      package_id: paymentContext.package_id,
    });
    setVisible(!visible);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    // {
    //   title: "No.Transaksi",
    //   dataIndex: "payment_number",
    //   key: "payment_number",
    // },
    {
      title: "Tgl Transaksi",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: any) => (
        <span>{moment(created_at).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Kasir",
      dataIndex: "member",
      key: "member",
      render: (member: any) => {
        return <span>{member.name}</span>;
      },
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Harga Satuan",
      dataIndex: "price",
      key: "price",
      render: (price: any) => {
        return FormatMataUang(String(price));
      },
    },

    {
      title: "Lunas",
      dataIndex: "total_payment",
      key: "total_payment",
      render: (total_payment: any, record: any) => {
        return FormatMataUang(
          String(record.price * record.qty - record.total_Amoun_debt)
        );
      },
    },

    {
      title: "Terhutang",
      dataIndex: "total_Amoun_debt",
      key: "total_Amoun_debt",
      render: (total_Amoun_debt: any) => {
        return FormatMataUang(String(total_Amoun_debt));
      },
    },
    {
      title: "Sub Total",
      dataIndex: "total_payment",
      key: "total_payment",
      render: (total_payment: any, record: any) => {
        return FormatMataUang(String(record.price * record.qty));
      },
    },
    {
      title: "Barang",
      dataIndex: "package_type",
      key: "package_type",
      render: (package_type: any) => {
        return <span>{package_type.name}</span>;
      },
    },

    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      // width: 10,
      render: (id: number) => (
        <div>
          <Tooltip title="Detail">
            <Link to={`/payments?action=detail&id=${id}`}>
              <Icon type="shrink" />
            </Link>
          </Tooltip>
          <span />{" "}
          <Tooltip title="Cetak Bukti Transaksi">
            <Icon type="printer" />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Row>
      <HeaderPage
        title="Payments"
        action={
          <div>
            <Link to="/payments?action=add">
              <ButtonAdd Title="Tambah" />
            </Link>{" "}
            <ButtonAdd OnClick={onVisible} Title="Filter" icon="filter" />
          </div>
        }
      />
      <Col span={24}>
        <Card>
          <Row gutter={12}>
            <Col span={18}>
              <Select
                value={paymentContext?.limit}
                onChange={paymentContext?.handleChangeLimit}
              >
                <Option value={5}>5</Option>
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={40}>40</Option>
              </Select>
            </Col>
            <Col span={6}>
              <form onSubmit={paymentContext?.handleOnSearch}>
                <FormItem
                  name="cari"
                  value={paymentContext?.search}
                  placeHolder="Search..."
                  type="text"
                  setData={paymentContext?.handleInputSearch}
                />
              </form>
            </Col>
          </Row>

          <Table
            dataSource={paymentContext?.listData}
            columns={columns}
            loading={paymentContext?.loading}
            pagination={{
              pageSize: paymentContext?.limit,
              total: paymentContext?.count,
              showTotal: showTotalData,
            }}
            onChange={(record, index) =>
              paymentContext?.handleChangePagination(
                paymentContext.limit,
                record.current
              )
            }
          />
        </Card>
        <Modal
          title="Status Keuangan"
          visible={visibleStatusKeuangan}
          onCancel={onVisibleStatusKeuangan}
          footer={false}
        >
          <Row gutter={12} style={{ fontSize: 25 }}>
            <Col span={11}>Lunas</Col>
            <Col span={1}>:</Col>
            <Col span={12} style={{ fontWeight: "bold", color: "green" }}>
              Rp.
              {paymentContext?.detailPayment &&
                FormatMataUang(
                  String(
                    paymentContext.detailPayment.all_total_payment -
                      paymentContext?.detailPayment.all_total_debt
                  )
                )}
            </Col>
            <Col span={11}>Terhutang</Col>
            <Col span={1}>:</Col>
            <Col span={12} style={{ fontWeight: "bold", color: "red" }}>
              Rp.{" "}
              {paymentContext?.detailPayment &&
                FormatMataUang(
                  String(paymentContext?.detailPayment.all_total_debt)
                )}
            </Col>
            <Col span={11}>Total</Col>
            <Col span={1}>:</Col>
            <Col
              span={12}
              style={{
                fontWeight: "bold",
              }}
            >
              Rp.{" "}
              {paymentContext?.detailPayment &&
                FormatMataUang(
                  String(paymentContext.detailPayment.all_total_payment)
                )}
              <span style={{ marginLeft: 10 }}>
                {paymentContext?.detailPayment.totalPendapatan >
                paymentContext?.detailPayment.all_total_debt ? (
                  <Icon type="rise" style={{ color: "green" }} />
                ) : (
                  <Icon type="rise" style={{ color: "red" }} />
                )}
              </span>
            </Col>
          </Row>
        </Modal>
        <Modal
          title="Filter Transaksi"
          okText="Filter Sekarang"
          cancelText="Reset"
          visible={visible}
          onCancel={onVisible}
          footer={false}
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Periode Tanggal">
                <DatePicker.RangePicker
                  onChange={(e) =>
                    paymentContext?.onChangeInputFilter("range_tanggal", e)
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Paket">
                <Select
                  onChange={(e) =>
                    paymentContext?.onChangeInputFilter("package_id", e)
                  }
                  value={paymentContext?.package_id}
                  style={{ width: "100%" }}
                >
                  <Option value="">-Pilih-</Option>
                  {paket?.listData.map((item, i) => {
                    return (
                      <Option key={item.no} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Kasir">
                <Select
                  onChange={(e) =>
                    paymentContext?.onChangeInputFilter("member_id", e)
                  }
                  value={paymentContext?.member_id}
                  style={{ width: "100%" }}
                >
                  <Option value="">-Pilih-</Option>
                  {user?.listData.map((item, i) => {
                    return (
                      <Option key={i} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Divider />
            <ButtonBack OnClick={onResetFilter} icon="reload" Title="Reset" />
            <div style={{ float: "right" }}>
              <ButtonAdd
                OnClick={onSubmitFilter}
                Title="Filter"
                icon="filter"
              />
            </div>
          </Row>
        </Modal>
      </Col>
    </Row>
  );
});

export default PaymentList;
