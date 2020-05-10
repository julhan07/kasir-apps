import React, { useState, ChangeEvent, createContext } from "react";
import {
  Istate,
  PaymentTypeContextInterface,
} from "../interfaces/anggota-type";
import { useHistory } from "react-router-dom";
import { apiGetAll, apiPost, apiGetOne, apiPut, apiDelete } from "../actions";
import { message, Spin } from "antd";

export const PaymentTypeContext = createContext<PaymentTypeContextInterface | null>(
  null
);

const PaymentTypeContexContainer = (props: any) => {
  const history = useHistory();

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState<Istate>(paymentData);

  const [listData, setListData] = useState<Istate[]>([]);

  const getPeymentTypes = (params?: any) => {
    setLoading(true);
    apiGetAll("payment_types", {
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

  const getPeymentType = (id: number) => {
    setLoading(true);
    apiGetOne(`payment_types/${id}`).then((res) => {
      setData(res.payload);
      setLoading(false);
    });
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
    getPeymentTypes({ limit: newLimit });
  };

  const handleChangePagination = (newLimit: number, offset: number) => {
    getPeymentTypes({
      limit: newLimit,
      offset,
    });
  };

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    getPeymentTypes({
      search,
    });
  };

  const clearListRoles = () => {
    setCount(0);
    setLimit(10);
    setListData([]);
  };

  const clerForm = () => {
    setData(paymentData);
  };

  const handleSubmit = () => {
    setLoading(true);
    setErrors({});
    apiPost("/payment_types", data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil menyimpan type pembayaran");
        history.push("/tipe-pembayaran");
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
    apiDelete(`/payment_types/${id}`)
      .then((res) => {
        setLoading(true);
        message.success("Berhasil menghapus type pembayaran");
        getPeymentTypes({});
      })
      .catch((e) => {
        message.error(e.description);
        setLoading(false);
      });
  };

  const handleSubmitEdit = () => {
    setLoading(true);
    setErrors({});
    apiPut(`/payment_types/${data.id}`, data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil mengubah type pembayaran");
        history.push("/tipe-pembayaran");
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

  const roleContext: PaymentTypeContextInterface = {
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
    getPeymentTypes,
    getPeymentType,
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
    <PaymentTypeContext.Provider value={roleContext}>
      <Spin spinning={props.isAction == false && loading}>
        {props.children}
      </Spin>
    </PaymentTypeContext.Provider>
  );
};

export default PaymentTypeContexContainer;

const paymentData = {
  id: 0,
  name: "",
  icon: "",
};
