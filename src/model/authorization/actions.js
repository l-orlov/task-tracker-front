import { types } from "./types";

export const authorization = (data) => ({
  type: `${types.authorization}`,
  payload: data,
});

export const authorizationStart = () => ({
  type: `${types.authorization}_START`,
});
export const authorizationSuccess = (data) => ({
  type: `${types.authorization}_SUCCESS`,
  payload: data,
});
export const authorizationError = (data) => ({
  type: `${types.authorization}_ERROR`,
  payload: data,
});
