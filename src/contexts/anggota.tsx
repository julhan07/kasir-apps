import React, { useState, ChangeEvent, createContext } from "react";
import { Istate, MembersContextInterface } from "../interfaces/anggota";
import { useHistory } from "react-router-dom";
import { apiGetAll, apiPost, apiGetOne, apiPut, apiDelete } from "../actions";
import { message, Spin } from "antd";

export const MembersContext = createContext<MembersContextInterface | null>(
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

  const getMembers = (params?: any) => {
    setLoading(true);
    apiGetAll("members", {
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

  const getMember = (id: number) => {
    setLoading(true);
    apiGetOne(`members/${id}`).then((res) => {
      setData(res.payload);
      setLoading(false);
    });
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
    getMembers({ limit: newLimit });
  };

  const handleChangePagination = (newLimit: number, offset: number) => {
    getMembers({
      limit: newLimit,
      offset,
    });
  };

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    getMembers({
      search,
    });
  };

  const clearMembers = () => {
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
    apiPost("/members", data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil menyimpan data anggota");
        history.push("/anggota");
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
    apiDelete(`/members/${id}`)
      .then((res) => {
        setLoading(true);
        message.success("Berhasil menghapus data anggota");
        getMembers({});
      })
      .catch((e) => {
        message.error(e.description);
        setLoading(false);
      });
  };

  const handleSubmitEdit = () => {
    setLoading(true);
    setErrors({});
    apiPut(`/members/${data.id}`, data || {})
      .then((res) => {
        setLoading(false);
        message.success("Berhasil mengubah data anggota");
        history.push("/anggota");
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

    if (key == "member_post" || key == "member_type") {
      newValue = {
        id: value,
        name: "",
      };
    }

    setData({
      ...newData,
      [key]: newValue,
    });
  };

  const roleContext: MembersContextInterface = {
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
    getMembers,
    getMember,
    setErrors,
    handleInputSearch,
    handleChangeLimit,
    listData: listData,
    clerForm,
    clearMembers,
    handleDelete,
    handleChangePagination,
    dinamicHandleFunc,
  };

  return (
    <MembersContext.Provider value={roleContext}>
      <Spin spinning={props.isAction == false && loading}>
        {props.children}
      </Spin>
    </MembersContext.Provider>
  );
};

export default MasterPoskoContexContainer;

const masterPosko = {
  id: 0,
  full_name: "",
  gender: "",
  member_number: "",
  member_post: {
    id: 0,
    name: "",
  },
  address: "",
  member_type: {
    id: 0,
    name: "",
  },
  place_of_birth: "",
  date_of_birth: "",
};
