export const getUserInfo = (): any => {
  return {
    token: getLocalStorage("id"),
    user: getLocalStorage("info")
  };
};

export const saveUserInfo = (token: string, info: any) => {
  let newInfo = JSON.stringify(info);
  setLocalStorage("id", token);
  setLocalStorage("info", newInfo);
};

export const removeUserInfo = () => {
  removeLocalStorage("id");
  removeLocalStorage("info");
};

const setLocalStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

const removeLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};

const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
