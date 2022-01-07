import axios from "axios";
// import * as ls from "local-storage";

axios.defaults.baseURL = process.env.API_HOST;
// API_DOMAIN; //测试
axios.defaults.headers.common["Authorization"] = "";

//设置超时
axios.defaults.timeout = 10000;

function updateAuthorizationToken() {
  axios.defaults.headers.common["Authorization"] = "";
}

axios.interceptors.request.use(
  config => {
    console.log("before request, ", config);
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    if (response?.status == 200) {
      return Promise.resolve(response);
    } else {
      if (response?.status === 204) {
        console.warn("未找到資源");
      }
      return Promise.reject(response);
    }
  },
  error => {
    if (error) {
      const errorResponse = error.response;
      if (errorResponse?.status === 401) {
        console.log("UNAUTHORIZED");
      }
      // here we reject a error.response, so that user could catch it later on ...
      // 要回傳error.response才能接收到error message
      return Promise.reject(error.response);
    } else {
      // 斷網
      // here we reject a error.response, so that user could catch it later on ,.
      return Promise.reject(error.response);
    }
  }
);

function postFunc(url: string, data: Record<string, any>): Promise<any> {
  updateAuthorizationToken();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url,
      data: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getFunc<T>(url: string, data: Record<string, any> = {}): Promise<T> {
  updateAuthorizationToken();
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      params: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function putFunc(url: string, data: Record<string, any>): Promise<any> {
  updateAuthorizationToken();
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url,
      data: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function delFunc(url: string, data: Record<string, any>): Promise<any> {
  updateAuthorizationToken();
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url,
      data: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

const BaseApi = {};

export default BaseApi;
