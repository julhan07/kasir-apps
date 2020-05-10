import React, { useEffect, useContext } from "react";
import { Card, Row, Col, Table, Tooltip, Select, Popconfirm, Icon } from "antd";
import { ButtonAdd } from "../../components/button";
import { Link } from "react-router-dom";
import HeaderPage from "../../components/header";
import { RolesContext } from "../../contexts/role";
import moment from "moment";
import FormItem from "../../components/FormItem";
import "./style.css";

const { Option } = Select;

const PenggunaList = React.memo(() => {
  const roleContext = useContext(RolesContext);

  const showTotalData = () => {
    return (
      "Jumlah data " +
      roleContext?.listData.length +
      " dari " +
      roleContext?.count +
      " data "
    );
  };

  useEffect(() => {
    roleContext?.getRoles();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Nama Role",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Dibuat pada",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: any) => (
        <span>{moment(created_at).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <div>
          <Tooltip title="Ubah">
            <Link to={`/role?action=edit&id=${id}`}>
              <Icon type="edit" />
            </Link>
          </Tooltip>
          <span />{" "}
          <Tooltip title="Hapus">
            <Popconfirm
              title="Apakah yakin ingin menghapus role"
              onConfirm={() => roleContext?.handleDelete(id)}
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
        title="Role"
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
                value={roleContext?.limit}
                onChange={roleContext?.handleChangeLimit}
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={40}>40</Option>
              </Select>
            </Col>
            <Col span={6}>
              <form onSubmit={roleContext?.handleOnSearch}>
                <FormItem
                  title=""
                  name="cari"
                  value={roleContext?.search}
                  placeHolder="Search..."
                  type="text"
                  setData={roleContext?.handleInputSearch}
                />
              </form>
            </Col>
          </Row>
          <Table
            dataSource={roleContext?.listData}
            columns={columns}
            loading={roleContext?.loading}
            pagination={{
              pageSize: roleContext?.limit,
              total: roleContext?.count,
              showTotal: showTotalData,
            }}
            onChange={(record, index) =>
              roleContext?.handleChangePagination(
                roleContext.limit,
                record.current
              )
            }
          />
        </Card>
      </Col>
    </Row>
  );
});

export default PenggunaList;
