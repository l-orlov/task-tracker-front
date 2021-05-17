import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});
