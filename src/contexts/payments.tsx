import React, { useState, ChangeEvent, createContext } from "react";
import { Istate, PaymentContextInterface } from "../interfaces/payment";
import { useHistory } from "react-router-dom";
import { apiGetAll, apiPost, apiGetOne, apiPut, apiDelete } from "../actions";
import { message, Spin } from "antd";

export const PaymentContext = createContext<PaymentContextInterface | null>(
  null
);

const PaymentContexContainer = (props: any) => {
  const history = useHistory();

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [tanggal_awal, setTanggalAwal] = useState("");
  const [tanggal_ahir, setTanggalAhir] = useState("");
  const [package_id, setpackage_id] = useState("");
  const [member_id, setmember_id] = useState("");

  const [detailPayment, setDetailPayment] = useState({
    all_total_payment: 0,
    all_total_debt: 0,
  });

  const [data, setData] = useState<Istate>(payment);

  const [listData, setListData] = useState<Istate[]>([]);

  const onChangeInputFilter = (key: string, val: any) => {
    if (key == "package_id") {
      setpackage_id(val);
    }

    if (key == "member_id") {
      setmember_id(val);
    }

    if (key == "range_tanggal") {
      setTanggalAwal(val[0].format("YYYY-MM-DD"));
      setTanggalAhir(val[1].format("YYYY-MM-DD"));
    }
  };

  const resetFilter = () => {
    setTanggalAhir("");
    setTanggalAwal("");
    setmember_id("");
    setpackage_id("");
    getPayments({
      order: "desc",
      sortby: "id",
    });
  };

  const getPayments = (params?: any) => {
    setLoading(true);
    apiGetAll("payments", {
      limit,
      offset,
      ...params,
    }).then((res) => {
      let newPayload: Array<Istate> = res.payload;

      let no = (offset * limit) / limit;
      setCount(res.count);
      setLimit(res.limit);
      setDetailPayment(res.data);
      setListData(
        newPayload
          ? newPayload.map((item) => {
              item.package_type = item.package;
              item.no = no++;
              return item;
            })
          : []
      );

      setLoading(false);
    });
  };

  const getPayment = (id: number) => {
    setLoading(true);
    apiGetOne(`payments/${id}`).then((res) => {
      setData(res.payload);
      setLoading(false);
    });
  };

  const getPacket = (id: number) => {
    setLoading(true);
    apiGetOne(`package_types/${id}`).then((res) => {
      setData({
        ...data,
        total_payment: parseInt(res.payload.price) * parseInt(data.qty),
        total_payment_and_debt:
          parseInt(res.payload.price) +
          parseInt(data.total_Amoun_debt) * parseInt(data.qty),
        price: res.payload.price,
        package: {
          id: id,
          name: "",
        },
      });
    });
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
    getPayments({
      limit: newLimit,
      tanggal_awal,
      tanggal_ahir,
      member_id,
      package_id,
    });
  };

  const handleChangePagination = (newLimit: number, offset: number) => {
    getPayments({
      limit: newLimit,
      offset,
      sortby: "id",
      order: "desc",
      tanggal_awal,
      tanggal_ahir,
      member_id,
      package_id,
    });
  };

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    getPayments({
      search,
    });
  };

  const clearListPayment = () => {
    setCount(0);
    setLimit(10);
    setListData([]);
  };

  const clerForm = () => {
    setData(payment);
  };

  const handleSubmit = () => {
    setErrors({});
    setLoading(true);
    let newData = data;
    newData.qty = parseInt(newData.qty);
    newData.price = parseInt(newData.price);
    newData.total_payment = newData.price * newData.qty;
    newData.total_Amoun_debt = parseInt(newData.total_Amoun_debt);
    apiPost("/payments", newData || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil menyimpan data payments");
        history.push("/payments");
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
    apiDelete(`/payments/${id}`)
      .then((res) => {
        setLoading(true);
        message.success("Berhasil menghapus data payments");
        getPayments({});
      })
      .catch((e) => {
        message.error(e.description);
        setLoading(false);
      });
  };

  const handleSubmitEdit = () => {
    setLoading(true);
    setErrors({});
    apiPut(`/payments/${data.id}`, data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil mengubah data payments");
        history.push("/payments");
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

  const dinamicHandleFunc = (key: string, value: any) => {
    let newData = data;
    let newValue = value;

    if (key == "payment_type" || key == "member") {
      newValue = {
        id: value,
        name: "",
      };
    }

    if (key == "package") {
      getPacket(value);
    }

    if (key == "qty") {
      if (value > 0) {
        newValue = value;
        newData.total_payment = newData.price * newValue;
      } else {
        newValue = 0;
      }
    }

    if (key == "total_Amoun_debt") {
      let newTotalPayment = newData.total_payment;
      if (value && newTotalPayment >= value) {
        newData.total_payment = newTotalPayment - value;
        newData.total_Amoun_debt = value;
      } else {
        newData.total_Amoun_debt = value;
        newData.total_payment = newData.price * newData.qty;
      }
      setData({ ...newData });
    } else {
      setData({
        ...newData,
        [key]: newValue,
      });
    }
  };

  const roleContext: PaymentContextInterface = {
    data,
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
    getPayments,
    getPayment,
    setErrors,
    handleInputSearch,
    handleChangeLimit,
    listData: listData,
    clerForm,
    clearListPayment,
    handleDelete,
    handleChangePagination,
    dinamicHandleFunc,
    detailPayment,
    onChangeInputFilter,
    tanggal_awal,
    tanggal_ahir,
    package_id,
    member_id,
    resetFilter,
  };

  return (
    <PaymentContext.Provider value={roleContext}>
      <Spin spinning={props.isAction == false && loading}>
        {props.children}
      </Spin>
    </PaymentContext.Provider>
  );
};

export default PaymentContexContainer;

const payment = {
  id: 0,
  payment_number: 0,
  member: {
    id: 0,
    name: "",
  },
  package: {
    id: 0,
    name: "",
  },
  payment_type: {
    id: 0,
    name: "",
  },
  package_type: {
    id: 0,
    name: "",
  },
  qty: 1,
  total_payment_and_debt: 0,
  total_payment: 0,
  total_Amoun_debt: 0,
  description: "",
  price: 0,
};
