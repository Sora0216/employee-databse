// src/prompts/departmentPrompts.js
const inquirer = require("inquirer");
const { addDepartment } = require("../utils/queries");

const addDepartmentPrompt = async () => {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    },
  ]);
  const department = await addDepartment(name);
  console.log(`Added department: ${department.name}`);
};

module.exports = { addDepartmentPrompt };
