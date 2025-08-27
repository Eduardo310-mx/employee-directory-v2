import express from "express";
const app = express();
export default app;
import employeesRouter from "./api/employees.js";

app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});