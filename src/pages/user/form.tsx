import React, { useContext, useEffect } from "react";
import FormItem from "../../components/FormItem";
import { UserContext } from "../../contexts/user";
import { Card, Divider, Row, Col, Upload, Button, Form } from "antd";
import { ButtonSave, ButtonBack } from "../../components/button";
import { RolesContext } from "../../contexts/role";
import { OptionList } from "../../interfaces/formItem";

const PenggunaForm = React.memo((props: { form: string }) => {
  const context = useContext(UserContext);
  const roles = useContext(RolesContext);

  useEffect(() => {
    roles?.getRoles({
      sortby: "name",
      order: "asc",
      limit: 200,
    });
  }, []);

  let newRoles = new Array<OptionList>();
  roles?.listData.map((item) => {
    newRoles.push({
      label: item.name,
      value: item.id,
    });
  });

  const uploadButton = (
    <div>
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  console.log(context?.data);
  return (
    <Card>
      <Row gutter={24}>
        <Col sm={12}>
          <FormItem
            title="Nama Lengkap"
            type="text"
            errors={context?.errors["name"]}
            name="name"
            field="name"
            required={true}
            placeHolder="Nama lengkap"
            value={context?.data?.name}
            setData={(e) => context?.dinamicHandleFunc("name", e.target.value)}
          />
        </Col>
        <Col sm={12}>
          <FormItem
            title="Nomor Telp"
            type="text"
            name="phone_number"
            required={true}
            errors={context?.errors["phone_number"]}
            field="phone_number"
            placeHolder="Nomor Telp"
            value={context?.data?.phone_number}
            setData={(e) =>
              context?.dinamicHandleFunc("phone_number", e.target.value)
            }
          />
        </Col>
        {props.form == "add" && (
          <Col sm={12}>
            <FormItem
              title="Password"
              type="password"
              name="password"
              required={true}
              field="password"
              errors={context?.errors["password"]}
              placeHolder="Password"
              value={context?.data?.password}
              setData={(e) =>
                context?.dinamicHandleFunc("password", e.target.value)
              }
            />
          </Col>
        )}
        <Col sm={12}>
          <FormItem
            title="Level Pengguna"
            type="select"
            field="role"
            name="role"
            required={true}
            placeHolder="Masukkan Content"
            errors={context?.errors["role"]}
            value={context?.data?.role.id || []}
            setData={(e) => context?.dinamicHandleFunc("role", e)}
            optionList={newRoles}
          />
        </Col>
        <Col sm={12}>
          <Form.Item label="Image">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={(e) =>
                context?.dinamicHandleFunc("image", e.file.originFileObj)
              }
            >
              {context?.data?.image ? (
                <img
                  src={
                    String(context.data.image).length > 300
                      ? context.data.image
                      : "http://localhost:9000/assets/thumbnail/" +
                        context?.data?.image
                  }
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
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
