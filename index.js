require("dotenv").config();
const express = require("express");
const db = require("./db/connect");
const cors = require("cors");

const app = express();

// Import Routes
const employeesRoutes = require("./routes/employees.routes.js");

//Connecting Db
db();

app.get("/", (req, res) => {
    res.send("Welcome to MyOrg")
})

// Middlewares
app.use(express.json());
// Yet to update CORS
app.use(cors());


// console.log(employeesRoutes);
app.use("/api" ,employeesRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});