import cors from "cors";
import "dotenv/config";
import express from "express";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
import SubmitMessage from "../AboutMe-Main-App/Backend-Controled/SubmitData.js";
import Validar from "../AboutMe-Main-App/Backend-Controled/Translate.js";

const app = express();
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename, "public");

app.use(express.static(path.join(__dirname, "public", "index.html")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", SubmitMessage);
app.use("/", Validar );
app.listen(3000, (req, res) => {
  console.log("Listening on port 3000");
});
