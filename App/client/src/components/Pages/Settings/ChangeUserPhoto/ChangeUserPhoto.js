import React from "react";
import Button from "../../../UI/Button/Button";
import classes from "./ChangeUserPhoto.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { changePhoto } from "../Utils/accountSettings";
import * as actionCreators from "../../../../store/actions/changeuserphoto";
import PropTypes from "prop-types";

class ChangeUserPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("prevImageurl", localStorage.getItem("userImage"));
    formData.append("photo", this.props.state.blob);

    if (this.props.state.blob) {
      changePhoto(
        "http://localhost:4030/account/settings/update/user-picture",
        formData
      )
        .then((result) => result.json())
        .then((response) => {
          if (response.status === "ok")
            this.setState({
              redirect: true,
            });
        });
    }
  };

  render() {
    const { onBlobInputChange } = this.props;

    if (this.state.redirect) return <Redirect to="/signout" />;

    return (
      <form
        className="settings-image"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <div className={classes.Container}>
          <div className={classes.ImgContainer}>
            <img
              alt="Logo"
              className={classes.Img}
              src={`http://localhost:4030/${localStorage.getItem("userImage")}`}
            />
          </div>
          <label htmlFor="photo"></label>
          <div className={classes.FileUpload}>
            <input
              style={{ outline: "none" }}
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={onBlobInputChange}
            />
          </div>
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

//  src={`http://localhost:4030/${localStorage.getItem("userImage")}`}

/*
{require(`../../../../assets/Images/users/${localStorage.getItem(
              "userImage"
            )}`)}
*/
