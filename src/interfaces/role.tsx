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
  created_at?: any;
  updated_at?: any;
}

export interface RoleContextInterface {
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
  getRole: any;
  getRoles: any;
  loading: boolean;
  setErrors: any;
  setLoading: any;
  clerForm: any;
  clearListRoles: any;
  handleSubmitEdit: any;
  handleDelete: any;
  handleChangePagination: any;
}
