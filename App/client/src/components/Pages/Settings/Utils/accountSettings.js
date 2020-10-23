const userId = localStorage.getItem("_id");
const token = localStorage.getItem("token");

export const deleteAccount = (url) => {
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

export const changeUserName = async (url, username) => {
  return await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      _id: userId,
      username,
    }),
  });
};

export const changePassword = async (url, password) => {
  return await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      _id: userId,
      password,
    }),
  });
};
