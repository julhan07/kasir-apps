import React, { useState, ChangeEvent, createContext } from "react";
import { Istate, LoginContextInterface } from "../interfaces/login";
import { apiPost } from "../actions";
import { saveUserInfo } from "../actions/storage";
import { useHistory } from "react-router-dom";

export const LoginContext = createContext<LoginContextInterface | null>(null);

const UserContexContainer = (props: any) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [msgError, setError] = useState("");
  const [errorPayload, setErrorPayload] = useState({});

  const [data, setData] = useState<Istate>({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    setLoading(true);
    apiPost("auth", data)
      .then((res) => {
        saveUserInfo(res.payload.token, res.payload.user);
        setLoading(false);
        history.push("/pengguna");
      })
      .catch((e) => {
        setLoading(false);
        if (e.payload) {
          setErrorPayload(e.payload);
        } else {
          setError(e.description);
        }
      });
    // alert(JSON.stringify(data));
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dinamicHandleFunc("username", e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dinamicHandleFunc("password", e.target.value);
  };

  const dinamicHandleFunc = (key: string, value: any) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const LoginContextValue: LoginContextInterface = {
    data,
    handleEmail,
    handlePassword,
    handleSubmit,
    loading,
    msgError,
    errorPayload,
  };

  return (
    <LoginContext.Provider value={LoginContextValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default UserContexContainer;
