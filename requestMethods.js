import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND;
const persistedData = localStorage?.getItem("persist:root");

const accessToken = persistedData
  ? JSON.parse(JSON.parse(persistedData).user)?.currentUser?.accessToken || ""
  : "";

const TOKEN = accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
