export interface PayloadState {
  payload: [Istate];
}

export interface Istate {
  username: string;
  password: string;
}

export interface LoginContextInterface {
  data?: Istate;
  handleSubmit: any;
  handleEmail: any;
  handlePassword: any;
  loading;
  msgError;
  errorPayload;
}
