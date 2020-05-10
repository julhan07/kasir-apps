import React from "react";
import { Form, Select, Input } from "antd";
import { FormInterface } from "../interfaces/formItem";

const { Option } = Select;

const InputForm = (props: FormInterface) => {
  const renderComponent = () => {
    switch (props.type) {
      case "select":
        return (
          <Form.Item
            style={props.style}
            label={
              props.title && (
                <span style={props.style}>
                  {props.title}{" "}
                  {props.required && <span style={{ color: "red" }}> *</span>}
                </span>
              )
            }
            help={
              <span style={{ color: "red" }}>
                {props.errors && props.errors.message}
              </span>
            }
            validateStatus={props.errors && props.errors.message && "error"}
          >
            <Select
              style={{
                width: "100%",
              }}
              value={props.value}
              onChange={props.setData}
              mode={props.mode || "default"}
            >
              {props.optionList?.map((item, i) => {
                return (
                  <Option key={i} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        );
      default:
        return (
          <Form.Item
            style={{ width: "100%", ...props.style }}
            label={
              props.title && (
                <span style={props.style}>
                  {props.title}{" "}
                  {props.required && <span style={{ color: "red" }}> *</span>}
                </span>
              )
            }
            help={
              <span style={{ color: "red" }}>
                {props.errors && props.errors.message}
              </span>
            }
            validateStatus={props.errors && props.errors.message && "error"}
          >
            <Input
              type={props.type}
              value={props.value}
              placeholder={props.placeHolder}
              onChange={props.setData}
              disabled={props.disabled}
            />
          </Form.Item>
        );
    }
  };

  return <div>{renderComponent()}</div>;
};

export default InputForm;
