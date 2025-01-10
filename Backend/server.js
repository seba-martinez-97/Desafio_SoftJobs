import cors from "cors";
import "dotenv/config";
import express from "express";

import router from "./config/routes/user.Routes.js";
import { tracker } from "./middlewares/reportRequest.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use(tracker);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor encendido en el puerto http://localhost:${PORT}`);
});