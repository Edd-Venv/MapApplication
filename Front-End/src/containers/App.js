/* eslint-disable sort-imports */
import React from "react";
import Classes from "./App.modules.css";
import Cockpit from "../components/Map/Cockpit";

function App() {
  return (
    <div className={Classes.App}>
      <Cockpit />
    </div>
  );
}

export default App;
