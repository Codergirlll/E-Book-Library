// const express = require("express");
import express from "express";
import configs from "./src/config/config";

const app = express();

require("./src/db/connection");
const port = configs.port || 4040;

app.listen(port, () => {
  console.log(`Server is running at Port no. ${port}`);
});
