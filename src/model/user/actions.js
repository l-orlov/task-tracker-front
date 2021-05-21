import { types } from "./types";

export const registration = (data) => ({
  type: `${types.registration}`,
  payload: data,
});
export const registrationStart = () => ({
  type: `${types.registration}_START`,
});
export const registrationSuccess = () => ({
  type: `${types.registration}_SUCCESS`,
});
export const registrationError = () => ({
  type: `${types.registration}_ERROR`,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
