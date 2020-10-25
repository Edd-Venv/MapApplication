import React from "react";
import Background from "../UI/Background/Background";

const notAuthorized = () => {
  const style = {
    fontFamily: "Montserrat, sans-serif",
    border: "2px solid",
    position: "absolute",
    backgroundColor: "#f2f2f2",
    padding: "0.7rem 0.7rem",
    borderRadius: "1rem",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(35, 0, 77, 0.2) ",
  };

  return (
    <Background>
      <p style={style}>You're not authorized, please Sign In.</p>
    </Background>
  );
};

export default notAuthorized;
