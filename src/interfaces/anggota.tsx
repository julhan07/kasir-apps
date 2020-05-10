export interface ObjectOption {
  label: string;
  value: any;
}

export interface PayloadState {
  payload: Istate[];
}

export interface Istate {
  id?: number;
  no?: number;
  full_name: string;
  gender: string;
  address?: string;
  member_number: string;
  member_post: {
    id: number;
    name: string;
  };
  member_type: {
    id: number;
    name: string;
  };
  place_of_birth: string;
  date_of_birth: string;
}

export interface MembersContextInterface {
  data?: Istate;
  count: number;
  limit: number;
  handleSubmit: any;
  handleChangeLimit: any;
  errors: any;
  handleInputSearch: any;
  handleButtonBack: any;
  listData: Istate[];
  handleOnSearch: any;
  search: string;
  getMembers: any;
  getMember: any;
  loading: boolean;
  setErrors: any;
  setLoading: any;
  clerForm: any;
  clearMembers: any;
  handleSubmitEdit: any;
  handleDelete: any;
  handleChangePagination: any;
  dinamicHandleFunc: any;
}
