import React, { useContext } from "react";
import FormItem from "../../components/FormItem";
import { RolesContext } from "../../contexts/role";
import { Card, Divider } from "antd";
import { ButtonSave, ButtonBack } from "../../components/button";

const PenggunaForm = React.memo((props: { form: string }) => {
  const context = useContext(RolesContext);

  return (
    <Card>
      <FormItem
        title="Nama Role"
        errors={context?.errors["name"]}
        type="text"
        name="name"
        required={true}
        field="name"
        placeHolder="Nama Role"
        value={context?.data?.name}
        setData={context?.handleName}
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

export default PenggunaForm;
