import React, { useContext, useEffect } from "react";
import FormItem from "../../components/FormItem";
import { BudgetContext } from "../../contexts/budgets";
import { BudgetTypeContext } from "../../contexts/budget_types";
import { Card, Divider, Row, Col, Spin, Form } from "antd";
import { ButtonSave, ButtonBack } from "../../components/button";
import TextArea from "antd/lib/input/TextArea";

const AnggotaTypeForm = React.memo((props: { form: string }) => {
  const context = useContext(BudgetContext);

  const budget_type = useContext(BudgetTypeContext);

  useEffect(() => {
    budget_type?.getBudgetTypes({
      limit: 200,
      sortby: "name",
      order: "asc",
    });
  }, []);

  const listBudgetType =
    budget_type?.listData &&
    budget_type.listData.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

  const listJenisBudget = [
    {
      value: "Kas Masuk",
      label: "Kas Masuk",
    },
    {
      value: "Kas Keluar",
      label: "Kas Keluar",
    },
    {
      value: "Investasi",
      label: "Investasi",
    },
  ];

  const listAsalDana = [
    {
      value: "Kas Masuk",
      label: "Kas Masuk",
    },
    {
      value: "Hasil Usaha",
      label: "Hasil Usaha",
    },
  ];

  return (
    <Spin spinning={context?.loading}>
      <Card>
        <Row gutter={12}>
          <Col span={12}>
            <FormItem
              title="Master Kas"
              errors={context?.errors["budget_type"]}
              type="select"
              name="name"
              required={true}
              field="name"
              optionList={listBudgetType}
              placeHolder="Nama Paket"
              value={context?.data?.budget_type.id || ""}
              setData={(e) => context?.dinamicHandleFunc("budget_type", e)}
            />
          </Col>
          <Col span={12}>
            <FormItem
              title="Jenis Kas"
              errors={context?.errors["type"]}
              type="select"
              name="price"
              required={true}
              field="price"
              placeHolder="Jenis Budget"
              optionList={listJenisBudget}
              value={context?.data?.type}
              setData={(e) => context?.dinamicHandleFunc("type", e)}
            />
          </Col>
          {context?.data?.type == "Kas Keluar" && (
            <Col span={12}>
              <FormItem
                title="Alokasi Anggaran Dari"
                errors={context?.errors["asal_dana"]}
                type="select"
                name="price"
                required={true}
                field="price"
                placeHolder="Jenis Budget"
                optionList={listAsalDana}
                value={context?.data?.asal_dana}
                setData={(e) => context?.dinamicHandleFunc("asal_dana", e)}
              />
            </Col>
          )}

          {context?.data?.type == "Kas Masuk" && (
            <Col span={12}>
              <FormItem
                title="Asal Dana"
                errors={context?.errors["asal_dana"]}
                type="text"
                name="price"
                required={true}
                field="price"
                placeHolder="Jenis Budget"
                value={context?.data?.asal_dana}
                setData={(e) =>
                  context?.dinamicHandleFunc("asal_dana", e.target.value)
                }
              />
            </Col>
          )}

          {/* <Col span={12}>
            <FormItem
              title="Total"
              errors={context?.errors["total"]}
              type="number"
              name="price"
              required={true}
              field="price"
              placeHolder="Price"
              value={context?.data?.total}
              setData={(e) =>
                context?.dinamicHandleFunc("total", e.target.value)
              }
            />
          </Col> */}
          <Col span={24}>
            <Form.Item label="Keterangan">
              <TextArea
                placeholder="Keterangan"
                value={context?.data?.ket}
                onChange={(e) =>
                  context?.dinamicHandleFunc("ket", e.target.value)
                }
              />
            </Form.Item>
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
