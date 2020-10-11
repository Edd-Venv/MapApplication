/* eslint-disable arrow-body-style */
export const OLD_INPUT_NAME = "OLD_INPUT_NAME";
export const NEW_INPUT_NAME = "NEW_INPUT_NAME";

export const oldUserNameInput = (response) => {
  return {
    type: OLD_INPUT_NAME,
    response,
  };
};
export const newUserNameInput = (response) => {
  return {
    type: NEW_INPUT_NAME,
    response,
  };
};
