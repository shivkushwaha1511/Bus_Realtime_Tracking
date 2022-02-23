import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Socket.io setup
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    methods: ["GET", "POST"],
    allowHeaders: ["content-type"],
  },
});
global.io = io;

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

io.on("connect", (socket) => {
  socket.on("join", function (data) {
    socket.join(data.busNo); // We are using room of socket io
  });
});

const PORT = process.env.PORT || 8000;

http.listen(PORT, () => console.log("Server running"));
