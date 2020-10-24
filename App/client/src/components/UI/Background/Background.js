/* eslint-disable react/jsx-fragments */
import React from "react";
import classes from "./Background.module.css";

const background = (props) => {
  const { data_test } = props;
  return (
    <React.Fragment>
      <div className={classes.BackGroundImg} />
      <div data-test={data_test} className={classes.Container}>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default background;
