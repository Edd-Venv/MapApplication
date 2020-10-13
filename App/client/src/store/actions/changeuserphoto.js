export const INPUT_BLOB = "INPUT_BLOB";

export const userPictureFileInput = (response) => {
  return {
    type: INPUT_BLOB,
    response,
  };
};
