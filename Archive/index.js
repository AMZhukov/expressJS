import express from "Express";
import dotenv from "dotenv";
import path from "path";
import { requestTime, logger } from "./middlewares.js";

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));

console.log(app.get('views'));

const isProd = process.env.NODE_ENV === "production";

dotenv.config({ path: isProd ? ".env.prod" : ".env.dev" });
console.log(`Env loading ${isProd ? "PROD" : "DEV"} file`);

app.use(express.static(path.resolve(__dirname, "static")));
app.use(requestTime);
app.use(logger);

app.get("/", (req, res) => {
  res.render("index", {title: "main page"});
});

app.get("/features", (req, res) => {
  res.render("features", {title: "features page"});
});

// app.get("/download", (req, res) => {
//   res.download(path.resolve(__dirname, "static", "index.html"));
// });

app.listen(PORT, () => `Server has beed started on port: ${PORT}...`);
