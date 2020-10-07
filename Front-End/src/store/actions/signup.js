/* eslint-disable arrow-body-style */
export const INPUT_NAME = "INPUT_NAME";
export const INPUT_PASSWORD = "INPUT_PASSWORD";
export const INPUT_BLOB = "INPUT_BLOB";

export const userNameInput = (response) => {
  return {
    type: INPUT_NAME,
    response,
  };
};

export const userPasswordInput = (response) => {
  return {
    type: INPUT_PASSWORD,
    response,
  };
};

export const userPictureFileInput = (response) => {
  return {
    type: INPUT_BLOB,
    response,
  };
};
