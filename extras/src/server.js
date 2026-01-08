import express from "express";
import cors from "cors";

import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server on: http://localhost:3000");
});

app.use("/api", router);

app.listen(3000, () => {
  console.log("🔥 Selvagem! Server is running");
});
