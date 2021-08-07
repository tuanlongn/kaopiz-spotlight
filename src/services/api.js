import axios from "axios";

const API_URL = `${process.env.VUE_APP_API_URL}`;

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 30 * 1000;
axios.defaults.validateStatus = (status) => status < 500;

const api = axios.create();
const apiAuth = axios.create();

//-------------------------------------

if (process.env.VUE_APP_MOCK_API === "true") {
  const mockApi = require("./mock-api");
  mockApi.enableMockApi(api);
  mockApi.enableMockApiAuthenticated(apiAuth);
}

//-------------------------------------

export const setAccessToken = (token) => {
  apiAuth.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const loginApi = async ({ email, password }) => {
  try {
    return api.post("/login", { email, password });
  } catch (e) {
    return { error: e.message };
  }
};

export const getMyInfoApi = async () => {
  try {
    return apiAuth.get("/me");
  } catch (e) {
    return { error: e.message };
  }
};
