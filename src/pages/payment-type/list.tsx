import React, { useEffect, useContext } from "react";
import { Card, Row, Col, Table, Tooltip, Select, Popconfirm, Icon } from "antd";
import { ButtonAdd } from "../../components/button";
import { Link } from "react-router-dom";
import HeaderPage from "../../components/header";
import { PaymentTypeContext } from "../../contexts/anggota-type";
import FormItem from "../../components/FormItem";

const { Option } = Select;

const AnggotaTypeList = React.memo(() => {
  const paymentTypeContext = useContext(PaymentTypeContext);

  const showTotalData = () => {
    return (
      "Jumlah data " +
      paymentTypeContext?.listData.length +
      " dari " +
      paymentTypeContext?.count +
      " data "
    );
  };

  useEffect(() => {
    paymentTypeContext?.getPeymentTypes();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Type Pembayaran",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => <img width={30} src={icon} />,
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <div>
          <Tooltip title="Ubah">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/tipe-pembayaran?action=edit&id=${id}`}
            >
              <Icon type="edit" />
            </Link>
          </Tooltip>
          <span />{" "}
          <Tooltip title="Hapus">
            <Popconfirm
              title="Apakah yakin ingin menghapus tipe anggota ?"
              onConfirm={() => paymentTypeContext?.handleDelete(id)}
            >
              <Icon type="delete" />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Row>
      <HeaderPage
        title="Metode Pembayaran"
        action={
          <Link to="?action=add">
            <ButtonAdd Title="Tambah" />
          </Link>
        }
      />
      <Col span={24}>
        <Card>
          <Row>
            <Col span={18}>
              <Select
                value={paymentTypeContext?.limit}
                onChange={paymentTypeContext?.handleChangeLimit}
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={40}>40</Option>
              </Select>
            </Col>
            <Col span={6}>
              <form onSubmit={paymentTypeContext?.handleOnSearch}>
                <FormItem
                  title=""
                  name="cari"
                  value={paymentTypeContext?.search}
                  placeHolder="Search..."
                  type="text"
                  setData={paymentTypeContext?.handleInputSearch}
                />
              </form>
            </Col>
          </Row>
          <Table
            dataSource={paymentTypeContext?.listData}
            columns={columns}
            loading={paymentTypeContext?.loading}
            pagination={{
              pageSize: paymentTypeContext?.limit,
              total: paymentTypeContext?.count,
              showTotal: showTotalData,
            }}
            onChange={(record, index) =>
              paymentTypeContext?.handleChangePagination(
                paymentTypeContext.limit,
                record.current
              )
            }
          />
        </Card>
      </Col>
    </Row>
  );
});

export default AnggotaTypeList;
