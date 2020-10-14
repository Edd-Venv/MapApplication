const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const signInRoute = require("./routes/signIn");
const signOutRoute = require("./routes/signOut");
const signUpRoute = require("./routes/signUp");
const deleteLocationRoute = require("./routes/deleteAccountData");
const deleteAccount = require("./routes/deleteAccount");
const accountData = require("./routes/accountData");
const accountSettings = require("./routes/accountSettings");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(signInRoute);
app.use(signOutRoute);
app.use(signUpRoute);
app.use(deleteLocationRoute);
app.use(deleteAccount);
app.use(accountData);
app.use(accountSettings);

const server = http.createServer(app);

server.listen(4030);
