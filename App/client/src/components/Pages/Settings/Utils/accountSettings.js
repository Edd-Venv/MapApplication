export const deleteAccount = (url, userId) => {
  fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
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
