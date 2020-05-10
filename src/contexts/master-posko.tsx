import React, { useState, ChangeEvent, createContext } from "react";
import {
  Istate,
  MasterPoskoContextInterface,
} from "../interfaces/master-posko";
import { useHistory } from "react-router-dom";
import { apiGetAll, apiPost, apiGetOne, apiPut, apiDelete } from "../actions";
import { message, Spin } from "antd";

export const MasterPoskoContext = createContext<MasterPoskoContextInterface | null>(
  null
);

const MasterPoskoContexContainer = (props: any) => {
  const history = useHistory();

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState<Istate>(masterPosko);

  const [listData, setListData] = useState<Istate[]>([]);

  const getMasterPoskos = (params?: any) => {
    setLoading(true);
    apiGetAll("package_types", {
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
      setLoading(false);
    });
  };

  const getMasterPosko = (id: number) => {
    setLoading(true);
    apiGetOne(`package_types/${id}`).then((res) => {
      setData(res.payload);
      setLoading(false);
    });
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
    getMasterPoskos({ limit: newLimit });
  };

  const handleChangePagination = (newLimit: number, offset: number) => {
    getMasterPoskos({
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
    getMasterPoskos({
      search,
    });
  };

  const clearListRoles = () => {
    setCount(0);
    setLimit(10);
    setListData([]);
  };

  const clerForm = () => {
    setData(masterPosko);
  };

  const handleSubmit = () => {
    setErrors({});
    setLoading(true);
    let newData = data;
    newData.price = parseInt(newData.price);
    newData.original_price = parseInt(newData.original_price);
    newData.stock = parseInt(newData.stock);
    apiPost("/package_types", newData || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil menyimpan produk");
        history.push("/produk");
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
    apiDelete(`/package_types/${id}`)
      .then((res) => {
        setLoading(true);
        message.success("Berhasil menghapus produk");
        getMasterPoskos({});
      })
      .catch((e) => {
        message.error(e.description);
        setLoading(false);
      });
  };

  const handleSubmitEdit = () => {
    setLoading(true);
    setErrors({});
    let newData = data;
    newData.price = parseInt(newData.price);
    newData.original_price = parseInt(newData.original_price);
    newData.stock = parseInt(newData.stock);
    apiPut(`/package_types/${data.id}`, newData || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil mengubah produk");
        history.push("/produk");
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

  const roleContext: MasterPoskoContextInterface = {
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
    getMasterPoskos,
    getMasterPosko,
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
    <MasterPoskoContext.Provider value={roleContext}>
      <Spin spinning={props.isAction == false && loading}>
        {props.children}
      </Spin>
    </MasterPoskoContext.Provider>
  );
};

export default MasterPoskoContexContainer;

const masterPosko = {
  id: 0,
  name: "",
  price: 0,
  original_price: 0,
  created_by: {
    id: 0,
    name: "",
  },
  created_at: "",
  updated_at: "",
  stock: 0,
};
