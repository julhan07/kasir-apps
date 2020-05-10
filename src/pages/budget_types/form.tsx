import React, { useContext, useEffect } from "react";
import FormItem from "../../components/FormItem";
import { BudgetTypeContext } from "../../contexts/budget_types";
import { Card, Divider, Row, Col, Spin } from "antd";
import { ButtonSave, ButtonBack } from "../../components/button";

const AnggotaTypeForm = React.memo((props: { form: string }) => {
  const context = useContext(BudgetTypeContext);

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
              title="Price"
              errors={context?.errors["price"]}
              type="number"
              name="price"
              required={true}
              field="price"
              placeHolder="Price"
              value={context?.data?.price}
              setData={(e) =>
                context?.dinamicHandleFunc("price", e.target.value)
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
