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
  price: any;
}

export interface BudgetTypeContextInterface {
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
  getBudgetType: any;
  getBudgetTypes: any;
  loading: boolean;
  setErrors: any;
  setLoading: any;
  clerForm: any;
  clearListRoles: any;
  handleSubmitEdit: any;
  handleDelete: any;
  handleChangePagination: any;
  dinamicHandleFunc: any;
}
