import React, { useEffect, useContext } from "react";
import { Card, Row, Col, Table, Tooltip, Select, Popconfirm, Icon } from "antd";
import { ButtonAdd } from "../../components/button";
import { Link } from "react-router-dom";
import HeaderPage from "../../components/header";
import { BudgetTypeContext } from "../../contexts/budget_types";
import FormItem from "../../components/FormItem";
import { FormatMataUang } from "../../helpers/formtMataUang";

const { Option } = Select;

const AnggotaTypeList = React.memo(() => {
  const budgetTypeContext = useContext(BudgetTypeContext);

  const showTotalData = () => {
    return (
      "Jumlah data " +
      budgetTypeContext?.listData.length +
      " dari " +
      budgetTypeContext?.count +
      " data "
    );
  };

  useEffect(() => {
    budgetTypeContext?.getBudgetTypes();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Nama Budget",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: any) => {
        return <span>{FormatMataUang(String(price))}</span>;
      },
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <div>
          <Tooltip title="Ubah">
            <Link to={`/type-budget?action=edit&id=${id}`}>
              <Icon type="edit" />
            </Link>
          </Tooltip>
          <span />{" "}
          <Tooltip title="Hapus">
            <Popconfirm
              title="Apakah yakin ingin menghapus master posko ?"
              onConfirm={() => budgetTypeContext?.handleDelete(id)}
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
        title="Master Budget"
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
                value={budgetTypeContext?.limit}
                onChange={budgetTypeContext?.handleChangeLimit}
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={40}>40</Option>
              </Select>
            </Col>
            <Col span={6}>
              <form onSubmit={budgetTypeContext?.handleOnSearch}>
                <FormItem
                  title=""
                  name="cari"
                  value={budgetTypeContext?.search}
                  placeHolder="Search..."
                  type="text"
                  setData={budgetTypeContext?.handleInputSearch}
                />
              </form>
            </Col>
          </Row>
          <Table
            dataSource={budgetTypeContext?.listData}
            columns={columns}
            loading={budgetTypeContext?.loading}
            pagination={{
              pageSize: budgetTypeContext?.limit,
              total: budgetTypeContext?.count,
              showTotal: showTotalData,
            }}
            onChange={(record, index) =>
              budgetTypeContext?.handleChangePagination(
                budgetTypeContext.limit,
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
