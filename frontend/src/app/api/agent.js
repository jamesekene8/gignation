import axios from "axios";
import { Router } from "../routes/Routes";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { logoutUser } from "../store/accountSlice";

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  if (store.getState().account.token && config.headers) {
    config.headers.Authorization = `Bearer ${store.getState().account.token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.dev) await sleep(6000);
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
          //store.userStore.logout();
          store.dispatch(logoutUser());
          toast.error("Session expired - Please login again");
        } else {
          throw data.message;
          //toast.error(data.message);
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
  list: () => requests.get("/job"),
  apply: (id, data) => requests.post(`/job/${id}/apply`, data),
  applied: () => requests.get("/user/applications"),
  retrieve: (id) => requests.post(`/job/${id}/retrieve/application`, {}),
  create: (job) => requests.post("/job", job),
  applications: (id) => requests.get(`job/${id}/applications`),
  getJob: (id) => requests.get(`job/${id}`),
  delete: (id) => requests.del(`job/${id}`),
  updateJob: (id, job) => requests.put(`/job/${id}`, job),
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

const agent = {
  Account,
  Jobs,
  Profile,
  Education,
  Experience,
};

export default agent;
