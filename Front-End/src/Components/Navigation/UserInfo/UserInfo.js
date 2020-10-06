import React from "react";
import classes from "./UserInfo.module.css";

// import { BaseUrl } from "../../App.js";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Guest" };
  }

  render() {
    const { name } = this.state;
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
            src={require(`../../../assets/Images/users/${localStorage.getItem(
              "userImage"
            )}`)}
          />
          {name}
        </i>
      </span>
    );
  }
}

export default UserInfo;

/* useEffect(() => {
    if (localStorage.getItem("userName") && !user.accesstoken) setName("GUEST");
    else if (localStorage.getItem("userName"))
      setName(localStorage.getItem("userName"));
    else setName("GUEST");

    if (user.accesstoken && !localStorage.getItem("userName"))
      props.logOutCallback();
  }, [user.accesstoken]); */
