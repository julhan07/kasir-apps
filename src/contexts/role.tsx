import React, { useState, ChangeEvent, createContext } from "react";
import { Istate, RoleContextInterface, PayloadState } from "../interfaces/role";
import { useHistory } from "react-router-dom";
import { apiGetAll, apiPost, apiGetOne, apiPut, apiDelete } from "../actions";
import { message, Spin } from "antd";

export const RolesContext = createContext<RoleContextInterface | null>(null);

const UserContexContainer = (props: any) => {
  const history = useHistory();

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState<Istate>(roleData);

  const [listData, setListData] = useState<Istate[]>([]);

  const getRoles = (params?: any) => {
    setLoading(true);
    apiGetAll("roles", {
      limit,
      offset,
      ...params,
    }).then((res) => {
      let newPayload: Array<Istate> = res.payload;
      let no = (offset * limit) / limit;
      setCount(res.count);
      setLimit(res.limit);
      setListData(
        newPayload.map((item) => {
          item.no = no++;
          return item;
        })
      );
      setLoading(false);
    });
  };

  const getRole = (id: number) => {
    setLoading(true);
    apiGetOne(`roles/${id}`).then((res) => {
      setData(res.payload);
      setLoading(false);
    });
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
    getRoles({ limit: newLimit });
  };

  const handleChangePagination = (newLimit: number, offset: number) => {
    getRoles({
      limit: newLimit,
      offset,
    });
  };

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    getRoles({
      search,
    });
  };

  const clearListRoles = () => {
    setCount(0);
    setLimit(10);
    setListData([]);
  };

  const clerForm = () => {
    setData(roleData);
  };

  const handleSubmit = () => {
    setLoading(true);
    setErrors({});
    apiPost("/roles", data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil menyimpan role");
        history.push("/role");
      })
      .catch((e) => {
        setLoading(false);
        if (e.status_code == 400 && e.payload) {
          setErrors(e.payload);
        } else {
          message.error(e.description);
        }
      });
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    apiDelete(`/roles/${id}`)
      .then((res) => {
        setLoading(true);
        message.success("Berhasil menghapus role");
        getRoles({});
      })
      .catch((e) => {
        message.error(e.description);
        setLoading(false);
      });
  };

  const handleSubmitEdit = () => {
    setLoading(true);
    setErrors({});
    apiPut(`/roles/${data.id}`, data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil mengubah role");
        history.push("/role");
      })
      .catch((e) => {
        setLoading(false);
        if (e.status_code == 400 && e.payload) {
          setErrors(e.payload);
        } else {
          message.error(e.description);
        }
      });
  };

  const handleButtonBack = () => {
    history.goBack();
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    dinamicHandleFunc("name", e.target.value);
  };

  const dinamicHandleFunc = (key: string, value: any) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const roleContext: RoleContextInterface = {
    data,
    handleName,
    handleOnSearch,
    search,
    count,
    loading,
    setLoading,
    limit,
    errors,
    handleButtonBack,
    handleSubmit,
    handleSubmitEdit,
    getRole,
    getRoles,
    setErrors,
    handleInputSearch,
    handleChangeLimit,
    listData: listData,
    clerForm,
    clearListRoles,
    handleDelete,
    handleChangePagination,
  };

  return (
    <RolesContext.Provider value={roleContext}>
      <Spin spinning={props.isAction == false && loading}>
        {props.children}
      </Spin>
    </RolesContext.Provider>
  );
};

export default UserContexContainer;

const roleData = {
  id: 0,
  name: "",
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
};
