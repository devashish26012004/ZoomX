import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "node:http";
import { Server } from "socket.io";

import { connectToSocket } from "./src/controllers/socketManager.js";
import userRoutes from "./src/routes/users.routes.js";

const PORT = 8000;
const app = express();

const server = http.createServer(app); // Created an HTTP server and thrown the express server into it
const io = connectToSocket(server); //created socket server in this function

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

//database connection
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
