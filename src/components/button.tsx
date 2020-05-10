import React from "react";
import { Button } from "antd";

export const ButtonSave = (props: {
  Title: string;
  OnClick?: any;
  style?: any;
}) => {
  return (
    <Button
      onClick={props.OnClick}
      type="primary"
      style={{
        float: "right",
        ...props.style,
      }}
    >
      {props.Title}
    </Button>
  );
};

export const ButtonBack = (props: {
  Title: string;
  OnClick?: any;
  style?: any;
  icon?: any;
}) => {
  return (
    <Button
      type="default"
      style={{
        ...props.style,
      }}
      onClick={props.OnClick}
    >
      {props.Title}
    </Button>
  );
};

export const ButtonAdd = (props: {
  Title: string;
  OnClick?: any;
  style?: any;
  icon?: any;
}) => {
  return (
    <Button
      type="primary"
      style={{
        ...props.style,
      }}
      onClick={props.OnClick}
    >
      {props.Title}
    </Button>
  );
};

export const ButtonEdit = (props: {
  Title: string;
  OnClick?: any;
  style?: any;
}) => {
  return (
    <Button
      type="dashed"
      style={{
        ...props.style,
      }}
      onClick={props.OnClick}
    >
      {props.Title}
    </Button>
  );
};

export const ButtonPrint = (props: {
  Title: string;
  OnClick?: any;
  style?: any;
}) => {
  return (
    <Button style={props.style} type="primary" onClick={props.OnClick}>
      {props.Title}
    </Button>
  );
};
