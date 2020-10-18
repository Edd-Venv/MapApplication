import React from "react";
import ChangeUserPhoto from "../../../Pages/Settings/ChangeUserPhoto/ChangeUserPhoto";
import ChangeUserPassword from "../../../Pages/Settings/ChangeUserPasword/ChangeUserPwd";
import ChangeUserName from "../../../Pages/Settings/ChangeUserName/ChangeUserName";
import { deleteAccount } from "../../../Pages/Settings/Utils/accountSettings";
import classes from "./SettingsForm.module.css";
import Button from "../../Button/Button";

const settingsForm = () => (
  <div className={classes.Container}>
    {" "}
    <h3
      style={{
        fontFamily: "Oswald, sans-serif",
        textAlign: "center",
        color: "black",
        marginTop: "10vh",
      }}
    >
      ACCOUNT SETTINGS
    </h3>
    <div className={classes.Form}>
      <ChangeUserPhoto />
      <div className={classes.InputForm}>
        <ChangeUserName />
        <ChangeUserPassword />
        <Button
          className={classes.Danger}
          buttonClick={() =>
            deleteAccount(
              "http://localhost:4030/delete/account",
              "5f8c1b9092c02c0cfc97badc"
            )
          }
          buttonType="submit"
        >
          DELETE USER
        </Button>
      </div>
    </div>
  </div>
);
export default settingsForm;
