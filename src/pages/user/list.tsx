import React, { useEffect, useContext } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Avatar,
  Tooltip,
  Select,
  Popconfirm,
  Icon,
} from "antd";
import { ButtonAdd } from "../../components/button";
import { Link } from "react-router-dom";
import HeaderPage from "../../components/header";
import { UserContext } from "../../contexts/user";
import FormItem from "../../components/FormItem";
import moment from "moment";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
// import "./style.css";

const { Option } = Select;

const PenggunaList = React.memo(() => {
  const userContext = useContext(UserContext);

  const showTotalData = () => {
    return (
      "Jumlah data " +
      userContext?.listData.length +
      " dari " +
      userContext?.count +
      " data "
    );
  };

  useEffect(() => {
    userContext?.getUsers();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Nomor Telp",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Nama Lengkap",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <span>{role.name}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Avatar
          src={"http://localhost:9000/assets/thumbnail/" + image}
          size="large"
        />
      ),
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
            <Link to={`/pengguna?action=edit&id=${id}`}>
              <Icon type="edit" />
            </Link>
          </Tooltip>
          <span />{" "}
          <Tooltip title="Hapus">
            <Popconfirm
              title="Apakah yakin ingin menghapus data ini ?"
              onConfirm={() => userContext?.handleDelete(id)}
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
        title="Pengguna"
        action={
          <Link to="/pengguna?action=add">
            <ButtonAdd Title="Tambah" />
          </Link>
        }
      />
      <Col span={24}>
        <Card>
          <Row>
            <Col span={18}>
              <Select
                value={userContext?.limit}
                onChange={userContext?.handleChangeLimit}
              >
                <Option value={5}>5</Option>
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={40}>40</Option>
              </Select>
            </Col>
            <Col span={6}>
              <form onSubmit={userContext?.handleOnSearch}>
                <FormItem
                  name="cari"
                  value={userContext?.search}
                  placeHolder="Search..."
                  type="text"
                  setData={userContext?.handleInputSearch}
                />
              </form>
            </Col>
          </Row>

          <Table
            dataSource={userContext?.listData}
            columns={columns}
            loading={userContext?.loading}
            pagination={{
              pageSize: userContext?.limit,
              total: userContext?.count,
              showTotal: showTotalData,
            }}
            onChange={(record, index) =>
              userContext?.handleChangePagination(
                userContext.limit,
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
