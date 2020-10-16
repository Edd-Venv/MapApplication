const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const rootDir = require("./utils/path");

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
app.use(
  session({
    secret: "EDWINS A GREAT DEVV",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(signInRoute);
app.use(signOutRoute);
app.use(signUpRoute);
app.use(deleteAccount);
app.use("/saved", accountData);
app.use("/account/settings", accountSettings);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

mongoose
  .connect(
    "mongodb+srv://edwin:v9xnL1SdG9IYBjxO@mongodb.iyv8w.mongodb.net/map?retryWrites=true&w=majority"
  )
  .then(() => {
    const server = http.createServer(app);
    server.listen(4030);
    console.log("DB Connected.");
  })
  .catch((error) => console.log(error));
