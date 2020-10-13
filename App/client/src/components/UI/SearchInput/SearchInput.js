import React from "react";
import classes from "./SearchInput.module.css";

const searchInput = (props) => {
  const { value, handleChange, placeHolder } = props;
  return (
    <div className={classes.InputContainer} id="input">
      <i className="fa fa-search" />
      <input
        autoComplete="off"
        className={classes.InputStyle}
        name="search"
        onChange={handleChange}
        value={value}
        placeholder={placeHolder}
      />
    </div>
  );
};
export default searchInput;
