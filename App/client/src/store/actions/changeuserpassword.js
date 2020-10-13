/* eslint-disable arrow-body-style */
export const OLD_PASSWORD = "OLD_PASSWORD";
export const NEW_PASSWORD = "NEW_PASSWORD";

export const oldUserPasswordInput = (response) => {
  return {
    type: OLD_PASSWORD,
    response,
  };
};
export const newUserPasswordInput = (response) => {
  return {
    type: NEW_PASSWORD,
    response,
  };
};
