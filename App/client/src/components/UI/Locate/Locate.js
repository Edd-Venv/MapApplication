import React from "react";
import * as actionCreators from "../../../store/actions/cockpit";
import { connect } from "react-redux";
import classes from "./Locate.module.css";

const locate = (props) => {
  const { onLocateMe } = props;
  const navi = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            onLocateMe(lat, lng);
          },
          (error) => {
            throw new Error(error);
          },
          { enableHighAccuracy: true }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className={classes.Container} onClick={() => navi()}>
      <i>locate</i>
    </button>
  );
};
const mapStateToProps = (state) => ({
  state: state.cockpit,
});
const mapDispatchToProps = (dispatch) => ({
  onLocateMe: (lat, lng) => {
    dispatch(actionCreators.getLocateMe({ lat, lng }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(locate);
