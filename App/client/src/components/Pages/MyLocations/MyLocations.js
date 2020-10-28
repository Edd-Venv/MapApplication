/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/cockpit";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "../../UI/Box/Box";
import Background from "../../UI/Background/Background";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./MyLocations.module.css";
import NotAuthorized from "../404";
import CloseButton from "../../UI/Button/CloseButton/CloseButton";
import SearchInput from "../../UI/SearchInput/SearchInput";
import isAuthorized from "../utils/isAuthorized";
import { BaseUrl } from "../../../index";

class MyLocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      error: false,
    };
  }

  componentDidMount() {
    const { onComponentMountFetchLocations } = this.props;
    const isAuth = isAuthorized(`${BaseUrl}saved/locations`, "GET");
    isAuth.then((res) => {
      const { authorized, error } = res;

      if (!authorized) {
        this.setState((prevState) => {
          return {
            filter: prevState.filter,
            error: true,
            errorStatus: error.statusCode,
            errorMessage: error.message,
          };
        });
      } else {
        const userId = localStorage.getItem("_id");
        onComponentMountFetchLocations(userId);
      }
    });
  }

  handleChange = (event) => {
    if (event.target.name === "search")
      this.setState({ filter: event.target.value });
  };

  render() {
    const { state, onSavedLocation, onDeleteSavedLocation } = this.props;

    if (this.state.error) return <NotAuthorized />;

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

      const style = {
        padding: "inherit",
      };

      return (
        <Background data_test="component-my-locations">
          {filter}
          <div className={classes.Grid}>
            {locations.map((location) => (
              <div className={classes.Container} key={location._id}>
                <Box>
                  <CloseButton
                    className={classes.Closebutton}
                    onClick={() => onDeleteSavedLocation(location._id)}
                  >
                    x
                  </CloseButton>
                  <p style={style}>
                    <strong>Address:</strong> {location.address}
                  </p>
                  <p style={style}>
                    <strong>City:</strong> {location.city}
                  </p>
                  <Link
                    style={{
                      textDecoration: "none",
                      padding: "inherit",
                      width: "fit-content",
                    }}
                    to="/"
                    onClick={() => onSavedLocation(location)}
                  >
                    View On Map
                  </Link>
                </Box>
              </div>
            ))}
          </div>
        </Background>
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
  onDeleteSavedLocation: (id) => {
    dispatch(actionCreators.deleteSelectedLocation(id));
  },
});

MyLocations.propTypes = {
  state: PropTypes.array.isRequired,
  onComponentMountFetchLocations: PropTypes.func.isRequired,
  onSavedLocation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLocations);
