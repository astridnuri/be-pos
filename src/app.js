import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
// import { login } from "./controllers/AuthController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); //bebas penamaan url nya
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaction", transactionRoutes)

//http://localhost:5000/api/auth/login

app.get("/", (req, res) => {
  //req: proses mengambil data dari body & parameter
  //req.body, req.params
  // res.send() sangat jarang dipakai, yg skrg dipakai adalah res.json
  res.json({ message: "Welcome to POS API" });
});

export default app;
