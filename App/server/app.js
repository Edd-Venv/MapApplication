const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const multer = require("multer");
const { uuid } = require("uuidv4");
const mongoose = require("mongoose");
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

  console.log("Gobal", error);
  res.status(status).json({ message, data });
});

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
