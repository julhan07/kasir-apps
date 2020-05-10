export interface ObjectOption {
  label: string;
  value: any;
}

export interface PayloadState {
  payload: Istate[];
}

export interface Istate {
  no?: number;
  id?: number;
  name: string;
  icon: string;
}

export interface PaymentTypeContextInterface {
  data?: Istate;
  count: number;
  limit: number;
  handleSubmit: any;
  handleChangeLimit: any;
  handleName: any;
  errors: any;
  handleInputSearch: any;
  handleButtonBack: any;
  listData: Istate[];
  handleOnSearch: any;
  search: string;
  getPeymentType: any;
  getPeymentTypes: any;
  loading: boolean;
  setErrors: any;
  setLoading: any;
  clerForm: any;
  clearListRoles: any;
  handleSubmitEdit: any;
  handleDelete: any;
  handleChangePagination: any;
  dinamicHandleFunc;
}
