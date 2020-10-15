const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const rootDir = require("./utils/path");
const dataBase = require("./utils/database");

const app = express();
const signInRoute = require("./routes/signIn");
const signOutRoute = require("./routes/signOut");
const signUpRoute = require("./routes/signUp");
const deleteAccount = require("./routes/deleteAccount");
const accountData = require("./routes/accountData");
const accountSettings = require("./routes/accountSettings");

app.use(bodyParser.urlencoded({ extended: false }));
// to serve public as entry point for static files
// you can serve other folders too
app.use(express.static(path.join(__dirname, "public")));

app.use(signInRoute);
app.use(signOutRoute);
app.use(signUpRoute);
app.use(deleteAccount);
app.use("/saved", accountData);
app.use("/account/settings", accountSettings);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

dataBase.mongoConnect(() => {
  const server = http.createServer(app);
  server.listen(4030);
});
