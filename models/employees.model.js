const mongoose = require("mongoose");

// Schema definition
const employeeSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trime: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trime: true
    },
    address: {
        type: String,
        required: true,
        trime: true
    },
    designation: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true
    },
    bloodGroup: {
        type: String
    }
});

// Model creation
module.exports = mongoose.model("employees", employeeSchema);