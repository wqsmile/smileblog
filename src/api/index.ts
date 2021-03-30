import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Message } from "@/utils/message";
import storage from "@/utils/storage";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

instance.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    req.headers.common["Authorization"] = "Bearer " + storage.get("token");
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.resolve(err);
  }
);
instance.interceptors.response.use(
  (resp: AxiosResponse) => {
    if (!resp.data.code) {
      // Message("warning", "请求出错");
      return null;
    }
    return resp.data.data;
  },
  (err) => {
    if (/401/.test(err)) {
      Message("warning", "请先登录！");
    }
    console.log("err", err);
    return Promise.resolve(err);
  }
);

export default instance;
