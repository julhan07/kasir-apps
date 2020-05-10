export interface ObjectOption {
  label: string;
  value: any;
}

export interface PayloadState {
  payload: [Istate];
}

export interface Istate {
  no?: number;
  id?: string | number;
  name: string;
  email: string;
  image?: any;
  phone_number: string;
  username: string;
  password: string;
  role: {
    id: number;
    name?: string;
  };
  created_at?: any;
  updated_at?: any;
}

export interface MappingRole {
  role_id: any;
}

export interface UserContextInterface {
  data?: Istate;
  count: number;
  limit: number;
  handleSubmit: any;
  handleChangeLimit: any;
  clearListUsers: any;
  getUsers: any;
  errors: any;
  handleInputSearch: any;
  handleButtonBack: any;
  listData: any;
  handleOnSearch: any;
  search: string;
  getUser: any;
  loading: boolean;
  setErrors: any;
  setLoading: any;
  clerForm: any;
  handleSubmitEdit: any;
  handleChangePagination: any;
  handleDelete: any;
  dinamicHandleFunc;
}
