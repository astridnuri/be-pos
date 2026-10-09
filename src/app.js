import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import { login } from "./controllers/AuthController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//http://localhost:5000/api/auth/login

app.get("/", (req, res) => {
  //req: proses mengambil data dari body & parameter
  //req.body, req.params
  // res.send() sangat jarang dipakai, yg skrg dipakai adalah res.json
  res.json({ message: "Welcome to POS API" });
});

export default app;
