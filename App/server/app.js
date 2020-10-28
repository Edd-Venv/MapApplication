const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const multer = require("multer");
const { uuid } = require("uuidv4");
const rootDir = require("./utils/path");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${uuid()}.${file.mimetype.split("/")[1]}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const forgotPasswordRoute = require("./routes/forgotPassword");
const resetPaswordRoute = require("./routes/passwordReset");
const signInRoute = require("./routes/signIn");
const signOutRoute = require("./routes/signOut");
const signUpRoute = require("./routes/signUp");
const deleteAccount = require("./routes/deleteAccount");
const accountData = require("./routes/accountData");
const accountSettings = require("./routes/accountSettings");

app.use(bodyParser.json());

app.use(multer({ storage: fileStorage, fileFilter }).single("photo"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// to serve public as entry point for static files
// you can serve other folders too
app.use(express.static(path.join(__dirname, "public", "css")));

app.use(
  "/public/images",
  express.static(path.join(__dirname, "public", "images"))
);
app.use(
  "/public/icons",
  express.static(path.join(__dirname, "public", "icons"))
);

app.use(resetPaswordRoute);
app.use(forgotPasswordRoute);
app.use(signInRoute);
app.use(signOutRoute);
app.use(signUpRoute);
app.use(deleteAccount);
app.use("/saved", accountData);
app.use("/account/settings", accountSettings);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data });
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

module.exports = app;
