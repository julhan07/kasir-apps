import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Divider, Icon, Popconfirm, Modal } from "antd";
import "./style.css";
import { removeUserInfo, getUserInfo } from "../actions/storage";
import { useHistory, Link } from "react-router-dom";

import { Istate } from "../interfaces/user";
import { useMediaQuery } from "react-responsive";

const { Content, Sider } = Layout;

const SideBarApp = (props: any) => {
  const history = useHistory();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const [visible, setVisible] = useState(false);

  const [user, setUser] = useState<Istate>({
    name: "",
    email: "",
    phone_number: "",
    username: "",
    image: "",
    password: "",
    role: {
      id: 0,
      name: "",
    },
  });

  useEffect(() => {
    const newUser = JSON.parse(getUserInfo().user);
    setUser(newUser);
  }, []);

  const onLogout = () => {
    removeUserInfo();
    history.push("/login");
  };

  const onVisibel = () => {
    setVisible(!visible);
  };

  return (
    <Layout>
      <Sider theme="light" width="250" breakpoint="md">
        <div className="card-avatar">
          <div className="avatar-selector">
            <Avatar
              className="avatar-image"
              size={isTabletOrMobile ? 30 : 64}
              src={
                user && "http://localhost:9000/assets/thumbnail/" + user.image
              }
            />
          </div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 10,
              textAlign: "center",
            }}
          >
            {user && user.name}
          </p>
        </div>

        <Menu mode="vertical" inlineCollapsed={true} overflowedIndicator>
          <Menu.Item key={0} title="home">
            <Link to="/">
              <Icon type="home" />
              {!isTabletOrMobile && "Beranda"}
            </Link>
          </Menu.Item>

          <Menu.Item key={1.1}>
            <Link to="/pengguna">
              {" "}
              <Icon type="usergroup-add" />
              Pengguna
            </Link>
          </Menu.Item>

          <Menu.Item key={2.3}>
            <Link to="/produk">
              <Icon type="folder" />
              Produk
            </Link>
          </Menu.Item>

          <Menu.Item key={1}>
            <Link to="/payments">
              <Icon type="align-left" />
              Transaksi
            </Link>
          </Menu.Item>

          <Menu.SubMenu
            key="sub4"
            title={
              <span>
                <span>
                  {" "}
                  <Icon type="database" /> Master Data
                </span>
              </span>
            }
          >
            <Menu.Item key={1.2}>
              <Link to="/role">
                <Icon type="idcard" />
                Role Pengguna
              </Link>
            </Menu.Item>

            <Menu.Item key={2.2}>
              <Link to="/tipe-pembayaran">
                <Icon type="credit-card" />
                Metode Pembayaran
              </Link>
            </Menu.Item>

            <Menu.Item key={2.4}>
              <Link to="/type-budget">
                <Icon type="folder-open" />
                Alokasi / Asal Kas
              </Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu
            key="sub3"
            title={
              <span>
                <span>
                  {" "}
                  <Icon type="file-word" /> Modal & Pengeluaran
                </span>
              </span>
            }
          >
            <Menu.Item key={10}>
              <Link to="/budget?type=Investasi">Investasi</Link>
            </Menu.Item>

            <Menu.Item key={3}>
              <Link to="/budget?type=Kas Masuk">Kas Masuk</Link>
            </Menu.Item>

            <Menu.Item key={6}>
              <Link to="/budget?type=Kas Keluar">Biaya-Biaya</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu
            key="sub2"
            title={
              <span>
                <span>
                  {" "}
                  <Icon type="printer" /> Laporan
                </span>
              </span>
            }
          >
            <Menu.Item key={7}>
              <Link to="/arus-kas">Neraca</Link>
            </Menu.Item>
            <Menu.Item key={12}>
              <Link to="/labarugi">Laba Rugi</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key={8} title="Logout">
            <a onClick={onVisibel}>
              <Icon type="logout" />
              {!isTabletOrMobile && "Logout"}
            </a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Modal
        visible={visible}
        onCancel={onVisibel}
        cancelText="Batal"
        okText="Keluar"
        onOk={onLogout}
      >
        <h2 style={{ textAlign: "center" }}>
          Apakah Anda Yakin Ingin Keluar ?
        </h2>
      </Modal>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default SideBarApp;
