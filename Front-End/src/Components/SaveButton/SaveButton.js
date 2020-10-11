import PropTypes from "prop-types";
import React from "react";
import Button from "../UI/Button/Button";

const saveButton = (props) => (
  <div>
    <p>{props.state.address}</p>
    <Button
      buttonType=""
      type="button"
      buttonClick={() => {
        props.onSaveLocation(props.state);
      }}
    >
      Save Location
    </Button>
  </div>
);

saveButton.propTypes = {
  state: PropTypes.object,
};

export default saveButton;
