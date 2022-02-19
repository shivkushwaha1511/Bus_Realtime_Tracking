import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Database Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DB CONNECTION ERR=>", err);
  });

//   Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server running"));
