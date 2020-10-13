import React from "react";
import classes from "./Settings.module.css";
import SettingsForm from "../../UI/Form/SettingsForm/SettingsForm";

const Settings = () => {
  return (
    <div data-test="component-settings">
      <div className={classes.BackGroundImg} />
      <SettingsForm />
    </div>
  );
};

export default Settings;
