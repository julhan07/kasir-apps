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
  payment_number: number;
  member: {
    id: number;
    name?: string;
  };
  package: {
    id: number;
    name?: string;
  };
  package_type: {
    id: number;
    name?: string;
  };
  payment_type: {
    id: number;
    name?: string;
  };
  total_payment: any;
  total_Amoun_debt?: any;
  description?: any;
  created_at?: any;
  updated_at?: any;
  qty?: any;
  total_payment_and_debt?: any;
  price: any;
}

export interface PaymentContextInterface {
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
  getPayment: any;
  getPayments: any;
  loading: boolean;
  setErrors: any;
  setLoading: any;
  clerForm: any;
  clearListPayment: any;
  handleSubmitEdit: any;
  handleDelete: any;
  handleChangePagination: any;
  dinamicHandleFunc: any;
  detailPayment;
  onChangeInputFilter;
  tanggal_awal;
  tanggal_ahir;
  package_id;
  member_id;
  resetFilter?: any;
}
