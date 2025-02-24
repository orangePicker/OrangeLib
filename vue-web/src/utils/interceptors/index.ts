import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IResponse } from "../../types";
import { message } from "ant-design-vue";
import useStore from "../../store";

// const baseURL = "http://localhost:3000/";
const baseURL = import.meta.env.VITE_BASEURL;
const myInterceptors = axios.create({
  withCredentials: true,
  timeout: 10000,
});
// 默认不携带cookie
myInterceptors.defaults.withCredentials = true;
// 请求拦截器
myInterceptors.interceptors.request.use((config) => {
  // 无token请求白名单
  const whiteList = ["user/login", "user/register"];

  // 携带token
  config.headers["Token"] = useStore().useUser.token;
  // 是否在白名单内
  if (!whiteList.includes(config.url as string)) {
    // 是否携带token
    if (!config.headers["Token"]) {
      return Promise.reject({ config, msg: "无token的请求" });
    }
  }
  // 拼接请求路径
  if (!config.url?.startsWith("http")) {
    config.url = baseURL + config.url;
  }
  console.log(config);

  return config;
});

// 响应拦截
myInterceptors.interceptors.response.use(
  (response) => {
    console.log("response");

    return response;
  },
  (err) => {
    switch (err.response?.status) {
      case 401:
        useStore().useUser.clearUser();
        return message.info("登录已失效或过期");
      default:
        message.error("系统错误");
    }
    Promise.reject(err);
  }
);

// 请求
export async function myHttp<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  const res = await myInterceptors.post<null, AxiosResponse<IResponse<T>>>(
    url,
    data,
    config
  );
  return res.data;
}
