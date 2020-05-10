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
  total: any;
  budget_type: {
    id: number;
    name?: string;
  };
  created_at: any;
  updated_at: any;
  created_by: {
    id: number;
    name?: string;
  };
  type: any;
  ket: string;
  asal_dana: string;
}

export interface BudgetContextInterface {
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
  dataStatistic;
}
