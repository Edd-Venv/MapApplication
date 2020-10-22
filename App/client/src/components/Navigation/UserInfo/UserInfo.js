import React from "react";
import { connect } from "react-redux";
import classes from "./UserInfo.module.css";

// import { BaseUrl } from "../../App.js";

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
          src={`http://localhost:4030/${localStorage.getItem("userImage")}`}
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

/* useEffect(() => {
    if (localStorage.getItem("userName") && !user.accesstoken) setName("GUEST");
    else if (localStorage.getItem("userName"))
      setName(localStorage.getItem("userName"));
    else setName("GUEST");

    if (user.accesstoken && !localStorage.getItem("userName"))
      props.logOutCallback();
  }, [user.accesstoken]); 
  
  
    componentDidMount() {
    if (localStorage.getItem("username") && !localStorage.getItem("token")) {
      this.setState({ name: "Guest" });
    } else if (localStorage.getItem("username"))
      this.setState({ name: localStorage.getItem("username") });
    //else this.setState({ name: "Guest" });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("should update", this.state);
    console.log(nextState.name, localStorage.getItem("username"));
    if (nextState.name !== this.state.name) return true;
    return false;
  }*/
