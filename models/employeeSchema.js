const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: String,
    age: String,
    country: String,
    gender: String,
  },
  {
    timestamps: true,
  }
);
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
