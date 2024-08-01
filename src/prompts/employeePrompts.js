const inquirer = require("inquirer");
const { addEmployee, getRoles, getEmployees } = require("../utils/queries");

const addEmployeePrompt = async () => {
  const roles = await getRoles();
  const employees = await getEmployees();
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));
  const managerChoices = employees.map((emp) => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id,
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name of the employee:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name of the employee:",
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the role for the employee:",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Select the manager for the employee:",
      choices: managerChoices,
    },
  ]);
  const employee = await addEmployee(
    first_name,
    last_name,
    role_id,
    manager_id
  );
  console.log(`Added employee: ${employee.first_name} ${employee.last_name}`);
};

module.exports = { addEmployeePrompt };
