import React, { useState, ChangeEvent, createContext } from "react";
import { Istate, BudgetContextInterface } from "../interfaces/budgets";
import { useHistory } from "react-router-dom";
import { apiGetAll, apiPost, apiGetOne, apiPut, apiDelete } from "../actions";
import { message, Spin } from "antd";

export const BudgetContext = createContext<BudgetContextInterface | null>(null);

const BudgetContexContainer = (props: any) => {
  const history = useHistory();

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState<Istate>(budgets);

  const [dataStatistic, setDataStatistic] = useState({
    total_kas: 0,
  });

  const [listData, setListData] = useState<Istate[]>([]);

  const getBudgetTypes = (params?: any) => {
    setLoading(true);
    apiGetAll("budgets", {
      limit,
      offset,
      ...params,
    }).then((res) => {
      let newPayload: Array<Istate> = res.payload;
      let no = (offset * limit) / limit;
      setCount(res.count);
      setLimit(res.limit);
      setListData(
        newPayload
          ? newPayload.map((item) => {
              item.no = no++;
              return item;
            })
          : []
      );
      setDataStatistic(res.data);
      setLoading(false);
    });
  };

  const getBudgetType = (id: number) => {
    setLoading(true);
    apiGetOne(`budgets/${id}`).then((res) => {
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
    setData(budgets);
  };

  const handleSubmit = () => {
    setErrors({});
    setLoading(true);
    data.total = parseInt(data.total);
    apiPost("/budgets", data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil menyimpan master budget");

        if (data.type == "Kas Masuk") {
          history.push("/budget?type=Kas Masuk");
        } else {
          history.push("/budget?type=Kas Keluar");
        }
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
    apiDelete(`/budgets/${id}`)
      .then((res) => {
        setLoading(true);
        message.success("Berhasil menghapus budgets");
        if (data.type == "Kas Masuk") {
          history.push("/budget?type=Kas Masuk");
        } else {
          history.push("/budget?type=Kas Keluar");
        }
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
    data.total = parseInt(data.total);
    apiPut(`/budgets/${data.id}`, data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil mengubah budgets");
        if (data.type == "Kas Masuk") {
          history.push("/budget?type=Kas Masuk");
        } else {
          history.push("/budget?type=Kas Keluar");
        }
        // history.push("/budget");
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
    if (key == "budget_type") {
      value = {
        id: value,
      };
    }

    setData({
      ...data,
      [key]: value,
    });
  };

  const roleContext: BudgetContextInterface = {
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
    dataStatistic,
  };

  return (
    <BudgetContext.Provider value={roleContext}>
      <Spin spinning={props.isAction == false && loading}>
        {props.children}
      </Spin>
    </BudgetContext.Provider>
  );
};

export default BudgetContexContainer;

const budgets = {
  total: 0,
  budget_type: {
    id: 0,
    name: "",
  },
  created_at: "",
  updated_at: "",
  created_by: {
    id: 0,
    name: "",
  },
  type: "Kas Masuk",
  ket: "",
  asal_dana: "",
};
