import React, { useContext, useEffect } from "react";
import FormItem from "../../components/FormItem";
import { PaymentContext } from "../../contexts/payments";
import { Card, Divider, Row, Col, Upload, Button, Form, Alert } from "antd";
import { ButtonSave, ButtonBack } from "../../components/button";
import { UserContext } from "../../contexts/user";
import { PaymentTypeContext } from "../../contexts/anggota-type";
import { MasterPoskoContext as PacketType } from "../../contexts/master-posko";
// import { OptionList } from "../../interfaces/formItem";
import { FormatMataUang } from "../../helpers/formtMataUang";
import TextArea from "antd/lib/input/TextArea";

const PenggunaForm = React.memo((props: { form: string }) => {
  const context = useContext(PaymentContext);
  const users = useContext(UserContext);
  const payment = useContext(PaymentTypeContext);
  const paket = useContext(PacketType);

  useEffect(() => {
    users?.getUsers();
    payment?.getPeymentTypes();
    paket?.getMasterPoskos();
  }, []);

  // const ListUser = users?.listData.map((item) => {
  //   return {
  //     label: item.name,
  //     value: item.id,
  //   };
  // });

  const ListPaket = paket?.listData.map((item) => {
    return {
      label: `${item.name} - ${item.stock}`,
      value: item.id,
    };
  });

  const listTypePayment = payment?.listData.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  return (
    <Card>
      {context?.data?.total_Amoun_debt &&
      parseInt(context?.data?.total_Amoun_debt) >
        context?.data?.price * context?.data?.qty ? (
        <Alert
          message="Total Hutang tidak boleh lebih besar dari sub total"
          type="error"
        />
      ) : (
        ""
      )}

      <Row gutter={24}>
        {/* <Col span={12}>
          <FormItem
            title="Nama Member"
            type="select"
            errors={context?.errors["member"]}
            name="name"
            field="name"
            required={true}
            placeHolder="Nama Member"
            optionList={ListUser}
            value={context?.data?.member.id || ""}
            setData={(e) => context?.dinamicHandleFunc(["member"], e)}
          />
        </Col> */}
        <Col span={12}>
          <FormItem
            title="Pilih Barang"
            type="select"
            errors={context?.errors["package"]}
            name="name"
            field="name"
            required={true}
            placeHolder="Pilih Paket"
            value={context?.data?.package.id || ""}
            optionList={ListPaket}
            setData={(e) => context?.dinamicHandleFunc("package", e)}
          />
        </Col>
        <Col span={12}>
          <FormItem
            title="Pilih Metode Pembayaran"
            type="select"
            errors={context?.errors["payment_type"]}
            name="name"
            field="name"
            required={true}
            placeHolder="No Transaksi"
            value={context?.data?.payment_type.id || ""}
            optionList={listTypePayment}
            setData={(e) => context?.dinamicHandleFunc("payment_type", e)}
          />
        </Col>
        <Col span={12}>
          <FormItem
            title="Jumlah Qty"
            type="number"
            errors={context?.errors["qty"]}
            name="name"
            field="name"
            required={true}
            placeHolder="Jumlah Qty"
            value={context?.data?.qty}
            // optionList={listTypePayment}
            setData={(e) => context?.dinamicHandleFunc("qty", e.target.value)}
          />
        </Col>

        <Col span={12}>
          <FormItem
            title="Terhutang (Optional)"
            type="number"
            errors={context?.errors["total_Amoun_debt"]}
            name="name"
            field="total_Amoun_debt"
            // required={true}
            placeHolder="Sub Total Hutang"
            value={context?.data?.total_Amoun_debt || ""}
            setData={(e) =>
              context?.dinamicHandleFunc("total_Amoun_debt", e.target.value)
            }
          />
        </Col>

        <Col span={12}>
          <Form.Item label="Tambahkan Keterangan (Optional)">
            <TextArea
              placeholder="Keterangan"
              value={context?.data?.description}
              onChange={(e) =>
                context?.dinamicHandleFunc("description", e.target.value)
              }
              style={{ height: 100 }}
            />
          </Form.Item>
          {/* <FormItem
            title="Keterangan"
            type="textArea"
            errors={context?.errors["description"]}
            name="name"
            field="description"
            // required={true}
            placeHolder="Keterangan"
            value={context?.data?.description}
            setData={(e) =>
              context?.dinamicHandleFunc("description", e.target.value)
            }
          /> */}
        </Col>
        <Col span={12}>
          <Form.Item label="Sub Total">
            <span style={{ fontWeight: "bold", fontSize: 40 }}>
              {FormatMataUang(
                String(context?.data?.price * context?.data?.qty)
              )}
            </span>
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
  );
});

export default PenggunaForm;
