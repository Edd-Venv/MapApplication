const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
const app = require("./app.js");

dotenv.config({ path: "./.env" });

mongoose
  .connect(
    "mongodb+srv://edwin:v9xnL1SdG9IYBjxO@mongodb.iyv8w.mongodb.net/map?retryWrites=true&w=majority"
  )
  .then(() => {
    const server = http.createServer(app);
    server.listen(process.env.PORT || 4030, () =>
      console.log(`Server listening on port ${process.env.PORT}!`)
    );
    console.log("DB Connected.");
  })
  .catch((error) => console.log(error));

/*

////  Final Set Up\\\\\\\\\
mongoose
  .connect(
    "mongodb+srv://edwin:v9xnL1SdG9IYBjxO@mongodb.iyv8w.mongodb.net/map?retryWrites=true&w=majority"
  )
  .then(() => {
      if (true) {
  app.use(express.static("build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
    const server = http.createServer(app);
    server.listen(process.env.PORT || 4030, () =>
      console.log(`Server listening on port ${process.env.PORT}!`)
    );
    console.log("DB Connected.");
  })
  .catch((error) => console.log(error));

*/
