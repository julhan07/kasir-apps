import React, { useContext, useEffect } from "react";
import FormItem from "../../components/FormItem";
import { MasterPoskoContext } from "../../contexts/master-posko";
import { Card, Divider, Row, Col, Spin } from "antd";
import { ButtonSave, ButtonBack } from "../../components/button";

const AnggotaTypeForm = React.memo((props: { form: string }) => {
  const context = useContext(MasterPoskoContext);

  return (
    <Spin spinning={context?.loading}>
      <Card>
        <Row gutter={12}>
          <Col span={12}>
            <FormItem
              title="Nama Paket"
              errors={context?.errors["name"]}
              type="text"
              name="name"
              required={true}
              field="name"
              placeHolder="Nama Paket"
              value={context?.data?.name}
              setData={(e) =>
                context?.dinamicHandleFunc("name", e.target.value)
              }
            />
          </Col>
          <Col span={12}>
            <FormItem
              title="Harga Satuan"
              errors={context?.errors["price"]}
              type="number"
              name="name"
              required={true}
              field="name"
              placeHolder="Harga satuan"
              value={context?.data?.price || ""}
              setData={(e) =>
                context?.dinamicHandleFunc("price", e.target.value)
              }
            />
          </Col>
          <Col span={12}>
            <FormItem
              title="Harga Awal / Harga Beli"
              errors={context?.errors["original_price"]}
              type="number"
              name="name"
              required={true}
              field="name"
              placeHolder="Harga Awal / Harga Beli"
              value={context?.data?.original_price || ""}
              setData={(e) =>
                context?.dinamicHandleFunc("original_price", e.target.value)
              }
            />
          </Col>
          <Col span={12}>
            <FormItem
              title="Stok"
              errors={context?.errors["stock"]}
              type="number"
              name="name"
              required={true}
              field="name"
              placeHolder="Stok"
              value={context?.data?.stock || ""}
              setData={(e) =>
                context?.dinamicHandleFunc("stock", e.target.value)
              }
            />
          </Col>
        </Row>

        <Divider />
        <ButtonBack Title="Kembali" OnClick={context?.handleButtonBack} />
        <ButtonSave
          Title="Simpan"
          OnClick={
            props.form == "add"
              ? context?.handleSubmit
              : context?.handleSubmitEdit
          }
        />
      </Card>
    </Spin>
  );
});

export default AnggotaTypeForm;
