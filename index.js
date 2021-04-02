const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);

//* Start of server
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

http.listen(port);
console.log(`Listening on port ${port}!`);
