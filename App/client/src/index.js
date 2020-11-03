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
import signInReducer from "./store/reducers/signin";
import signupReducer from "./store/reducers/signup";
import changeUserNameReducer from "./store/reducers/changeusername";
import changeUserPasswordReducer from "./store/reducers/changeuserpassword";
import changeUserPhotoReducer from "./store/reducers/changeuserphoto";
import authReducer from "./store/reducers/auth";

export const BaseUrl = "https://edd-venv-map.herokuapp.com/";

if (!localStorage.getItem("userImage") || !localStorage.getItem("username")) {
  localStorage.setItem("userImage", "public/images/default.jpeg");
  localStorage.setItem("username", "Guest");
}

const rootReducer = combineReducers({
  auth: authReducer,
  signin: signInReducer,
  cockpit: cockpitReducer,
  signup: signupReducer,
  changeusername: changeUserNameReducer,
  changeuserpassword: changeUserPasswordReducer,
  changeuserphoto: changeUserPhotoReducer,
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
