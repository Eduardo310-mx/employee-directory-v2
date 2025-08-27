import express from "express";
import { getEmployees, getEmployeesId, addEmployee } from "../db/employees.js";
const router = express.Router();
export default router;

//get all employees
router
    .route("/")
    .get((req, res) => {
        res.json(getEmployees());
    });

//add a new employee
router
    .route("/")
    .post((req, res) => {

        if (req.body === undefined) {
            return res.status(400).send("Request must have a body.");
        }

        const { name } = req.body;

        if (!name) {
            return res.status(400).send("New Employee must have name.");
        }

        const obj = addEmployee(name.trim());

        res.status(201).json(obj);
    });

//get random employees
router
    .route("/random")
    .get((req, res) => {
        const employees = getEmployees();
        const randomIndex = Math.floor(Math.random() * employees.length);
        res.send(employees[randomIndex]);
    });

//get an Employee by ID
router
    .route("/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const employee = getEmployeesId(id);

        if (!employee) {
            return res.status(404).send(`Employee with ID ${id} not found.`);
        }
        res.json(employee);
    });

