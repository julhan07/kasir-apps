import { Istate } from "../interfaces/user";

export interface ResponseAxios {
  data: Responseserver;
}

export interface Responseserver {
  status_code?: number;
  count?: any;
  payload: any;
  status_message?: string;
  data?: any;
  limit: number;
  description: string;
}
