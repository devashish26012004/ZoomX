import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "node:http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import { connectToSocket } from "./src/controllers/socketManager.js";
import userRoutes from "./src/routes/users.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
const app = express();

const server = http.createServer(app);
const io = connectToSocket(server);

app.use(
  cors({
    origin: ["https://zoomx-frontend.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Database connection
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
