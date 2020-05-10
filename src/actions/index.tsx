import axios from "axios";
import { Responseserver } from "../interfaces/axios";
import { getUserInfo } from "./storage";

const baseUrl = "http://localhost:9000/v1/";

export const apiPost = (url: string, body: any) => {
  return new Promise<Responseserver>((resolve, reject) => {
    axios({
      url: baseUrl + url,
      method: "POST",
      data: body,
      headers: {
        authorization: `Bearer ${getUserInfo().token}`
      }
    })
      .then(res => {
        if (res.data.status_code == 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const apiGetAll = (url: string, params: any) => {
  return new Promise<Responseserver>((resolve, reject) => {
    axios({
      url: baseUrl + url,
      method: "GET",
      params,
      headers: {
        authorization: `Bearer ${getUserInfo().token}`
      }
    })
      .then(res => {
        if (res.data.status_code == 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch(e => {
        reject(e.response);
      });
  });
};

export const apiGetOne = (url: string) => {
  return new Promise<Responseserver>((resolve, reject) => {
    axios({
      url: baseUrl + url,
      method: "GET",
      headers: {
        authorization: `Bearer ${getUserInfo().token}`
      }
    })
      .then(res => {
        if (res.data.status_code == 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch(e => {
        reject(e.response);
      });
  });
};

export const apiPut = (url: string, data: any) => {
  return new Promise<Responseserver>((resolve, reject) => {
    axios({
      url: baseUrl + url,
      method: "PUT",
      data,
      headers: {
        authorization: `Bearer ${getUserInfo().token}`
      }
    })
      .then(res => {
        if (res.data.status_code == 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch(e => {
        reject(e.response);
      });
  });
};

export const apiDelete = (url: string) => {
  return new Promise<Responseserver>((resolve, reject) => {
    axios({
      url: baseUrl + url,
      method: "DELETE",
      headers: {
        authorization: `Bearer ${getUserInfo().token}`
      }
    })
      .then(res => {
        if (res.data.status_code == 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch(e => {
        reject(e.response);
      });
  });
};
