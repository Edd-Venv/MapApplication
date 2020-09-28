import PropTypes from "prop-types";
import React from "react";
import saveLocation from "./SaveLocation";

const saveButton = (props) => (
  <div>
    <p>{props.state.address}</p>
    <button type="submit" onClick={saveLocation(props.state)}>
      Save Location
    </button>
  </div>
);

saveButton.propTypes = {
  state: PropTypes.object,
};

export default saveButton;
