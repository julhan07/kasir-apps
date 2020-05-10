import React from "react";
import { Layout } from "antd";
import "./style.css";

const { Header } = Layout;

const HeaderPage = (props: { title: string; action?: any }) => (
  <div>
    <Header className="app-header">
      <span className="pin" /> <span className="pin-label">{props.title}</span>
      <div style={{ float: "right" }}>{props.action}</div>
    </Header>
  </div>
);

export default React.memo(HeaderPage);
