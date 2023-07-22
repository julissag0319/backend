import express from "express";
import morgan from "morgan";
import RootRoutes from "../src/rutas";
import cors from "cors";
import dotevn from "dotenv";

dotevn.config();
const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", RootRoutes);


app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
