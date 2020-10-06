import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import cockpitReducer from "./store/reducers/cockpit";

const rootReducer = combineReducers({
  cockpit: cockpitReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
//<BroswerRouter basename="domain"/>

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
