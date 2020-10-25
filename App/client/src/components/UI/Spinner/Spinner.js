import React from "react";
import Background from "../Background/Background";
import classes from "./Spinner.module.css";

const spinner = () => (
  <Background>
    {" "}
    <div className={classes.Loader}>Loading</div>
  </Background>
);

export default spinner;
