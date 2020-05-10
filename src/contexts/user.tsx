import React, { useState, ChangeEvent, createContext } from "react";
import { Istate, UserContextInterface, MappingRole } from "../interfaces/user";
import { useHistory, withRouter } from "react-router-dom";
import { apiGetAll, apiPost, apiGetOne, apiPut, apiDelete } from "../actions";
import { message, Spin } from "antd";

import ConverToBase64 from "../helpers/converBase64";

export const UserContext = createContext<UserContextInterface | null>(null);

const UserContexContainer = (props: any) => {
  const history = useHistory();

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState<Istate>(userData);

  const [listData, setListData] = useState<Istate[]>([]);

  const getUsers = (params?: any) => {
    setLoading(true);
    apiGetAll("users", {
      limit,
      offset,
      order: "desc",
      sortby: "id",
      ...params,
    }).then((res) => {
      let num = (offset * limit) / limit;

      let newPayload: Array<Istate> = res.payload;
      let newArray =
        newPayload &&
        newPayload.map((item) => {
          item.no = num++;
          return item;
        });
      setLimit(res.limit);
      setCount(res.count);
      setListData(newArray);
      setLoading(false);
    });
  };

  const getUser = (id: number) => {
    setLoading(true);
    apiGetOne(`users/${id}`).then((res) => {
      let payload: Istate = res.payload;
      setData(payload);
      setLoading(false);
    });
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
    getUsers({ limit: newLimit });
  };

  const handleChangePagination = (newLimit: number, offset: number) => {
    getUsers({
      limit: newLimit,
      offset,
    });
  };

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    getUsers({
      search,
    });
  };

  const clearListUsers = () => {
    setCount(0);
    setLimit(10);
    setListData([]);
  };

  const clerForm = () => {
    setData(userData);
  };

  const handleSubmit = () => {
    setLoading(true);

    let newData = data;

    if (newData.image) {
      newData.image = String(newData.image).split(",")[1];
    }

    apiPost("/users", newData)
      .then((res) => {
        if (res.status_code == 200) {
          getUsers();
          setLoading(false);
          message.success("Berhasil menyimpan user");
          history.push("/pengguna");
        }
      })
      .catch((e) => {
        setErrors(e.payload);
        setLoading(false);
      });
  };

  const handleSubmitEdit = () => {
    setLoading(true);

    let newData = data;

    if (newData.image) {
      newData.image = String(newData.image).split(",")[1];
    }

    apiPut(`/users/${data.id}`, data)
      .then((res) => {
        if (res.status_code == 200) {
          getUsers();
          setLoading(false);
          message.success("Berhasil mengubah user");
          history.push("/pengguna");
        }
      })
      .catch((e) => {
        setErrors(e.payload);
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    apiDelete(`users/${id}`)
      .then((res) => {
        getUsers();
        message.success("Berhasil menghapus users");
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        message.error(e.description);
      });
  };

  const handleButtonBack = () => {
    history.goBack();
  };

  const dinamicHandleFunc = (key: string, value: any) => {
    if (key == "role") {
      setData({
        ...data,
        role: {
          id: value,
          name: "",
        },
      });
      return;
    }

    if (key == "image") {
      ConverToBase64(value).then((result) => {
        setData({
          ...data,
          image: result,
        });
      });
    } else {
      setData({
        ...data,
        [key]: value,
      });
    }
  };

  const userContextValue: UserContextInterface = {
    data,
    clearListUsers,
    handleOnSearch,
    search,
    getUsers,
    count,
    loading,
    setLoading,
    limit,
    errors,
    handleButtonBack,
    handleSubmit,
    getUser,
    setErrors,
    handleInputSearch,
    handleChangeLimit,
    listData: listData,
    handleSubmitEdit,
    clerForm,
    handleChangePagination,
    handleDelete,
    dinamicHandleFunc,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      <Spin spinning={loading}>{props.children}</Spin>
    </UserContext.Provider>
  );
};

export default withRouter(UserContexContainer);

const userData = {
  id: 0,
  name: "",
  email: "",
  phone_number: "",
  image: "",
  username: "",
  password: "",
  role: {
    id: 0,
    name: "",
  },
};
