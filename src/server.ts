import "dotenv/config";
import express from "express";
import userRoutes from "./routes/user-routes.js"

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});