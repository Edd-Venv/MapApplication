import React from "react";
import Button from "../../../UI/Button/Button";
import classes from "./ChangeUserPhoto.module.css";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/changeuserphoto";
import PropTypes from "prop-types";

class ChangeUserPhoto extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.props.state);
  };

  render() {
    const { onBlobInputChange } = this.props;
    return (
      <form
        className="settings-image"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <div className={classes.Container}>
          <img
            alt="Logo"
            className={classes.Img}
            src={require(`../../../../assets/Images/users/${localStorage.getItem(
              "userImage"
            )}`)}
          />
          <label htmlFor="photo"></label>
          <input
            style={{ outline: "none" }}
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={onBlobInputChange}
          />
          <Button buttonType="submit">Save Photo</Button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onBlobInputChange: (event) => {
    const blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
    dispatch(actionCreators.userPictureFileInput(blob));
  },
});
const mapStateToProps = (state) => ({
  state: state.changeuserphoto,
});
ChangeUserPhoto.propTypes = {
  state: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserPhoto);
