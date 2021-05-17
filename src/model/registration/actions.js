import { types } from "./types";

export const registrationStart = () => ({
  type: `${types.registration}_START`,
});
export const registrationSuccess = () => ({
  type: `${types.registration}_SUCCESS`,
});
export const registrationError = () => ({
  type: `${types.registration}_ERROR`,
});
