import React, { useContext } from "react";
import FormItem from "../../components/FormItem";
import { LoginContext } from "../../contexts/login";
import { Card, Row, Col, Spin, Alert, Divider } from "antd";
import { ButtonSave } from "../../components/button";

const PenggunaForm = React.memo(() => {
  const context = useContext(LoginContext);

  return (
    <Card
      style={{
        justifyContent: "center",
        border: "none",
        marginTop: "20%",
        borderRadius: 5,
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ fontWeight: "bold", marginTop: 10 }}>
        Sign In <br />
        <span style={{ fontSize: 18 }}>Pondok Putra Teratai</span>
      </h1>

      <Divider />

      {context?.msgError && (
        <div style={{ textAlign: "center" }}>
          <Alert type="error" message={context?.msgError} />
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        <Spin spinning={context?.loading} />
      </div>
      <FormItem
        title="Nomor Telp"
        type="text"
        name="nomor Telp"
        field="email"
        required={true}
        errors={context?.errorPayload["username"]}
        placeHolder="Nomor Telp"
        value={context?.data?.username}
        setData={context?.handleEmail}
      />
      <FormItem
        title="Password"
        type="password"
        name="password"
        required={true}
        field="password"
        errors={context?.errorPayload["password"]}
        placeHolder="password"
        value={context?.data?.password}
        setData={context?.handlePassword}
      />

      <ButtonSave
        style={{
          width: "100%",
          fontWeight: "bold",
          height: 40,
          fontSize: 17,
          marginBottom: 20,
          marginTop: 10,
        }}
        Title="Login"
        OnClick={context?.handleSubmit}
      />
    </Card>
  );
});

export default PenggunaForm;
