import React, { useState, ChangeEvent, createContext } from "react";
import { Istate, BudgetTypeContextInterface } from "../interfaces/budget_types";
import { useHistory } from "react-router-dom";
import { apiGetAll, apiPost, apiGetOne, apiPut, apiDelete } from "../actions";
import { message, Spin } from "antd";

export const BudgetTypeContext = createContext<BudgetTypeContextInterface | null>(
  null
);

const BudgetTypeContexContainer = (props: any) => {
  const history = useHistory();

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState<Istate>(budget_types);

  const [listData, setListData] = useState<Istate[]>([]);

  const getBudgetTypes = (params?: any) => {
    setLoading(true);
    apiGetAll("budget_types", {
      limit,
      offset,
      ...params,
    }).then((res) => {
      let newPayload: Array<Istate> = res.payload;
      let no = (offset * limit) / limit;
      setCount(res.count);
      setLimit(res.limit);
      setListData(
        newPayload &&
          newPayload.map((item) => {
            item.no = no++;
            return item;
          })
      );
      setLoading(false);
    });
  };

  const getBudgetType = (id: number) => {
    setLoading(true);
    apiGetOne(`budget_types/${id}`).then((res) => {
      setData(res.payload);
      setLoading(false);
    });
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
    getBudgetTypes({ limit: newLimit, order: "desc", sortby: "id" });
  };

  const handleChangePagination = (newLimit: number, offset: number) => {
    getBudgetTypes({
      limit: newLimit,
      offset,
      order: "desc",
      sortby: "id",
    });
  };

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    getBudgetTypes({
      search,
      order: "desc",
      sortby: "id",
    });
  };

  const clearListRoles = () => {
    setCount(0);
    setLimit(10);
    setListData([]);
  };

  const clerForm = () => {
    setData(budget_types);
  };

  const handleSubmit = () => {
    setErrors({});
    setLoading(true);
    data.price = parseInt(data.price);
    apiPost("/budget_types", data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil menyimpan master budget");
        history.push("/type-budget");
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
    apiDelete(`/budget_types/${id}`)
      .then((res) => {
        setLoading(true);
        message.success("Berhasil menghapus paket wifi");
        getBudgetTypes({});
      })
      .catch((e) => {
        message.error(e.description);
        setLoading(false);
      });
  };

  const handleSubmitEdit = () => {
    setLoading(true);
    setErrors({});
    data.price = parseInt(data.price);
    apiPut(`/budget_types/${data.id}`, data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil mengubah paket wifi");
        history.push("/type-budget");
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

  const roleContext: BudgetTypeContextInterface = {
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
    getBudgetTypes,
    getBudgetType,
    setErrors,
    handleInputSearch,
    handleChangeLimit,
    listData: listData,
    clerForm,
    clearListRoles,
    handleDelete,
    handleChangePagination,
    dinamicHandleFunc,
  };

  return (
    <BudgetTypeContext.Provider value={roleContext}>
      <Spin spinning={props.isAction == false && loading}>
        {props.children}
      </Spin>
    </BudgetTypeContext.Provider>
  );
};

export default BudgetTypeContexContainer;

const budget_types = {
  id: 0,
  name: "",
  price: 0,
};
