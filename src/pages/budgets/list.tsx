import React, { useEffect, useContext, useState } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Tooltip,
  Select,
  Popconfirm,
  Icon,
  Spin,
} from "antd";
import { ButtonAdd } from "../../components/button";
import { Link } from "react-router-dom";
import HeaderPage from "../../components/header";
import { BudgetContext } from "../../contexts/budgets";
import FormItem from "../../components/FormItem";
import { FormatMataUang } from "../../helpers/formtMataUang";
import moment from "moment";
import { Context } from "react-responsive";

const { Option } = Select;

const AnggotaTypeList = React.memo((props: { type: any }) => {
  const budgetContext = useContext(BudgetContext);

  const [typeKas, setTypeKas] = useState(props.type);

  const showTotalData = () => {
    return (
      <div>
        {"Jumlah data " +
          budgetContext?.listData.length +
          " dari " +
          budgetContext?.count +
          " data "}
      </div>
    );
  };

  useEffect(() => {
    setTypeKas(props.type);
    budgetContext?.getBudgetTypes({
      order: "desc",
      sortby: "id",
      jenis_kas: props.type,
    });
  }, []);

  useEffect(() => {
    if (props.type != typeKas) {
      budgetContext?.getBudgetTypes({
        order: "desc",
        sortby: "id",
        jenis_kas: props.type,
      });
    }
    setTypeKas(props.type);
  }, [props.type]);

  const columnsKasMasuk = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Tanggal",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: any) => (
        <span>{moment(created_at).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Nama",
      dataIndex: "budget_type",
      key: "budget_type",
      render: (budget_type: any) => <span>{budget_type.name}</span>,
    },
    // {
    //   title: "Jenis Kas",
    //   dataIndex: "type",
    //   key: "type",
    // },
    {
      title: "Asal Dana",
      dataIndex: "asal_dana",
      key: "asal_dana",
    },
    {
      title: "Jumlah",
      dataIndex: "total",
      key: "total",
      render: (price: any) => {
        return <span>{FormatMataUang(String(price))}</span>;
      },
    },
    {
      title: "Dibuat Oleh",
      dataIndex: "created_by",
      key: "created_by",
      render: (created_by: any) => <span>{created_by.name}</span>,
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <div>
          <Tooltip title="Ubah">
            <Link to={`/budget?action=edit&id=${id}`}>
              <Icon type="edit" />
            </Link>
          </Tooltip>
          {/* <span />{" "}
          <Tooltip title="Hapus">
            <Popconfirm
              title="Apakah yakin ingin menghapus master posko ?"
              onConfirm={() => budgetContext?.handleDelete(id)}
            >
              <Icon type="delete" />
            </Popconfirm>
          </Tooltip>S
        // </div> */}
        </div>
      ),
    },
  ];

  const columnsKasKeluar = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Tanggal",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: any) => (
        <span>{moment(created_at).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Keperluan",
      dataIndex: "budget_type",
      key: "budget_type",
      render: (budget_type: any) => <span>{budget_type.name}</span>,
    },
    {
      title: "Jumlah",
      dataIndex: "total",
      key: "total",
      render: (price: any) => {
        return <span>{FormatMataUang(String(price))}</span>;
      },
    },
    {
      title: "Dibuat Oleh",
      dataIndex: "created_by",
      key: "created_by",
      render: (created_by: any) => <span>{created_by.name}</span>,
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <div>
          <Tooltip title="Ubah">
            <Link to={`/budget?action=edit&id=${id}`}>
              <Icon type="edit" />
            </Link>
          </Tooltip>
          {/* <span />{" "}
          <Tooltip title="Hapus">
            <Popconfirm
              title="Apakah yakin ingin menghapus master posko ?"
              onConfirm={() => budgetContext?.handleDelete(id)}
            >
              <Icon type="delete" />
            </Popconfirm>
          </Tooltip>S
        // </div> */}
        </div>
      ),
    },
  ];

  return (
    <Spin spinning={budgetContext?.loading}>
      <Row>
        <HeaderPage
          title={props.type == "Kas Keluar" ? "Biaya-Biaya" : props.type}
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
                  value={budgetContext?.limit}
                  onChange={budgetContext?.handleChangeLimit}
                >
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                  <Option value={40}>40</Option>
                </Select>
              </Col>
              <Col span={6}>
                <form onSubmit={budgetContext?.handleOnSearch}>
                  <FormItem
                    title=""
                    name="cari"
                    value={budgetContext?.search}
                    placeHolder="Search..."
                    type="text"
                    setData={budgetContext?.handleInputSearch}
                  />
                </form>
              </Col>
            </Row>
            <Table
              dataSource={budgetContext?.listData}
              columns={
                typeKas == "Kas Masuk" ? columnsKasMasuk : columnsKasKeluar
              }
              loading={budgetContext?.loading}
              pagination={{
                pageSize: budgetContext?.limit,
                total: budgetContext?.count,
                showTotal: showTotalData,
              }}
              onChange={(record, index) =>
                budgetContext?.handleChangePagination(
                  budgetContext.limit,
                  record.current
                )
              }
            />
          </Card>
        </Col>
      </Row>
    </Spin>
  );
});

export default AnggotaTypeList;
