/* eslint-disable sort-imports */
import React from "react";
import Classes from "./App.modules.css";
import Map from "../components/Map/Map";

function App() {
  return (
    <div className={Classes.App}>
      <Map />
    </div>
  );
}

export default App;
