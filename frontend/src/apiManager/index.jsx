
import axios from "axios";
import toast from "react-hot-toast";

import { USER_STORE_PERSIST } from "../const";
import { BASE_URL } from "../const/env.const";
import { getToken, removeToken, setToken } from "../helper/index";

let AxiosInstances;

(() => {
  AxiosInstances = axios.create({
    baseURL: BASE_URL, 
  });
  // console.log("url is",baseUrl);
  

  AxiosInstances.interceptors.request.use((config) => {
    const token = getToken();
    token && (config.headers.Authorization = `bearer ${token}`);
    return config;
  });

  AxiosInstances.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.data.success === "false") {
        const message = error.data.message;
        message ? toast.error(message) : toast.error("something went wrong");
        if (error.response.status === 401) {
          removeToken();
          sessionStorage.removeItem(USER_STORE_PERSIST);
          window.location.href = "/signin";
        }
      } else {
        toast.error("something went wrong");
      }
      throw error;
    }
  );
})();

export default AxiosInstances;
