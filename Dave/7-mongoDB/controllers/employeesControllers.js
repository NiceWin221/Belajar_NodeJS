const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) return res.status(400).json({ message: "No employees found." });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    res.status(204).json({ message: "First and last name are required." });
  }

  try {
    const duplicate = await Employee.findOne({ firstname: req.body.firstname }).exec();
    if (duplicate) return res.sendStatus(409);

    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    res.status(400).json({ message: "ID parameter is required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec()
  if (!employee) {
    return res.status(204).json({ message: `No employee matches ID ${req.body.id}.` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    res.status(400).json({ message: "ID parameter is required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res.status(400).json({ message: `No employee matches ID ${req.body.id}.` });
  }
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getEmployees = async (req, res) => {
  if (!req?.params?.id) {
    res.status(400).json({ message: "Employee ID is needed" });
  }
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res.status(204).json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = { getEmployees, getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee };
