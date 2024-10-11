const express = require("express");
const Employees = require("../models/employees.model");

const router = express.Router();

// router.get("/test", (req, res) => {
//     res.json({ message: 'Test route works!' });
// });

router.get("/employees", async (req, res) => {
    try {
        const data = await Employees.find();

        res.status(200).send(data);

    } catch (error) {
        if (error) {
            res.status(400).send({ message: "Error while retrieving employee. Please check the data." });
        } else {
            res.status(500).send({
                message: "Internal Server Error",
            });
        }
    }
});

router.get("/employees/:empID", async (req, res) => {
    try {
        const employeeId = req.params.empID;

        const data = await Employees.findOne({_id: employeeId});

        res.status(200).send(data);

    } catch (error) {
        if (error) {
            res.status(400).send({ message: "Error while retrieving an employee. Please check the data." });
        } else {
            res.status(500).send({
                message: "Internal Server Error",
            });
        }
    }
});



router.post("/employees", async (req, res) => {
    try {
        const payload = req.body;

        const newEmployee = new Employees(payload);

        const data = await newEmployee.save();

        res.status(201).send({
            employeeId: data._id,
            message: "Employee has been added successfully."
        })

    } catch (error) {
        if (error) {
            res.status(400).send({ message: "Error while adding new employee. Please check the data." });
        } else {
            res.status(500).send({
                message: "Internal Server Error"
            });
        }
    }
});

router.put("/employees/:empID", async (req, res) => {
    try {
        const employeeId = req.params.empID;

        const data = await Employees.findByIdAndUpdate({_id: employeeId},{$set: req.body});

        res.status(201).send({
            Id: data._id,
            message: "Employee details have been updated."
        })
    } catch (error) {
        if(error){
            res.status(400).send({message: "Error while updating an existing user. Please check the data."});
        } else {
            res.status(500).send({message: "Internal Server Error."});
        }

    }
});

router.delete("/employees/:empID", async (req, res) => {
    try {
        const employeeId = req.params.empID;

        const data = await Employees.deleteOne({_id: employeeId});

        res.status(200).send({message: `Employee with id:(${employeeId}) has been deleted.`});
    } catch (error) {
        if(error){
            res.status(400).send({message: "Error while deleting an employee. Please check the data"});
        } else {
            res.status(500).send({message: "Internal Server Error."});
        }
    }
});

module.exports = router;
