import React, { useContext } from "react";
import FormItem from "../../components/FormItem";
import { PaymentTypeContext } from "../../contexts/anggota-type";
import { Card, Divider } from "antd";
import { ButtonSave, ButtonBack } from "../../components/button";

const AnggotaTypeForm = React.memo((props: { form: string }) => {
  const context = useContext(PaymentTypeContext);

  return (
    <Card>
      <FormItem
        title="Tipe Anggota"
        errors={context?.errors["name"]}
        type="text"
        name="name"
        required={true}
        field="name"
        placeHolder="Nama Tipe Anggota"
        value={context?.data?.name}
        setData={(e) => context?.dinamicHandleFunc("name", e.target.value)}
      />

      <FormItem
        title="Icon"
        errors={context?.errors["icon"]}
        type="text"
        name="icon"
        required={true}
        field="name"
        placeHolder="Icon"
        value={context?.data?.icon}
        setData={(e) => context?.dinamicHandleFunc("icon", e.target.value)}
      />

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

export default AnggotaTypeForm;
