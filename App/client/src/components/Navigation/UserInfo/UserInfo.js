import React from "react";
import { connect } from "react-redux";
import classes from "./UserInfo.module.css";

import { BaseUrl } from "../../../index";

const UserInfo = () => {
  return (
    <span>
      <i
        style={{
          fontSize: "1.5rem",
          color: "black",
          fontWeight: "bold",
          paddingLeft: "0.5rem",
        }}
      >
        <img
          alt="Logo"
          className={classes.LogoImg}
          src={`${BaseUrl}${localStorage.getItem("userImage")}`}
        />
        {localStorage.getItem("username")}
      </i>
    </span>
  );
};

const mapStateToProps = (state) => ({
  state: state.signin,
});

export default connect(mapStateToProps)(UserInfo);
