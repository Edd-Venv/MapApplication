import { logOut } from "../../../../index";
const userId = localStorage.getItem("_id");
const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const deleteAccount = (url) => {
  fetch(url, {
    method: "DELETE",
    headers,
    body: JSON.stringify({
      _id: userId,
    }),
  })
    .then((res) => res.json())
    .then((result) => console.log(result))
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

export const changeUserName = (url, username) => {
  fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      _id: userId,
      username,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.status === "ok") logOut();
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};
