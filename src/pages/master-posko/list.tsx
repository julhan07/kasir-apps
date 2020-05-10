import React, { useEffect, useContext } from "react";
import { Card, Row, Col, Table, Tooltip, Select, Popconfirm, Icon } from "antd";
import { ButtonAdd } from "../../components/button";
import { Link } from "react-router-dom";
import HeaderPage from "../../components/header";
import { MasterPoskoContext } from "../../contexts/master-posko";
import FormItem from "../../components/FormItem";
import { FormatMataUang } from "../../helpers/formtMataUang";
import moment from "moment";

// import "./style.css";

const { Option } = Select;

const AnggotaTypeList = React.memo(() => {
  const masterPoskoContext = useContext(MasterPoskoContext);

  const showTotalData = () => {
    return (
      "Jumlah data " +
      masterPoskoContext?.listData.length +
      " dari " +
      masterPoskoContext?.count +
      " data "
    );
  };

  useEffect(() => {
    masterPoskoContext?.getMasterPoskos({
      order: "desc",
      sortby: "id",
    });
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Nama Produk",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Harga(Awal)",
      dataIndex: "original_price",
      key: "original_price",
      render: (original_price: any) => {
        return FormatMataUang(String(original_price));
      },
    },
    {
      title: "Harga Satuan (Jual)",
      dataIndex: "price",
      key: "price",
      render: (price: any) => {
        return FormatMataUang(String(price));
      },
    },

    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Update Terakhir",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: any) => {
        return moment(updated_at).format("DD-MM-YYYY, h:mm:ss");
      },
    },
    {
      title: "Dibuat Oleh",
      dataIndex: "created_by",
      key: "created_by",
      render: (created_by: any) => {
        return created_by.name;
      },
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <div>
          <Tooltip title="Ubah">
            <Link to={`/produk?action=edit&id=${id}`}>
              <Icon type="edit" />
            </Link>
          </Tooltip>
          <span />{" "}
          <Tooltip title="Hapus">
            <Popconfirm
              title="Apakah yakin ingin menghapus master posko ?"
              onConfirm={() => masterPoskoContext?.handleDelete(id)}
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
        title="Master Produk"
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
                value={masterPoskoContext?.limit}
                onChange={masterPoskoContext?.handleChangeLimit}
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={40}>40</Option>
              </Select>
            </Col>
            <Col span={6}>
              <form onSubmit={masterPoskoContext?.handleOnSearch}>
                <FormItem
                  title=""
                  name="cari"
                  value={masterPoskoContext?.search}
                  placeHolder="Search..."
                  type="text"
                  setData={masterPoskoContext?.handleInputSearch}
                />
              </form>
            </Col>
          </Row>
          <Table
            dataSource={masterPoskoContext?.listData}
            columns={columns}
            loading={masterPoskoContext?.loading}
            pagination={{
              pageSize: masterPoskoContext?.limit,
              total: masterPoskoContext?.count,
              showTotal: showTotalData,
            }}
            onChange={(record, index) =>
              masterPoskoContext?.handleChangePagination(
                masterPoskoContext.limit,
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
