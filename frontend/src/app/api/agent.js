import axios from "axios";
import { Router } from "../routes/Routes";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { logoutUser } from "../store/accountSlice";
import { PaginatedResult } from "../models/pagination";

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use(async (config) => {
  if (store.getState().account.token && config.headers) {
    config.headers.Authorization = `Bearer ${store.getState().account?.token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error) => {
    const { data, status, config, headers } = error.response;

    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          Router.navigate("/not-found");
        }
        if (data.errors) {
          const moduleStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) moduleStateErrors.push(data.errors[key]);
          }
          throw moduleStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers["www-authenticate"]?.startsWith('Bearer error="invalid_token')
        ) {
          store.dispatch(logoutUser());
          toast.error("Session expired - Please login again");
        } else {
          toast.error(data.message);
          throw data.message;
        }

        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        Router.navigate("/not-found");
        break;
      case 500:
        //store.commonStore.setServerError(data);
        Router.navigate("/server-error");
        break;
      default:
        toast.error(error.message);
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Account = {
  current: () => requests.get("/account"),
  login: (user) => requests.post("/account/login", user),
  register: (user) => requests.post("/account/register", user),
  refreshToken: () => requests.post("/account/refreshToken", {}),
};

const Profile = {
  getProfile: () => requests.get("/profile"),
  updateProfile: (user) => {
    return axios.put("/user/edit", user, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

const Jobs = {
  list: (params) => axios.get("/job", { params }).then(responseBody),
  apply: (id, data) => requests.post(`/job/${id}/apply`, data),
  applied: () => requests.get("/user/applications"),
  retrieve: (id) => requests.post(`/job/${id}/retrieve/application`, {}),
  create: (job) => requests.post("/job", job),
  applications: (id) => requests.get(`job/${id}/applications`),
  getJob: (id) => requests.get(`job/${id}`),
  delete: (id) => requests.del(`job/${id}`),
  updateJob: (id, job) => requests.put(`/job/${id}`, job),
  search: (term) => requests.get(`/job?search=${term}`),
};

const Education = {
  create: (edu) => requests.post("/education", edu),
  list: () => requests.get("/education"),
  delete: (id) => requests.del(`/education/${id}`, {}),
};

const Experience = {
  create: (exp) => requests.post("/experience", exp),
  list: () => requests.get("/experience"),
  delete: (id) => requests.del(`/experience/${id}`, {}),
};

const Resume = {
  add: (resume) => {
    return axios.post("/user/resume/upload", resume, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  get: () => requests.get("/user/resume"),
};

const agent = {
  Account,
  Jobs,
  Profile,
  Education,
  Experience,
  Resume,
};

export default agent;
