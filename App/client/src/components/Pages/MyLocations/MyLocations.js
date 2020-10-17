/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/cockpit";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "../../UI/Box/Box";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./MyLocations.module.css";
import SearchInput from "../../UI/SearchInput/SearchInput";

class MyLocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
    };
  }

  componentDidMount() {
    const { onComponentMountFetchLocations } = this.props;
    const userID = "5f887d2d40126b396c0a5492";
    onComponentMountFetchLocations(userID);
  }

  handleChange = (event) => {
    if (event.target.name === "search")
      this.setState({ filter: event.target.value });
  };

  render() {
    console.log("render");
    const { state, onSavedLocation } = this.props;
    const locations = !this.state.filter
      ? state
      : state.filter((location) =>
          location.address
            .toLowerCase()
            .includes(this.state.filter.toLowerCase())
        );

    let filter = null;

    if (state.length > 0) {
      filter = (
        <SearchInput
          handleChange={this.handleChange}
          value={this.state.filter}
          placeHolder="Filter By Address"
        />
      );

      return (
        <React.Fragment>
          <div className={classes.BackGroundImg} />
          <div data-test="component-my-locations">
            {filter}
            <div className={classes.Grid}>
              {locations.map((location) => (
                <div className={classes.Container} key={location._id}>
                  <Box>
                    <p>
                      <strong>Address:</strong> {location.address}
                    </p>
                    <p>
                      <strong>City:</strong> {location.city}
                    </p>
                    <Link to="/" onClick={() => onSavedLocation(location)}>
                      view on map
                    </Link>
                  </Box>
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      );
    }
    return <Spinner />;
  }
}
const mapStateToProps = (state) => ({
  state: state.cockpit.myLocations.locationsArray,
});
const mapDispatchToProps = (dispatch) => ({
  onSavedLocation: (location) => {
    dispatch(actionCreators.mySavedLocation(location));
  },
  onComponentMountFetchLocations: (userData) => {
    dispatch(actionCreators.getMyLocations(userData));
  },
});

MyLocations.propTypes = {
  state: PropTypes.array.isRequired,
  onComponentMountFetchLocations: PropTypes.func.isRequired,
  onSavedLocation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLocations);
